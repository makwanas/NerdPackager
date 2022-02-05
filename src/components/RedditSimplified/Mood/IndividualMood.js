/** @jsxImportSource @emotion/react */

import { Link } from 'react-router-dom';
import { css } from '@emotion/react';

export const individualMoodStyles = css`
    
    button{
        background: linear-gradient(90deg, #1CB5E0 0%, #000851 100%);
        height:400px;
        width:320px;
        color:#F7F9F9;
    }
    button:hover{
        background: linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%);
        cursor:pointer;
        color:black;
    }
    img{
        height:220px;
        width:220px;
        margin-top:10px
    }
    border: 2px solid black;
    border-radius:6px;
    margin:5px;
    justify-content: space-evenly;
    h3{
        font-size:24px;
    }
    h4{
        font-size:16px;
        font-style:italic;
    }
`;

function IndividualMood(props) {

    console.log("Inside individual props: ");
    const handleClick = (e) => {
        props.onDisplayMood(props.url);
        props.onCardClick();
    }

    return (
        <div css={individualMoodStyles}>
            <Link to={`/redditSimplified/mood/search?q=${props.title}`} >
                <button onClick={handleClick} value={props.url}>
                    <img src={props.image}></img>
                    <h3>{props.title}</h3>
                    <h4> {props.description}</h4>
                    <br />
                </button>
            </Link>
        </div>
    )
}

export default IndividualMood
