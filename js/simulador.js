import { escudosTimes, definirClasse, preencherJogos } from "./utils.js";

// MENU

btn_menu.addEventListener("click", () => {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "../assets/imagens/menu_white_36dp.svg"
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "../assets/imagens/close_white_36dp.svg"
    }
}) 

// TABELA RODADAS

const btn_simular = document.querySelector("#btn_simular");


btn_simular.addEventListener("click", () => {
    const jogos = document.querySelectorAll(".celulaPlacar");

    let novaClassificacao = {};

    jogos.forEach(jogo => {
        let nomeTimeCasa = jogo.parentElement.querySelector(".team:first-child span");
        let nomeTimeVisitante = jogo.parentElement.querySelector(".team:last-child span");

        let elementoPlacarCasa = jogo.querySelector(".placar-casa");
        let elementoPlacarVisitante = jogo.querySelector(".placar-visitante");

        let timeCasa = nomeTimeCasa.textContent.trim();
        let timeVisitante = nomeTimeVisitante.textContent.trim();

        let placarCasa = parseInt(elementoPlacarCasa.value) || 0;
        let placarVisitante = parseInt(elementoPlacarVisitante.value) || 0;

        if (!novaClassificacao[timeCasa]) {
            novaClassificacao[timeCasa] = { pontos: 0, vitorias: 0, empates: 0, derrotas: 0 };
        }
        if (!novaClassificacao[timeVisitante]) {
            novaClassificacao[timeVisitante] = { pontos: 0, vitorias: 0, empates: 0, derrotas: 0 };
        }

        if (placarCasa > placarVisitante) {
            novaClassificacao[timeCasa].pontos += 3;
            novaClassificacao[timeCasa].vitorias += 1;
            novaClassificacao[timeVisitante].derrotas += 1;
        } else if (placarVisitante > placarCasa) {
            novaClassificacao[timeVisitante].pontos += 3;
            novaClassificacao[timeVisitante].vitorias += 1;
            novaClassificacao[timeCasa].derrotas += 1;
        } else {
            novaClassificacao[timeCasa].pontos += 1;
            novaClassificacao[timeVisitante].pontos += 1;
            novaClassificacao[timeCasa].empates += 1;
            novaClassificacao[timeVisitante].empates += 1;
        }
    });

    atualizarTabelaClassificacao(novaClassificacao);
});

const atualizarTabelaClassificacao = (novaClassificacao) => {
    // Carregar a classificação anterior
    let classificacaoSalva = JSON.parse(localStorage.getItem("classificacaoBrasileirao")) || {};

    // Atualizar os dados antigos com os novos resultados
    Object.keys(novaClassificacao).forEach(time => {
        if (!classificacaoSalva[time]) {
            classificacaoSalva[time] = { pontos: 0, vitorias: 0, empates: 0, derrotas: 0, jogos: 0 };
        }

        classificacaoSalva[time].pontos += novaClassificacao[time].pontos;
        classificacaoSalva[time].vitorias += novaClassificacao[time].vitorias;
        classificacaoSalva[time].empates += novaClassificacao[time].empates;
        classificacaoSalva[time].derrotas += novaClassificacao[time].derrotas;
        classificacaoSalva[time].jogos += (novaClassificacao[time].vitorias + novaClassificacao[time].empates + novaClassificacao[time].derrotas);
    });

    // Salvar no localStorage
    localStorage.setItem("classificacaoBrasileirao", JSON.stringify(classificacaoSalva));

    // Ordenar e atualizar a tabela na tela
    let classificacaoOrdenada = Object.keys(classificacaoSalva).map(time => {
        return {
            nome: time,
            pontos: classificacaoSalva[time].pontos,
            vitorias: classificacaoSalva[time].vitorias,
            empates: classificacaoSalva[time].empates,
            derrotas: classificacaoSalva[time].derrotas,
            jogos: classificacaoSalva[time].jogos
        };
    }).sort((a, b) => b.pontos - a.pontos || b.vitorias - a.vitorias);

    const tbody = document.querySelector("#tabela-classificacao-corpo");
    tbody.innerHTML = "";

    classificacaoOrdenada.forEach((time, index) => {
        const linha = document.createElement("tr");
        linha.classList.add(definirClasse(index + 1)); 

        linha.innerHTML = `
            <td class="alinhado">${index + 1} <img src="../assets/imagens/${escudosTimes[time.nome.toUpperCase()] || "escudo-padrao.png"}"><span> ${time.nome}</span></td>
            <td>${time.pontos}</td>
            <td>${time.jogos}</td>
            <td>${time.vitorias}</td>
            <td>${time.empates}</td>
            <td>${time.derrotas}</td>
        `;

        tbody.appendChild(linha);
    });
};


window.onload = () => {
    atualizarTabelaClassificacao({});
};


// SETAS RODADAS

let rodadaAtual = 1;
const totalRodadas = 38;
const spanRodada = document.querySelector("#rodada-atual")
const btn_proxima = document.querySelector("#btn_proxima")
const btn_anterior = document.querySelector("#btn_anterior")

const carregarRodada = (rodada) => {
    spanRodada.textContent = `Rodada ${rodada}`;
    preencherJogos(rodada, "simulador");
};

carregarRodada(rodadaAtual)


btn_proxima.addEventListener("click", () => {
    if (rodadaAtual > 1) { 
        rodadaAtual-- 
        carregarRodada(rodadaAtual);
    }
});

btn_anterior.addEventListener("click", () => {
    if (rodadaAtual < totalRodadas) {
        rodadaAtual++ 
        carregarRodada(rodadaAtual);
    }
});