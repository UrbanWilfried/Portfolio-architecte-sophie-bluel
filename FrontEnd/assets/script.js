import createGallery from "./gallery.js";
import createFilters from "./filters.js";

const bannerEdit = document.querySelector('.bannerEdit')
const editImage = document.querySelector('.editImage')
const editProject = document.querySelector('.editProject')
const filterNone = document.querySelector('filter')

const fetchWorks = async () => {
    const response = await fetch("http://localhost:5678/api/works")
    return response.json()
};

const init = async () => {
  const token=localStorage.getItem("token")
  if (token) {
    bannerEdit.style.display='flex'
    editImage.style.visibility='visible'
    editProject.style.display='flex'
    /*filterNone.style.visibility='hidden'*/
  }
  const worksData = await fetchWorks();
  const gallery = createGallery({ works: worksData });
  gallery.renderGallery();
  createFilters({
    worksData,
    onSelectFilter: (filteredWorks) => {
      gallery.setGallery(filteredWorks);
    }
  });
};

init()

