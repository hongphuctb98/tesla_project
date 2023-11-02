

export const formatCurrency = (price: number | string) => {
  if (!price) return "";
  price = price.toLocaleString("en-US", { style: "currency", currency: "USD" });
  return price.split(".")[0];
};

export const numberWithCommas = (x: number | string) => {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};


