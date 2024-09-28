let currentRound = 1;
const totalRounds = document.querySelectorAll('.rodada').length;

function showRound(round) {
    // Remove a classe 'active' de todas as rodadas
    document.querySelectorAll('.rodada').forEach(rodada => rodada.classList.remove('active'));
    
    // Adiciona a classe 'active' na rodada selecionada
    document.getElementById(`rodada${round}`).classList.add('active');
}

function nextRound() {
    if (currentRound < totalRounds) {
        currentRound++;
        showRound(currentRound);
    }
}

function previousRound() {
    if (currentRound > 1) {
        currentRound--;
        showRound(currentRound);
    }
}

// Inicializar mostrando a primeira rodada
showRound(currentRound);



function mudouTamanho() {
    if (window.innerWidth >= 768) {
        itens.style.display = 'block';
    } else {
        itens.style.display = 'none';
    }
}

function clickMenu() {
    var itens = document.getElementById('itens');
    if (itens.style.display == 'block') {
        itens.style.display = 'none';
    } else {
        itens.style.display = 'block';
    }
}