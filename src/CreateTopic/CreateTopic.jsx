import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTopic.css";

function CreateTopic() {
  const [topicdata,setTopicdata]=useState({
    topic:"",
    reason:"",
  });

  const handleChange=(e)=>{
    const{name,value}=e.target;
    setTopicdata(prev=>({...prev,[name]:value}));
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const userid = sessionStorage.getItem("userid");
    console.log(topicdata.topic);
    console.log(topicdata.reason);
    console.log(topicdata.createdby);

    const bodydata={
    topic:topicdata.topic,
    reason:topicdata.reason,
    createdby:userid
}
    
    const res= await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/Tpoic?action=createtopic`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodydata)
    });
    
    if(!res.ok){
      alert("Topic not created");
    }else{
      alert("TOPIC CREATED");
    }
  }

  return (
    <div>
      <h1 className="topic-creator-head">Topic Creator</h1>
      <div className="topic-form-div">
        <form onSubmit={handleSubmit} className="create-topic-form">
          <label className="topic-label">Topic Name</label>
          <input
            type="text"
            name="topic"
            value={topicdata.topic}
            onChange={handleChange}
            className="topic-input"
            required
          />
          <label className="topic-label">
            Reason For Creating a Topic
          </label>
          <input
            type="text"
            name="reason"
            value={topicdata.reason}
            onChange={handleChange}
            className="topic-input"
            required
          />
          <button type="submit" className="create-button">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTopic;
