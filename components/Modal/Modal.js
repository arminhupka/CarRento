import React, {useEffect} from 'react';
import {FaTimes} from 'react-icons/fa';

const Modal = ({title, children, onClose}) => {
  const handleCloseOnKey = () => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    });
  };

  useEffect(() => {
    handleCloseOnKey();
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'initial';
    };
  }, []);
  return (
    <div
      role="dialog"
      className="fixed top-0 left-0 w-full h-full lg:flex bg-white lg:bg-black/50 overflow-scroll lg:overflow-auto z-50"
    >
      <div className="container lg:flex lg:items-center lg:justify-center">
        <div className="py-8 lg:w-3/4 lg:max-h-128 lg:p-8 lg:mt-8 bg-white lg:rounded-md lg:shadow-2xl lg:overflow-y-auto scrollbar-hide">
          <header className="pb-4 mb-4 flex justify-between items-center border-b">
            <h3 className="text-xl font-semibold">{title}</h3>
            <button type="button" onClick={onClose}>
              <FaTimes className="text-2xl hover:text-red-500" />
            </button>
          </header>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
