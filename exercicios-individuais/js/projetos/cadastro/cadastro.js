let usuarios = JSON.parse(localStorage.getItem("cadastro_usuarios")) || [];

//Elementos
const telaLista = document.querySelector("#tela-lista");
const telaCadastro = document.querySelector("#tela-cadastro");
const btnAdicionar = document.querySelector("#btn-adicionar");
const btnVoltar = document.querySelector("#btn-voltar-lista");

//Inputs Usuário
const inputId = document.querySelector("#user-id");
const inputNome = document.querySelector("#user-nome");
const inputSobrenome = document.querySelector("#user-sobrenome");
const inputEmail = document.querySelector("#user-email");
const inputCep = document.querySelector("#user-cep");
const inputRua = document.querySelector("#user-rua");
const inputNumero = document.querySelector("#user-numero");
const inputComplemento = document.querySelector("#user-complemento");
const inputBairro = document.querySelector("#user-bairro");
const inputCidade = document.querySelector("#user-cidade");
const inputEstado = document.querySelector("#user-estado");
const inputObs = document.querySelector("#user-obs");

const form = document.querySelector("#user-form");
const tabelaCorpo = document.querySelector("#user-table-body");

let idEmEdicao = null;

const formTitulo = document.querySelector("#form-titulo");
const btnBuscarCep = document.querySelector("#btn-buscar-cep");

const inputBusca = document.querySelector("#user-busca");

const btnDownloadJson = document.querySelector("#btn-download-json");
const btnUploadJson = document.querySelector("#btn-upload-json");
const uploadJsonInput = document.querySelector("#upload-json-input");

//modal
const modalElement = document.querySelector('#detalhes-modal');
const modalNome = document.querySelector('#modal-nome');
const modalAvatar = document.querySelector('#modal-avatar');
const modalEmail = document.querySelector('#modal-email');
const modalEndereco = document.querySelector('#modal-endereco-completo');
const modalObs = document.querySelector('#modal-obs');
const modalBtnEditar = document.querySelector('#modal-btn-editar');
const modalBtnExcluir = document.querySelector('#modal-btn-excluir');

const modal = new bootstrap.Modal(modalElement);




//Funções
function mostrarTelaLista(){
    telaLista.classList.remove("d-none");
    telaCadastro.classList.add("d-none");
    renderizarTabela();
    form.reset();
}

function mostrarTelaCadastro(editar = false){
    telaLista.classList.add("d-none");
    telaCadastro.classList.remove("d-none");
    console.log(editar);
    formTitulo.textContent = editar === true ? "Editar Usuário" : "Adicionar Novo Usuário";
}

function salvarUsuario(){

    const id = Number(inputId.value);
    const nome = inputNome.value;
    const sobrenome = inputSobrenome.value;
    const email = inputEmail.value;
    const cep = inputCep.value
    const rua = inputRua.value;
    const numero = inputNumero.value;
    const complemento = inputComplemento.value;
    const bairro = inputBairro.value;
    const cidade = inputCidade.value;
    const estado = inputEstado.value;
    const obs = inputObs.value;

    const usuario = {
        id: id || Date.now(),
        nome, sobrenome, email, cep, rua, numero,
        complemento, bairro, cidade, estado, obs
    }

    if (idEmEdicao){
        const index = usuarios.findIndex(user => user.id === idEmEdicao); // se localiza, retorna a posição, caso contrário retorna -1
        if (index !== -1){
            usuarios[index] = usuario;
        }
    } else{
        usuarios.push(usuario);
    }    

    salvarNoStorage();    
    mostrarTelaLista();
    idEmEdicao = null;
    form.reset();
}

function salvarNoStorage(){
    localStorage.setItem("cadastro_usuarios",JSON.stringify(usuarios));
}

function editarUsuario(id){

    const user = usuarios.find(user => user.id === id);
    if (!user) return;

    idEmEdicao = id; //user.id

    console.log(user);

    inputId.value = user.id;
    inputNome.value = user.nome;
    inputSobrenome.value = user.sobrenome;
    inputEmail.value = user.email;
    inputCep.value = user.cep;
    inputRua.value = user.rua;
    inputNumero.value = user.numero;
    inputComplemento.value = user.complemento;
    inputBairro.value = user.bairro;
    inputCidade.value = user.cidade;
    inputEstado.value = user.estado;
    inputObs.value = user.obs;

    mostrarTelaCadastro(true);

}

function excluirUsuario(id){
    if(confirm("Você tem certeza que deseja excluir esse usuário???")){
        //console.log(id);
        usuarios = usuarios.filter(user => user.id !== id);
        salvarNoStorage();
        renderizarTabela();
    }
}

function renderizarTabela(usuariosParaRenderizar = usuarios){
    tabelaCorpo.innerHTML = "";
    usuariosParaRenderizar.forEach(user => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${user.nome}</td>
            <td>${user.sobrenome}</td>
            <td>${user.email}</td>
            <td>
                <button class="btn btn-sm btn-warning" data-id="${user.id}">Editar</button>
                <button class="btn btn-sm btn-danger" data-id="${user.id}">Excluir</button>
                <button class="btn btn-sm btn-info" data-id="${user.id}">
                    <i class="bi bi-eye-fill"></i> Ver Detalhes
                </button>
            </td>
        `;
        tabelaCorpo.appendChild(tr);
    });
}

async function buscarCEP(){
    const cep = inputCep.value.replace(/\D/g,"");

    if (cep.length === 8){

        try{

            const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

            const dados = await resposta.json();

            if (!dados.erro){
                // console.log(dados);
                inputRua.value = dados.logradouro;
                inputBairro.value = dados.bairro;
                inputCidade.value = dados.localidade;
                inputEstado.value = dados.estado;
            }else{
                alert("CEP Inválido! Tente novamente!");
            }

        } catch (error){
            alert("Erro ao buscar CEP, verique o número tente novamente!");
            console.log(error);
        }
    }else{
        alert("CEP Inválido! Por favor, digite um CEP com 8 digitos");
    }
}

function buscarUsuario(){
    //lowercase => deixa tudo minusculo
    //trim => remove os espaços das extremos;
    const textoBusca = inputBusca.value.toLowerCase().trim();

    if (textoBusca.length === 0){
        renderizarTabela();
        return;
    }

    const usuariosFiltrados = usuarios.filter(user =>{
        return user.nome.toLowerCase().trim().includes(textoBusca) || user.sobrenome.toLowerCase().trim().includes(textoBusca) || user.email.toLowerCase().trim().includes(textoBusca);
    });

    renderizarTabela(usuariosFiltrados);
}

function baixarJson(){
    const dados = JSON.stringify(usuarios);
    const blob = new Blob([dados], {type : "application/json"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "usuarios.json";
    link.click();
    URL.revokeObjectURL(url);
}

function uploadJson(event){
    const arquivo = event.target.files[0];

    if (!arquivo) return;

    const leitor = new FileReader();

    leitor.onload = function(e){
        const conteudoArquivo = e.target.result;

        const usuariosImportados = JSON.parse(conteudoArquivo);

        if (!Array.isArray(usuariosImportados)){
            alert("O arquivo não possui um array válido!");
        }

        if (confirm("Deseja substituir todos os dados de usuários pelo do arquivo?")){
            usuarios = usuariosImportados;
            salvarNoStorage();
            renderizarTabela();
            alert("Usuários importados com sucesso!");
        }
    }

    leitor.readAsText(arquivo);
}

function mostrarDetalhesUsuario(id) {

    const user = usuarios.find(u => u.id === id);
    if (!user) return; 

    modalNome.textContent = `${user.nome} ${user.sobrenome}`;
    modalEmail.textContent = user.email;
    
    const endereco = [user.rua, user.numero, user.bairro, user.cidade, user.estado, user.cep].filter(Boolean).join(', ');
    modalEndereco.textContent = endereco || 'Endereço não informado.';
    
    modalObs.textContent = user.obs || 'Nenhuma observação.';

    modalBtnEditar.dataset.id = user.id;
    modalBtnExcluir.dataset.id = user.id;

    const botoes = [modalBtnEditar, modalBtnExcluir];
    reordenarBotoes(botoes);

    modal.show();
}

function reordenarBotoes(botoes) {
    botoes.sort(() => Math.random() - 0.5);
    document.querySelector('#btn-container').innerHTML = '';
    botoes.forEach(botao => document.querySelector('#btn-container').appendChild(botao));
}

function inicializacao(){
    btnAdicionar.addEventListener("click",mostrarTelaCadastro);
    btnVoltar.addEventListener("click",mostrarTelaLista);
    //buscar cep
    btnBuscarCep.addEventListener("click",buscarCEP);

    form.addEventListener("submit",salvarUsuario);

    inputBusca.addEventListener("input", buscarUsuario);

    tabelaCorpo.addEventListener("click", (event) =>{
        const target = event.target.closest("button");
        //console.log(target);
        if (!target) return; // se existe um botão

        const id = Number(target.dataset.id);

        if (isNaN(id)) return; //se o id é numérico

        if (target.classList.contains("btn-danger")){
            excluirUsuario(id);
        } else if(target.classList.contains("btn-warning")){
            editarUsuario(id);
        } else if (target.classList.contains('btn-info')) {
            mostrarDetalhesUsuario(id);
        }
    });

    btnDownloadJson.addEventListener("click", baixarJson);

    btnUploadJson.addEventListener("click", () => uploadJsonInput.click());

    uploadJsonInput.addEventListener("change", uploadJson);

    modalElement.addEventListener("click", (event) => {
        const target = event.target.closest('button');
        if (!target) return;

        const id = Number(target.dataset.id);

        if (target.id === 'modal-btn-editar') {
            modal.hide();
            editarUsuario(id);
        } else if (target.id === 'modal-btn-excluir') {
            modal.hide();
            excluirUsuario(id);
        }
    });

    mostrarTelaLista();
}

inicializacao();