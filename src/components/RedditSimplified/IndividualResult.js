/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

const individualResultStyle = css `
    margin-top: 15px;
    margin-right: 15px;
    padding: 10px;
    border: 1px solid #CACFD2;
    width: 500px;
    display:flex;
    flex-direction:column;
    h3{
        text-align: center;
        margin:0;
        font-size: 16px;
        color: white;
    }
    a{
        text-decoration: none;
    }
`;

const bodyIndividualResultStyle = css`
    display: flex;
    flex-direction: row;
    border-top: 0.2px solid #CACFD2;
    margin-top: 10px;
    h4{
        margin:0;
        padding-top: 10px;
        color: #CACFD2
    }
    a{
        text-decoration: none;
        color: #5DADE2;
        font-style: italic;
    }
`;

const subredditResultStyle = css`
    display:flex;
    flex:1;
`;

const scoreResultStyle = css`
    display:flex;
    flex-direction:row;
    h4{
        text-decoration: none;
    }
    img{
        padding-top:10px;
        padding-right:5px;
        height: 25px;
        width: 25px;
    }
`;

const imageResultStyle = css`
    display: flex;
    justify-content: center;
    padding-top: 10px;    
    img{
            width:200px;
            height:200px;
            border-radius: 5px;
        }
`;

const subBodyResultStyle = css`
    display: flex;
    flex-direction: row;
    h4{
        margin:0;
        padding-top: 10px;
        color: #CACFD2
    }
    p{
        margin:0;
        padding-top: 10px;
        color: #CACFD2;
        font-style: italic;
        font-size: 14px;
    }
    a{
        text-decoration: none;
        color: #CACFD2;
        font-style: italic;
    }
`;

const postDateResultStyle = css`
    h4{
        margin:0;
        padding-top: 10px;
        color: #CACFD2;
        text-decoration: none;
    }
`;

function IndividualResult(props) {

    const checkVideo = (videoBoolean) => {
        if (videoBoolean) {
            return "Video"
        } else {
            return null
        }
    }

    const convertScore = (score) => {
        if (parseFloat(score) >= 1000.0) {
            return parseFloat(score / 1000).toFixed(1).toString() + " K";
        } else {
            return score
        }
    }

    const ConvertDate = (unixTime) => {
        let date = new Date(unixTime * 1000);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString("en-US", options);
    }

    function calculateDays(unixTime) {
        const oneDay = 24 * 60 * 60 * 1000;
        const firstDate = new Date();
        const secondDate = new Date(unixTime * 1000);
        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        return diffDays
    };

    console.log("Individual result reddit data:", props.individualSearchDetail)
    return (
        <div css ={individualResultStyle}>
            <a href={props.individualSearchDetail.url[props.index]}>
            <div>
            <h3> {props.individualSearchDetail.title[props.index]}</h3>
            </div>
            <div css = {bodyIndividualResultStyle}>
                <div css ={subredditResultStyle}>
                    <h4> Subreddit : <a href={"https://www.reddit.com/" + props.individualSearchDetail.subreddit[props.index]}>{props.individualSearchDetail.subreddit[props.index]}</a></h4>
                </div>
                <div css ={scoreResultStyle}>
                    <img src="https://media.istockphoto.com/vectors/power-vector-symbol-vector-id1131910096?k=20&m=1131910096&s=612x612&w=0&h=1fyN7_BHegBCFjj_wBR9-jzwDuA0Plq3GA5RjS8rdv8="></img>
                    <h4> Score : {convertScore(props.individualSearchDetail.score[props.index])}</h4>
                </div>
            </div>
            <div css = {imageResultStyle}>
                {
                    props.individualSearchDetail.imageLink[props.index] != "self" 
                    && props.individualSearchDetail.imageLink[props.index] != "default" 
                    && props.individualSearchDetail.imageLink[props.index] != "nsfw" 
                    && props.individualSearchDetail.imageLink[props.index] !="spoiler" ? 
                        <img src={props.individualSearchDetail.imageLink[props.index]}></img> :
                        <img src = "https://play-lh.googleusercontent.com/MDRjKWEIHO9cGiWt-tlvOGpAP3x14_89jwAT-nQTS6Fra-gxfakizwJ3NHBTClNGYK4" ></img>
                }
                
            </div>
            <div css = {subBodyResultStyle}>
                <div css = {{
                    flex:'1'
                }}>
                <h4> Posted by : <a href={"https://www.reddit.com/user/" + props.individualSearchDetail.author[props.index]}>u/{props.individualSearchDetail.author[props.index]}</a></h4>
                </div>
                <div>
                    <p> {calculateDays(props.individualSearchDetail.created[props.index])} days ago </p>
                </div>
            </div>
            <div css ={postDateResultStyle}>
            <h4> Post Date : {ConvertDate(props.individualSearchDetail.created[props.index])}</h4>
            </div>
            </a>
        </div>
        
    )
}

export default IndividualResult
