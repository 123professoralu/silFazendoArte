//1a VERSÃO ESCUTANDO O EVENTO NA LINHA DA TABELA - GERA ERRO DE NÃO REMOVER NOVAS LINHAS
// var encomendas = document.querySelectorAll(".cliente");

// encomendas.forEach(function (encomenda){
//     encomenda.addEventListener("dblclick", function(){
//         //console.log("Fui clicado 2x");
//         this.remove();
//     });
// });

//2A VERSÃO ESCUTANDO O EVENTO NO PAI DE TODOS (TABELA)
var tabela = document.querySelector("table");

tabela.addEventListener("dblclick", function(event){
    event.target.parentNode.classList.add("fadeOut");
    
    setTimeout(function() {
        event.target.parentNode.remove();
    }, 500);
})