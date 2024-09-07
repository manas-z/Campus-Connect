import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import SearchBar from './SearchBar';
import Comment from './Comment';
import useNode from '../hooks/useNode';  // Import the custom hook
import './ChatForum.css';
import './Dashboard.css';

const ChatForum = () => {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [commentsData, setCommentsData] = useState({ id: 1, items: [] });
  const [postComments, setPostComments] = useState({});

  const { insertNode, editNode, deleteNode } = useNode();

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

    const handleAddPost = async () => {
      if (newPostTitle.trim() && newPostContent.trim()) {
        const post = {
          title: newPostTitle,
          user: {
            name: userName || 'Anonymous',
            year: 'None',
            profileLogo: profileImage || 'default-profile-logo-url',
          },
          content: newPostContent,
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
            // Add new post to the beginning of the posts array
            setPosts([newPost, ...posts]);
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
    



  const handleInsertNode = (commentId, text) => {
    const updatedTree = insertNode(commentsData, commentId, text);
    setCommentsData(updatedTree);
  };

  const handleEditNode = (commentId, text) => {
    const updatedTree = editNode(commentsData, commentId, text);
    setCommentsData(updatedTree);
  };

  const handleDeleteNode = (commentId) => {
    const updatedTree = deleteNode(commentsData, commentId);
    setCommentsData(updatedTree);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="chat-forum-page">
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

      <div className="content">
        <div className="sidebar">
          <h2>Navigation</h2>
          <ul>
            <li><Link className='link' to='/dashboardpage'>Dashboard</Link></li>
            <li><Link className='link' to="/chatforum">ChatForum</Link></li>
          </ul>
        </div>

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

                <div className="comments-section">
                  <Comment
                    handleInsertNode={handleInsertNode}
                    handleEditNode={handleEditNode}
                    handleDeleteNode={handleDeleteNode}
                    comment={commentsData}
                  />
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
