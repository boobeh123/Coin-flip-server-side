// Dark/Light mode
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');

document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' 
        ? 'light' 
        : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

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

// Modal
const modal = document.getElementById('aboutModal');
const aboutBtn = document.getElementById('aboutBtn');
const closeModal = document.querySelector('.close-modal');

aboutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = '';
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

// Buttons
let currentPassword = '';
let isPasswordVisible = true;

async function generateRandomPassword() {
    try {
        const response = await fetch('/api');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status === 'success' && data.password) {
            currentPassword = data.password;
            displayPassword();
        } else {
            throw new Error('Invalid response from server');
        }
        
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
    if (!currentPassword) {
        console.log('No password to copy');
        return;
    }
    
    console.log('Attempting to copy password:', currentPassword);
    
    navigator.clipboard.writeText(currentPassword).then(() => {
        console.log('Password copied successfully');
        const copyBtn = document.querySelector('#copyBtn');
        copyBtn.classList.add('copied');
        copyBtn.querySelector('i').classList.remove('fa-copy');
        copyBtn.querySelector('i').classList.add('fa-check');
        
        console.log('Showing tooltip notification');
        showTooltipNotification('Copied to clipboard', 'success');
        
        setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.querySelector('i').classList.remove('fa-check');
            copyBtn.querySelector('i').classList.add('fa-copy');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy password:', err);
        showTooltipNotification('Failed to copy password', 'error');
    });
}

function showTooltipNotification(message, type = 'success') {
    console.log('showTooltipNotification called with:', message, type);
    
    const tooltip = document.getElementById('tooltipNotification');
    const tooltipMessage = document.getElementById('tooltipMessage');
    
    console.log('Tooltip element found:', tooltip);
    console.log('Tooltip message element found:', tooltipMessage);
    
    if (!tooltip || !tooltipMessage) {
        console.error('Tooltip elements not found!');
        return;
    }
    
    tooltipMessage.textContent = message;
    tooltip.className = `tooltip-notification ${type}`;
    
    console.log('Tooltip classes set:', tooltip.className);
    
    tooltip.hidden = false;
    tooltip.classList.add('show');
    
    console.log('Tooltip should now be visible');
    
    setTimeout(() => {
        tooltip.classList.remove('show');
        
        setTimeout(() => {
            tooltip.hidden = true;
        }, 300);
    }, 3000);
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

document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.querySelector('footer .copyright span');
    if (yearSpan) {
        yearSpan.innerHTML = `&copy; ${new Date().getFullYear()} Bobby Asakawa`;
    }
});

function testTooltip() {
    console.log('Testing tooltip functionality...');
    showTooltipNotification('Test tooltip message', 'success');
}