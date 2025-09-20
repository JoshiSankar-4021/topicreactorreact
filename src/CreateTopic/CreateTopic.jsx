import './CreateTopic.css';
import { useNavigate } from 'react-router-dom';
function CreateTopic(){
    const navigate=useNavigate();
    return(
        <div>
            <h1 className="topic-creator-head">Topic Creator</h1>
            <div className="topic-form-div">
                <form className="create-topic-form">
                    <label className="topic-label">Topic Name</label>
                    <input type="text" className="topic-input"/>
                    <label className="topic-label">Reason For Creating a Topic</label>
                    <input type="text" className="topic-input"/>
                    <button className="create-button" onClick={NavigateTopics}>Create</button>
                </form>
            </div>
        </div>
    );


    function NavigateTopics(){
        navigate('/Topics');
    }
}
export default CreateTopic