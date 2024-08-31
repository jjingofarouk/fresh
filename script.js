// Utility function for smooth scrolling
const smoothScroll = (target) => {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error(`Element with selector ${target} not found.`);
    }
};

// Toggle classes and handle attribute changes
const toggleClassAndAttribute = (element, className, attributeName, valueTrue, valueFalse) => {
    element.classList.toggle(className);
    element.setAttribute(attributeName, element.classList.contains(className) ? valueTrue : valueFalse);
};

// Handle mobile menu toggle
const toggleMobileMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    const body = document.querySelector('body');
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-open');
};

// Initialize event listeners
const initEventListeners = () => {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggle mobile menu
    menuIcon.addEventListener('click', toggleMobileMenu);

    // Close mobile menu and scroll to section smoothly on link click
    navLinks.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            smoothScroll(anchor.getAttribute('href'));
        });
    });

    // Smooth scrolling for other navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScroll(anchor.getAttribute('href'));
        });
    });

    // Toggle visibility of sections with ARIA attributes
    document.querySelectorAll('h2').forEach(heading => {
        heading.setAttribute('role', 'button');
        heading.setAttribute('tabindex', '0');
        heading.addEventListener('click', () => {
            const sectionContent = heading.nextElementSibling;
            if (sectionContent) {
                toggleClassAndAttribute(sectionContent, 'hidden', 'aria-expanded', 'true', 'false');
            }
        });
    });

    // Back to top button visibility and action
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        backToTopButton.style.display = window.pageYOffset > 300 ? 'block' : 'none';
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

// Intersection Observer for updating active link and lazy loading
const initObservers = () => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.6 };
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => sectionObserver.observe(section));

    // Lazy loading images
    const lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                lazyLoadObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => lazyLoadObserver.observe(img));

    // Section fade-in animation
    const animateSections = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => animateSections.observe(section));
};

// Dark mode toggle with localStorage persistence
const initDarkModeToggle = () => {
    const toggleButton = document.createElement('button');
    toggleButton.textContent = localStorage.getItem('darkMode') === 'true' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    Object.assign(toggleButton.style, {
        position: 'fixed', bottom: '20px', right: '20px', padding: '10px 15px',
        backgroundColor: 'var(--primary-color)', color: 'var(--white)', border: 'none',
        borderRadius: '5px', cursor: 'pointer', zIndex: '1000'
    });

    document.body.appendChild(toggleButton);

    toggleButton.addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        toggleButton.textContent = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    });

    const darkModeStyles = `
        body.dark-mode {
            background-color: var(--gray-dark);
            color: var(--beige-lightest);
        }
        body.dark-mode header, 
        body.dark-mode footer, 
        body.dark-mode .section {
            background-color: var(--gray);
            color: var(--white);
        }
        body.dark-mode nav ul li a {
            color: var(--white);
        }
        body.dark-mode nav ul li a.active,
        body.dark-mode nav ul li a:hover {
            color: var(--accent-color);
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = darkModeStyles;
    document.head.appendChild(styleSheet);

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        toggleButton.textContent = 'Switch to Light Mode';
    }
};

// Initialize all functionalities on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    initObservers();
    initDarkModeToggle();
});
