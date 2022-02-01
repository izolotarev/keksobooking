const filtersSet = document.querySelector('.map__filters');
const filters = Array.from(filtersSet.children);
const ADVERTS_COUNT = 10;
const DEFAULT_VALUE = 'any';

const PriceFilterValues = {
  LOW: {
    MIN: 0,
    MAX: 10000,
  },
  MIDDLE: {
    MIN: 10000,
    MAX: 50000,
  },
  HIGH: {
    MIN: 50000,
    MAX: 1000000,
  },
};

const FilterRules = {
  'housing-type': (data, filter) => filter.value === data.offer.type,
  'housing-price': (data, filter) => {
    const selectedPrice = PriceFilterValues[filter.value.toUpperCase()];
    return data.offer.price >= selectedPrice.MIN && data.offer.price < selectedPrice.MAX;
  },
  'housing-rooms': (data, filter) => filter.value === data.offer.rooms.toString(),
  'housing-guests': (data, filter) => filter.value === data.offer.guests.toString(),
  'housing-features': (data, filter) => {
    const checkedListElements = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked'));
    return checkedListElements.every((checkbox) => data.offer.features && data.offer.features.some((feature) => feature === checkbox.value));
  },
};

const filterAdverts = (data) => {
  const adverts = [];
  let _i = 0;
  let result;

  while (_i < data.length && adverts.length < ADVERTS_COUNT) {
    result = filters.every((filter) => (filter.value === DEFAULT_VALUE) ? true : FilterRules[filter.id](data[_i], filter));
    if (result) {
      adverts.push(data[_i]);
    }
    _i++;
  }
  return adverts;
};

const clearFilters = () => {
  filters.map((filter) => {
    filter.value = DEFAULT_VALUE;
  });
  filtersSet.querySelectorAll('input[type="checkbox"]:checked').forEach((checkedElement) => checkedElement.checked = false);
};

export {filterAdverts, clearFilters};
