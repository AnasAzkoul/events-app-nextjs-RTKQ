import { useState, useEffect } from 'react';

import {
  useAddCommentMutation,
  useGetCommentsQuery,
} from '../../services/events';
import { useDispatch } from 'react-redux';
import {
  openNotification,
  closeNotification,
  setNotificationSettings,
} from '../../app/features/notification/notification.slice';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;
  const [showComments, setShowComments] = useState(false);
  const [addComment, result] = useAddCommentMutation();
  const {
    data: comments,
    isLoading,
    isError,
    error,
    isSuccess,
    isUninitialized,
    refetch,
  } = useGetCommentsQuery(eventId, {
    skip: !showComments,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  const dispatch = useDispatch();

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // Send post req to api

    addComment({ id: eventId, ...commentData })
      .unwrap()
      .then((fulfilled) => {
        dispatch(openNotification());
        dispatch(
          setNotificationSettings({
            title: 'success',
            message: 'Thank you for commenting',
            status: 'success',
          })
        );

        setTimeout(() => {
          dispatch(closeNotification());
          dispatch(
            setNotificationSettings({
              title: '',
              message: '',
              status: '',
            })
          );
        }, 3000);
      })
      .catch((rejected) => console.error(rejected));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
