//Iniciando com Eventos
//titulo.addEventListener("click", monstraMensagem);

//  function monstraMensagem(){
//      console.log("O título foi clicado.");
//  }

// titulo.addEventListener("click", function () {
//     console.log("Função anônima - título clicado.");
// })

var botaoAdicionar = document.querySelector("#adicionar-encomenda");

botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();
    console.log("Agora sim, o botão foi clicado!");
});

// botaoAdicionar.addEventListener("click", function() {
//     console.log("O botão foi clicado!");
// })

botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();
    //console.log("Agora sim, o botão foi clicado!");

    //console.log(form);
    // console.log(form.nome.value);
    // console.log(form.qtde.value);

    var form = document.querySelector("#form-adiciona");
    
    //Captura informações da Encomenda
    var encomenda = obtemEncomenda(form);

    //Monta a TR (Linha)
    var encomendaTr = montaTr(encomenda);

    //Valida se os valores estão corretos para inserir na tabela
    var validacao=validaEncomenda(encomenda);

    if(validacao.length > 0){
        //Tivemos erros de preenchimento do formulário
        exibeMensagensErro(validacao);
        return;
    }
    
    var tabela = document.querySelector("#tabela-clientes");
    tabela.appendChild(encomendaTr);

    //Limpa o formulário
    form.reset();

    //Limpa a UL de erros
    document.querySelector("#mensagens-erro").innerHTML="";
})

function obtemEncomenda(form){

    // var nome = form.nome.value;
    // var qtde = form.qtde.value;
    // var produto = form.produto.value;
    // var unitario = parseFloat(form.unitario.value);

    var encomenda = {
        nome: form.nome.value,
        qtde: form.qtde.value,
        produto: form.produto.value,
        unitario: parseFloat(form.unitario.value),
        total: calculaTotal(form.qtde.value, form.unitario.value)
    }

    return encomenda;
}

function montaTr(encomenda){

    var clienteTr = document.createElement("tr");
    clienteTr.classList.add("encomenda");

    // var nomeTd = document.createElement("td");
    // var qtdeTd = document.createElement("td");
    // var produtoTd = document.createElement("td");
    // var unitarioTd = document.createElement("td");
    // var totalTd = document.createElement("td");

    // nomeTd.textContent = encomenda.nome;
    // qtdeTd.textContent = encomenda.qtde;
    // produtoTd.textContent = encomenda.produto;
    // unitarioTd.textContent = encomenda.unitario.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    // totalTd.textContent = encomenda.total;

    // var nomeTd = montaTd(encomenda.nome, "info-nome");
    // var qtdeTd = montaTd(encomenda.qtde, "info-qtde");
    // var produtoTd = montaTd(encomenda.produto, "info-produto");
    // var unitarioTd = montaTd(formataValor(encomenda.unitario), "info-unitario");
    // var totalTd = montaTd(encomenda.total, "info-total");

    clienteTr.appendChild(montaTd(encomenda.nome, "info-nome"));
    clienteTr.appendChild(montaTd(encomenda.produto, "info-produto"));
    clienteTr.appendChild(montaTd(encomenda.qtde, "info-qtde"));
    clienteTr.appendChild(montaTd(formataValor(encomenda.unitario), "info-unitario"));
    clienteTr.appendChild(montaTd(encomenda.total, "info-total"));

    return clienteTr;
}

function montaTd(dado, classe){
    
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaEncomenda(encomenda){

    var erros = [];

    if(encomenda.nome.length==0){
        erros.push("O nome do cliente não pode ser vazio.");
    }

    if(encomenda.produto==""){
        erros.push("Por favor, selecione um produto para esta encomenda.");
    }

    if (!validaQtde(encomenda.qtde) || encomenda.qtde.length==0) {
        erros.push("A quantidade é inválida.");
    }

    if (!validaUnitario(encomenda.unitario) || encomenda.unitario.length==0) {
        erros.push("O valor unitário é inválido.");
    }

    return erros;
}

function exibeMensagensErro(erros){
    var ul = document.querySelector("#mensagens-erro");
    
    //Limpa a UL para as novas mensagens
    ul.innerHTML = "";

    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    })
}