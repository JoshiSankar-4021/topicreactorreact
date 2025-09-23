import './Topics.css';
import {useEffect, useState} from 'react';

function Topics(){
    const [showComments, setshowComments]=useState(false);
    const [topics, setTopics] = useState([]);
    const [error, setError] = useState(null);
    const [openComments, setOpenComments] = useState({});
    const [comments,setComments]=useState([]);
    
useEffect(() => {
fetch(`${process.env.REACT_APP_BACKEND_URL}/api/Topic?action=getalltopics`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
})
    .then((res) => {
    if (!res.ok) throw new Error("Failed to fetch topics");
    return res.json();
    })
    .then((data) => {
    if (data?.topics) {
        setTopics(data.topics);
        console.log(topics);
        console.log("Fetched topics:", data.topics);
    }
    })
    .catch((err) => {
    console.error("Error fetching topics:", err);
    setError(err.message);
    });
}, []
);

    //     const toggleComments = (topicId) => {
    //     setOpenComments((prev) => ({
    //     ...prev,
    //     [topicId]: !prev[topicId], // only toggle this topic
    //     }));
    // };

    // function togglecomments(){
    //     setshowComments(prev=>!prev);
    // }

    return(
        <div>
            <h1 className="h1-topics">Topics</h1>
            {
            topics.map(
            (topic)=>(
            <div key={topic.id} className="topic-container">
                <div className="topic-div">
                <h2 >{topic.topic}</h2>
                <h3>{topic.reason}</h3>
                <form>
                    <input type="text" className="comment-topics"/>
                </form>
                <button className="topics-button">Comment</button>
                <div className={`comments-div ${showComments?'visible':'hidden'}`}>
                <p>Comment1</p>
            </div>
            </div>
            </div>
            )
            )}
        </div>
    );
}
export default Topics;