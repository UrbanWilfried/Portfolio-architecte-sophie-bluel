const closeModal = document.querySelector(".exitModal");
const closeModal2 = document.querySelector(".exitModal2");
const ajouPhoto = document.querySelector(".ajouPhoto");
const section1 = document.querySelector(".section1");
const section2 = document.querySelector(".section2");
const previous = document.querySelector(".previous");
const showDialog = document.querySelector("#showDialog");
const imgLaod = document.getElementById("imgLaod");
const previewFile = document.getElementById("preview-file");

showDialog.addEventListener('click', () => {
  section1.style.display='block'
});

ajouPhoto.addEventListener('click', () => {
  section1.style.display='none'
  section2.style.display='block'
});

previous.addEventListener('click', () => {
  section1.style.display='block'
  section2.style.display='none'
  framAddPhotoI.style.display='block'
  importImg.style.display='block'
  framAddPhotoP.style.display='block'
  previewFile.style.display='none'
  disabled.classList.add("disabledColor")
  disabled.getAttribute("disabled")
  loadError.classList.remove('errorLoad')
  resetForm();
});

closeModal.addEventListener('click', () => {
  section1.style='none'
});

closeModal2.addEventListener('click', () => {
  section1.style='none'
  section2.style.display='none'
  framAddPhotoI.style.display='block'
  importImg.style.display='block'
  framAddPhotoP.style.display='block'
  previewFile.style.display='none'
  disabled.classList.add("disabledColor")
  disabled.getAttribute("disabled")
  loadError.classList.remove('errorLoad')
  resetForm()
});

imgLaod.addEventListener('click', () => {
  previewFile.style.display='block'
});

const form = document.getElementById("addWorkForm");
const loadError = document.querySelector(".load");

const handleFormSubmit = () => {
  const image = form.querySelector("input[type='file']").files[0];
  const title = form.querySelector("input[type='text']").value;
  const categoryId = form.querySelector("select").value;

  if (image && title && categoryId) {
    disabled.classList.remove("disabledColor")
    loadError.classList.remove('errorLoad')
  } else{
    loadError.classList.add('errorLoad')
  };

  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", title);
  formData.append("category", categoryId);

  return formData;
};

const createModal = ({ gallery, onSave }) => {
  const dialogElement = document.getElementById("dialog");
  const galleryModalElement = document.querySelector(".gallery-modal");
  
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = handleFormSubmit();
    onSave(formData);
  });

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

const logout = document.querySelector('.editButton');

logout.addEventListener('click', () => {
  localStorage.removeItem("token")
  location.reload()
});

const framAddPhotoI = document.querySelector(".framAddPhoto i")
const importImg = document.querySelector(".importImg")
const framAddPhotoP = document.querySelector(".framAddPhoto p")
      
function createThumbnail(sFile,sId) {
  const oReader = new FileReader();
  oReader.addEventListener(
    "load", 
    function() {
      const oImgElement = document.createElement('img');
      oImgElement.classList.add('imgPreview') 
      oImgElement.src = this.result;
      document.getElementById('preview-'+sId).appendChild(oImgElement);
    }, 
    false
  );
  framAddPhotoI.style.display='none'
  importImg.style.display='none'
  framAddPhotoP.style.display='none'
  oReader.readAsDataURL(sFile);
}

function changeInputFil(oEvent){
  let oInputFile = oEvent.currentTarget,
    sName = oInputFile.name,
    aFiles = oInputFile.files,
    aAllowedTypes = ['png', 'jpg'],
    imgType;  
  document.getElementById('preview-'+sName).innerHTML ='';
  for (let i = 0 ; i < aFiles.length ; i++) {
    imgType = aFiles[i].name.split('.');
    imgType = imgType[imgType.length - 1];
    if(aAllowedTypes.indexOf(imgType) != -1) {
      createThumbnail(aFiles[i],sName);
    }
  }
  document.getElementById('preview-');
}

document.addEventListener('DOMContentLoaded',function(){
  const aFileInput = document.forms['addWorkForm'].querySelectorAll('[type=file]');
  for(let k = 0; k < aFileInput.length;k++){
    aFileInput[k].addEventListener('change', changeInputFil, false);
  }
});

function resetForm() {
  document.getElementById("preview-file").value="";
  document.getElementById("imgLaod").value="";
  document.getElementById("title").value="";
  document.getElementById("category").value="";
}

const disabled = document.getElementById("validImg");

imgLaod.addEventListener("click", () => {
  disabled.classList.remove("disabledColor")
});