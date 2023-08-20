import createGallery from "./gallery.js";
import createModal from "./modal.js";
import createFilters from "./filters.js";

const bannerEdit = document.querySelector(".bannerEdit");
const editImage = document.querySelector(".editImage");
const editProject = document.querySelector(".editProject");
const filterNone = document.querySelector(".filter");
const showButton = document.getElementById("showDialog");
const galleryContainer = document.getElementById("gallery");
const token = localStorage.getItem("token");

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

const addWork = async (formData) => {
  const response = await fetch(`http://localhost:5678/api/works`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return response.json();
};

/*fetch categorie début*/

const fetchCategories = async () => {
  const response = await fetch("http://localhost:5678/api/categories");
  return response.json();
};

/*fetch categorie fin*/

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
    onSave: async (formData) => {
      console.log("save", formData);
      try {
        await addWork(formData);
      } catch (e) {
        console.log(e);
      }
    },
  });

/*fetch categorie début*/

  const categoriesData = await fetchCategories();
  const filters = createFilters({ works: categoriesData });
  filtersContainer.appendChild(filters.renderFilters());
  const modalFilters = createFilters({
    categories: categoriesData,
    isEditable: true,
  });

  const modal2 = createModal({
    gallery: modalFilters,
    onSave: async (formData) => {
      console.log("save", formData);
      try {
        await addWork(formData);
      } catch (e) {
        console.log(e);
      }
    },
  });
  
/*fetch categorie fin*/

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



