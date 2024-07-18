import React, { useState } from 'react';
import { getLocalStorageItem } from './LocalStorage';
import { Button, Form } from 'react-bootstrap';
import './ProfileImage.css';

const ProfileImage = ({ profileImage, setProfileImage, setUpdateMessage, setUpdateError }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = getLocalStorageItem('token');

            if (!token) {
                throw new Error('No token found. Please login.');
            }

            let formData = new FormData();
            if (file) {
                formData.append('profileImage', file);
            } else {
                throw new Error('Please upload an image file.');
            }

            const response = await fetch('/api/users/profile/image', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setUpdateMessage('Profile image updated successfully');
            setProfileImage(data.profileImage);
        } catch (error) {
            console.error('Error updating profile image:', error.message);
            setUpdateError('Failed to update profile image');
        }
    };

    return (
        <div className="profile-image">
            {profileImage ? (
                <div className="profile-image-container">
                    <img src={`/${profileImage}`} alt="Profile" className="profile-image-img" />
                </div>
            ) : (
                <div className="no-image">No profile image available</div>
            )}
            <Form onSubmit={handleSubmit} className="profile-image-form">
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update Profile Image
                </Button>
            </Form>
        </div>
    );
};

export default ProfileImage;
