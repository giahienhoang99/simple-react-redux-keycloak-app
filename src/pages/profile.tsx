import React from 'react';

interface ProfileProps {
    user: any;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <p>Username: {user.profile.preferred_username}</p>
            <p>Email: {user.profile.email}</p>
            <p>Access token:</p>
            <p>:</p>
        </div>
    );
};

export default Profile;
