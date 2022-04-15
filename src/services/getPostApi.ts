import { createApi } from '@reduxjs/toolkit/query/react'
import axios from 'axios'

export interface IPost {
  userId: Number
  id: number
  title: string
  body: string
}

const getpostData = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  return response
}

const addPostData = async (payload: IPost) => {
  const response = await axios.post(
    'https://jsonplaceholder.typicode.com/posts',
    JSON.stringify(payload)
  )
  return response
}

export const getPostApi = createApi({
  reducerPath: 'getPostApi',
  baseQuery: getpostData,
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPost: builder.query<IPost[], void>({
      query: () => '/',
      transformResponse: (reponse: IPost[]) => reponse.slice(0, 5),
      providesTags: ['Post'],
    }),
    addPost: builder.mutation({
      query: addPostData,
      invalidatesTags: ['Post'],
    }),
  }),
})

export const { useGetPostQuery, useAddPostMutation } = getPostApi
