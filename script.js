// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initMobileMenu();
    initTabs();
    initMegaMenus();
    initAnimatedStats();
    initMarketTabs();
    initScrollAnimations();
    initSmoothScroll();
    optimizeVideoPlayback();
});

// Video Performance Optimization
function optimizeVideoPlayback() {
    const video = document.querySelector('.hero-video');
    if (video) {
        // Simple play without optimizations
        video.play().catch(function(error) {
            console.log('Autoplay prevented:', error);
        });
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function() {
            mainNav.classList.toggle('mobile-active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !mainNav.contains(e.target)) {
                mainNav.classList.remove('mobile-active');
                mobileToggle.classList.remove('active');
            }
        });
    }
}

// Tab Functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            const targetPane = document.getElementById(targetTab);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

// Market Tabs
function initMarketTabs() {
    const marketTabs = document.querySelectorAll('.market-tab');
    
    marketTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const market = this.getAttribute('data-market');
            
            // Remove active class from all tabs
            marketTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Here you would typically load different market data
            // For demo purposes, we'll just update the prices
            updateMarketPrices(market);
        });
    });
}

// Mega Menu Enhancements
function initMegaMenus() {
    const navItems = document.querySelectorAll('.nav-item.has-mega-menu');
    const megaMenus = document.querySelectorAll('.mega-menu');
    
    navItems.forEach(item => {
        let timeout;
        
        item.addEventListener('mouseenter', function() {
            clearTimeout(timeout);
            const menu = this.querySelector('.mega-menu');
            if (menu) {
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'translateY(0)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const menu = this.querySelector('.mega-menu');
            if (menu) {
                timeout = setTimeout(() => {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(-10px)';
                }, 200);
            }
        });
        
        // Prevent menu from closing when hovering over it
        const menu = item.querySelector('.mega-menu');
        if (menu) {
            menu.addEventListener('mouseenter', function() {
                clearTimeout(timeout);
            });
            
            menu.addEventListener('mouseleave', function() {
                timeout = setTimeout(() => {
                    this.style.opacity = '0';
                    this.style.visibility = 'hidden';
                    this.style.transform = 'translateY(-10px)';
                }, 200);
            });
        }
    });
}

// Animated Statistics Counter
function initAnimatedStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateCounter(entry.target);
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const format = element.getAttribute('data-format');
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (format === 'currency') {
            element.textContent = '$' + formatNumber(Math.floor(current));
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Update Market Prices (Demo)
function updateMarketPrices(market) {
    const priceItems = document.querySelectorAll('.price-item');
    const demoPrices = {
        forex: [
            { instrument: 'EUR/USD', price: '1.0856', change: '+0.12%', positive: true },
            { instrument: 'GBP/USD', price: '1.2743', change: '-0.08%', positive: false },
            { instrument: 'USD/JPY', price: '147.85', change: '+0.25%', positive: true },
            { instrument: 'XAU/USD', price: '2,042.30', change: '+0.45%', positive: true }
        ],
        indices: [
            { instrument: 'S&P 500', price: '4,512.58', change: '+0.65%', positive: true },
            { instrument: 'NASDAQ', price: '14,125.48', change: '-0.23%', positive: false },
            { instrument: 'FTSE 100', price: '7,543.21', change: '+0.34%', positive: true },
            { instrument: 'DAX', price: '16,789.45', change: '+0.18%', positive: true }
        ],
        commodities: [
            { instrument: 'Crude Oil', price: '78.45', change: '+1.25%', positive: true },
            { instrument: 'Natural Gas', price: '2.845', change: '-0.67%', positive: false },
            { instrument: 'Gold', price: '2,042.30', change: '+0.45%', positive: true },
            { instrument: 'Silver', price: '24.85', change: '+0.82%', positive: true }
        ],
        metals: [
            { instrument: 'Gold', price: '2,042.30', change: '+0.45%', positive: true },
            { instrument: 'Silver', price: '24.85', change: '+0.82%', positive: true },
            { instrument: 'Platinum', price: '945.60', change: '-0.15%', positive: false },
            { instrument: 'Copper', price: '3.845', change: '+0.92%', positive: true }
        ]
    };
    
    const prices = demoPrices[market] || demoPrices.forex;
    
    priceItems.forEach((item, index) => {
        if (prices[index]) {
            const instrument = item.querySelector('.instrument');
            const price = item.querySelector('.price');
            const change = item.querySelector('.change');
            
            instrument.textContent = prices[index].instrument;
            price.textContent = prices[index].price;
            change.textContent = prices[index].change;
            change.className = 'change ' + (prices[index].positive ? 'positive' : 'negative');
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .instrument-card, .security-item, .benefit-item, .smart-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && !entry.target.classList.contains('animate-in')) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => observer.observe(element));
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Sticky Header Enhancement
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (header) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollTop = scrollTop;
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .feature-card, .instrument-card, .security-item, .benefit-item, .smart-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .feature-card.animate-in, .instrument-card.animate-in, .security-item.animate-in, 
    .benefit-item.animate-in, .smart-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .main-header {
        transition: transform 0.3s ease-in-out;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .main-nav {
            position: fixed;
            top: 0;
            left: -100%;
            width: 80%;
            max-width: 300px;
            height: 100vh;
            background-color: white;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
            transition: left 0.3s ease-in-out;
            z-index: 999;
            overflow-y: auto;
            padding: 80px 20px 20px;
        }
        
        .main-nav.mobile-active {
            left: 0;
        }
        
        .nav-list {
            flex-direction: column;
            gap: 10px;
        }
        
        .mega-menu {
            position: static;
            opacity: 1;
            visibility: visible;
            transform: none;
            box-shadow: none;
            background-color: #f8fafc;
            margin-top: 10px;
            min-width: auto;
        }
        
        .mega-menu-content {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 20px;
        }
    }
`;
document.head.appendChild(style);

// Live Price Updates (Demo)
setInterval(() => {
    const priceElements = document.querySelectorAll('.price-item .price');
    priceElements.forEach(element => {
        const currentPrice = element.textContent;
        const numericPrice = parseFloat(currentPrice.replace(/,/g, ''));
        const change = (Math.random() - 0.5) * 0.1; // Small random change
        const newPrice = numericPrice * (1 + change / 100);
        
        // Update price with appropriate formatting
        if (currentPrice.includes('.')) {
            element.textContent = newPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } else {
            element.textContent = Math.floor(newPrice).toLocaleString();
        }
    });
}, 5000); // Update every 5 seconds

// Form Validation (for future forms)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showError(input, 'This field is required');
            isValid = false;
        } else {
            clearError(input);
        }
    });
    
    return isValid;
}

function showError(input, message) {
    input.classList.add('error');
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    errorElement.textContent = message;
}

function clearError(input) {
    input.classList.remove('error');
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
}

// Add error styles
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 1px #ef4444 !important;
    }
    
    .error-message {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    }
`;
document.head.appendChild(errorStyles);

// Cookie Consent (Future Enhancement)
function showCookieConsent() {
    const consentHtml = `
        <div id="cookie-consent" style="position: fixed; bottom: 0; left: 0; right: 0; background: #1e293b; color: white; padding: 20px; z-index: 10000; display: none;">
            <div class="container" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
                <p style="margin: 0;">We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
                <div style="display: flex; gap: 10px;">
                    <button onclick="acceptCookies()" class="btn btn-primary">Accept</button>
                    <button onclick="declineCookies()" class="btn btn-secondary">Decline</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', consentHtml);
    
    if (!localStorage.getItem('cookieConsent')) {
        document.getElementById('cookie-consent').style.display = 'block';
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.getElementById('cookie-consent').style.display = 'none';
}

function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    document.getElementById('cookie-consent').style.display = 'none';
}

// Initialize cookie consent on page load
showCookieConsent();
