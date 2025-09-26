import './MyContent.css';
import { useState,useEffect } from 'react';
function MyContent(){
    const [showUpdateTopic,setShowUpdateTopic]=useState(true);
    const [showUpdateComment,setShowUpdateComment]=useState(false)
    const [comments,setComments]=useState([]);
    const [topics,setTopics]=useState([]);
    const userid=sessionStorage.getItem("userid");
    
    useEffect(() => {
    if (showUpdateComment) {
        fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/Comment?action=comments_by_commentedby&commentedby=${userid}`
        )
        .then((res) => {
            if (!res.ok) {
            throw new Error("Failed to fetch comments");
            }
            return res.json();
        })
        .then((data) => {
            if (data?.comments) {
            setComments(data.comments);
            }
        })
        .catch((err) => console.error("Error fetching comments:", err));
    }
    }, [showUpdateComment, userid]); 

    useEffect(() => {
    console.log("Updated comments:", comments);
    }, [comments]);

    useEffect(()=>{
        if(showUpdateTopic){
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/Topic?action=gettopicbyuserid&createdby=${userid}`)
            .then((res)=>{
                if(!res.ok){
                    throw new Error("Failed to fetch topics");
                }
                return res.json();
            }).then((data)=>{
                if(data?.topics){
                    setTopics(data.topics);
                }
            })
        }
    },[showUpdateTopic,userid]);

    useEffect(()=>{
        console.log("Updated Topics:", topics);
    },[topics]);

    function DeleteTopic(topicid){
        console.log(topicid);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/Topic?action=delete_topic&topicid=${topicid}`, {
        method: "DELETE",
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to delete topic");
        }
        return res.json();
    })
    .then((data) => {
        console.log(data.message);
        alert(data.message);
        // update UI without reload
        setTopics((prev) => prev.filter(t => t.topicid !== topicid));
    })
    .catch((err) => {
        console.error("Error deleting topic:", err);
        alert("Error deleting topic");
    });
        
    }
    
    return(
        <div>
            <h1 className="h1-my-content">Mycontent</h1>
            <div className="my-divcontent">
            <button className="button-mytopic" onClick={(()=>{setShowUpdateTopic(true)
                setShowUpdateComment(false)
            })}>MY TOPICS</button>
            <button className="button-mycomment" onClick={(()=>{setShowUpdateComment(true)
                setShowUpdateTopic(false)
            })}>MY COMMENTS</button>
            </div>
            <div className={`topic-div-update ${showUpdateTopic?'visible':'hidden'}`}>
                <div className="topi-update-container">
                    <h1 className="h1-topic-detail">Update Topic Details</h1>
                    <form>
                        <label className="update-topic-label">Topic Name</label>
                        <input type="text" className="update-topic-input-style"/>
                        <label className="update-topic-label">Reason</label>
                        <input type="text" className="update-topic-input-style"/>
                        <button className="update-topic-button">Update Topic</button>
                    </form>
                    <div>
                        <table className="table-topics">
                            <tbody className="topic-body">
                                <tr className="tr-topics">
                                    <th className="th-topics">Topic ID</th>
                                    <th className="th-topics">Topic Name</th>
                                    <th className="th-topics">Reason</th>
                                    <th className="th-topics">Update</th>
                                    <th className="th-topics">Delete</th>
                                </tr>
                                {
                                    topics.map((topic)=>(
                                    <tr className="tr-topics">
                                    <td className="td-topics">{topic.topicid}</td>
                                    <td className="td-topics">{topic.topic}</td>
                                    <td className="td-topics">{topic.reason}</td>
                                    <td className="td-topics"><button className="td-button-update">Update</button></td>
                                    <td className="td-topics"><button onClick={()=>{DeleteTopic(topic.topicid)}} className="td-button-delete">Delete</button></td>
                                </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className={`topic-div-comment ${showUpdateComment?'visible':'hidden'}`}>
                <div className="comment-update-container">
                <h1 className="h1-comment-detail">Update Comment </h1>
                <form>
                    <label className="comment-update-label">Comment</label>
                    <input className="comment-input-style"/>
                    <button className="comment-update-button">Update Comment</button>
                </form>
                <div>
                        <table className="table-comments">
                            <tbody className="comments-body">
                                <tr className="tr-comments">
                                    <th className="th-comments">Topic ID</th>
                                    <th className="th-comments">Topic Name</th>
                                    <th className="th-comments">Comment</th>
                                    <th className="th-comments">Update</th>
                                    <th className="th-comments">Delete</th>
                                </tr>
                                {
                                    comments.map((comment)=>(
                                    <tr className="tr-comments">
                                    <td className="td-comments">{comment.commentid}</td>
                                    <td className="td-comments">{comment.topic}</td>
                                    <td className="td-comments">{comment.comment}</td>
                                    <td className="td-comments"><button className="td-button-comment-update">Update</button></td>
                                    <td className="td-comments"><button className="td-button-comment-delete">Delete</button></td>
                                </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
            </div>
            </div>
        </div>
    )
}
export default MyContent;