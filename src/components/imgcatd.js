import React from 'react';
import './detcard.css'
import { saveAs } from 'file-saver';
const DetailedCard = (props) => {
  //eslint-disable-next-line
  const { onClose, image, ownerName, ownerUsername, userProfile, downloadLinks } = props;

  const downloadImage = async () => {
    if (!image) {
      console.error('Download link is missing.');
      return;
    }
    try {
      const response = await fetch(image, { responseType: 'blob' });
      const blob = await response.blob();
      saveAs(blob, 'image.jpg');
    } catch (error) {
      console.error('Error downloading image:', error);
    }
    
  };
  
  return (
    <div className="detailed-card">
      <button className="close-button" onClick={onClose}>
        &#215;
      </button>
      {/* eslint-disable-next-line*/}
      <img src={image} alt="Image" className="detailed-image" />
      <div className="user-info">
        <img src={userProfile} alt="User Profile" className="user-profile" />
        <div className="user-details">
          <p className="owner-name">{ownerName}</p>
          <p className="owner-username">@{ownerUsername}</p>
        </div>
      </div>
      <div className="download-links">
        <p>Download Links</p>
        <button onClick={downloadImage}>Download Image</button>
       
      </div>
    </div>
  );
};

export default DetailedCard;
