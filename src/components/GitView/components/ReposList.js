import React from 'react';

export default function ReposList({ repos }) {
  return (
    <div>
      {repos.map(repo => (
        <div key={repo.id}>
          <a href={repo.html_url}><h2>{repo.name}</h2></a>
          <ul>
            {repo.issues.length ? (
              repo.issues.map(issue => (
                <li key={issue.id}>
                  <a href={issue.html_url}>{issue.title}</a> &ndash; {issue.created_at}
                </li>
              ))
            ) : <li>No issues</li>}
          </ul>
        </div>
      ))}
    </div>
  );
}
