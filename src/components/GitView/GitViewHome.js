import React from 'react';

// import UserIssuesDashboard from './pages/UserIssuesDashboard';
import UserIssuesDashboard from './pages/UserIssuesDashboardWithGraphQL';

function GitViewHome() {
  return <div>
      <h1>Github user dashboard</h1>
      <UserIssuesDashboard />      
  </div>;
}

export default GitViewHome;
