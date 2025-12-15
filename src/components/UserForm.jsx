import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import './UserForm.css';

const UserForm = ({ username, onInputChange, onSearch, onReset }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch();
    };

    return (
        <div className="user-form">
            <h2>Unesite GitHub korisničko ime</h2>

            <form onSubmit={handleSubmit} className="github-form">
                <div className="input-wrapper">
                    <div className="input-icon">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <input
                        type="text"
                        value={username}
                        onChange={onInputChange}
                        className="github-input"
                        autoFocus
                    />
                </div>

                <div className="button-group">
                    <button
                        type="submit"
                        className="search-btn"
                        disabled={!username.trim()}
                    >
                        <FontAwesomeIcon icon={faSearch} className="btn-icon" />
                        Pretraži korisnike
                    </button>

                    <button
                        type="button"
                        onClick={onReset}
                        className="reset-btn"
                    >
                        <FontAwesomeIcon icon={faSyncAlt} className="btn-icon" />
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

UserForm.propTypes = {
    username: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
};

export default UserForm;