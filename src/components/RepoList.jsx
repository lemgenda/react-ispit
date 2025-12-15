import PropTypes from 'prop-types';

const RepoList = ({ repos }) => {
    return (
        <ul>
            {repos.map((repo) => (
                <li key={repo.id}>{repo.name}</li>
            ))}
        </ul>
    );
};

RepoList.propTypes = {
    repos: PropTypes.array.isRequired,
};

export default RepoList;