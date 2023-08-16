import createGallery from "./gallery.js";
import createModal from "./modal.js";
import createFilters from "./filters.js";

const bannerEdit = document.querySelector(".bannerEdit");
const editImage = document.querySelector(".editImage");
const editProject = document.querySelector(".editProject");
const filterNone = document.querySelector(".filter");
const showButton = document.getElementById("showDialog");
const galleryContainer = document.getElementById("gallery");
const deleteWorkButton = document.getElementById("delete-work");
const token = localStorage.getItem("token");
const imgLaod = document.getElementById("imgLaod");
const titre = document.getElementById("titre");
const categorie = document.getElementById("categorie");
const validImg = document.querySelector(".validImg");

const fetchWorks = async () => {
  const response = await fetch("http://localhost:5678/api/works");
  return response.json();
};

const deleteWork = async (workId) => {
  const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
/* ici ça marche pas */
/*deleteWorkButton.addEventListener("click", (event) => {
  deleteWork();
  console.log("delete img")
});*/
/*fin*/
const init = async () => {
  if (token) {
    bannerEdit.style.display = "flex";
    editImage.style.visibility = "visible";
    editProject.style.display = "flex";
    filterNone.style.visibility = "hidden";
  }
  const worksData = await fetchWorks();
  const gallery = createGallery({ works: worksData });
  galleryContainer.appendChild(gallery.renderGallery());
  const modalGallery = createGallery({
    works: worksData,
    isEditable: true,
    onDeleteWork: async (workId) => {
      try {
        await deleteWork(workId);
        const updatedWorks = galleryWorks.filter((work) => work.id !== workId);
        gallery.setGallery(updatedWorks);
        modal.updateModal(updatedWorks);
      } catch (err) {
        console.log(err);
      }
    },
  });
  const modal = createModal({
    gallery: modalGallery,
  });
  createFilters({
    worksData,
    onSelectFilter: (filteredWorks) => {
      gallery.setGallery(filteredWorks);
    },
  });
  showButton.addEventListener("click", () => {
    modal.showModal();
    
  });
};
init();

const framAddPhotoI = document.querySelector(".framAddPhoto i")
const toto = document.querySelector(".toto")
      
function createThumbnail(sFile,sId) {
  var oReader = new FileReader();
  oReader.addEventListener('load', function() {
    var oImgElement = document.createElement('img');
    oImgElement.classList.add('imgPreview') 
    oImgElement.src = this.result;
    document.getElementById('preview-'+sId).appendChild(oImgElement);
  }, false);
  framAddPhotoI.style.display='none'
  oReader.readAsDataURL(sFile);
}

function changeInputFil(oEvent){
  var oInputFile = oEvent.currentTarget,
      sName = oInputFile.name,
      aFiles = oInputFile.files,
      aAllowedTypes = ['png', 'jpg'],
      imgType;  
  document.getElementById('preview-'+sName).innerHTML ='';
  for (var i = 0 ; i < aFiles.length ; i++) {
    imgType = aFiles[i].name.split('.');
    imgType = imgType[imgType.length - 1];
    if(aAllowedTypes.indexOf(imgType) != -1) {
      createThumbnail(aFiles[i],sName);
    }
  }
  document.getElementById('preview-').innerHTML ='';
}

document.addEventListener('DOMContentLoaded',function(){
 var aFileInput = document.forms['myForm'].querySelectorAll('[type=file]');
  for(var k = 0; k < aFileInput.length;k++){
    aFileInput[k].addEventListener('change', changeInputFil, false);
  }
});

validImg.addEventListener("input", validFormImg);
function validFormImg() {
  if (imgLaod.value && titre.value && categorie.value) {
    validImg.removeAttribute("disabled");
    validImg.classList.add("disabled");
  }
};

const formData = new FormData();
formData.append("imgLaod");
formData.append("titre");
formData.append("categorie");