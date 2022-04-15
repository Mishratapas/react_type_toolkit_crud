import {
  useGetPostQuery,
  IPost,
  useAddPostMutation,
} from '../services/getPostApi'

import { ListGroup } from 'react-bootstrap'
import { useEffect, useState } from 'react'

const Post = () => {
  const [post, setPost] = useState('')
  const [totalPost, setTotalPost] = useState<IPost[]>([])
  const { data = [], isLoading } = useGetPostQuery(undefined, {
    // pollingInterval: 2000,
    skip: false,
  })
  const [addPost] = useAddPostMutation()

  useEffect(() => {
    setTotalPost(data)
  }, [data])

  const handleAddPost = async () => {
    const p: IPost = {
      userId: Math.random(),
      id: Math.random(),
      title: post,
      body: post,
    }
    await addPost(p)
    setTotalPost([p, ...totalPost])
  }

  return (
    <div>
      Post Comments
      <div>
        <input
          type='text'
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <button onClick={handleAddPost}>Add Post</button>
      </div>
      <div>
        {isLoading
          ? 'loading'
          : data &&
            data.map((d) => (
              <ListGroup key={d.id}>
                <ListGroup.Item>{d.title}</ListGroup.Item>
              </ListGroup>
            ))}
      </div>
    </div>
  )
}

export default Post
