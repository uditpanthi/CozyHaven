import React, { useState } from "react";
import Button from "../Button/Button";
import "../ConfirmDelete/ConfirmDelete.css"

const ConfirmDelete = ({ onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    onDelete();
    setShowConfirm(false);
  };

  return (
    <>
        <div>
        {showConfirm ? (
            <div className="confirm-delete">
            <p>Are you sure you want to delete?</p>
            <button className="confirm-button" onClick={handleDelete}>Yes</button>
            <button className="cancel-button" onClick={() => setShowConfirm(false)}>No</button>
            </div>
        ) : (
            <Button onClick={() => setShowConfirm(true)}>Delete</Button>
        )}
        </div>
    </>
  );
};

export default ConfirmDelete;
