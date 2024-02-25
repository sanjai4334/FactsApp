import React from 'react';
import shareIcon from '../assets/share.png'; 

function ShareButton({ title, text }) {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: text,
        });
        console.log('Shared successfully');
      } else {
        throw new Error('Web Share API not supported.');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  return (
    <button id='share' onClick={handleShare}>
      <img id="share" src={shareIcon} alt="share" />
    </button>
  );
}

export default ShareButton;
