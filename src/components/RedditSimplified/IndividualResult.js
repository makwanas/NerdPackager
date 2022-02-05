
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

    return (
        <div>
            <h3> Type :{checkVideo(props.individualSearchDetail.videoProp[props.index])}</h3>
            <h3> Score : {convertScore(props.individualSearchDetail.score[props.index])}</h3>
            <h3> Title : {props.individualSearchDetail.title[props.index]}</h3>
            <h3> Subreddit : <a href={"https://www.reddit.com/" + props.individualSearchDetail.subreddit[props.index]}>{props.individualSearchDetail.subreddit[props.index]}</a></h3>
            <h3> Posted by : <a href={"https://www.reddit.com/user/" + props.individualSearchDetail.author[props.index]}>u/{props.individualSearchDetail.author[props.index]}</a></h3>
            <h3> Date : {ConvertDate(props.individualSearchDetail.created[props.index])}</h3>
            <h3> Days ago: {calculateDays(props.individualSearchDetail.created[props.index])} </h3>
            <h3> Link: </h3>
            <a href={props.individualSearchDetail.url[props.index]}>Link here</a>
            <h3> Image : </h3>
            <img src={props.individualSearchDetail.imageLink[props.index]}></img>
            <h1>***********************************************************</h1>
        </div>
    )
}

export default IndividualResult
