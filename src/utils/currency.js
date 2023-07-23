export const convertPrice = (price = 0) => {
  if (price) {
    var currency = price
      .toString()
      .match(/.{1,3}/g)
      .join(".");
    currency = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); //replace sttring using regex
    return currency;
  } else {
    return price;
  }
};

export const currencyUtils = {
  convertPrice
};

export default currencyUtils;