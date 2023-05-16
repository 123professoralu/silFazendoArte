function formataValor(valor){
    var valor = valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

    return valor;
}

function calculaInsumoProduto(qtde_produto, qtde_embcompra, valor_insumo){
    
    var total = 0;

    total=(valor_insumo/qtde_embcompra)*qtde_produto;

    return total;
}

function validaQtde(qtde){

    if(!isNaN(qtde) && qtde >=0) {
        return true;
    } else{
        return false;
    }
}

function validaUnitario(unitario){
    if(!isNaN(unitario) && unitario >= 0){
        return true;
    }else{
        return false;
    }
}

function calculaTotalInsumos(){

    //Captura os dados de todos os insumos
    var insumos = document.querySelectorAll(".insumos");

    var totalInsumo=0;

     for (var i=0; i < insumos.length; i++){
        //Captura o valor do insumo para o produto
        insumo_produto = insumos[i].querySelector(".valor-produto").textContent;

        //Captura apenas os valores - sem o R$
        insumo_produto = insumo_produto.substring(3, insumo_produto.length);

        //Substitui a , por .
        insumo_produto = insumo_produto.replace(",",".");
        
        //Captura a valor total de cada insumo
        totalInsumo += parseFloat(insumo_produto);
    }

    //Exibe o valor total dos insumos
    document.getElementById("valor-total-insumos").textContent= formataValor(totalInsumo) + " >> " + formataValor(Math.ceil(totalInsumo));

    //Captura a % de lucro informada
    lucro = document.getElementById("lucro").value;

    //Calcula o lucro em cima do valor dos insumos
    lucro_calculado = (Math.round(totalInsumo) * lucro) / 100;

    //Calcula o valor total de venda do produto
    valor_venda_produto = Math.ceil(totalInsumo) + lucro_calculado;

    //Exibe o valor do lucro
    document.getElementById("total-lucro").textContent= lucro + "% >> " + formataValor(lucro_calculado) + " (" + formataValor(valor_venda_produto) + ")";

    //Exibe o valor total de venda do produto
    document.getElementById("total-venda-produto").textContent= formataValor(Math.ceil(valor_venda_produto));
}

function ExportToExcel() {
    var htmltable = document.getElementById('insumosProduto');
    var html = htmltable.outerHTML;
    window.open('data:application/vnd.ms-excel, ' + encodeURIComponent(html));
}