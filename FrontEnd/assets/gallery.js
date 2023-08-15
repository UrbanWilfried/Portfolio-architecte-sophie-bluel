const createGallery = ({ works = [], isEditable = false, onDeleteWork }) => {
  const galleryElement = document.createElement("div");

  let galleryWorks = [...works];

  const setGallery = (newWorks) => {
    galleryWorks = [...newWorks];
    renderGallery();
  };

  const renderGallery = () => {
    galleryElement.innerHTML = ""; // Efface le contenu précédent

    galleryWorks.forEach((work) => {
      const figure = document.createElement("figure");
      figure.innerHTML = `
        <img alt="${work.title}" src="${work.imageUrl}"/>
        <figcaption>${work.title}</figcaption>
        <p class="editNone">édite</p>
      `;

      if (isEditable) {
        const deleteButton = document.createElement("i");
        deleteButton.classList.add("delete-work");
        /*<i class="fa-solid fa-trash-can"></i>*/
        /*deleteButton.innerText = "trash-can";*/
        /*deleteButton.classList.add("delete-work");*/

        deleteButton.addEventListener("click", (e) => {
          e.preventDefault();
          removeWork(work.id);
        });
        figure.appendChild(deleteButton);
      }

      galleryElement.appendChild(figure);
    });

    return galleryElement;
  };

  const removeWork = (workId) => {
    const updatedWorks = galleryWorks.filter((work) => work.id !== workId);
    onDeleteWork(updatedWorks);
  };
  
  return {
    setGallery,
    renderGallery,
  };
};
  
export default createGallery;