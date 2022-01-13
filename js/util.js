const getRandomArbitrary = (min, max, digits) => {
  if (min < 0 || max < 0 || digits < 0) {
    return -1;
  }
  return (Math.random() * (max - min) + min).toFixed(digits);
}


const getRandomArrayElement = (elements) => {
  return elements[getRandomArbitrary(0, elements.length - 1)];
};

const makeUniqueRandomIntegerGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomArbitrary(min, max, 0);
    if (previousValues.length >= (max - min + 1)) {
      throw new Error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomArbitrary(min, max, 0);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

export { getRandomArbitrary, getRandomArrayElement, makeUniqueRandomIntegerGenerator};
