import './App.css';
import { useState } from 'react';
import Comment from './components/Comment';
import AddComment from './components/AddComment';

function App() {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  const addComment = () => {
    if (commentText.length > 0) {
      const comment = {
        createdAt: new Date(),
        content: commentText,
        id: Math.floor(Math.random() * 10000),
        childrens: [],
        parentId: null
      };
      setComments([...comments, comment]);
      setCommentText('');
    }
  };

  function fn(arr, id) {
    return arr
      .filter(el => el.id !== id)
      .map(el => {
        if (!el.childrens || !Array.isArray(el.childrens)) return el;
        el.childrens = fn(el.childrens, id);
        return el;
      });
  }

  const deleteComment = id => {
    const filteredComments = fn(comments, id);
    setComments(filteredComments);
  };

  return (
    <>
      <div className="App">
        <h1>Comment Widget</h1>
        <AddComment
          commentText={commentText}
          setCommentText={setCommentText}
          addComment={addComment}
          text={'ADD'}
        />
      </div>
      <div id="displayComments">
        <Comment comments={comments} deleteComment={deleteComment} />
      </div>
    </>
  );
}

export default App;
