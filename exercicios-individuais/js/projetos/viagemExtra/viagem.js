const inputDistancia = document.querySelector("#distancia");
const inputConsumo = document.querySelector("#consumo");
const inputPreco = document.querySelector("#preco");
const inputPedagio = document.querySelector("#pedagio");
const inputAlimentacao = document.querySelector("#alimentacao");
const inputViajantes = document.querySelector("#viajantes");

const spanCustoTotal = document.querySelector("#custo-total");
const spanCustoPorPessoa = document.querySelector("#custo-por-pessoa");

function calcularCustoCombustivel(distancia, consumo, preco) {
  if (consumo === 0) {
    return 0;
  }
  const litrosNecessarios = distancia / consumo;
  return litrosNecessarios * preco;
}

function calcularCustoPorPessoa(custoTotal, numeroDeViajantes) {
  if (numeroDeViajantes === 0) {
    return 0;
  }
  return custoTotal / numeroDeViajantes;
}

function atualizarResultados() {
  const distancia = Number(inputDistancia.value);
  const consumo = Number(inputConsumo.value);
  const preco = Number(inputPreco.value);
  const pedagio = Number(inputPedagio.value);
  const alimentacao = Number(inputAlimentacao.value);
  const viajantes = Number(inputViajantes.value);



  const custoTotal = calcularCustoCombustivel(distancia, consumo, preco);

  const custoAdicional = pedagio + alimentacao;

  const custoTotalComAdicionais = custoTotal + custoAdicional;

  const custoPorPessoa = calcularCustoPorPessoa(custoTotalComAdicionais, viajantes);

  const formatarMoeda = (valor) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  spanCustoTotal.textContent = formatarMoeda(custoTotalComAdicionais);
  spanCustoPorPessoa.textContent = formatarMoeda(custoPorPessoa);
}

const todosOsInputs = [
  inputDistancia,
  inputConsumo,
  inputPreco,
  inputPedagio,
  inputAlimentacao,
  inputViajantes,
];

todosOsInputs.forEach((input) => {
  input.addEventListener("input", atualizarResultados);
});

document.addEventListener("DOMContentLoaded", atualizarResultados);
