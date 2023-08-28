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
const filtersContainer = document.querySelector(".filter");
const loginVisible = document.querySelector(".loginVisible");
const logoutVisible = document.querySelector(".logoutVisible");

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

const fetchCategories = async () => {
  const response = await fetch("http://localhost:5678/api/categories");
  return response.json();
};


const init = async () => {
  if (token) {
    bannerEdit.style.display = "flex";
    editImage.style.visibility = "visible";
    editProject.style.display = "flex";
    filterNone.style.visibility = "hidden";
    loginVisible.style.display = "none";
    logoutVisible.style.display = "block";
  }

  const works = await fetchWorks();
  const gallery = createGallery({ works: works });
  galleryContainer.appendChild(gallery.renderGallery());

  const modalGallery = createGallery({
    works: works,
    isEditable: true,
    onDeleteWork: async (workId) => {
      try {
        await deleteWork(workId);
        const updatedWorks = works.filter((work) => work.id !== workId);
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
      if (
        !formData.has("image") &&
        !formData.has("title") &&
        !formData.has("category")
      )
        return;
      try {
        await addWork(formData);
      } catch (e) {
        console.log(e);
      }
    },
  });

  const categories = await fetchCategories();

  const filters = createFilters({
    onSelectFilter: (category) => {
      const filteredWorks = works.filter((work) =>
        category === "all" ? work : work.category.name === category
      );
      gallery.setGallery(filteredWorks);
    },
    categories,
  });
  filtersContainer.appendChild(filters.renderFilters());

  const selectElement = document.createElement("select");
  selectElement.name = "category";
  selectElement.id = "category";
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  selectElement.appendChild(defaultOption);

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    selectElement.appendChild(option);
  });

  const container = document.getElementById("select");
  container.appendChild(selectElement);

  showButton.addEventListener("click", () => {
    modal.showModal();

  });

  const form = document.getElementById("addWorkForm");
  const imageElement = form.querySelector("input[type='file']")
  const titleElement = form.querySelector("input[type='text']");
  const categoryElement = form.querySelector("select");
  const disabled = document.getElementById("submitWork");
  const errorLoad = document.querySelector(".errorMessage");

  imageElement.addEventListener("change", () => {
    checkValues()
  })

  titleElement.addEventListener("change", () => {
    checkValues()
  })

  categoryElement.addEventListener("click", () => {
    checkValues()
  })

  const checkValues = () => {
    const imageValue = imageElement.files[0]
    const titleValue = titleElement.value
    const categoryValue = categoryElement.value

    if (imageValue && titleValue && categoryValue) {
      disabled.classList.remove("disabledColor");
      errorLoad.classList.remove("errorLoad");
    } else {
      errorLoad.classList.add("errorLoad");
    }
  }
};

init();