// Comment.js
import React from 'react';

const Comment = ({ comment, userProfile, onDelete }) => {
    const isUserComment = comment.userId === userProfile._id;

    return (
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
            {isUserComment && (
                <i
                    className="bi bi-trash comment-section-delete-icon"
                    onClick={() => onDelete(comment._id)}
                    title="Delete Comment"
                ></i>
            )}
        </li>
    );
};

export default Comment;
