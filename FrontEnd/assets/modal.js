const createModal = ({ gallery }) => {
  const dialogElement = document.getElementById("dialog");
  const galleryModalElement = document.querySelector(".gallery-modal");
  const closeModal = document.querySelector(".exitModal");

  const updateModal = (newGallery) => {
    gallery.setGallery(newGallery);
    renderModalGallery();
  };

  const renderModalGallery = () => {
    galleryModalElement.innerHTML = "";
    galleryModalElement.appendChild(gallery.renderGallery());
  };

  const showModal = () => {
    dialogElement.showModal();
    renderModalGallery();
  };

  closeModal.addEventListener("click", (event) => {
    hideModal();
  });

  const hideModal = () => {
    dialogElement.close();
  };

  return {
    showModal,
    hideModal,
    updateModal,
  };
};

export default createModal;