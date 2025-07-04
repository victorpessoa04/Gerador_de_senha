function getChartTypes(){
    const uppercase = document.querySelector('#include_uppercase').checked;
    const lowercase = document.querySelector('#include_lowercase').checked;
    const number = document.querySelector('#include_number').checked;
    const specialCharacter = document.querySelector('#include_special_character').checked;

    const charTypes = [];

    if(uppercase) {
        charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    }

    if(lowercase) {
        charTypes.push('abcdefghijklmnopqrstuvwxyz')
    }

    if(number) {
        charTypes.push('0123456789')
    }

    if(specialCharacter) {
        charTypes.push('!@#$%^&*(){}<>,.:;=+-_/?\\|')
    }

    return charTypes;
    
}

function getPasswordSize(){
    const size = document.querySelector('#size').value;
    if(isNaN(size)|| size < 4 || size > 128){ 
       message('Tamanho invalido, digite um numero entre 4 e 128', '#warning');
    }
    
    return size;
}

function randomChartype(charTypes) {
    const randomIndex = Math.floor(Math.random() * charTypes.length);
    
    return charTypes[randomIndex][Math.floor(Math.random() * charTypes[randomIndex].length)];

}

function generatePassword(size, charTypes){ 
    let passwordGenerated = '';

    while (passwordGenerated.length < size){ 
        passwordGenerated += randomChartype(charTypes)
    }

    return passwordGenerated;
}

function message(text, status = 'success'){
    Toastify({
        text:text,
        duration: 3000,
        style:{
            background: status === 'success' ? '#84cc16' : '#dc2626',
            boxShadow: 'none'
        }
   }).showToast();
}

document.querySelector('#generate').addEventListener('click', function () {
    const size = getPasswordSize();
    if (!size) return;

    const charTypes = getChartTypes();
    if (!charTypes.length) {
        message('Selecione ao menos um tipo de caractere!', 'warning');
        return;
    }

    const passwordGenerated = generatePassword(size, charTypes);

    const passwordContainer = document.querySelector('#password');
    document.querySelector('#password_container').classList.add('show');

    passwordContainer.innerHTML = `
        ${passwordGenerated}
        <button id="copy" title="Copiar senha">
            <i class="fa-solid fa-copy"></i>
        </button>
    `;

    const copyButton = document.querySelector('#copy');
    copyButton.addEventListener('click', function () {
        navigator.clipboard.writeText(passwordGenerated).then(() => {
            message('Senha copiada com sucesso!');
        }).catch(() => {
            message('Erro ao copiar senha', 'warning');
        });
    });
});
