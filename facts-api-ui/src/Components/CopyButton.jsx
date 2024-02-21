import React from 'react';

function CopyButton({ text }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
      .then(() => console.log('Text copied successfully'))
      .catch(error => console.error('Error copying text:', error));
  };

  return (
    <button onClick={handleCopy}>Copy</button>
  );
}

export default CopyButton;