// ATENÇÃO: Use sempre a URL completa do seu script terminando com /exec
const API = "https://google.commacros/s/AKfycbzs99-zCpmhX7fEK81dLDoJEkTMMv5gF2Q7lFjWvEDoDjzPyGq-Gt47EvYf6TzWyJNG8A/exec";"

// 1. FUNÇÃO PARA SALVAR O AGENDAMENTO (Disparada pelo botão do HTML)
async function agendar() {
    const cliente = document.getElementById("cliente").value;
    const telefone = document.getElementById("telefone").value;
    const barbeiro = document.getElementById("barbeiro").value;
    const servico = document.getElementById("servico").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;

    // Validação básica para evitar campos vazios
    if (!cliente || !telefone || !barbeiro || !servico || !data || !hora) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Monta o objeto exatamente como o seu doPost espera receber
    const dados = {
        data: data,
        hora: hora,
        cliente: cliente,
        telefone: telefone,
        servico: servico,
        barbeiro: barbeiro
    };

    try {
        // Faz a requisição POST enviando o JSON no corpo (body)
        const resposta = await fetch(API, {
            method: "POST",
            mode: "no-cors", // Necessário para evitar bloqueio de CORS com o Apps Script em requisições POST
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        // Como usamos 'no-cors', o navegador não consegue ler a resposta JSON por segurança.
        // Se a requisição não cair no 'catch', significa que foi enviada com sucesso.
        alert("Agendamento enviado com sucesso!");
        
        // Limpa o formulário
        document.getElementById("cliente").value = "";
        document.getElementById("telefone").value = "";
        document.getElementById("hora").innerHTML = "";
    } catch (erro) {
        console.error("Erro ao agendar:", erro);
        alert("Houve um erro ao tentar salvar o agendamento.");
    }
}

// 2. FUNÇÃO BÔNUS: Carregar horários disponíveis quando o usuário escolher a data
document.getElementById("data").addEventListener("change", async (e) => {
    const dataSelecionada = e.target.value;
    if (!dataSelecionada) return;

    const selectHora = document.getElementById("hora");
    selectHora.innerHTML = "<option>Carregando...</option>";

    try {
        // Consome a rota 'horarios' do seu doGet
        const resposta = await fetch(`${API}?acao=horarios&data=${dataSelecionada}`);
        const horariosLivres = await resposta.json();

        selectHora.innerHTML = ""; // Limpa o carregando
        
        if(horariosLivres.length === 0) {
            selectHora.innerHTML = "<option>Nenhum horário disponível</option>";
            return;
        }

        horariosLivres.forEach(hora => {
            const option = document.createElement("option");
            option.value = hora;
            option.textContent = hora;
            selectHora.appendChild(option);
        });
    } catch (erro) {
        console.error("Erro ao carregar horários:", erro);
        selectHora.innerHTML = "<option>Erro ao carregar</option>";
    }
});
