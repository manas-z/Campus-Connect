import React, { useState } from 'react';
import './ChatForum.css';

const ChatForum = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'Karisma',
        year: '2nd',
        profileLogo: 'profile-url',
      },
      title: 'What is BDT',
      content: 'Big Data Technologies. But that doesn’t make sense so let’s simplify the things ...',
      likes: 0,
      liked: false,
      comments: [],
    },
    {
      id: 2,
      user: {
        name: 'Kareem',
        year: '3rd',
        profileLogo: 'profile-url',
      },
      title: 'React is amazing!',
      content: 'What do you think about React?',
      likes: 0,
      liked: false,
      comments: [],
    },
    {
      id: 3,
      user: {
        name: 'Harish',
        year: '3rd',
        profileLogo: 'profile-url',
      },
      title: 'Internship',
      content: 'I recently completed an internship on AI/ML and it has been helpful ....',
      likes: 0,
      liked: false,
      comments: [],
    },
  ]);

  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  const handleAddPost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      const newPost = {
        id: posts.length + 1,
        user: {
          name: 'Your Name',
          year: '1st',
          profileLogo: 'your-profile-logo-url',
        },
        title: newPostTitle,
        content: newPostContent,
        likes: 0,
        liked: false,
        comments: [],
      };
      setPosts([...posts, newPost]);
      setNewPostTitle('');
      setNewPostContent('');
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post
    ));
  };

  const handleComment = (postId, comment) => {
    if (comment.trim()) {
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
      ));
    }
  };

  return (
    <div className="chat-forum">
      <div className="new-post">
        <input
          type="text"
          placeholder="Post Title"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <textarea
          placeholder="Post Content"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <button onClick={handleAddPost}>Create Forum</button>
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="post">
            <div className="profile">
              <img src={post.user.profileLogo} alt="Profile" className="profile-logo" />
              <div className="profile-info">
                <h3>{post.user.name}</h3>
                <p>Year: {post.user.year}</p>
              </div>
              <button className="connect-button">Connect</button>
            </div>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div className="post-buttons">
              <button 
                className={`like-button ${post.liked ? 'liked' : ''}`} 
                onClick={() => handleLike(post.id)}
              >
                Like {post.likes}
              </button>
              <button 
                className="comment-button" 
                onClick={() => {
                  const comment = prompt("Enter your comment:");
                  handleComment(post.id, comment);
                }}
              >
                Comment
              </button>
            </div>
            {post.comments.length > 0 && (
              <div className="comments">
                <h4>Comments:</h4>
                <ul>
                  {post.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatForum;