import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostWidget from '../post-widget';
import { GET_POSTS } from '../../../apis/PostApi';
import { GET_USER_POSTS } from '../../../apis/UserApi';
import { StateType } from '../../../state/StateType';
import { setPosts } from '../../../state';

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state: StateType) => state.posts);
  const token = useSelector((state: StateType) => state.token);

  const getPosts = async () => {
    const data = await GET_POSTS(token);
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const data = await GET_USER_POSTS(userId, token);
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts().then();
    } else {
      getPosts().then();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
