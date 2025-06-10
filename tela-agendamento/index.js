const mesAnoElemento = document.getElementById("mesAno");
const datasElemento = document.getElementById("datas");
const btnVoltarElemento = document.getElementById("btnVoltar");
const btnAvancarElemento = document.getElementById("btnAvancar");
const dataSelecionadaElemento = document.getElementById("dataSelecionada");

let dataSelecionada = null;
let dataAtual = new Date();

const atualizarCalendario = () => {
  const anoAtual = dataAtual.getFullYear();
  const mesAtual = dataAtual.getMonth();

  const primeiroDia = new Date(anoAtual, mesAtual, 1);
  const ultimoDia = new Date(anoAtual, mesAtual + 1, 0);
  const totalDias = ultimoDia.getDate();
  const primeiroDiaIndex = primeiroDia.getDay();
  const ultimoDiaIndex = ultimoDia.getDate();

  const mesAnoString = dataAtual.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  mesAnoElemento.textContent = mesAnoString;

  let datasHTML = "";

  for (let i = primeiroDiaIndex; i > 0; i--) {
    const voltarData = new Date(anoAtual, mesAtual, 0 - i + 1);
    datasHTML += `<div class="data inativa">${voltarData.getDate()}</div>`;
  }

  for (let i = 1; i <= totalDias; i++) {
    const data = new Date(anoAtual, mesAtual, i);

    const isSelecionada =
      dataSelecionada && data.toDateString() === dataSelecionada.toDateString();

    datasHTML += `<div class="data${
      isSelecionada ? " selecionada" : ""
    }" data-dia="${i}">${i}</div>`;
  }

  for (let i = 1; i <= 7 - ultimoDiaIndex; i++) {
    const avancarData = new Date(anoAtual, mesAtual + 1, i);
    datasHTML += `<div class="data inativa">${avancarData.getDate()}</div>`;
  }

  datasElemento.innerHTML = datasHTML;

  adicionarEventosClique();
};

const adicionarEventosClique = () => {
  const dias = document.querySelectorAll(".data:not(.inativa)");
  dias.forEach((dia) => {
    dia.addEventListener("click", () => {
      const diaClicado = parseInt(dia.getAttribute("data-dia"));
      const mes = dataAtual.getMonth();
      const ano = dataAtual.getFullYear();
      const novaData = new Date(ano, mes, diaClicado);

      
      if (
        dataSelecionada &&
        novaData.toDateString() === dataSelecionada.toDateString()
      ) {
        dia.classList.remove("selecionada");
        dataSelecionada = null;
        dataSelecionadaElemento.textContent = "";
        return;
      }

      
      dias.forEach((d) => d.classList.remove("selecionada"));
      dia.classList.add("selecionada");
      dataSelecionada = novaData;

      const dataFormatada = dataSelecionada.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });

      dataSelecionadaElemento.textContent = `${dataFormatada}`;
      
    });
  });
};

btnVoltarElemento.addEventListener("click", () => {
  dataAtual.setMonth(dataAtual.getMonth() - 1);
  atualizarCalendario();
});

btnAvancarElemento.addEventListener("click", () => {
  dataAtual.setMonth(dataAtual.getMonth() + 1);
  atualizarCalendario();
});

atualizarCalendario();



