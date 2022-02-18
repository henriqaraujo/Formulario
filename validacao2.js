export function valida(input) {
    const tipoDeInput = input.dataset.tipo;

    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
    } else {
        input.parentElement.classList.add('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input);
    }

}
const validadores = {
    dataNascimento: input => validaDataNascimento(input),
    cpf: input => validaCPF(input),
    cep: input => recuperarCep(input)
}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
];

const mensagensDeErro = {
    nome: { valueMissing: 'O Campo nome não pode estar vazio.' },
    sobrenome: { valueMissing: 'O Campo Sobrenome não pode estar vazio.' },
    email: {
        valueMissing: 'O Campo e-mail não pode estar vazio.',
        typeMismatch: 'Insira um e-mail válido.'
    },
    senha: {
        valueMissing: 'O Campo Senha não pode estar vazio.',
        patternMismatch: 'A senha deve conter letras Maiuscula, Minuscula e números.'
    },
    dataNascimento: {
        valueMissing: 'O Campo Data não pode estar vazio.',
        customError: 'Você deve ser maior de 18 anos para se cadastrar.'
    },
    cpf: {
        valueMissing: 'O Campo CPF não pode estar vazio.',
        customError: 'O CPF digitado não é valido.'
    },
    cep: {
        valueMissing: 'O Campo CEP não pode estar vazio.',
        patternMismatch: 'O Cep digitado não é valido.',
        customError: '"CEP invalido.'
    },

    endereco: {
        valueMissing: 'O Campo Endereço não pode estar vazio.'
    },

    numero: {
        valueMissing: 'O Campo Numero não pode estar vazio.'
    },

    bairro: {
        valueMissing: 'O Campo Bairro não pode estar vazio.'
    },

    cidade: {
        valueMissing: 'O Campo Cidade não pode estar vazio.'
    },

    complemento: {
        valueMissing: 'O Campo Complemento não pode estar vazio.'
    }

}

function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = '';
    tiposDeErro.forEach(erro => {
        if (input.validity[erro]) {
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })
    return mensagem;
}



function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value);
    let mensagem = "";
    if (!maiorQue18(dataRecebida)) {
        mensagem = "Você deve ser maior de 18 anos para se cadastrar.";
    }
}

function maiorQue18(data) {
    const dataAtual = new Date();
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());
    return dataMais18 <= dataAtual;
}

function validaCPF(input) {
    const cpfFormatado = input.value.replace(/\D/g, '');
    let mensagem = '';

    if (!checaCPFRepetido(cpfFormatado) || !checaEstruturaCPF(cpfFormatado)) {
        mensagem = 'O CPF digitado não é valido';
    }

    input.setCustomValidity(mensagem);
}

function checaCPFRepetido(cpf) {
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    let cpfValido = true;
    valoresRepetidos.forEach(valor => {
        if (valor == cpf) {
            cpfValido = false
        }
    })
    return cpfValido;
}

function checaEstruturaCPF(cpf) {
    const multiplicador = 10;

    return checaDigitoVerificador(cpf, multiplicador)
}

function checaDigitoVerificador(cpf, multiplicador) {
    if (multiplicador >= 12) {
        return true;
    }
    let multiplicadorInicial = multiplicador;
    let soma = 0;
    const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split('');
    const digitoVerificador = cpfcharAt(multiplicador - 1);

    for (let contador = 0; multiplicadorInicial > 1; multiplicadorInicial--) {
        soma = soma + cpfSemDigitos[contador] * multiplicadorInicial;
        contador++
    }
    if (digitoVerificador == confirmaDigito(soma)) {
        return checaDigitoVerificador(cpf, multiplicador + 1);
    }
    return false;
}

function confirmaDigito(soma) {
    return 11 - (soma % 11);
}

function recuperarCep(input) {
    const cep = input.value.replace(/\D/g, '');
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const options = {
        method: 'GET',
        /*É o tipo de requisição que sera feita*/
        mode: 'cors',
        /*Indica que a comunicação será feita entre aplicações diferentes*/
        headers: { 'content-type': 'application/json;charset=utf-8' } /*Diz como queremos receber as informações da API*/
    }
    if (!input.validity.patternMismatch && !input.validity.valueMissing) {
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    input.setCustomValidity("CEP invalido.");
                    return;
                }
                input.setCustomValidity('');
                preencheCamposComCEP(data);
                return;
            })
    }
}

function preencheCamposComCEP(data) {
    const logradouro = document.querySelectorAll('[data-tipo="endereco"]');
    const bairro = document.querySelectorAll('[data-tipo="bairro"]');
    const cidade = document.querySelectorAll('[data-tipo="cidade"]');
    const estado = document.querySelectorAll('[data-tipo="estado"]');

    endereco.value = data.logradouro;
    cidade.value = data.localidade;
    estado.value = data.uf;

}