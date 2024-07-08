import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const ImageToast = ({ showToast, toggleShowToast, toastImage }) => {
  return (
    <ToastContainer
      className="p-3"
      position="middle-center"
      style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
    >
      <Toast className="bg-white" show={showToast} onClose={toggleShowToast} style={{ width: '50vw', height: 'auto', overflow: 'hidden' }}>
        <Toast.Header>
          <strong className=" me-auto">Image</strong>
        </Toast.Header>
        <Toast.Body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0' }}>
          <img
            src={toastImage}
            alt="Recipe"
            style={{
              maxWidth: '60%',
              maxHeight: '50%',
              objectFit: 'contain',
            }}
          />
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ImageToast;
