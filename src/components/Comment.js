import { useState } from 'react';
import AddComment from './AddComment';
import '../App.css';

const Comment = ({ comments, deleteComment, childrens = false }) => {
  const [parentID, setEdit] = useState(-1);
  const [commentText, setCommentText] = useState('');

  const replyComment = () => {
    setEdit(-1);
    setCommentText('');
    if (commentText.length > 0) {
      const comt = {
        createdAt: new Date(),
        content: commentText,
        id: Math.floor(Math.random() * 10000),
        childrens: [],
        parentId: parentID
      };
      const commentChildrens = comments.find(comment => comment.id === parentID).childrens;
      comments.find(comment => comment.id === parentID).childrens = [...commentChildrens, comt];
    }
  };

  return (
    <>
      {comments &&
        comments.map((comment, index) => {
          return (
            <div key={index} style={{ marginLeft: childrens ? '3rem' : '0rem', marginTop: '1rem' }}>
              {comment.content}
              <button type="button" onClick={event => deleteComment(comment.id)}>
                DELETE
              </button>
              <button
                type="button"
                onClick={event => {
                  setEdit(comment.id);
                }}
              >
                REPLY
              </button>
              <br />
              {comment.childrens.length > 0 ? (
                <Comment
                  comments={comment.childrens}
                  deleteComment={deleteComment}
                  childrens={true}
                />
              ) : null}
              {comment.id === parentID && (
                <AddComment
                  commentText={commentText}
                  setCommentText={setCommentText}
                  addComment={replyComment}
                  text={'REPLY'}
                />
              )}
            </div>
          );
        })}
    </>
  );
};
export default Comment;
