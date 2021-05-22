import React from 'react';

const Clock = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12 0C5.38332 0 0 5.38332 0 12C0 18.6167 5.38332 24 12 24C18.6167 24 24 18.6167 24 12C24 5.38332 18.6167 0 12 0ZM12 22.5C6.2102 22.5 1.50001 17.7898 1.50001 12C1.50001 6.2102 6.2102 1.50001 12 1.50001C17.7898 1.50001 22.5 6.2102 22.5 12C22.5 17.7898 17.7898 22.5 12 22.5Z" />
      <path d="M12.75 4.5H11.25V12.3105L15.9697 17.0302L17.0303 15.9697L12.75 11.6894V4.5Z" />
    </svg>
  );
};

export default Clock;
