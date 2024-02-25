import React from 'react';
import CopyIcon from '../assets/copy.png'; 

function CopyButton({ text }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
      .then(() => console.log('Text copied successfully'))
      .catch(error => console.error('Error copying text:', error));
  };

  return (
    <button id='copy' onClick={handleCopy}>
      <img id='copy' src={CopyIcon} alt="copy" />
    </button>
  );
}

export default CopyButton;