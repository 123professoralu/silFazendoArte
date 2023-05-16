var botaoAdicionar = document.querySelector("#buscar-encomendas");

botaoAdicionar.addEventListener("click", function(){
    console.log("Buscando encomendas");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/encomendas_web");
    xhr.addEventListener("load", function(){

        var erroAjax = document.querySelector("#erro-ajax");
        //Verifica se a conexão é feita com sucesso
        //200 é o código de sucesso
        if(xhr.status == 200) {
            //Apaga qualquer mensagem de erro
            erroAjax.classList.add("invisivel");

            var resposta = xhr.responseText;
            console.log(typeof resposta);

            var encomendas = JSON.parse(resposta);
            encomendas.forEach(function(encomenda) {
                encomenda.total = calculaTotal(encomenda.qtde, encomenda.unitario);
                adicionaEncomendaNaTabela(encomenda);
            });
        } else {
            //Deu erro, exibe o código e a mensagem de erro no console
            console.log(xhr.status);
            console.log(xhr.responseText);
            erroAjax.classList.remove("invisivel");
        }
    });
    xhr.send();
});