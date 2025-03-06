let currentMode = 'encrypt';

function processText(mode) {
    const input = document.getElementById('plaintext').value.toUpperCase();
    let key = document.getElementById('key').value.toUpperCase();

    if (!input) {
        showMessage('Please enter the text to ' + mode, 'danger');
        return;
    }

    if (!key) {
        showMessage('Please enter the key or generate one', 'danger');
        return;
    }

    if (!/^[A-Z\s]+$/.test(input) || !/^[A-Z\s]+$/.test(key)) {
        showMessage('Please use only letters (A-Z) in text and key', 'danger');
        return;
    }

    const cleanInput = input.replace(/\s/g, '');
    const cleanKey = key.replace(/\s/g, '');

    if (cleanKey.length < cleanInput.length) {
        showMessage('Key must be at least as long as the input text', 'danger');
        return;
    }

    let result = '';
    
    for (let i = 0; i < cleanInput.length; i++) {
        const inputChar = cleanInput.charCodeAt(i) - 65;
        const keyChar = cleanKey.charCodeAt(i) - 65;
        let resultChar;
        
        if (mode === 'encrypt') {
            resultChar = (inputChar + keyChar) % 26;
        } else {
            resultChar = (inputChar - keyChar + 26) % 26;
        }
        
        result += String.fromCharCode(resultChar + 65);
    }

    document.getElementById('result').value = result;
    showMessage(`Text ${mode}ed successfully!`, 'success');
}

function generateKey() {
    const input = document.getElementById('plaintext').value.replace(/\s/g, '');
    
    if (!input) {
        showMessage('Please enter the text first', 'warning');
        return;
    }

    let key = '';
    for (let i = 0; i < input.length; i++) {
        key += String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }

    document.getElementById('key').value = key;
    showMessage('Random key generated!', 'info');
}

function clearAll() {
    document.getElementById('plaintext').value = '';
    document.getElementById('key').value = '';
    document.getElementById('result').value = '';
    hideMessage();
}

function showMessage(message, type) {
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = message;
    messageBox.className = `alert alert-${type} fade`;
    setTimeout(() => messageBox.classList.add('show'), 10);
    
    setTimeout(() => {
        messageBox.classList.remove('show');
        setTimeout(() => hideMessage(), 300);
    }, 3000);
}

function hideMessage() {
    const messageBox = document.getElementById('messageBox');
    messageBox.style.display = 'none';
}

function copyText(elementId) {
    const element = document.getElementById(elementId);
    element.select();
    document.execCommand('copy');
    showMessage('Text copied to clipboard!', 'info');
}

// Add event listeners for mode switching
document.addEventListener('DOMContentLoaded', () => {
    const modeButtons = document.querySelectorAll('.btn-mode');
    modeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentMode = button.dataset.mode;
            document.getElementById('inputLabel').textContent = 
                currentMode === 'encrypt' ? 'Plain Text:' : 'Cipher Text:';
        });
    });
});