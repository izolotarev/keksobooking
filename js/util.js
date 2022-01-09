const getRandomArbitrary = (min, max, digits) => {
  if (min < 0 || max < 0 || digits < 0) {
    return -1;
  }
  return (Math.random() * (max - min) + min).toFixed(digits);
}


const getRandomArrayElement = (elements) => {
  return elements[getRandomArbitrary(0, elements.length - 1)];
};

export { getRandomArbitrary, getRandomArrayElement};
