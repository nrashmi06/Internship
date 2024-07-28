import React, { useEffect, useState } from 'react';
import { getLocalStorageItem } from './LocalStorage';
import { Alert, Card } from 'react-bootstrap';
import ProfileImage from './ProfileImage';
import './Profile.css';
import { getProfile } from './Api';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');
    const [updateError, setUpdateError] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                // const token = getLocalStorageItem('accessToken');

                // if (!token) {
                //     throw new Error('No token found. Please login.');
                // }

                const data = await getProfile();
                setUser(data);
                setProfileImage(data.profileImage);
            } catch (error) {
                console.error('Error fetching user details:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    useEffect(() => {
        const clearMessages = () => {
            const timeout = setTimeout(() => {
                setUpdateMessage('');
                setUpdateError('');
            }, 2000);

            return () => clearTimeout(timeout);
        };

        clearMessages();
    }, [updateMessage, updateError]);

    const handleUpdateMessageClose = () => setUpdateMessage('');
    const handleUpdateErrorClose = () => setUpdateError('');

    if (loading) {
        return <div className="profile-container"><div className="loading">Loading...</div></div>;
    }

    if (error) {
        return <div className="profile-container"><Alert variant="danger">{error}</Alert></div>;
    }

    if (!user) {
        return <div className="profile-container"><Alert variant="warning">No user details available.</Alert></div>;
    }

    return (
        <div className="profile-container">
            {updateMessage && <Alert variant="success" onClose={handleUpdateMessageClose} dismissible>{updateMessage}</Alert>}
            <div className="profile-wrapper">
                <h1>Profile</h1>
                <ProfileImage
                    profileImage={profileImage}
                    setProfileImage={setProfileImage}
                    setUpdateMessage={setUpdateMessage}
                    setUpdateError={setUpdateError}
                />
                <Card className="profile-card">
                    <Card.Body>
                        <Card.Text>
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Phone:</strong> {user.mobile_number}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <div className="update-messages">
                    {updateError && <Alert variant="danger" onClose={handleUpdateErrorClose} dismissible>{updateError}</Alert>}
                </div>
            </div>
        </div>
    );
};

export default Profile;
