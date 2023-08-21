const createFilters = ({ onSelectFilter, categories }) => {
  const filtersElement = document.createElement("div");
  filtersElement.classList.add("filter");

  const renderFilters = () => {
    filtersElement.innerHTML = "";

    const createFilterButton = (categoryId, categoryName) => {
      const button = document.createElement("div");
      button.id = categoryId;
      button.classList.add("filter-button");
      button.innerHTML = `<p>${categoryName}</p>`;

      button.addEventListener("click", () => {
        onSelectFilter(categoryId);
      });

      return button;
    };

    const buttonAll = createFilterButton("all", "All");
    filtersElement.appendChild(buttonAll);

    categories.forEach((category) => {
      const button = createFilterButton(category.name, category.name);
      filtersElement.appendChild(button);
    });

    return filtersElement;
  };

  return {
    renderFilters,
  };
};

export default createFilters;