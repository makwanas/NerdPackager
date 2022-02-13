/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import React from 'react';

const tempStyles = css `
background-color: #e6e6fa;
`;
function TempComp() {
  return <div css = {tempStyles}>
      <h1> Some temp component</h1>
  </div>;
}

export default TempComp;
