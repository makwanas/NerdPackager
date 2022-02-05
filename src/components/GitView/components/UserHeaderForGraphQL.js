import React from 'react';
import styled from '@emotion/styled';

const Avatar = styled.img`
  max-height: 40px;
  margin-right: 10px;
`;

const Name = styled.h1`
  display: inline-block;
  margin: 0;
  font-size: 50px;
`;

function UserHeader({ login, user }) {
  return (
    <div>
      <a href={user.url}>
        <Avatar src={user.avatarUrl} alt={login} />
        <Name>{user.name}</Name>
      </a>
    </div>
  );
}

export default UserHeader;
