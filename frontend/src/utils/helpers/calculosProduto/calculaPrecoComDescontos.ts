export const calculaPrecoComDescontos = (
  preco: number,
  descontos: number[],
) => {
  const precos = [preco];

  for (let index = 0; index < descontos.length; index++) {
    precos.push(precos[index] - precos[index] * (descontos[index] / 100));
  }

  // const ultimoPrecoCalculado = precos[precos.length - 1].toFixed(2);
  const ultimoPrecoCalculado = precos[precos.length - 1];

  return +ultimoPrecoCalculado;
};
