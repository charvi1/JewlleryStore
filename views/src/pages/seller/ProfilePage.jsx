import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './profile.css';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [location, setLocation] = useState('');
    const [alternatePhone, setAlternatePhone] = useState('');
    const [hintName, setHintName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const res = await axios.get('http://localhost:5000/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(res.data);
                setName(res.data.UserName);
                setPhoneNumber(res.data.PhoneNumber || '');
                setGender(res.data.Gender || '');
                setDob(res.data.DOB || '');
                setLocation(res.data.Location || '');
                setAlternatePhone(res.data.AlternatePhone || '');
                setHintName(res.data.HintName || '');
            } catch (err) {
                console.error('Error fetching user profile:', err);
                setError('Could not fetch profile.');
                navigate('/login');
            }
        };

        fetchUserProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSaveProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/login');
        return;
    }

    try {
        const updatedData = {
            UserName: name,
            PhoneNumber: phoneNumber,
            Gender: gender,
            DOB: dob,
            Location: location,
            AlternatePhone: alternatePhone,
            HintName: hintName,
        };

        const res = await axios.patch('http://localhost:5000/api/users/me', updatedData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('PATCH response:', res.data);

        if (res.status === 200) {
            setUser(prevUser => ({
                ...prevUser,
                ...updatedData
            }));
            setIsEditing(false);
            alert('Profile updated successfully!');
        } else {
            throw new Error('Failed to update profile');
        }
    } catch (err) {
        console.error('Failed to save profile:', err);
        setError(err.response?.data?.message || 'Could not save profile. Please try again.');
    }
};


    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('email', user.EmailId);

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:5000/api/users/setPhoto', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            if (res.data.success) {
                setUser(prevUser => ({
                    ...prevUser,
                    URL: res.data.updatedUser.URL
                }));
                alert('Profile picture updated successfully!');
            } else {
                throw new Error(res.data.message || 'Failed to upload photo');
            }
        } catch (err) {
            console.error('Error uploading photo:', err);
            alert(err.response?.data?.message || 'Failed to upload photo. Please try again.');
        }
    };

    if (error) return <div className="profile-error-message">{error}</div>;
    if (!user) return <div>Loading...</div>;

    return (
        <main className="profile-main">
            <div className="profile-container">
                <div className="profile-header">
                    <div
                        className="profile-image"
                        style={{
                            backgroundImage: `url(${user.URL || '/images/profile-placeholder.png'})`,
                        }}
                    ></div>
                    <div className="profile-username">Hello, {user.UserName}</div>
                    <div className="MulterPhoto">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            id="file-upload"
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="file-upload" className="profile-upload-button">Add Profile Picture </label>
                        <button onClick={handleUpload} className="upload-button-profile">
                            Upload
                        </button>
                    </div>
                </div>
                <div className="profile-details">
                    <p><strong className="profile-details-fontFamily">Full Name :</strong> {isEditing ? <input value={name} onChange={(e) => setName(e.target.value)} /> : user.UserName}</p>
                    <p><strong className="profile-details-fontFamily">Mobile Number :</strong> {isEditing ? <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} /> : (user.PhoneNumber || '- not added -')}</p>
                    <p><strong className="profile-details-fontFamily">Email ID :</strong> {user.EmailId}</p>
                    <p><strong className="profile-details-fontFamily">Gender :</strong> {isEditing ? (
                        <select value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="non-binary">Non-binary</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                    ) : (
                        gender || '- not added -'
                    )}</p>
                    <p><strong className="profile-details-fontFamily">Date of Birth :</strong> {isEditing ? <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} /> : (dob || '- not added -')}</p>
                    <p><strong className="profile-details-fontFamily">Location :</strong> {isEditing ? <input value={location} onChange={(e) => setLocation(e.target.value)} /> : (location || '- not added -')}</p>
                    <p><strong className="profile-details-fontFamily">Alternate Mobile :</strong> {isEditing ? <input value={alternatePhone} onChange={(e) => setAlternatePhone(e.target.value)} /> : (alternatePhone || '- not added -')}</p>

                    {!isEditing ? (
                        <div className="edit-button-profile" onClick={handleEdit}>EDIT</div>
                    ) : (
                        <>
                            <div className="profile-save-button" onClick={handleSaveProfile}>Save</div>
                            <div className="profile-cancel-button" onClick={() => setIsEditing(false)}>Cancel</div>
                        </>
                    )}
                </div>

                
            </div>
        </main>
    );
};

export default ProfilePage;
