import createGallery from "./gallery.js";
import createFilters from "./filters.js";

const fetchWorks = async () => {
    const response = await fetch("http://localhost:5678/api/works")
    return response.json()
};

const init = async () => {
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

/*const renderWorks = (works) => {
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
      
    }*/
