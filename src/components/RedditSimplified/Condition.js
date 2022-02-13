/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const InputConditionStyles = css`
margin-top: 10px;
margin-left: 15px;
color: #CACFD2;
`;

const SelectionConditionStyles = css`
margin-top: 10px;
margin-left: 15px;
`;

function Condition(props) {
    function handleFilterChange(e) {
        props.onFilterChange(e.target.value);
    }

    function handleLimitChange(e) {
        props.onLimitChange(e.target.value);
    }

    return (
        <>
            <div css={InputConditionStyles}>
                < input type="radio" name="filterOption" value="new" checked={props.filterOption === "new"} onChange={handleFilterChange} /> New
            < input type="radio" name="filterOption" value="hot" checked={props.filterOption === "hot"} onChange={handleFilterChange} /> Hot
            < input type="radio" name="filterOption" value="top" checked={props.filterOption === "top"} onChange={handleFilterChange} /> Top
            {props.type == "keyword" ?
                    <><input type="radio" name="filterOption" value="relevance" checked={props.filterOption === "relevance"} onChange={handleFilterChange} /> Relevance
            < input type="radio" name="filterOption" value="comments" checked={props.filterOption === "comments"} onChange={handleFilterChange} /> Comments </> : <><input type="radio" name="filterOption" value="rising" checked={props.filterOption === "rising"} onChange={handleFilterChange} /> Rising</>}

            </div >
            <div css={InputConditionStyles}>
                Number of posts:
                <select onChange={handleLimitChange} css ={{
                    marginLeft: "10px"
                }}>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
        </>
    )
}

export default Condition
