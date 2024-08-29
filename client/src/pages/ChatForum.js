import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaMap, FaBell, FaTable, FaFont, FaLifeRing, FaSearch } from 'react-icons/fa';
import './ChatForum.css';
import './Dashboard.css'; // Import Dashboard styles for consistency

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
    // Add more posts here if needed
  ]);

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

    fetchUserData();
  }, []);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleAddPost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      const newPost = {
        id: posts.length + 1,
        user: {
          name: userName || 'Anonymous',
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

  const handleAddComment = (postId) => {
    if (newComment.trim()) {
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          const addReply = (comments, parentId) => {
            return comments.map(comment => {
              if (comment.id === parentId) {
                return {
                  ...comment,
                  replies: [
                    ...comment.replies,
                    {
                      id: comment.replies.length + 1,
                      user: userName || 'Anonymous',
                      text: newComment,
                      replies: [],
                    },
                  ],
                };
              } else if (comment.replies.length > 0) {
                return {
                  ...comment,
                  replies: addReply(comment.replies, parentId),
                };
              }
              return comment;
            });
          };

          if (replyToCommentId === null) {
            // Adding a new top-level comment
            post.comments.push({
              id: post.comments.length + 1,
              user: userName || 'Anonymous',
              text: newComment,
              replies: [],
            });
          } else {
            // Adding a reply to an existing comment
            post.comments = addReply(post.comments, replyToCommentId);
          }
        }
        return post;
      });

      setPosts(updatedPosts);
      setNewComment('');
      setReplyToCommentId(null);  // Reset reply mode after adding the reply
    }
  };

  const renderComments = (comments, postId) => {
    return comments.map((comment) => (
      <div key={comment.id} className="comment">
        <div className="comment-header">
          <strong>{comment.user}</strong>
        </div>
        <p>{comment.text}</p>
        <button 
          className="reply-button"
          onClick={() => setReplyToCommentId(comment.id)}
        >
          Reply
        </button>
        {comment.replies.length > 0 && (
          <div className="replies">
            {renderComments(comment.replies, postId)}
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
          {showSearch && <input type="text" className="search-bar" placeholder="Search..." />}
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
            <li><Link className='link' to="/chatforum"> ChatForum</Link></li>

  
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
            {posts.map((post) => (
              <li key={post.id} className="post">
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
                      onClick={() => handleLike(post.id)}
                    >
                      Like {post.likes}
                    </button>
                    <button 
                      className="comment-button" 
                      onClick={() => handleAddComment(post.id)}
                    >
                      {replyToCommentId ? "Reply" : "Comment"}
                    </button>
                  </div>
                </div>
                <div className="comments-section">
                  {renderComments(post.comments, post.id)}
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