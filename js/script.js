var textoEntrada = "";
var btnPaste = null;
var textoResultado = '';
var trilho = document.querySelector(".trilho");
var indicador = document.querySelector(".indicador");
var body = document.querySelector("body");

// EVENTOS DOS BOTÕES
// Evento de carregamento da página, limpa o histórico de criptografias
document.addEventListener('DOMContentLoaded', () => {
    clearSearchHistory();
});

// Evento do botão Trilho que altera os estilos da página para 'DARK'
if (trilho) {

    trilho.addEventListener('click', () => {
        trilho.classList.toggle('dark');
        indicador.classList.toggle('dark');
        body.classList.toggle('dark');
        console.log('função trilho');
    });
}

// Evento do botão Criptografar
document.addEventListener('DOMContentLoaded', () => {

    var btnCript = document.querySelector("#btn-cript");

    btnCript.addEventListener('click', async () => {
        try {
            criptografar();
            addSearchToHistory(document.getElementById("entrada").value);
            addSearchToHistory(document.getElementById("texto-resultado").innerHTML);
            if (window.matchMedia("(max-width: 768px)").matches) {
                rolagemTela();
            }
        } catch (err) {
            console.log('Failed to cript: ', err);
        }   
    });
});

// Evento do botão Descriptografar
document.addEventListener('DOMContentLoaded', () => {
    
    var btnDescript = document.querySelector("#btn-descript");

    btnDescript.addEventListener('click',() => {
        descriptografar();
        addSearchToHistory(document.getElementById("entrada").value);
        addSearchToHistory(document.getElementById("texto-resultado").innerHTML);
        if (window.matchMedia("(max-width: 768px)").matches) {
            rolagemTela();
        }
    });
});

// Evento do botão ver histórico que exibe o histórico de criptografias e o botão de fechar 
//o histórico
document.getElementById('historyButton').addEventListener('click', () => {
    displayHistory();
    openHistory();
});

// Evento para fechar o histórico e o botão de fechar o histórico
document.getElementById('closeHistoryButton').addEventListener('click', closeHistory);

// Evento do botão Copiar
document.addEventListener('DOMContentLoaded', () => {

    var textoResultado = document.querySelector("#texto-resultado");
    var btnCopiar = document.querySelector("#btn-copy");

    btnCopiar.addEventListener('click',() => {
        navigator.clipboard.writeText(textoResultado.innerHTML)
            .then(() => {
                document.getElementById("entrada").value = '';
                textoResultado.innerHTML = ''; // Limpa a área de texto após copiar
                window.scrollTo(0, 0); // Rolagem de tela para o topo
            })
            .catch((err) => {
                console.log('Failed to copy: ', err);
            });
    });
});

//Evento do botão colar
document.addEventListener('DOMContentLoaded', () => {

    var textoEntrada = document.querySelector("#entrada");
    var btnPaste = document.querySelector("#btn-paste");

    btnPaste.addEventListener('click', async () => {
        try {
            const textoResultado = await navigator.clipboard.readText();
            textoEntrada.value = textoResultado;
        } catch (err) {
            console.log('Failed to paste: ', err);
        }
    });
})

// Evento do botão Limpar
document.addEventListener('DOMContentLoaded', ()=>{

    var textoEntrada = document.querySelector("#entrada");
    var textoResultado = document.querySelector("#texto-resultado");
    var btnLimpar = document.querySelector("#btn-clear");

    btnLimpar.addEventListener('click', async () => {
        try {
            textoEntrada.value = '';
            textoResultado.innerHTML = '';
        } catch (err) {
            console.log('Failed to clear: ', err);
        }
    });
})

// FUNÇÕES
// Função para criptografar o texto
function criptografar() {

    // Altera o display dos botões
    estiloDisplay();
    
    var frase = document.getElementById("entrada").value;
    var resultadoDiv = document.getElementById("texto-resultado");
    
    // i = case insensitive
    // g = global
    // m = multiline
    var textoEntrada = frase.replace(/e/img, "enter");
    textoEntrada = textoEntrada.replace(/o/img, "ober");
    textoEntrada = textoEntrada.replace(/i/img, "imes");
    textoEntrada = textoEntrada.replace(/a/img, "ai");
    textoEntrada = textoEntrada.replace(/u/img, "ufat");

    // Armazena o texto criptografado na resultadoDiv
    resultadoDiv.innerHTML = textoEntrada;

    // Exibe o resultado
    resultadoDiv.style.display = "block";
}

// Função para descriptografar o texto
function descriptografar() {

    // Altera o display dos botões
    estiloDisplay();
    
    // Recebe o texto a ser descriptografado
    const frase = document.getElementById("entrada").value;
    const resultadoDiv = document.getElementById("texto-resultado");
    
    // i = case insensitive
    // g = global
    // m = multiline
    var textoEntrada = frase.replace(/enter/img, "e");
    textoEntrada = textoEntrada.replace(/ober/img, "o");
    textoEntrada = textoEntrada.replace(/imes/img, "i");
    textoEntrada = textoEntrada.replace(/ai/img, "a");
    textoEntrada = textoEntrada.replace(/ufat/img, "u");

    // Armazena o texto descriptografado na resultadoDiv
    resultadoDiv.innerHTML = textoEntrada;

    // Exibe o resultado
    resultadoDiv.style.display = "block";
}

// Função para o indicador do Trilho
function slideIndicator(trilho) {
    const indicador = trilho.querySelector('.indicador');
    const isAtStart = indicador.style.left === '0px';

    // Move o indicador para a direita ou esquerda
    indicador.style.left = isAtStart ? '50px' : '0px';
    console.log('função slide indicador' + indicador);
}

// Função para alterar o display com o evento click criptografar
function estiloDisplay() {

    const textoEntrada = document.getElementById("entrada");
    const tela = document.getElementById("sem-resultado");
    const btnCript = document.getElementById("btn-cript");
    const btnDescript = document.getElementById("btn-descript");
    const btnCopy = document.getElementById("btn-copy");
    const btnPaste = document.getElementById("btn-paste");
    const btnClear = document.getElementById("btn-clear");
    
    // Se o botão Criptografar ou Descriptografar for clicado, exibe os botões de 
    //copiar, colar e limpar
    if ((btnCript && textoEntrada) || (btnDescript && textoEntrada)) {
        console.log('display 1');
        tela.style.display = "none";
        btnCopy.style.display = "block";
        btnPaste.style.display = "block";
        btnClear.style.display = "block";
    } else {
        console.log('display 2');
        tela.style.display = "block";
        btnCopy.style.display = "none";
        btnPaste.style.display = "none";
        btnClear.style.display = "none";        
    }
}

// Função para adicionar a criptografia ao histórico
function addSearchToHistory(search) {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Adiciona as mensagens criptografadas ao histórico
    history.push({ query: search, timestamp: new Date().toLocaleString() });

    // Serializa o Objeto para JSON e Armazena a String JSON no Local Storage
    localStorage.setItem('searchHistory', JSON.stringify(history));
}

// Função para exibir o histórico de criptografias
function displayHistory() {

    const historyContainer = document.getElementById('historyContainer');

    // Limpa o conteúdo do histórico
    historyContainer.innerHTML = ''; 

    // Recupera o histórico de criptografias do Local Storage
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Se não houver histórico, exibe uma mensagem
    if (history.length === 0) {
        historyContainer.innerHTML = '<p>Nenhum histórico de pesquisa encontrado.</p>';
        return;
    }

    // Exibe o histórico de criptografias
    history.forEach(entry => {
        let div = document.createElement('div');
        div.textContent = `${entry.timestamp}: ${entry.query}`;
        historyContainer.appendChild(div);
    });
}

// Função para limpar o histórico de criptografias
function clearSearchHistory() {
    localStorage.removeItem('searchHistory');
}

// Função para exibir o histórico de criptografias
function openHistory() {

    const btnOpen = document.getElementById('historyButton');
    const historyContainer = document.getElementById('historyContainer');
    const btnClose = document.getElementById('closeHistoryButton');

    // Exibe o histórico e o botão de fechar o histórico
    if (historyContainer) {
        btnOpen.style.display = "none";
        historyContainer.style.display = "block";
        btnClose.style.display = "block";
    }
}

// // Função para ocultar o histórico de criptografias
function closeHistory() {

    const historyContainer = document.getElementById('historyContainer');
    const btnClose = document.getElementById('closeHistoryButton');
    const btnOpen = document.getElementById('historyButton');

    // Esconde o histórico e o botão de fechar o histórico
    if (btnOpen) {
        btnOpen.style.display = "block";
        historyContainer.style.display = "none";
        btnClose.style.display = "none";
    }
}

// Função pra rolagem de tela
function rolagemTela() {
    window.scrollTo(0, 700);
}