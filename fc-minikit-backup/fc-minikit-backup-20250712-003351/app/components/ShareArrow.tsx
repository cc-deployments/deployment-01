import React from "react";

interface ShareArrowProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ShareArrow: React.FC<ShareArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: '#fff',
      border: '1px solid #a32428',
      boxShadow: '0 0.5px 2px rgba(0,0,0,0.08)',
      padding: 0,
      margin: 0,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 45,
      width: 45,
      maxHeight: 50,
      maxWidth: 50,
      borderRadius: '50%',
      zIndex: 50,
      transition: 'box-shadow 0.2s',
      opacity: 0.5,
    }}
    aria-label="Share App"
  >
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="17.5" cy="17.5" r="16.25" stroke="#a32428" strokeWidth="2" fill="#fff" />
      <path d="M17.5 27.5V7.5M17.5 7.5L8.75 16.25M17.5 7.5L26.25 16.25" stroke="#a32428" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </button>
);

export default ShareArrow; 