const DEFAULT_VALUE = 'any';
const filtersSet = document.querySelector('.map__filters');
const filters = Array.from(filtersSet.children);

const clearFilters = () => {
  filters.map((filter) => {
    filter.value = DEFAULT_VALUE;
  });
  filtersSet.querySelectorAll('input[type="checkbox"]:checked').forEach((checkedElement) => checkedElement.checked = false);
};

export { clearFilters };
