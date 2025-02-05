export const escudosTimes = {
    "CRUZEIRO": "Escudo_Cruzeiro_1996.png",
    "PALMEIRAS": "Palmeiras_logo.svg.webp",
    "GRÊMIO": "Gremio_logo.png",
    "ATHLÉTICO PR": "Club_Athletico_Paranaense_2019.png",
    "INTER": "Escudo_do_Sport_Club_Internacional.svg.png",
    "FORTALEZA": "Escudo_do_Fortaleza_EC.png",
    "SÃO PAULO": "Brasao_do_Sao_Paulo_Futebol_Clube.svg.png",
    "BRAGANTINO": "red-bull-bragantino-logo-1.png",
    "FLAMENGO": "logo-flamengo.png",
    "BAHIA": "bahia-logo.png",
    "BOTAFOGO": "botafogo-logo.png",
    "ATLÉTICO MG": "alt-mg-logo.png",
    "FLUMINENSE": "Fluminense_FC_escudo.png",
    "CORINTHIANS": "Corinthians_simbolo.png",
    "VITÓRIA": "vitoria-logo.png",
    "CRICIÚMA": "logo-criciuma.png",
    "CUIABÁ": "cuiaba-logo-escudo.png",
    "VASCO": "vasco-logo.png",
    "ATLÉTICO GO": "Atlético_Goianiense-logo.png",
    "JUVENTUDE": "juventude-logo.png"
};

export const definirClasse = (posicao) => {
    if (posicao <= 4) return "vaga-libertadores";
    if (posicao <= 6) return "pre-libertadores";
    if (posicao <= 16) return "sul-americana";
    return "zona-rebaixamento";
};


const tabelaJogos = document.querySelector("#tabela-jogos-corpo");

export const preencherJogos = (rodada, modo = "resultado") => {
    const endpoint = `http://127.0.0.1:1880/jogos/${rodada}`;

    fetch(endpoint)
        .then(res => res.json())
        .then(res => {
            tabelaJogos.innerHTML = "";

            res.forEach((element, index) => {
                const linha = document.createElement("div");
                linha.classList.add("linha");

                let placarCasa = localStorage.getItem(`rodada-${rodada}-jogo-${index}-casa`) || "";
                let placarVisitante = localStorage.getItem(`rodada-${rodada}-jogo-${index}-visitante`) || "";

                let placarHTML;
                if (modo === "simulador") {
                    placarHTML = `
                        <input type="number" min="0"  placeholder="0" class="placar-casa" data-rodada="${rodada}" data-index="${index}" data-time="casa" value="${placarCasa}">
                        <span class="estiloplacar"> X </span>
                        <input type="number" min="0"  placeholder="0" class="placar-visitante" data-rodada="${rodada}" data-index="${index}" data-time="visitante" value="${placarVisitante}">
                    `;
                } else {
                    placarHTML = `
                        ${element.i_placar_mandante} 
                        <span class="estiloplacar"> X </span> 
                        ${element.i_placar_visitante}
                    `;
                }

                linha.innerHTML = `
                    <div class="celula team">
                        <span>${element.s_time_mandante}</span>
                        <img src="../assets/imagens/${escudosTimes[element.s_time_mandante.toUpperCase()] || "escudo-padrao.png"}">
                    </div>
                    <div class="celulaPlacar">${placarHTML}</div>
                    <div class="celula team">
                        <img src="../assets/imagens/${escudosTimes[element.s_time_visitante.toUpperCase()] || "escudo-padrao.png"}">
                        <span>${element.s_time_visitante}</span>
                    </div>
                `;

                tabelaJogos.appendChild(linha);
            });

            // Salvar placares no localStorage ao alterar
            document.querySelectorAll(".placar-casa, .placar-visitante").forEach(input => {
                input.addEventListener("input", (e) => {
                    const rodada = e.target.dataset.rodada;
                    const index = e.target.dataset.index;
                    const time = e.target.dataset.time;
                    localStorage.setItem(`rodada-${rodada}-jogo-${index}-${time}`, e.target.value);
                });
            });
        })
        .catch(err => console.error("Erro ao carregar jogos:", err));
};


