import { Component } from 'react';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import UserForm from './components/UserForm';
import UserDetails from './components/UserDetails';
import './App.css';

library.add(fas, fab);

class App extends Component {
  state = {
    username: '',
    user: null,
    repos: [],
    loading: false,
  };

  handleInputChange = (e) => {
    this.setState({ username: e.target.value });
  };

  fetchUserData = async () => {
    const { username } = this.state;
    if (!username.trim()) return;

    this.setState({ loading: true });

    try {
      const userRes = await axios.get(`https://api.github.com/users/${username}`);
      const reposRes = await axios.get(`https://api.github.com/users/${username}/repos`);

      this.setState({
        user: userRes.data,
        repos: reposRes.data,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ loading: false });
    }
  };

  handleReset = () => {
    this.setState({
      username: '',
      user: null,
      repos: [],
    });
  };

  render() {
    const { username, user, repos, loading } = this.state;

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

export default App;