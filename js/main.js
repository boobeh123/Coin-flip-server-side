// Theme switching functionality
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');

// Apply the theme
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' 
        ? 'light' 
        : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Update theme icon
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        updateThemeIcon(newTheme);
    }
});

document.querySelector('#randomBtn').addEventListener('click', generateRandomPassword);
document.querySelector('#copyBtn').addEventListener('click', copyToClipboard);
document.querySelector('#toggleVisibility').addEventListener('click', togglePasswordVisibility);

// Modal functionality
const modal = document.getElementById('aboutModal');
const aboutBtn = document.getElementById('aboutBtn');
const closeModal = document.querySelector('.close-modal');

aboutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

let currentPassword = '';
let isPasswordVisible = true;

async function generateRandomPassword() {
    try {
        const response = await fetch('/api');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Define character sets
        const numbers = '0123456789';
        const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const specialChars = '!@#$%^&*_+-?';
        
        // Generate random length between 8 and 16
        const length = Math.floor(Math.random() * 9) + 8;
        
        // Initialize password with at least one character from each set
        let password = '';
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += letters[Math.floor(Math.random() * letters.length)];
        password += specialChars[Math.floor(Math.random() * specialChars.length)];
        
        // Fill the rest of the password
        const allChars = numbers + letters + specialChars;
        for (let i = password.length; i < length; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }
        
        // Shuffle the password
        password = password.split('').sort(() => Math.random() - 0.5).join('');
        
        // Store the current password and display it
        currentPassword = password;
        displayPassword();
        
    } catch (error) {
        console.error('Error:', error);
        document.querySelector('.passwordResult').textContent = 'Error generating password. Please try again.';
    }
}

function displayPassword() {
    const passwordElement = document.querySelector('.passwordResult');
    passwordElement.textContent = isPasswordVisible ? currentPassword : '•'.repeat(currentPassword.length);
}

function copyToClipboard() {
    if (!currentPassword) return;
    
    navigator.clipboard.writeText(currentPassword).then(() => {
        const copyBtn = document.querySelector('#copyBtn');
        copyBtn.classList.add('copied');
        copyBtn.querySelector('i').classList.remove('fa-copy');
        copyBtn.querySelector('i').classList.add('fa-check');
        
        setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.querySelector('i').classList.remove('fa-check');
            copyBtn.querySelector('i').classList.add('fa-copy');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy password:', err);
    });
}

function togglePasswordVisibility() {
    isPasswordVisible = !isPasswordVisible;
    const toggleBtn = document.querySelector('#toggleVisibility');
    const icon = toggleBtn.querySelector('i');
    
    if (isPasswordVisible) {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
    
    displayPassword();
}

