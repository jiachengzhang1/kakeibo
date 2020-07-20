import React from "react";

import "./styles.css";

const EditableCard = ({
  handleDelete,
  handleSave,
  handleEdit,
  title,
  content,
  editing,
}) => {
  const handleEditOnClick = (event) => {
    event.stopPropagation();
    handleEdit(true);
  };

  const handleDeleteOnClick = (event) => {
    event.stopPropagation();
    handleDelete();
  };

  const handleCardOnClick = (event) => {
    event.preventDefault();
    if (event.target == event.currentTarget) {
      handleSave();
    }
  };

  return (
    <div
      className="editable-card"
      id="editable-card"
      onClick={handleCardOnClick}
    >
      <div className="editable-card-delete" id="editable-card-delete">
        <button
          className="editable-card-delete-btn circular ui icon button"
          onClick={handleDeleteOnClick}
        >
          <i className="x icon"></i>
        </button>
      </div>

      <div className="editable-card-title">{title}</div>
      <div className="editable-card-content">{content}</div>
      <div className={`editable-card-edit ${editing ? "disabled" : ""}`}>
        <a onClick={handleEditOnClick}>Edit</a>
      </div>
    </div>
  );
};

export default EditableCard;
