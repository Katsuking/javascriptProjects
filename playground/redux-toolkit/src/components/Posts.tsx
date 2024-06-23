import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getPostById, getPosts } from '../redux/features/post/postSlice';
import { useEffect } from 'react';

const Posts = () => {
  const post = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPosts());
  }, []);
  return (
    <>
      <div>{post.post.id !== 0 ? JSON.stringify(post.post) : null}</div>
      <div>
        {post.post.id === 0 ? (
          post.posts.map((item) => (
            <div key={item.id}>
              {item.title}
              <button onClick={() => dispatch(getPostById(item.id))}>
                detail
              </button>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Posts;
