import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import SearchBar from './SearchBar';
import './ChatForum.css';
import './Dashboard.css'; // Import Dashboard styles for consistency

// Function to generate unique IDs
const generateUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);

const ChatForum = () => {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newComment, setNewComment] = useState('');
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem('userEmail');
      if (!email) return;

      try {
        const response = await fetch(`http://localhost:5000/user-info?email=${email}`);
        const data = await response.json();
        if (response.ok) {
          setUserName(data.name);
          setProfileImage(data.profileImage);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/posts');
        const data = await response.json();
        if (response.ok) {
          setPosts(data);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };

    
    fetchUserData();
    fetchPosts();
  }, []);
  
  const handleSearchResults = (results) => {
    setSearchResults(results);
    }

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleAddPost = async () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      const post = {
        title: newPostTitle,
        user: {
          name: userName || 'Anonymous',
          year: '1st',
          profileLogo: profileImage || 'default-profile-logo-url',
        },
        content: newPostContent,
        comments: [], // Initialize comments as an empty array
      };

      try {
        const response = await fetch('http://localhost:5000/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post),
        });
        const newPost = await response.json();
        if (response.ok) {
          setPosts([...posts, newPost]);
          setNewPostTitle('');
          setNewPostContent('');
        } else {
          console.error(newPost.error);
        }
      } catch (err) {
        console.error('Error adding post:', err);
      }
    }
  };

  const handleLike = async (postId) => {
    const updatedPosts = posts.map(post => 
      post._id === postId ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post
    );

    setPosts(updatedPosts);

    try {
      await fetch(`http://localhost:5000/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ liked: updatedPosts.find(post => post._id === postId).liked }),
      });
    } catch (err) {
      console.error('Error updating like:', err);
    }
  };

  const handleAddComment = async (postId) => {
    if (newComment.trim()) {
      try {
        const response = await fetch(`http://localhost:5000/posts/${postId}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: userName || 'Anonymous',
            text: newComment,
          }),
        });

        const newCommentResponse = await response.json();
        if (response.ok) {
          const updatedPosts = posts.map(post => {
            if (post._id === postId) {
              if (replyToCommentId === null) {
                post.comments.push(newCommentResponse);
              } else {
                const addReply = (comments, parentId) => {
                  return comments.map(comment => {
                    if (comment._id === parentId) {
                      return {
                        ...comment,
                        replies: [
                          ...comment.replies,
                          newCommentResponse,
                        ],
                      };
                    } else if (comment.replies && comment.replies.length > 0) {
                      return {
                        ...comment,
                        replies: addReply(comment.replies, parentId),
                      };
                    }
                    return comment;
                  });
                };
                post.comments = addReply(post.comments, replyToCommentId);
              }
            }
            return post;
          });

          setPosts(updatedPosts);
          setNewComment('');
          setReplyToCommentId(null);  // Reset reply mode after adding the reply
        } else {
          console.error(newCommentResponse.error);
        }
      } catch (err) {
        console.error('Error adding comment:', err);
      }
    }
  };

  const renderComments = (comments) => {
    return comments.map((comment) => (
      <div key={comment._id} className="comment">
        <div className="comment-header">
          <strong>{comment.user}</strong>
        </div>
        <p>{comment.text}</p>
        <button 
          className="reply-button"
          onClick={() => setReplyToCommentId(comment._id)}
        >
          Reply
        </button>
        {/* Ensure replies exist before accessing them */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="replies">
            {renderComments(comment.replies)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="chat-forum-page">
      {/* Header with Navbar */}
      <header className="header">
        <div className="logo">DASHBOARD</div>
        <div className="user-search">
          {/* SearchBar Component */}
          {showSearch && <SearchBar onSearchResults={handleSearchResults} />}
          <FaSearch className="icon" onClick={toggleSearch} />
          <div className="user-profile" onClick={toggleDropdown}>
            <img src={profileImage} alt="Profile" className="profile-image" />
            <span className="user-name">{userName}</span>
            {showDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-item">See Profile</div>
                <div className="dropdown-item">Edit Profile</div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className="content">
        <div className="sidebar">
          <h2>Navigation</h2>
          <ul>
            <li><Link className='link' to='/dashboardpage'>Dashboard</Link></li>
            <li><Link className='link' to="/chatforum">ChatForum</Link></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content">
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

          <ul className="posts-list">
            {/* Display posts based on search results */}
            {(searchResults.length > 0 ? searchResults : posts).map((post) => (
              <li key={post._id} className="post">
                <div className="post-header">
                  <div className="profile">
                    <img src={post.user.profileLogo} alt="Profile" className="profile-logo" />
                    <div className="profile-info">
                      <h3>{post.user.name}</h3>
                      <p>Year: {post.user.year}</p>
                    </div>
                  </div>
                </div>
                <div className="post-content">
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                </div>
                <div className="post-actions">
                  <textarea
                    className="comment-input"
                    placeholder={replyToCommentId ? "Reply to comment" : "Add a comment"}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <div className="action-buttons">
                    <button 
                      className={`like-button ${post.liked ? 'liked' : ''}`} 
                      onClick={() => handleLike(post._id)}
                    >
                      Like {post.likes}
                    </button>
                    <button 
                      className="comment-button" 
                      onClick={() => handleAddComment(post._id)}
                    >
                      {replyToCommentId ? "Reply" : "Comment"}
                    </button>
                  </div>
                </div>
                <div className="comments-section">
                  {renderComments(post.comments)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatForum;