import { Component } from 'react';
import { connect } from 'react-redux';
import { setUsername, resetUser, fetchUserData } from './store/userSlice';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import UserForm from './components/UserForm';
import UserDetails from './components/UserDetails';
import './App.css';

library.add(fas, fab);

class App extends Component {
  handleInputChange = (e) => {
    this.props.setUsername(e.target.value);
  };

  fetchUserData = () => {
    const { username, fetchUserData } = this.props;
    if (username.trim()) {
      fetchUserData(username);
    }
  };

  handleReset = () => {
    this.props.resetUser();
  };

  render() {
    const { username, user, repos, loading } = this.props;

    return (
      <div className="container">
        <h1>Pretraga GitHub korisnika</h1>

        <div className="form-container">
          <UserForm
            username={username}
            onInputChange={this.handleInputChange}
            onSearch={this.fetchUserData}
            onReset={this.handleReset}
          />
        </div>

        {loading && <p className="loading">Učitavanje...</p>}

        {user && (
          <div className="user-details">
            <UserDetails user={user} repos={repos} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.user.username,
  user: state.user.user,
  repos: state.user.repos,
  loading: state.user.loading,
});

const mapDispatchToProps = {
  setUsername,
  resetUser,
  fetchUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);