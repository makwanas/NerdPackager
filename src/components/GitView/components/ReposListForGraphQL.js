/** @jsxImportSource @emotion/react */

import React from 'react';
import { css } from '@emotion/react';

const repoListStyles = css`
margin-right: 70px;
margin-top: 20px;
margin-left: 20px;
`;

const repoStyles = css`
border: 1px solid #B3B6B7;
border-radius: 15px;
margin: 10px;
`;

const repoNameStyles = css`
display: flex;
flex-direction: row;
border-bottom: 0.2px solid #CACFD2;
a{
  text-decoration: none;
  color: #5DADE2;
}
h2{
  margin: 0;
  padding-left: 10px;
  padding-top: 10px;
}
p{
  font-size: 14px;
  color: #CACFD2;
  border: 1px solid #CACFD2;
  border-radius: 10px;
  padding-left: 5px;
  padding-right: 5px;
  text-align: center;
  padding-top: 5px;
  margin-left: 10px;
  margin-top: 10px;
}
`
const repoBodyStyles = css`
display : flex;
flex-direction: row;
padding-left: 10px;
padding-bottom: 10px;
p{
  color: #CACFD2;
}
h3{
  margin: 0;
  padding-top: 10px;
}
`;

const repoSubBodyStyles = css`
display : flex;
img{
  max-width: 20px;
  max-height: 20px;
  padding-top: 10px;
  padding-right:5px;
}
h3{
  font-size: 16px;
  padding-right: 10px;
  color: #CACFD2;
}
`;

const descriptionStyles = css`
display:flex;
flex-direction: row;
border-top: 0.2px solid #CACFD2;
padding-top: 5px;
padding-bottom: 5px;
h3{
  margin:0;
  padding-left:10px;
  padding-top: 5px;
}
a{
  color: #CACFD2;
  text-decoration: none;
}
li{
  color: #CACFD2;
}
p{
  color: #CACFD2;
  font-size: 16px;
  padding-left: 10px;
  font-style: italic;
}
`;

const updatedDateStyles = css`
display: flex;
justify-content: flex-end;
flex: 1;
font-style: italic;
color: #CACFD2;
font-size: 14px;
padding-right: 15px;
`;

const repoLanguageStyles = css`
display: flex;
justify-content: flex-end;
padding-right: 50px;
padding-left: 10px;
ul{
  margin:0;
  padding-top: 5px;
}
`;

const repoBioStyles = css`
display: flex;
flex: 1;
flex-direction: column;
border-right: 0.2px solid #CACFD2;
`;

const pullRequestStyles = css`
flex:1;
border-right: 0.2px solid #CACFD2;
`
const repoIssueStyles = css`
flex:1;
`

function convertGithubDate(stringDate){
  let date = new Date(stringDate);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let unformattedDate = date.toLocaleDateString("en-US", options);
  for (var i = 0; i < unformattedDate.length; i++) {
    if (unformattedDate.charAt(i) == ","){
      return unformattedDate.substring(i+1);
    }
  }
}

export default function ReposList({ repos }) {
  return (
    <div css={repoListStyles}>
      {repos.map(repo => (
        <div key={repo.id} css={repoStyles}>
          <div css= {repoNameStyles}>
            <a href={repo.url}>
              <h2>{repo.name}</h2>
            </a>
            {repo.isPrivate ? <p>Private</p> : <p>Public</p>}
            <div css={updatedDateStyles}>
              <h4> updated on {convertGithubDate(repo.updatedAt)}</h4>
            </div>
          </div>
          <div css = {repoBodyStyles}>
          <div css = {repoBioStyles}>
            <div css = {{
              display : "flex",
              flex: "1"
            }}>
              <p> {repo.description}</p>
            </div>
          <div css = {repoSubBodyStyles}>
            <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMGL6YTmeTZtfyHf0O6YNAeBLGQAMQFyw1vw&usqp=CAU"></img>
            <h3>Fork Count: {repo.forkCount}</h3>
            <img src="https://cdn.w600.comps.canstockphoto.com/scales-of-justice-icon-isolated-court-image_csp68572476.jpg"></img>
            <h3>License: {repo.licenseInfo !== null ?  repo.licenseInfo.name: "None"} </h3>
          </div>
          </div>
          <div css ={repoLanguageStyles}>
            <div>
              <h3>Languages used </h3>
                <div css = {{
                  marginTop: "10px"
                  }}>
                {repo.languages && repo.languages.nodes ? (
                  repo.languages.nodes.map(language => (
                    <div key={language.id} css ={{
                      display: "flex",
                      flexDirection: "row"
                    }}>
                        <div css = {{
                          height: "12px",
                          width: "12px",
                          backgroundColor: language.color,
                          borderRadius: "50%",
                          marginLeft: "5px",
                          marginTop: "5px"
                        }}/>
                        <div css = {{
                          marginLeft: "10px"
                        }}>
                        {language.name}
                        </div>
                    </div>
                  ))
                ) : <p> No lanuages found </p>
                }
                </div>
            </div>
          </div>
          </div>
          <div css ={descriptionStyles}>
            <div css ={pullRequestStyles}>
                <h3> Pull requests </h3>
                <ul>
                  {repo.pullRequests && repo.pullRequests.nodes ? (
                    repo.pullRequests.nodes.map(pullRequest => (
                      <li key={pullRequest.id}>
                        <a href={pullRequest.url}>{pullRequest.title}</a> &ndash; {convertGithubDate(pullRequest.createdAt)}
                      </li>
                    ))
                  ) : <li>No pull requests</li>}
                </ul>
                {
                  repo.pullRequests && repo.pullRequests.nodes.length == 0 ? <div> 
                    <p>No pull requests</p>
                  </div> : <div />
                }
            </div>
            <div css ={repoIssueStyles}>
              <h3>Repo issues</h3>
              <ul>
                {repo.issues && repo.issues.nodes ? (
                  repo.issues.nodes.map(issue => (
                    <li key={issue.id}>
                      <a href={issue.url}>{issue.title}</a> &ndash; {convertGithubDate(issue.createdAt)}
                    </li>
                  ))
                ) : <li>No issues</li>}
              </ul>
              {
                  repo.issues && repo.issues.nodes.length == 0 ? <div> 
                    <p> No issues</p>
                  </div> : <div />
                }
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
