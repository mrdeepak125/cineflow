import React from "react";
// import './Modal.css';

function Modal({ show, onClose, trailerKey }) {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Trailer"
        ></iframe>
      </div>
    </div>
  );
}

export default Modal;
