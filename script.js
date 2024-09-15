let currentRound = 1;
const totalRounds = 3; // Atualize conforme o número total de rodadas

function showRound(round) {
    document.querySelectorAll('.rodada').forEach((element, index) => {
        element.classList.remove('active');
        if (index + 1 === round) {
            element.classList.add('active');
        }
    });
}

function nextRound() {
    currentRound = (currentRound % totalRounds) + 1;
    showRound(currentRound);
}

function previousRound() {
    currentRound = (currentRound - 2 + totalRounds) % totalRounds + 1;
    showRound(currentRound);
}

// Inicializa a primeira rodada
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