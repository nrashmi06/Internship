import React, { useState, useEffect } from 'react';
import { fetchComments, postComment, deleteComment } from './Api';
import { getLocalStorageItem } from './LocalStorage';
import './commentSection.css';

const CommentSection = ({ mealId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState(null);
    const [profileImage, setProfileImage] = useState('');

    console.log('userProfile:', getLocalStorageItem('userProfile'));
    const userProfile = JSON.parse(getLocalStorageItem('userProfile')) || {};
    console.log('userProfile:', userProfile);
    const token = getLocalStorageItem('token');

    useEffect(() => {
        setProfileImage(userProfile.profileImage);

        const fetchCommentsData = async () => {
            try {
                const responseData = await fetchComments(mealId, token); 
                if (Array.isArray(responseData)) {
                    const sortedComments = responseData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setComments(sortedComments);
                } else {
                    setComments([]);
                }
                setError(null);
            } catch (err) {
                console.error('Error fetching comments:', err);
                setError('Error fetching comments');
                setComments([]);
            }
        };

        fetchCommentsData();
    }, [mealId, userProfile.profileImage, token]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) {
            setError('Comment text is required');
            return;
        }

        try {
            const responseData = await postComment(mealId, newComment, userProfile.name, profileImage, token); 
            setComments(prevComments => [...prevComments, responseData]);
            setNewComment('');
            setError(null);
        } catch (err) {
            console.error('Error posting comment:', err);
            setError('Error posting comment');
        }
    };

    const handleCommentDelete = async (commentId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            try {
                await deleteComment(commentId, token); 
                setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
            } catch (err) {
                console.error('Error deleting comment:', err);
                setError('Error deleting comment');
            }
        }
    };

    return (
        <div className="comment-section-container">
            <h2>Comments</h2>
            {error && <p className="comment-section-error-message">{error}</p>}
            <form onSubmit={handleCommentSubmit} className="comment-section-form">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="comment-section-input"
                />
                <button type="submit" className="comment-section-button">Post Comment</button>
            </form>
            <ul className="comment-section-list">
                {comments.length === 0 ? (
                    <p>No comments yet</p>
                ) : (
                    comments.map(comment => (
                        <li key={comment._id} className="comment-section-item">
                            <img 
                                src={`http://localhost:3000/${comment.profileImage}`} 
                                alt={comment.name} 
                                className="comment-section-profile-image" 
                            />
                            <div className="comment-section-content">
                                <p className="comment-section-author"><strong>{comment.name}</strong></p>
                                <p className="comment-section-text">{comment.text}</p>
                                <p className="comment-section-timestamp">
                                    {new Date(comment.createdAt).toLocaleString()}
                                </p>
                            </div>
                            {String(comment.userId) === String(userProfile._id) && (
                                <i
                                    className="bi bi-trash"
                                    onClick={() => handleCommentDelete(comment._id)}
                                    style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}
                                    title="Delete Comment"
                                ></i>
                            )}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default CommentSection;
