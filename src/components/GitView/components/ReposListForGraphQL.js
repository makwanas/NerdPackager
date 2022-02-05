import React from 'react';

export default function ReposList({ repos }) {
  return (
    <div>
      {repos.map(repo => (
        <div key={repo.id}>
          <a href={repo.url}><h2>{repo.name}</h2></a>
          <ul>
            {repo.issues && repo.issues.nodes ? (
              repo.issues.nodes.map(issue => (
                <li key={issue.id}>
                  <a href={issue.url}>{issue.title}</a> &ndash; {issue.createdAt}
                </li>
              ))
            ) : <li>No issues</li>}
          </ul>
        </div>
      ))}
    </div>
  );
}
