/* eslint-disable */

import React, { useState } from 'react';
import DetailedCard from './imgcatd'; // Import the DetailedCard component
import './imgthumb.css';
const ImageCard = (props) => {
  const { image, ownerName, ownerUsername, likes, userProfile,downloadLinks } = props;
  const [showDetailedCard, setShowDetailedCard] = useState(false);

  const toggleDetailedCard = () => {
    setShowDetailedCard(!showDetailedCard);
  };

  return (
    <div className="image-card">
      {/* eslint-disable-next-line */}
      <img src={image} alt="Image" className="image" onClick={toggleDetailedCard} />
      <div className="image-info">
        <div className="owner-info">
          <img src={userProfile} alt="User Profile" className="user-profile" />
          <div className="owner-details">
            <p className="owner-name">{ownerName}</p>
            <p className="owner-username">@{ownerUsername}</p>
          </div>
          
        </div>
        <div className="likes">
          <span>{likes} Likes</span>
        </div>
      </div>
      {showDetailedCard && (
       <div className="overlay">
       <DetailedCard
         onClose={toggleDetailedCard}
         image={image}
         ownerName={ownerName}
         ownerUsername={ownerUsername}
         userProfile={userProfile}
         downloadLinks={downloadLinks}
       />
     </div>
      )}
    </div>
  );
};

export default ImageCard;
