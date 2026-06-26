const API="SUA_URL_APPS_SCRIPT";

async function carregar(){

const resposta=await fetch(

`${API}?acao=listar`

);

const dados=await resposta.json();

let html="";

dados.forEach(a=>{

html+=`

<tr>

<td>${a.data}</td>

<td>${a.hora}</td>

<td>${a.cliente}</td>

<td>${a.servico}</td>

</tr>

`;

});

document.getElementById(

"tabela"

).innerHTML=html;

}

carregar();
