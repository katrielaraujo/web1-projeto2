class Contato {
    constructor(nome, cpf, dataNascimento, endereco){
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
    }
}

let contatos = [];

let cadastar = () => {
    const nome = document.getElementById('nome').value; 
    const cpf = cpfMask(document.getElementById('cpf').value); 
    const dataNascimento = document.getElementById('dataNascimento').value; 
    const endereco = document.getElementById('endereco').value;

    if(nome && cpf && dataNascimento && endereco){
        if(contatos.some(c => c.cpf === cpf)){
            alert('Erro: CPF já cadastrado.');
        }else{
            const novoContato = new Contato(nome, cpf, dataNascimento, endereco);
            contatos.push(novoContato);
            alert('Contato salvo com sucesso!');
            document.getElementById('cadastro').reset();
        }
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

document.getElementById('cadastrar').addEventListener('click', cadastar);

function atualizarLista(){
    const listaContatos = document.getElementById('listaContatos');
    listaContatos.innerHTML = '';

    contatos.forEach(contato => {
        const card = document.createElement('div');
        card.className = 'col-md-12 card-contato mb-3';

        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title text-primary">${contato.nome}</h3>
                    <p class="card-text"><strong>CPF:</strong> ${contato.cpf}</p>
                    <p class="card-text"><strong>Data de Nascimento:</strong> ${contato.dataNascimento}</p>
                    <p class="card-text"><strong>Endereço:</strong> ${contato.endereco}</p>
                </div>
            </div>`;

        listaContatos.appendChild(card);
    })
}

document.getElementById('exibir').addEventListener('click', atualizarLista);

document.getElementById('buscar').addEventListener('click', () => {
    let cpf = prompt('Digite o CPF do contato:').trim();
    cpf = cpfMask(cpf);

    const contato = contatos.find(c => c.cpf === cpf);

    if(contato){
        alert(`
            Nome: ${contato.nome}\n
            CPF: ${contato.cpf}\n
            Data de Nascimento: ${contato.dataNascimento}\n
            Endereço: ${contato.endereco}`);
    }else{
        alert('CPF não encontrado!');
    }
});

document.getElementById('remover').addEventListener('click', () => {
    let cpf = prompt('Digite o CPF do contato:').trim();
    cpf = cpfMask(cpf);

    const index = contatos.findIndex(c => c.cpf === cpf);

    if(index !== -1){
        contatos.splice(index, 1);
        alert('Contato excluído com sucesso!');
        atualizarLista();
    } else {
        alert('CPF não encontrado!');
    }
});

function cpfMask(value){
    return value.replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

document.getElementById('cpf').addEventListener('input', function (e) {
    e.target.value = cpfMask(e.target.value);
});