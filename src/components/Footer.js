/** @jsxImportSource @emotion/react */

//JS file for Footer

import React from 'react';
import { css } from '@emotion/react';

//Footer Styles

const FooterStyles = css `
background-color: black;
height: 25px;
text-align: end;
padding-bottom: 15px;
p{
    color: white;
    margin-right: 10px;
}
`;

function Footer() {
  return <div css ={FooterStyles}>
      <p>© 2022 Copyright by Saurabhkumar Makwana - All Rights Reserved</p>
  </div>;
}

export default Footer;
