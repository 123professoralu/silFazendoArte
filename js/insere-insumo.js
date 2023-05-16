var botaoAdicionar = document.querySelector("#adicionar-insumo");

botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");
    
    //Captura informações do Insumo
    var insumo = obtemInsumo(form);

    //Valida se os valores estão corretos para inserir na tabela
    var validacao=validaInsumo(insumo);

    if(validacao.length > 0){
        //Tivemos erros de preenchimento do formulário
        exibeMensagensErro(validacao);
        return;
    }

    //Chama a função que adiciona o insumo na tabela
    adicionaInsumoNaTabela(insumo);

    //Chama o cálculo do total de insumos
    calculaTotalInsumos();

    //Limpa o formulário
    document.getElementById("nome_insumo").value="";
    document.getElementById("qtde_produto").value="";
    document.getElementById("qtde_embcompra").value="";
    document.getElementById("valor_insumo").value="";

    //Limpa a UL de erros
    document.querySelector("#mensagens-erro").innerHTML="";
})

function obtemInsumo(form){

    var insumo = {
        nome: form.nome_insumo.value,
        qtde_produto: form.qtde_produto.value,
        qtde_embcompra: form.qtde_embcompra.value,
        valor_insumo: parseFloat(form.valor_insumo.value),
        total: calculaInsumoProduto(form.qtde_produto.value, form.qtde_embcompra.value, form.valor_insumo.value)
    }

    return insumo;
}

function montaTr(insumo){

    var insumoTr = document.createElement("tr");
    insumoTr.classList.add("insumos");

    insumoTr.appendChild(montaTd(insumo.nome, "nome-insumo"));
    insumoTr.appendChild(montaTd(insumo.qtde_produto, "qtde-produto"));
    insumoTr.appendChild(montaTd(insumo.qtde_embcompra, "qtde-embcompra"));
    insumoTr.appendChild(montaTd(formataValor(insumo.valor_insumo), "valor-insumo"));
    insumoTr.appendChild(montaTd(formataValor(insumo.total), "valor-produto"));

    return insumoTr;
}

function montaTd(dado, classe){
    
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaInsumo(insumo){

    var erros = [];

    if(insumo.nome.length==0){
        erros.push("O nome do insumo não pode ser vazio.");
    }

    if (!validaQtde(insumo.qtde_produto) || insumo.qtde_produto.length==0) {
        erros.push("A quantidade do insumo para o produto é inválida.");
    }

    if (!validaQtde(insumo.qtde_embcompra) || insumo.qtde_embcompra.length==0) {
        erros.push("A quantidade do insumo na embalagem de compra é inválida.");
    }

    if (!validaUnitario(insumo.valor_insumo) || insumo.valor_insumo.length==0) {
        erros.push("O valor do insumo é inválido.");
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

function adicionaInsumoNaTabela(insumo) {
    var insumoTr = montaTr(insumo);
    var tabela = document.querySelector("#tabela-insumos");
    tabela.appendChild(insumoTr);
}