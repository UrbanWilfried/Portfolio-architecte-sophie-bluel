/*fetch categorie début*/

const createFilters = ({ worksData, onSelectFilter }) => {

  let filtersWorks = [...categories];

  const setFilters = (newCategories) => {
    filtersWorks = [...newCategories];
    renderFilters();
  };

  const renderFilters = () => {
    FiltersElement.innerHTML = "";

    filtersWorks.forEach((work) => {
      const divFilter = document.createElement("div");
      divFilter.classList.add("filter-button")
      divFilter.innerHTML = `
        <p>${cayegories.name}</p>
      `;

      FiltersElement.appendChild(figure);
    });

    return FiltersElement;
  };

/*fetch categorie fin*/

  const filters = document.querySelectorAll(".filter-button");
  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const filterName = filter.getAttribute("data-id");
      const filteredWorks = worksData.filter((work) =>
        filterName === "All" ? work : work.category.name === filterName
      );
      onSelectFilter(filteredWorks);
    });
  });

  return {

/*fetch categorie début*/

    setFilters,
    renderFilters,
  };
};
  
export default createFilters;

/*fetch categorie fin*/