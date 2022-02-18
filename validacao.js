const email = document.getElementById("email")

function editarEmail() {
    email.
}


/*const txtEmail = document.getElementById("email")
const mesgCadastro = document.getElementsByClassName(".cadastro-finalizado ")


function cadastroConcluido() {
    let email = txtEmail.value
    mesgCadastro.innerHTML = "E-mail cadastrado"
    console.log(msgCadastro)
}*/

/*let form = document.getElementById("register-form");
let form = document.getElementById("btn-submit");
let validator = new Validator();
//evento que dispara as validações
submit.addEventListener('click', function(e) {
    e.preventDefault();

    console.log('funcionou');

    validator.validate(form);
});

class Validator {

    constructor() {
            this.validations = [
                'data-required',
                'data-min-length',
                'data-max-length',
                'data-email-validate',
                'data-only-letters',
                'data-equal',
                'data-password-validate',
            ]
        }
        //Iniciar a validação de todos os campos
    validate(form) {

        //resgata todas as validações
        let currentValidations = document.querySelectorAll('form .error-validation');
        if (currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }
        //Pegar os inputs
        let inputs = form.getElementByTagName('input');

        //Transformo um HTMLColletion em -> Array
        let inputsArray = [...inputs];

        //loop nos inputs e validação mediante ao que for encontrado
        inputsArray.forEach(function(input) {

            //loop em todas as validações existentes
            for (let i = 0; this.validations.length > i; i++) {

                //verifica se a validação atual existe no input
                if (input.getAttribute(this.validations[i]) != null) {

                    //limpando a string para virar um método
                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    //valor do input
                    let value = input.getAttribute(this.validations[i]);

                    //invocar o metodo
                    this[method](input, value);
                }
            }
        }, this);
    }

    //verifica se um input tem um número minimo de caracteres
    minlength(input, minValue) {
        let inputLength = input.value.length;

        let errorMessage = 'o campo precisa ter pelo menos ${minValue} caracteres';

        if (inputLength < minValue) {
            this.printMessage(input, errorMessage)
        }
    }

    //Verifica se um input passou do limite
    maxlength(input, maxValue) {
        let inputLength = input.value.length;

        let errorMessage = 'o campo precisa ter menos que ${maxValue} caracteres';

        if (inputLength > maxValue) {
            this.printMessage(input, errorMessage)

        }
    }

    //valida e-mails
    emailvalidate(input) {

        //EMAIL@EMAIL.COM
        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = 'Insira um e-mail no padrão exemplo@hotmail.com'
        if (!re.test(email)) {
            this.printMessage(input, errorMessage);
        }
    }

    //valida se o campo tem apenas letras
    onlyletters(input) {
        let re = /^[A-Za-z]+$/;

        let inputValue = input.value;

        let errorMessage = 'Este campo não aceita números e nem caracteres especiais.'

        if (!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
        }
    }

    //verifica se o input é requirido
    required(input) {
        let inputValue = input.value;

        if (inputValue === '') {
            let errorMessage = 'Este campo é obrigatório';
            this.printMessage(input, errorMessage)
        }
    }

    //valida o campo de senha
    passwordvalidate(input) {

        //Mostra string em um array
        let charArr = input.value.split("");

        let uppercase = 0;
        let numbers = 0;

        for (let i = 0; charArr.length > i; i++) {
            if (charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                uppercase++;
            } else if (!isNaN(parseInt(charArr[i]))) {
                numbers++;
            }
        }
        if (uppercase === 0 || numbers === 0) {
            let errorMessage = 'A Senha precisa de um caractere maiúsculo e um número'
            this.printMessage(input, errorMessage);
        }
    }

    //verifica se dois campos são iguais
    equal(input, inputName) {
        let inputToCompare = document.getElementByName(inputName)[0];

        let errorMessage = 'Este campo precisa estar igual ao ${inputName}';

        if (input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }
    }
}

printMessage(input, msg) {

    //verificar a quantidade de erros que possui
    let errorQty = input.parentNode.querySelector('.error-validation');

    if (errorQty === null) {
        let template = document.querySelector('.error-validation').cloneNode(true);

        template.textContent = msg;

        let inputParent = input.parentNode;

        template.classList.remove('template');

        inputParent.appendchild(template);

    }
}

//Limpa as validações da tela
cleanValidations(validations) {
    validations.forEach(el => el.remove());
}


const btn = document.getElementById("#btn-submit")
btn.disable = true

function enableOrDisableButton() {
    const contrato = document.querySelector("#agreement")

    let checked = contrato.checked
    console.log(checked)
    btn.disable = !checked
}*/