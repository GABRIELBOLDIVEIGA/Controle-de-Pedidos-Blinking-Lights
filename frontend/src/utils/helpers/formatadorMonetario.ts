export function currencyFormt(valor: string | number) {
  try {
    const currency = new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    }).format(parseFloat(`${valor}`));

    return currency;
  } catch (error) {
    return "";
  }
}
