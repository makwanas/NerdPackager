/** @jsxImportSource @emotion/react */

import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Avatar = styled.img`
  max-height: 300px;
  border-radius: 50%;
`;

const userHeaderStyles = css`
  padding-bottom: 5px;
  border-bottom : 0.1px solid #CACFD2;
`;

const userNameStyles = css`
h1{
  text-align: center;
  margin :0;
}
a{
  text-decoration: none;
  font-size: 20px;
  color: #CACFD2;
}
`;

function UserHeader({ login, user }) {
  return (
    <div css ={userHeaderStyles}>
      <Avatar src={user.avatarUrl} alt={login} />
      <div css ={userNameStyles}>
        <h1>{user.name}</h1>
        <a href={user.url}>
          {user.login}
        </a>
      </div>
    </div>
  );
}

export default UserHeader;
