/** @jsxImportSource @emotion/react */

import React from 'react';
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


// import UserIssuesDashboard from './pages/UserIssuesDashboard';
import UserIssuesDashboard from './pages/UserIssuesDashboardWithGraphQL';

const gitViewStyles = css`
color: white;
`;

export const formStyles = css`
form{
    text-align: center;
    border: 1px solid white;
    border-radius: 5px;
    margin-top: 10px;
    padding:5px;
    label{
        font-size: 20px;
        padding-right: 5px;
        input{
            margin-left: 5px;
            margin-right: 5px;
            font-size: 20px;
            border-radius: 1px;
        }
        button{
            font-size: 20px;
            color: white;
            background-color: #313131;
            border: 1px solid white;
            border-radius: 5px;
        }
    }

}
width: fit-content;
margin: 0 auto;
`;
function GitViewHome({query}) {

  const [inputQuery, setInputQuery] = useState(query || '');
  const [loginName, setLoginName] = useState('');
  const history = useHistory();
  //console.log("input query is:", inputQuery);
  //console.log("Login name is:", loginName);
  

  return <div css={gitViewStyles}>
      <div >
          <div css = {formStyles}>
                <form onSubmit={(e) => {
                                e.preventDefault();
                                //append the URL path with input query search term
                                history.push(`?q=${inputQuery}`);
                                setLoginName(inputQuery)
                            }}>
                                <label>
                                    Enter a Valid Github username :
                                <input value={inputQuery} onChange={e => setInputQuery(e.target.value)} />
                                <button type="submit">Submit</button>
                                </label>
                </form>
        </div>
      </div>
      <UserIssuesDashboard login ={loginName}/>      
  </div>;
}

export default GitViewHome;
