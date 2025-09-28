import './MyContent.css';
import { useState,useEffect } from 'react';
function MyContent(){
    const [showUpdateTopic,setShowUpdateTopic]=useState(true);
    const [showUpdateComment,setShowUpdateComment]=useState(false)
    const [comments,setComments]=useState([]);
    const [topics,setTopics]=useState([]);
    const userid=sessionStorage.getItem("userid");
    const [commentform,setCommentform]=useState({commentid:0,comment:''});
    const [topicform,setTopicform]=useState({
        topic:'',
        reason:'',
        topicid:0
    });

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
        setTopics((prev) => prev.filter(t => t.topicid !== topicid));
    })
    .catch((err) => {
        console.error("Error deleting topic:", err);
        alert("Error deleting topic");
    });
    }

    function DeleteComment(commentid){
        console.log(commentid);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/Comment?action=deleteby_comment_id&commentid=${commentid}`, {
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
        setComments((prev) => prev.filter(c => c.commentid !== commentid));
    })
    .catch((err) => {
        console.error("Error deleting topic:", err);
        alert("Error deleting topic");
    });
    }

    function GetTopic(topicid){
        console.log(topicid);
        const selectedTopic = topics.find(t => t.topicid === topicid);
        if(selectedTopic){
            setTopicform({
                topicid:selectedTopic.topicid ?? 0,
                topic:selectedTopic.topic ?? '',
                reason:selectedTopic.reason ?? ''
            })
        }else {
            console.error("Topic not found in state");
        }
    }
    const handleCommetChanges=(e)=>{
        const { name, value } = e.target;
        setCommentform(prev => ({
            ...prev,
            [name]: value
    }));
    }

    const handleTopicChanges=(e)=>{
        const { name, value } = e.target;
        setTopicform(prev => ({
            ...prev,
            [name]: value
    }));
    }

function GetComment(commentid) {
        console.log("Selected commentid:", commentid);
        const selectedComment = comments.find(c => c.commentid === commentid);
        if (selectedComment) {
            setCommentform({
                commentid: selectedComment.commentid,
                comment: selectedComment.comment ?? ''
            });
        } else {
            console.error("Comment not found in state");
        }
    }

    function UpdateComment(){
        console.log(commentform.commentid)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/Comment?action=updatecomment&commentid=${commentform.commentid}`,{
            method:"PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                comment:commentform.comment
            })
        })
        .then((res)=>{
            if(!res.ok){
                console.err("Unable to update");
            }
            return res.json();
        }).then((data)=>{
            alert(data.message);
            setComments(prev =>
            prev.map(c =>
                c.commentid === commentform.commentid
                    ? { ...c, comment: commentform.comment }
                    : c
            )
        );
        })
    }

    function UpdateTopic(){
        console.log(topicform.topicid);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/Topic?action=updatetopic&topicid=${topicform.topicid}`,
            {
            method:"PUT",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({
                topic:topicform.topic,
                reason:topicform.reason
            })
            }
        )
        .then((res)=>{
            if(!res.ok){
                console.log("Something is wrong");
            }
            return res.json();
        }).then((data)=>{
            
            alert(data.message);
            setTopics((prev) =>
            prev.map((t) =>
                t.topicid === topicform.topicid
                ? { ...t, topic: topicform.topic, reason: topicform.reason }
                : t
            )
        );
        })

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
                    <form onSubmit={(e)=>{e.preventDefault();
                        UpdateTopic();
                    }}>
                        <label className="update-topic-label">Topic Name</label>
                        <input type="text" name="topic" value={topicform.topic} onChange={handleTopicChanges} className="update-topic-input-style"/>
                        <label className="update-topic-label">Reason</label>
                        <input type="text" name="reason" value={topicform.reason} onChange={handleTopicChanges} className="update-topic-input-style"/>
                        <button type='submit' className="update-topic-button">Update Topic</button>
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
                                    <td className="td-topics"><button onClick={(e)=>{e.preventDefault();
                                        GetTopic(topic.topicid)
                                    }}className="td-button-update">Edit</button></td>
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
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    UpdateComment()}}>
                    <label className="comment-update-label">Comment</label>
                    <input name="comment" value={commentform.comment} onChange={handleCommetChanges} className="comment-input-style"/>
                    <button type="submit" className="comment-update-button">Update Comment</button>
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
                                    <td className="td-comments"><button onClick={(e)=>{
                                        e.preventDefault();
                                        GetComment(comment.commentid)
                                    }}className="td-button-comment-update">Edit</button></td>
                                    <td className="td-comments"><button onClick={(e)=>{
                                        e.preventDefault();
                                        DeleteComment(comment.commentid)}} className="td-button-comment-delete">Delete</button></td>
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