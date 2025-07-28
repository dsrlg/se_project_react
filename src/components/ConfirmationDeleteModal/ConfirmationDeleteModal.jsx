import "./ConfirmationDeleteModal.css";

export const ConfirmationDeleteModal = ({
  handleDeleteConfirm,
  handleCloseClick,
  isOpen,
}) => {
  return (
    <div
      className={`modal modal_type_delete-confirmation ${
        isOpen && "modal_opened"
      }`}
    >
      <div className="modal__content modal__content_content_confirmation">
        <button type="button" className="modal__close" onClick={handleCloseClick} />
        <h3 className="modal__confirmation-title">
          Are you sure you want to delete this item? This action is
          irreversible.
        </h3>
        <button
          className="modal__confirmation-button modal__confirmation-button_type_delete"
          onClick={handleDeleteConfirm}
        >
          Yes, delete item
        </button>
        <button
          className="modal__confirmation-button modal__confirmation-button_type_cancel"
          onClick={handleCloseClick}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
