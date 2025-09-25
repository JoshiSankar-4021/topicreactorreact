import './Topics.css';
import { useEffect, useState } from 'react';

function Topics() {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);
  const [openComments, setOpenComments] = useState({});
  const [newComments, setNewComments] = useState({}); // store comments per-topic

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
          console.log("Fetched topics:", data.topics);
        }
      })
      .catch((err) => {
        console.error("Error fetching topics:", err);
        setError(err.message);
      });
  }, []);

  // Toggle comments visibility
  const toggleComments = (topicId) => {
    setOpenComments((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  const handlecomments = (topicId, value) => {
    setNewComments((prev) => ({
      ...prev,
      [topicId]: value,
    }));
  };

  const handlecommentsubmit = async (topicid) => {
    const commentedby = sessionStorage.getItem("userid");
    const comment = newComments[topicid];

    if (!comment || comment.trim() === "") {
      alert("Comment cannot be empty");
      return;
    }

    console.log("Topic ID:", topicid);
    console.log("User ID:", commentedby);
    console.log("Comment:", comment);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/Comment?action=createcomment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topicid, comment,commentedby }),
        }
      );

      if (!res.ok) throw new Error("Failed to submit comment");

      const data = await res.json();
      console.log("Comment created:", data);

      // Update UI with new comment
      setTopics((prev) =>
        prev.map((t) =>
          t.topicid === topicid
            ? { ...t, comments: [...(t.comments || []), comment] }
            : t
        )
      );

      // Clear input after submit
      setNewComments((prev) => ({ ...prev, [topicid]: "" }));
    } catch (err) {
      console.error("Error submitting comment:", err);
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 className="h1-topics">Topics</h1>
      {error && <p className="error">{error}</p>}
      {topics.map((topic) => (
        <div key={topic.topicid} className="topic-container">
          <div className="topic-div">
            <h2>{topic.topic}</h2>
            <h3>{topic.reason}</h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlecommentsubmit(topic.topicid);
              }}
            >
              <input
                type="text"
                className="comment-topics"
                value={newComments[topic.topicid] || ""}
                onChange={(e) =>
                  handlecomments(topic.topicid, e.target.value)
                }
              />
              <button type="submit" className="topics-button">
                Comment
              </button>
            </form>
            <div
              className={`comments-div ${
                openComments[topic.topicid] ? "visible" : "hidden"
              }`}
            >
              {topic.comments && topic.comments.length > 0 ? (
                topic.comments.map((c, i) => (
                  <div key={i} className="comment-box">
                    {c}
                  </div>
                ))
              ) : (
                <p>No comments yet</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Topics;
