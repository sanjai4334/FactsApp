import React from 'react';

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
    <button onClick={handleShare}>Share</button>
  );
}

export default ShareButton;
