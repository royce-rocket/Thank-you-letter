// Set current date
function setCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = today.toLocaleDateString('en-US', options);
}

// Update recipient name
function updateRecipient(name) {
    const recipientElement = document.getElementById('recipientName');
    if (name.trim() !== '') {
        recipientElement.textContent = name;
    } else {
        recipientElement.textContent = 'Valued Friend';
    }
}

// Update sender name
function updateSender(name) {
    const senderElement = document.getElementById('senderName');
    if (name.trim() !== '') {
        senderElement.textContent = name;
    } else {
        senderElement.textContent = 'Your Name';
    }
}

// Save custom message
function saveCustomMessage() {
    const messageInput = document.getElementById('messageInput');
    const customMessage = messageInput.value.trim();
    
    if (customMessage !== '') {
        const messageContainer = document.querySelector('.message');
        const paragraphs = customMessage.split('\n\n').filter(p => p.trim() !== '');
        
        messageContainer.innerHTML = '';
        paragraphs.forEach(paragraph => {
            const p = document.createElement('p');
            p.textContent = paragraph.trim();
            messageContainer.appendChild(p);
        });
        
        // Show success feedback
        showNotification('Message saved successfully!');
    } else {
        showNotification('Please enter a message before saving.', 'error');
    }
}

// Reset to default message
function resetMessage() {
    const messageContainer = document.querySelector('.message');
    const defaultMessage = `
        I wanted to take a moment to express my heartfelt gratitude for your kindness, 
        support, and generosity. Your thoughtfulness has made a significant impact, 
        and I am truly grateful for everything you've done.
        
        Your actions have not gone unnoticed, and I want you to know how much 
        your support means to me. It's people like you who make the world a 
        better place, and I feel fortunate to have you in my life.
        
        Thank you once again for your kindness. I look forward to the opportunity 
        to return the favor and continue our wonderful relationship.
    `;
    
    const paragraphs = defaultMessage.split('\n\n').filter(p => p.trim() !== '');
    messageContainer.innerHTML = '';
    paragraphs.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph.trim();
        messageContainer.appendChild(p);
    });
    
    document.getElementById('messageInput').value = '';
    showNotification('Message reset to default.');
}

// Enable editing mode (for future enhancements)
function enableEditing() {
    showNotification('Use the customization panel below to edit your letter!');
    document.getElementById('customizationPanel').scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest'
    });
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : '#2ecc71'};
        color: white;
        padding: 15px 25px;
        border-radius: 6px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        font-family: 'Georgia', serif;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Play music function (called when button is clicked)
function playMusic() {
    const audio = document.getElementById('backgroundMusic');
    if (audio) {
        audio.volume = 0.5; // Set volume to 50% for background music
        audio.loop = true;
        
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Music started successfully
                console.log('Music started');
                // Optionally hide or disable the button after clicking
                const button = document.getElementById('musicButton');
                if (button) {
                    button.style.opacity = '0.7';
                    button.style.cursor = 'default';
                }
            }).catch(error => {
                console.log('Audio playback failed:', error);
            });
        }
    }
}

// Initialize background music (setup only, no autoplay)
function initBackgroundMusic() {
    const audio = document.getElementById('backgroundMusic');
    if (audio) {
        audio.volume = 0.5; // Set volume to 50% for background music
        audio.loop = true;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    setCurrentDate();
    initBackgroundMusic();
    
    // Load saved data from localStorage if available
    const savedRecipient = localStorage.getItem('recipientName');
    const savedSender = localStorage.getItem('senderName');
    
    if (savedRecipient) {
        const recipientInput = document.getElementById('recipientInput');
        if (recipientInput) {
            recipientInput.value = savedRecipient;
            updateRecipient(savedRecipient);
        }
    }
    
    if (savedSender) {
        const senderInput = document.getElementById('senderInput');
        if (senderInput) {
            senderInput.value = savedSender;
            updateSender(savedSender);
        }
    }
    
    // Save to localStorage on input
    const recipientInput = document.getElementById('recipientInput');
    if (recipientInput) {
        recipientInput.addEventListener('blur', function() {
            localStorage.setItem('recipientName', this.value);
        });
    }
    
    const senderInput = document.getElementById('senderInput');
    if (senderInput) {
        senderInput.addEventListener('blur', function() {
            localStorage.setItem('senderName', this.value);
        });
    }
});

