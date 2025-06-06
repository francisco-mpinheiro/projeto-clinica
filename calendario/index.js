const mesAnoElemento = document.getElementById("mesAno");
const datasElemento = document.getElementById("datas");
const btnVoltarElemento = document.getElementById("btnVoltar");
const btnAvancarElemento = document.getElementById("btnAvancar");

let dataAtual = new Date();

const atualizarCalendario = () => {
    const anoAtual = dataAtual.getFullYear();
    const mesAtual = dataAtual.getMonth();

    const primeiroDia = new Date(anoAtual, mesAtual, 1);
    const ultimoDia = new Date(anoAtual, mesAtual + 1, 0);
    const totalDias = ultimoDia.getDate();
    const primeiroDiaIndex = (primeiroDia.getDay() + 6) % 7; // Corrige início para segunda-feira

    const mesAnoString = dataAtual.toLocaleString("default", {
        month: "long",
        year: "numeric"
    });
    mesAnoElemento.textContent = mesAnoString;

    let datasHTML = "";

    for (let i = 0; i < primeiroDiaIndex; i++) {
        const diaAnterior = new Date(anoAtual, mesAtual, -i);
        datasHTML = `<div class="data inativa">${diaAnterior.getDate()}</div>` + datasHTML;
    }

    for (let i = 1; i <= totalDias; i++) {
        datasHTML += `<div class="data">${i}</div>`;
    }

    datasElemento.innerHTML = datasHTML;

    adicionarEventosClique();
};

const adicionarEventosClique = () => {
    const dias = document.querySelectorAll(".data:not(.inativa)");
    dias.forEach((dia, index) => {
        dia.addEventListener("click", () => {
            const diaSelecionado = parseInt(dia.textContent);

            // Se já estiver selecionado, desmarcar
            if (dia.classList.contains("selecionado")) {
                dia.classList.remove("selecionado");
                console.log("Nenhuma data selecionada");
                return;
            }

            // Remover seleção anterior
            dias.forEach(d => d.classList.remove("selecionado"));
            dia.classList.add("selecionado");

            // Determinar se o dia é do mês atual
            const datasAntes = Array.from(dias).slice(0, index).filter(d => d.classList.contains("inativa")).length;

            let diaFinal = diaSelecionado;
            let mesFinal = dataAtual.getMonth();
            let anoFinal = dataAtual.getFullYear();

            // Se o elemento é inativo, precisa ajustar mês/ano
            if (dia.classList.contains("inativa")) {
                if (index < 7) {
                    // Dias do mês anterior
                    mesFinal -= 1;
                    if (mesFinal < 0) {
                        mesFinal = 11;
                        anoFinal -= 1;
                    }
                } else {
                    // Dias do próximo mês
                    mesFinal += 1;
                    if (mesFinal > 11) {
                        mesFinal = 0;
                        anoFinal += 1;
                    }
                }
            }

            const dataSelecionada = new Date(anoFinal, mesFinal, diaFinal);
            console.log("Data selecionada:", dataSelecionada.toLocaleDateString("pt-BR"));
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
