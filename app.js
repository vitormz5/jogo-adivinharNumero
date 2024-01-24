let listaNumerosSorteados = [];
let numeroLimite = 10;
//Utilização da função gerarNumeroAleatorio
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//Função com parâmetros
//Pega a tag selecionada e substitui por um texto desejado
function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
}

//Utilização da função exibirTextoNaTela
function exibirMensagemInicial() {
  exibirTextoNaTela("h1", "Jogo do número secreto");
  exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}
exibirMensagemInicial();

//Função sem retorno e sem parâmetros - Função para verificar se acertou ou se o número digitado é maior / menor
function verificarChute() {
  //pegar somente o valor que está no input (o que usuário digitou)
  let chute = document.querySelector("input").value;

  //Condicional para verificar o chute X numeroSecreto
  if (chute == numeroSecreto) {
    exibirTextoNaTela("h1", "Acertou!");
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
    exibirTextoNaTela("p", mensagemTentativas);

    //Pegar tal elemento pelo ID dele
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela("p", "O número secreto é menor");
    } else {
      exibirTextoNaTela("p", "O numero secreto é maior");
    }
    tentativas++;
    limparCampo();
  }
}

//Função com retorno - Gerar número aleatório
function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeElementosNaLista = listaNumerosSorteados.length;

  if (quantidadeDeElementosNaLista == numeroLimite) {
    listaNumerosSorteados = [];
  }

  //Se o número já foi estiver na lista, vai gerar outro
  if (listaNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    //Adiciona o numeroEscolhido no array
    listaNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
}
//Limpa o campo quando clicado no chute
function limparCampo() {
  chute = document.querySelector("input");
  chute.value = "";
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
