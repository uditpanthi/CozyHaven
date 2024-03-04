import React, { useState } from "react";
import Button from "../Button/Button";
import "../ConfirmDelete/ConfirmDelete.css"

const ConfirmBox = ({confirmVar, onConfirm }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setShowConfirm(false);
  };

  return (
    <>
        <div>
        {showConfirm ? (
            <div className="confirm-delete">
            <p>Are you sure you want to {confirmVar}?</p>
            <button className="confirm-button" onClick={handleConfirm}>Yes</button>
            <button className="cancel-button" onClick={() => setShowConfirm(false)}>No</button>
            </div>
        ) : (
            <Button className="confirm-button" onClick={() => setShowConfirm(true)}>{confirmVar}</Button>
        )}
        </div>
    </>
  );
};

export default ConfirmBox;
