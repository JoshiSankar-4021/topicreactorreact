import './MyContent.css';
import { useState } from 'react';
function MyContent(){
    const [showUpdateTopic,setShowUpdateTopic]=useState(true);
    const [showUpdateComment,setShowUpdateComment]=useState(false)
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
                                <tr className="tr-topics">
                                    <td className="td-topics">1</td>
                                    <td className="td-topics">Laptop</td>
                                    <td className="td-topics">to buy new laptop</td>
                                    <td className="td-topics"><button className="td-button-update">Update</button></td>
                                    <td className="td-topics"><button className="td-button-delete">Delete</button></td>
                                </tr>
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
                                <tr className="tr-comments">
                                    <td className="td-comments">1</td>
                                    <td className="td-comments">Laptop</td>
                                    <td className="td-comments">comment1</td>
                                    <td className="td-comments"><button className="td-button-comment-update">Update</button></td>
                                    <td className="td-comments"><button className="td-button-comment-delete">Delete</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
            </div>
            </div>
        </div>
    )
}
export default MyContent;