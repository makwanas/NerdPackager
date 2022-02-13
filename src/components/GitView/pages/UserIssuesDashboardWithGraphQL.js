/** @jsxImportSource @emotion/react */


import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import UserHeader from '../components/UserHeaderForGraphQL';
import ReposList from '../components/ReposListForGraphQL';
import OrganizationList from '../components/UserOrganizationsForGraphQL';
import TempComp from '../components/TempComp';
import {GrRefresh} from 'react-icons/gr';

const userIssuesDashboardStyles = css`
display : flex;
flex-direction: row;
`;

const userHeaderStyles = css`
display: flex;
flex-direction: column;
width: fit-content;
padding-left: 50px;
padding-right: 10px;
`;

const buttonStyles = css`
margin-top: 20px;
text-align: right;
button{
  background-color: #D7DBDD;
  font-size: 16px;
}
button:hover{
  cursor: pointer;
}

`;

/*
 * Caution!!!  This is not a safe way to incorporate an authentication token
 * into your app.  The token will be readable by anyone who runs the code.
 * We're doing it this way for ease of demonstration only.
 */
const token = process.env.REACT_APP_NOT_SECRET_GITHUB_TOKEN;
//const login = 'robwhess';

const GET_USER_DATA = gql`
  query GetUserData($login: String!){
    user(login: $login) {
      name
      url
      avatarUrl(size: 500)
      login
      organizations(first:3){
        nodes{
          name
          avatarUrl
        }
      }
      repositories(first: 10, orderBy: {
        field: UPDATED_AT,
        direction: DESC
      }) {
        nodes {
          name
          url
          forkCount
          description
          isPrivate
          updatedAt
          licenseInfo {
            name
          }
          languages(first :3, orderBy: {
            direction: DESC
            field: SIZE
          }){
            nodes{
              name
              color
            }
          }
          issues(first: 3, states: OPEN, orderBy: {
            field: CREATED_AT,
            direction: DESC
          }) {
            nodes {
              title
              url
              createdAt
            }
          }
          pullRequests(first: 3, states: OPEN, orderBy: {
            field: CREATED_AT,
            direction: DESC
          }) {
            totalCount
            nodes{
              title
              url
              createdAt
            }
          }
        }
      }
    }
  }  
`;

export default function UserIssuesDashboard( {login} ) {
  console.log("Login is: ", login);
  const { data, loading, error, refetch } = useQuery(GET_USER_DATA, {
    variables: { login: login }
  });

  console.log("Data is:", data);
  return (
    <div>
      {token ? (
        <>
          {loading && <p>Loading...</p>}
          {
            login != "" && error ? <p>Error</p> : <div />
          }
          {data && data.user && (
            <div css = {userIssuesDashboardStyles}>
              <div css ={userHeaderStyles}>
                <div css={buttonStyles}>
                <button onClick={() => refetch()}><GrRefresh /></button>
                </div>
                <UserHeader login={login} user={data.user} />
                <OrganizationList organizations={data.user.organizations.nodes}/>
              </div>
              <div>
              <ReposList repos ={data.user.repositories.nodes} />
              </div>
            </div>
          )}
        </>
      ) : (
        <p>
          Rerun with a valid <a href="https://help.github.com/articles/creating-an-access-token-for-command-line-use/">GitHub OAuth Token</a> set in the environment variable <code>REACT_APP_NOT_SECRET_GITHUB_TOKEN</code>
        </p>
      )}
    </div>
  );
}
