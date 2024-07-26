import React, { useState, useRef, useEffect } from 'react';
import './App.css'

const Popover = ({ anchorEl, open, onClose, children }) => {
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target) && !anchorEl.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [anchorEl, onClose]);

  if (!open) return null;

  const rect = anchorEl.getBoundingClientRect();
  const popoverStyles = {
    position: 'absolute',
    top: `${rect.bottom + window.scrollY}px`,
    left: `${rect.left + window.scrollX}px`,
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    border: '1px solid #ccc',
    zIndex: 1000,
  };

  return (
    <div ref={popoverRef} style={popoverStyles}>
      {children}
    </div>
  );
};

const CustomPopoverComponent = () => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div >
      <button ref={buttonRef} className="button" onClick={handleClick}>
        CSV
      </button>
      <Popover anchorEl={buttonRef.current} open={open} onClose={handleClose}>
        <div className='popover'>
          <div>
            <label htmlFor="field1">Field 1:</label>
          </div>
          <div>
            <label htmlFor="field2">Field 2:</label>
          </div>
        </div>
      </Popover>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <CustomPopoverComponent />
    </div>
  );
};

export default App;
