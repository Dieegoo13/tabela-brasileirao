import { escudosTimes, definirClasse, preencherJogos } from "./utils.js";

// MENU
const btn_menu = document.querySelector("#btn_menu")

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
// ***********************

// TABELA DE CLASSIFICAÇÂO

const tbody = document.querySelector("#tabela-classificacao-corpo")


const preencherTabela = () => {
    const endpoint = `http://127.0.0.1:1880/dados`;

    fetch(endpoint)
    .then(res => res.json())
    .then(res => {

        res.sort((a, b) => {
            if (b.i_ponto !== a.i_ponto) return b.i_ponto - a.i_ponto;
            return b.i_vitoria - a.i_vitoria;
        });

        tbody.innerHTML = "";

        res.forEach((time, index) => {
            const linha = document.createElement('tr');
            linha.classList.add(definirClasse(index + 1)); 

            const escudo = escudosTimes[time.s_time.toUpperCase()] || "escudo-padrao.png";

            linha.innerHTML = `
                <td class = "alinhado">${index + 1} <img src="../assets/imagens/${escudo}"><span> ${time.s_time}</span></td>
                <td>${time.i_ponto}</td>
                <td>${time.i_jogo}</td>
                <td>${time.i_vitoria}</td>
                <td>${time.i_empate}</td>
                <td>${time.i_derrota}</td>
            `;

            tbody.appendChild(linha);
        });
    });
}

preencherTabela();

// TABELA RODADAS

document.addEventListener("DOMContentLoaded", () => {
    preencherJogos(rodada, "resultado"); 
});
//****************** */


// SETAS DAS RODADAS

let rodadaAtual = 1;
const totalRodadas = 38;
const spanRodada = document.querySelector("#rodada-atual")
const btn_proxima = document.querySelector("#btn_proxima")
const btn_anterior = document.querySelector("#btn_anterior")
const tabelaJogos = document.querySelector("#tabela-jogos-corpo");

const carregarRodada = (rodada) => {
    spanRodada.textContent = `rodada ${rodada}`

    const endpoint = `http://127.0.0.1:1880/jogos/${rodada}`

    fetch(endpoint)
    .then(res=> res.json())
    .then(jogos => {
        tabelaJogos.innerHTML = ""
        jogos.forEach(jogo => {
            const linha = document.createElement("div")
            linha.setAttribute("class", "linha")
            linha.innerHTML = `<div class="celula team">
                        <span>${jogo.s_time_mandante}</span>
                        <img src="../assets/imagens/${escudosTimes[jogo.s_time_mandante.toUpperCase()] || "escudo-padrao.png"}">
                    </div>
                    <div class="celulaPlacar">
                        <span>${jogo.i_placar_mandante} X ${jogo.i_placar_visitante}</span>
                    </div>
                    <div class="celula team">
                        <img src="../assets/imagens/${escudosTimes[jogo.s_time_visitante.toUpperCase()] || "escudo-padrao.png"}">
                        <span>${jogo.s_time_visitante}</span>
                    </div>`;

            tabelaJogos.appendChild(linha);
        })
    })
}

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


// ***********************