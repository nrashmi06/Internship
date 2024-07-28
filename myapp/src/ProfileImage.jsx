import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { updateProfileImage, updateCommentsProfileImage } from './Api';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './ProfileImage.css';

const ProfileImage = ({ profileImage, setProfileImage, setUpdateMessage, setUpdateError }) => {
    const [file, setFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [preview, setPreview] = useState('');

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setShowModal(true);  // Show the modal when a file is selected
            };
            reader.readAsDataURL(file);
        } else {
            setPreview('');
        }
    }, [file]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = async () => {
        try {
            let formData = new FormData();
            if (file) {
                formData.append('profileImage', file);
            } else {
                throw new Error('Please upload an image file.');
            }

            const data = await updateProfileImage(formData);
            setUpdateMessage('Profile image updated successfully');
            setProfileImage(data.profileImage);
            await updateCommentsProfileImage(data.profileImage); // Update comments with new profile image
            handleCloseModal();
        } catch (error) {
            console.error('Error updating profile image:', error.message);
            setUpdateError('Failed to update profile image');
            handleCloseModal();
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
            <div>
                <label htmlFor="file-upload" className="camera-icon-label">
                    <i className="bi bi-camera camera-icon"></i>
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </div>

            <Modal show={showModal} onHide={handleCloseModal} dialogClassName="modal-50vh-50vw">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {preview ? (
                        <div>
                            <img src={preview} alt="Preview" className="img-preview" />
                            <p>Are you sure you want to update your profile image?</p>
                        </div>
                    ) : (
                        <p>No image selected.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProfileImage;
