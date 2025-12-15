import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RepoList from './RepoList';
import './UserDetails.css';

class UserDetails extends Component {
    render() {
        const { user, repos } = this.props;

        if (!user) return null;

        return (
            <div>
                <img src={user.avatar_url} alt={user.name} width="100" />
                <h2>{user.name}</h2>
                <p><strong>Lokacija:</strong> {user.location || 'Not specified'}</p>
                <p><strong>Bio:</strong> {user.bio || 'No bio available'}</p>

                <RepoList repos={repos} />
            </div>
        );
    }
}

UserDetails.propTypes = {
    user: PropTypes.object,
    repos: PropTypes.array.isRequired,
};

export default UserDetails;