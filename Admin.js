const API="AKfycby-c2Trv1hfk3jPPp8CmxXV-RfGcvo9p-QnPXkr_flJH1Si7ry2FLe7-Ov4wciq7A2jdg";

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
