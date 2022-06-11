const AddComment = ({ commentText, setCommentText, addComment, text }) => {
  return (
    <>
      <input
        type="text"
        placeholder="Enter a comment"
        value={commentText}
        onChange={event => setCommentText(event.target.value)}
      />

      <button id="addComment" onClick={addComment} disabled={commentText === ''}>
        {text === 'ADD' ? 'ADD COMMENT' : 'REPLY'}
      </button>
    </>
  );
};
export default AddComment;
