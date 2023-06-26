/*fetch("http://localhost:5678/api/works")
.then(reponce=>{
    return reponce.json()
})
.then(data=>{
    for(let work of data){
        creerWok(work)
    }
})

function creerWok(work){
    let figur=document.createElement("figure")
    let image=document.createElement("img")
    image.setAttribute("src",work.imageUrl)
    image.setAttribute("alt",work.title)
    let figcaption=document.createElement("figcaption")
    figcaption.textContent=work.title
    figur.appendChild(image)
    figur.appendChild(figcaption)

    let divGallery=document.querySelector(".gallery")
    divGallery.appendChild(figur)
}

const works = fetch("http://localhost:5678/api/works").then(response => response.json())
*/

import createGallery from "./assets/gallery.js";
import createFilters from "./assets/filters.js";

const fetchWorks = async () => {
    const response = await fetch("http://localhost:5678/api/works")
    return response.json()
};

const filters = document.querySelectorAll(".filter-button");

const init = async () => {
  const works = await fetchWorks();
  renderWorks(works);
  const worksData = await fetchWorks();
  const gallery = createGallery({ works: worksData });
  gallery.renderGallery();
  filters.forEach((filter) => {
    filter.addEventListener("click", function (e) {
      const filterName = this.getAttribute("data-id");
      const filterObjects = works.filter((work) =>
        filterName === "All" ? work : work.category.name === filterName
      );
      renderWorks(filterObjects);
    });
  });
  createFilters({
    worksData,
    onSelectFilter: (filteredWorks) => {
      gallery.setGallery(filteredWorks);
    }
  });
};

init()

const renderWorks = (works) => {
    let template= ''
      works.forEach(work => {
        template += `
        <figure>
             <img alt="${work.title}" src="${work.imageUrl}"/>
        <figcaption>${work.title}</figcaption>
        </figure>
             `
       } )
    
      document.getElementById('gallery').innerHTML = template
      
    }
