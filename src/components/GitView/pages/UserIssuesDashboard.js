import React from 'react';

import useUserReposWithIssues from '../hooks/useUserReposWithIssues';
import UserHeader from '../components/UserHeader';
import ReposList from '../components/ReposList';

/*
 * Caution!!!  This is not a safe way to incorporate an authentication token
 * into your app.  The token will be readable by anyone who runs the code.
 * We're doing it this way for ease of demonstration only.
 */
const token = process.env.REACT_APP_NOT_SECRET_GITHUB_TOKEN;
const login = 'octocat';

export default function UserIssuesDashboard() {
  const { user, repos } = useUserReposWithIssues(login, token);
  return (
    <div>
      {token ? (
        <>
          {user.name ? <UserHeader login={login} user={user} /> : <p>Loading user...</p>}
          {repos.length ? <ReposList repos={repos} /> : <p>Loading repos...</p>}
        </>
      ) : (
        <p>
          Rerun with a valid <a href="https://help.github.com/articles/creating-an-access-token-for-command-line-use/">GitHub OAuth Token</a> set in the environment variable <code>REACT_APP_NOT_SECRET_GITHUB_TOKEN</code>
        </p>
      )}
    </div>
  );
}
