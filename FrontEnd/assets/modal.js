const closeModal = document.querySelector(".exitModal");
const closeModal2 = document.querySelector(".exitModal2");

const createModal = ({ gallery }) => {
  const dialogElement = document.getElementById("dialog");
  const galleryModalElement = document.querySelector(".gallery-modal");
  

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

  closeModal2.addEventListener("click", (event) => {
    hideModal2();
  });

  const hideModal = () => {
    dialogElement.close();
  };

  const hideModal2 = () => {
    dialogElement.close();
  };

  return {
    showModal,
    hideModal,
    updateModal,
  };
};

export default createModal;

const ajouPhoto = document.querySelector('.ajouPhoto');
const section1 = document.querySelector('.section1');
const section2 = document.querySelector('.section2');
const previous = document.querySelector('.previous');
const showDialog = document.querySelector('#showDialog');

showDialog.addEventListener('click', () => {
  section1.style.display='block'
});

ajouPhoto.addEventListener('click', () => {
  section1.style.display='none'
  section2.style.display='block'
});

function resetForm() {
  document.getElementById("imgLaod").value="";
  document.getElementById("titre").value="";
  document.getElementById("categorie").value="";
  console.log("ici")
}

previous.addEventListener('click', () => {
  section1.style.display='block'
  section2.style.display='none'
  resetForm();
});

closeModal.addEventListener('click', () => {
  section1.style='none'
});

closeModal2.addEventListener('click', () => {
  section1.style='none'
  section2.style.display='none'
  resetForm()
});

const logout = document.querySelector('.editButton');
  logout.addEventListener('click', () => {
    localStorage.removeItem("token")
    location.reload()
    console.log('exit')
  });