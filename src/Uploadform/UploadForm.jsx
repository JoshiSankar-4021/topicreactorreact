/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { FaHeart, FaHeartBroken, FaComment, FaShare, FaRegBookmark, FaRetweet } from "react-icons/fa";
import IconButton from "./IconButton";
import "./UploadForm.css";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const userid = sessionStorage.getItem("userid");
  const [expandedCaptions, setExpandedCaptions] = useState({});

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/Upload?action=fetchimages`
      );
      if (!res.ok) throw new Error("Failed to fetch Images");
      const data = await res.json();
      if (data.images) setImages(data.images);
    } catch (err) {
      console.error(err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/Upload?action=createpost&userid=${userid}`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      fetchImages();
      setFile(null);
      setCaption("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

  const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
};


  return (
    <div>
      <h2 className="upload-title">Upload File</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
          className="upload-input"
        />
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="caption-input"
        />
        <button type="submit" disabled={loading} className="upload-btn">
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <h2 className="gallery-title">Gallery</h2>
      <div className="gallery-container">
        {images.length === 0 ? (
          <p>No media found.</p>
        ) : (
          images.map((image) => (
            <div className="gallery-card" key={image.postid}>
              {/* User Info */}
              <div className="gallery-user">
                <img
                  src="https://res.cloudinary.com/dir0f6ufp/image/upload/v1759165885/user_media/1/xpnrsurcxlpi9ckcetri.jpg"
                  alt="profile"
                  className="gallery-user-img"
                />
                <p className="gallery-user-name">
                  {image.firstname} {image.lastname}
                </p>
              </div>

              {/* Caption */}
              <p className="gallery-caption">
                {expandedCaptions[image.postid] ? (
                  <>
                    {image.caption}{" "}
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedCaptions((prev) => ({
                          ...prev,
                          [image.postid]: false,
                        }));
                      }}
                      className="caption-toggle"
                    >
                      Show Less
                    </span>
                  </>
                ) : (
                  <>
                    {image.caption.length > 100
                      ? image.caption.slice(0, 100) + "..."
                      : image.caption}
                    {image.caption.length > 100 && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedCaptions((prev) => ({
                            ...prev,
                            [image.postid]: true,
                          }));
                        }}
                        className="caption-toggle"
                      >
                        Show More
                      </span>
                    )}
                  </>
                )}
              </p>

              {/* Media */}
              {isVideo(image.fileurl) ? (
                <video controls className="gallery-video">
                  <source src={image.fileurl} type="video/mp4" />
                </video>
              ) : (
                <img
                  onClick={() => setSelectedMedia(image.fileurl)}
                  src={image.fileurl}
                  alt={image.postid}
                  className="gallery-img"
                />
              )}

              {/* Action Bar */}
              <div className="action-bar">
                <IconButton icon={FaHeart} color="red" size={20} onClick={() => alert("Liked!")} title="Like" />
                <p>{formatNumber(image.likescount)}</p>

                <IconButton icon={FaHeartBroken} color="red" size={20} onClick={() => alert("Dislike!")} title="Dislike" />
                <p>{formatNumber(image.dislikescount)}</p>

                <IconButton icon={FaComment} color="#e90cb9ff" size={20} onClick={() => alert("Comment!")} title="Comment" />
                <p>{formatNumber(image.commentscount)}</p>

                <IconButton icon={FaShare} color="black" size={20} onClick={() => alert("Shared!")} title="Share" />
                <p>{formatNumber(image.sharecount)}</p>

                <IconButton icon={FaRetweet} color="black" size={20} onClick={() => alert("Save!")} title="Save" />
                <p>{formatNumber(image.repost)}</p>
                <IconButton icon={FaRegBookmark} color="black" size={20} onClick={() => alert("Save!")} title="Save" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Fullscreen Overlay */}
      {selectedMedia && (
        <div className="overlay" onClick={() => setSelectedMedia(null)}>
          {isVideo(selectedMedia) ? (
            <video controls autoPlay className="overlay-video">
              <source src={selectedMedia} type="video/mp4" />
            </video>
          ) : (
            <img src={selectedMedia} alt="Full" className="overlay-img" />
          )}
        </div>
      )}
    </div>
  );
}
