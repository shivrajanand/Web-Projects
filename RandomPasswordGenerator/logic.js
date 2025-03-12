function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function getRandomPrime(min = 2, max = 1000) {
    let prime;
    while (true) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        if (isPrime(num)) {
            prime = num;
            break;
        }
    }
    return prime;
}

function collatz_number_generator(count, charsetLength) {
    const series = [];

    // Step 1: Prime seed
    let x = getRandomPrime(); // Random prime between 2 and 1000

    for (let i = 0; i < count; i++) {
        // Step 2: Collatz-like transformation
        if (x % 2 === 0) {
            x = x / 2;
        } else {
            x = 3 * x + 1;
        }

        // Step 3: Apply modulo to fit within character set
        const modValue = x % charsetLength;
        series.push(modValue);
    }

    return series;
}


function generatePassword() {
    const length = document.getElementById('length').value;
    const includeUppercase = document.getElementById('uppercase')?.checked;
    const includeLowercase = document.getElementById('lowercase')?.checked;
    const includeNumbers = document.getElementById('numbers')?.checked;
    const includeSpecial = document.getElementById('special')?.checked;

    let characters = '';
    if (includeUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) characters += '0123456789';
    if (includeSpecial) characters += '!@#$%^&*()_+[]{}|;:,.<>?';

    if (characters.length === 0) {
        alert("Please select at least one character type.");
        return;
    }

    let password = '';
    const series = collatz_number_generator(length, characters.length); // Get custom index series

    for (let i = 0; i < length; i++) {
        password += characters[series[i]];
    }

    document.getElementById('password').value = password;
}


function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

function updateLengthValue() {
    const lengthValue = document.getElementById('length').value;
    document.getElementById('length-value').textContent = lengthValue;
}

function downloadPassword() {
    const password = document.getElementById('password').value;
    if (!password) {
        alert("No password to download.");
        return;
    }
    const blob = new Blob([password], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'password.txt';
    link.click();
}
