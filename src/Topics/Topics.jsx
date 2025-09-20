import './Topics.css';
import {useState} from 'react';

function Topics(){
    const [showComments, setshowComments]=useState(false);

    function togglecomments(){
        setshowComments(prev=>!prev);
    }
    return(
        <div>
            <h1 className="h1-topics">Topics</h1>
            <div className="topic-container">
                <div className="topic-div" onClick={togglecomments}>
                <h2>Topic:LAPTOP</h2>
                <h3>Reason:To but an laptop</h3>
                <form>
                    <input type="text" className="comment-topics"/>
                </form>
                <button className="topics-button">Comment</button>
                <div className={`comments-div ${showComments?'visible':'hidden'}`}>
                <p>Comment1</p>
            </div>
            </div>
            </div>
        </div>
    );
}
export default Topics;