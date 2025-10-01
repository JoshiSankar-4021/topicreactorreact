/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { FaHeart, FaHeartBroken, FaComment, FaShare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import IconButton from "./IconButton";

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

  // Helper: check if file is video
  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

  return (
    <div>
      <h2>Upload File</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: "20px",
          maxWidth: "400px",
          margin: "20px auto",
          borderRadius: "12px",
          background: "#12de3eff", // light green background
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #4CAF50",
            background: "#fff",
            cursor: "pointer",
          }}
        />
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #4CAF50",
            fontSize: "14px",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? "#a5d6a7" : "#4CAF50",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "0.3s",
          }}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <h2>Gallery</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
        }}
      >
        {images.length === 0 ? (
          <p>No media found.</p>
        ) : (
          images.map((image) => (
            <div
              key={image.postid}
              style={{
                border: "2px solid #06f31aff",
                padding: "8px",
                borderRadius: "8px",
                background: "white",
                cursor: "pointer",
                textAlign: "center",
                width: "480px",
                boxSizing: "border-box",
              }}
            >
              {/* User Info */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "#06f31aff",
                  padding: "8px 12px",
                  borderRadius: "12px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  marginBottom: "10px",
                }}
              >
                <img
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "1px solid white",
                  }}
                  src="https://res.cloudinary.com/dir0f6ufp/image/upload/v1759165885/user_media/1/xpnrsurcxlpi9ckcetri.jpg"
                  alt="profile"
                />
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "Segoe UI, sans-serif",
                    color: "black",
                    margin: 0,
                  }}
                >
                  {image.firstname} {image.lastname}
                </p>
              </div>

              {/* Caption */}
              <p
                style={{
                  textAlign: "left",
                  wordBreak: "break-word",
                  width: "100%",
                  display: "-webkit-box",
                  fontWeight: "bold",
                  WebkitLineClamp: expandedCaptions[image.postid] ? "none" : 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  marginBottom: "4px",
                }}
              >
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
                      style={{ color: "blue", cursor: "pointer", fontSize: "12px" }}
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
                        style={{ color: "blue", cursor: "pointer", fontSize: "12px" }}
                      >
                        Show More
                      </span>
                    )}
                  </>
                )}
              </p>
              {isVideo(image.fileurl) ? (
                <video
                  controls
                  style={{
                    width: "100%",
                    height: "480px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                >
                  <source src={image.fileurl} type="video/mp4" />
                </video>
              ) : (
                <img
                  onClick={() => setSelectedMedia(image.fileurl)}
                  src={image.fileurl}
                  alt={image.postid}
                  style={{
                    width: "100%",
                    height: "500px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              )}

              <div style={{ display: "flex", gap: "25px", background: "#06f31aff" }}>
                <IconButton
                  icon={FaHeart}
                  color="red"
                  size={20}
                  onClick={() => alert("Liked!")}
                  title="Like"
                />
                <p style={{ color: "black", fontWeight: "bold" }}>{image.likescount}</p>

                <IconButton
                  icon={FaHeartBroken}
                  color="red"
                  size={20}
                  onClick={() => alert("Dislike!")}
                  title="Dislike"
                />
                <p style={{ color: "black", fontWeight: "bold" }}>{image.dislikescount}</p>

                <IconButton
                  icon={FaComment}
                  color="#e90cb9ff"
                  size={20}
                  onClick={() => alert("Comment!")}
                  title="Comment"
                />
                <p style={{ color: "black", fontWeight: "bold" }}>{image.commentscount}</p>

                <IconButton
                  icon={FaShare}
                  color="black"
                  size={20}
                  onClick={() => alert("Shared!")}
                  title="Share"
                />
                <p style={{ color: "black", fontWeight: "bold" }}>{image.sharecount}</p>

                {/* <IconButton
                  icon={MdDelete}
                  color="black"
                  size={20}
                  onClick={() => alert("Deleted!")}
                  title="Delete"
                /> */}
              </div>
            </div>
          ))
        )}
      </div>

      {selectedMedia && (
        <div
          onClick={() => setSelectedMedia(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          {isVideo(selectedMedia) ? (
            <video
              controls
              autoPlay
              style={{
                maxWidth: "90%",
                maxHeight: "90%",
                borderRadius: "8px",
              }}
            >
              <source src={selectedMedia} type="video/mp4" />
            </video>
          ) : (
            <img
              src={selectedMedia}
              alt="Full"
              style={{
                maxWidth: "10%",
                maxHeight: "10%",
                borderRadius: "8px",
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
