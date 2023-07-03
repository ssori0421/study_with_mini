const getProductData = () => {
  return fetch('./api/productData.json').then((response) => response.json());
};

export default getProductData;
