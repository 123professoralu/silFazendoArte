//var botaoAdicionar = document.querySelector("#climatempo");

//botaoAdicionar.addEventListener("load", function(){
    console.log("Buscando encomendas");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://apiadvisor.climatempo.com.br/api/v1/weather/locale/3477/current?token=862c11df57187edc3084da6f6d5dbb3d");
    xhr.addEventListener("load", function(){
        console.log("entrou");
        // var erroAjax = document.querySelector("#erro-ajax");
        // //Verifica se a conexão é feita com sucesso
        // //200 é o código de sucesso
        // if(xhr.status == 200) {
        //     //Apaga qualquer mensagem de erro
        //     erroAjax.classList.add("invisivel");

        //     var resposta = xhr.responseText;
        //     console.log(typeof resposta);

        //     var encomendas = JSON.parse(resposta);
        //     encomendas.forEach(function(encomenda) {
        //         encomenda.total = calculaTotal(encomenda.qtde, encomenda.unitario);
        //         adicionaEncomendaNaTabela(encomenda);
        //     });
        // } else {
        //     //Deu erro, exibe o código e a mensagem de erro no console
        //     console.log(xhr.status);
        //     console.log(xhr.responseText);
        //     erroAjax.classList.remove("invisivel");
        // }
    });
    xhr.send();
//});