import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import { useState } from "react";
function EditProfileModal({ isOpen, onSubmit, handleCloseClick }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    setName(currentUser.currentUser?.name || "");
    setAvatarUrl(currentUser.currentUser?.avatar || "");
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, avatar: avatarUrl });
  };

  return (
    <ModalWithForm
      titleText="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name{" "}
        <input
          className="modal__input"
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          required
        />
      </label>

      <label className="modal__label">
        Avatar{" "}
        <input
          className="modal__input"
          type="url"
          placeholder="Avatar URL"
          onChange={(e) => {
            setAvatarUrl(e.target.value);
          }}
          value={avatarUrl}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
