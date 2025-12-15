import PropTypes from 'prop-types';
import './RepoList.css';

const RepoList = ({ repos }) => {
    return (
        <ul className="repo-list">
            {repos.map((repo) => (
                <li key={repo.id} className="repo-item">
                    <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="repo-link"
                    >
                        {repo.name}
                    </a>
                </li>
            ))}
        </ul>
    );
};

RepoList.propTypes = {
    repos: PropTypes.array.isRequired,
};

export default RepoList;