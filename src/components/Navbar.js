/** @jsxImportSource @emotion/react */

//JS file for Navbar

//Importing dependencies
import { NavLink } from 'react-router-dom';
import { css } from '@emotion/react';

//Navbar Styles

const NavbarStyles = css`
display: flex;
background-color: #313131 ;
a{
    color: white;
    text-decoration: none;
}
`;

const startNavbarStyles = css `
display: flex;
img{
    width:60px;
    height:60px;
    margin-top: 10px;
    margin-left: 10px;
    border-radius: 50%;
}
a{
    font-style: italic;
    margin-left: 10px;
}
h1{
    margin-left: 5px;
    margin-bottom: 10px;
    padding-bottom: 5px;
    font-size: 30px;
}
`;

const endNavbarStyles = css`
display: flex; 
justify-content: flex-end;
flex:1;
gap: 10px;
margin-right: 10px;
img{
    width: 50px;
    height: 50px;
    margin-right: 10px;
    margin-top: 10px;
    border-radius: 50%;
}
div{
    display: flex;
    flex-direction: row;    
}
`;

const githubImageStyles = css`
background-color: white;
`;

//Navbar DOM rendering
function Navbar() {
    return (
        <div css ={NavbarStyles}>
            <div css = {startNavbarStyles}>
                <img src="https://cdn4.vectorstock.com/i/1000x1000/80/63/np-logo-monogram-emblem-style-with-crown-shape-vector-31118063.jpg" />
                <NavLink to="/"><h1>NerdPackager</h1></NavLink>
            </div>
            <div css ={endNavbarStyles}>
                <NavLink to="/redditSimplified">
                    <div>
                        <img src="data:image/png;base64,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"></img>
                        <h2>RedditSimplified</h2>
                    </div>
                    </NavLink>
                <NavLink to="/gitView">
                    <div>
                        <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png" style={{backgroundColor : 'white'}} ></img>
                        <h2>GitView</h2>
                    </div>
                </NavLink>
                <NavLink to="/weatherInfo">
                    <div>
                        <img src="https://i.pinimg.com/originals/30/b1/1a/30b11a92a85361de088b6d668785f0aa.jpg"></img>
                        <h2>WeatherInfo</h2>
                    </div>
                </NavLink>
                <NavLink to="/about">
                    <h2>About</h2>
                </NavLink>
            </div>
        </div>
    )
}
export default Navbar
