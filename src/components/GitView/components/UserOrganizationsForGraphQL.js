/** @jsxImportSource @emotion/react */

import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Avatar = styled.img`
  max-height: 40px;
  margin-right: 10px;
  border-radius: 5px;
`;

const organizationStyles = css`
display: flex;
flex-direction: row;
p{
  font-size: 16px;
  color: #CACFD2;
}
`;

const userOrganizationStyles = css`
h2{
  margin-top: 10px;
  font-size: 24px;
}
`;

export default function OrganizationList({ organizations }) {
  return (
    <div css={userOrganizationStyles}>
      <h2> Organizations </h2>
      {organizations.map(organization => (
        <div key={organization.name} css ={organizationStyles}>
          <Avatar src={organization.avatarUrl} />
          <p>{organization.name}</p>
        </div>
      ))}
    </div>
  );
}
