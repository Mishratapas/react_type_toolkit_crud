import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { getPostApi } from './getPostApi'

const store = configureStore({
  reducer: { [getPostApi.reducerPath]: getPostApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([getPostApi.middleware]),
})

export default store

setupListeners(store.dispatch)
