// Simple interactions for the portfolio website

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth hover effects and click handlers
    initializeProjectItems();
    initializeSocialLinks();
    addScrollEffects();
    initializeBeijingTime();
});

function initializeProjectItems() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        item.addEventListener('click', function() {
            // Projects have no external links as per requirements
            console.log('Project clicked:', this.textContent);
            // You can add functionality here for future project detail pages
        });
    });
}

function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-links .link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const linkText = this.textContent.toLowerCase();
            
            // Handle different social links
            switch(linkText) {
                case 'email':
                    e.preventDefault();
                    window.location.href = 'mailto:1044159530@qq.com';
                    break;
                case 'wechat':
                    e.preventDefault();
                    // Wechat link - tooltip shows the ID
                    break;
                default:
                    e.preventDefault();
            }
        });
    });
}

function addScrollEffects() {
    // Add subtle scroll-based animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe project groups for fade-in effect
    const projectGroups = document.querySelectorAll('.project-group');
    projectGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(group);
    });
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or overlays
        document.activeElement.blur();
    }
});

// Add mouse cursor effects
document.addEventListener('mousemove', function(e) {
    // You can add custom cursor effects here if desired
});

// Simple theme toggle (if you want to add dark mode later)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Load saved theme preference
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Initialize theme on load
loadTheme();

// Beijing time functionality
function initializeBeijingTime() {
    updateBeijingTime();
    // Update every minute
    setInterval(updateBeijingTime, 60000);
}

function updateBeijingTime() {
    const now = new Date();
    // Beijing is UTC+8
    const beijingTime = new Date(now.getTime() + (8 * 60 * 60 * 1000) + (now.getTimezoneOffset() * 60 * 1000));
    
    let hours = beijingTime.getHours();
    let minutes = beijingTime.getMinutes();
    
    // Convert to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    
    // Add leading zero to minutes if needed
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    const timeString = `${hours}:${minutes} ${ampm}`;
    
    const timeElement = document.getElementById('beijing-time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
} 