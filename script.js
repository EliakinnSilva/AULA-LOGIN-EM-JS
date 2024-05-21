class Usuario {
    #nome;
    #senha;
    #login;

    constructor(nome, senha, login) {
        this.#nome = nome;
        this.#senha = senha;
        this.#login = login;
    }

    static usuarios = [
        new Usuario('Admin', '123', 'admin')
    ];

    static login() {
        let username, password;
        let loggedIn = false;

        do {
            username = prompt('Digite seu nome de usuário:');
            if (!username) return false;
            password = prompt('Digite sua senha:');
            if (!password) return false;

            const user = Usuario.usuarios.find(u => u.#login === username && u.#senha === password);

            if (user) {
                loggedIn = true;
                alert('\nLogin bem-sucedido!\n\n');
                return true;
            } else {
                alert('Usuário ou senha incorretos. Tente novamente.\n\n');
            }
        } while (!loggedIn);
    }
}

class Paciente {
    static contador = 5000;
    static pacientes = [];

    constructor(nome, login, senha, endereco) {
        this.id = ++Paciente.contador;
        this.nome = nome;
        this.login = login;
        this.senha = senha;
        this.endereco = endereco;
        this.tipoSanguineo = null;
        this.altura = null;
        this.peso = null;
    }

    atualizarConsulta(tipoSanguineo, altura, peso) {
        this.tipoSanguineo = tipoSanguineo;
        this.altura = altura;
        this.peso = peso;
    }
}

function cadastrarPaciente() {
    const nome = prompt('Digite o nome do paciente:\n');
    const login = prompt('Digite o login do paciente:\n');
    const senha = prompt('Digite a senha do paciente:\n');
    const endereco = prompt('Digite o endereço do paciente:\n');

    const paciente = new Paciente(nome, login, senha, endereco);

    const tipoSanguineo = prompt('Digite o tipo sanguíneo do paciente:\n');
    const altura = parseFloat(prompt('Digite a altura do paciente em cm:\n'));
    const peso = parseFloat(prompt('Digite o peso do paciente em kg:\n'));

    paciente.atualizarConsulta(tipoSanguineo, altura, peso);

    Paciente.pacientes.push(paciente);
}

function listarPacientes() {
    if (Paciente.pacientes.length === 0) {
        return 'Nenhum paciente cadastrado.';
    } else {
        let lista = 'Lista de Pacientes:\n';
        Paciente.pacientes.forEach(paciente => {
            lista += `ID: ${paciente.id}, Nome: ${paciente.nome}\n`;
        });
        return lista;
    }
}

function loadContent() {
    const path = window.location.pathname;
    if (path.includes('login.html')) {
        // Conteúdo específico da tela de login
        document.getElementById('content').innerHTML = `
            <form id="loginForm">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required><br><br>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required><br><br>
                <button type="submit">Login</button>
            </form>
        `;
    } else if (path.includes('cadastro.html')) {
        // Conteúdo específico da tela de cadastro de paciente
        document.getElementById('content').innerHTML = `
            <button onclick="cadastrarPaciente()">Cadastrar Paciente</button>
        `;
    } else if (path.includes('lista.html')) {
        // Conteúdo específico da tela de lista de pacientes
        document.getElementById('content').innerText = listarPacientes();
    }
}

function main() {
    if (Usuario.login()) {
        loadContent();
    }
}

main();
