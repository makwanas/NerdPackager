import { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';

export default function useUserReposWithIssues(login, token) {
  const [ user, setUser ] = useState({});
  const [ repos, setRepos ] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setUser({});
      setRepos([]);
      
      /*
       * First, fetch data for the specified user.
       */
      const userRes = await fetch(
        `https://api.github.com/users/${login}`,
        { headers: { Authorization: `token ${token}` } }
      );
      const userResBody = await userRes.json();
      setUser(userResBody);

      /*
       * Next, fetch a list of repos for the specified user.
       */
      const reposRes = await fetch(
        `https://api.github.com/users/${login}/repos?sort=updated`,
        { headers: { Authorization: `token ${token}` } }
      );
      const reposResBody = await reposRes.json();

      /*
       * Finally, truncate the array of repos down to 10, and fetch issues for
       * each repo.  Truncate each array of issues down to 3.
       */
      const reposWithIssues = await Promise.all(reposResBody.slice(0, 10).map(async repo => {
        const issuesRes = await fetch(
          repo.issues_url.replace("{/number}", ""),
          { headers: { Authorization: `token ${token}` } }
        );
        const issuesResBody = await issuesRes.json();
        repo.issues = issuesResBody.slice(0, 3);
        return repo;
      }));
      setRepos(reposWithIssues);
    }
    if (token && login) {
      fetchData();
    }
  }, [ login, token ]);

  return { user, repos };
}
