// Utility function for smooth scrolling
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error(`Element with selector ${target} not found.`);
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        smoothScroll(this.getAttribute('href'));

        // Close the navigation menu after clicking a link (for mobile view)
        const navLinks = document.getElementById('nav-links');
        if (navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
        }
    });
});

// Toggle visibility of sections with transition and ARIA attributes
document.querySelectorAll('h2').forEach(heading => {
    heading.setAttribute('role', 'button');
    heading.setAttribute('tabindex', '0');
    heading.addEventListener('click', function () {
        const sectionContent = this.nextElementSibling;
        if (sectionContent) {
            sectionContent.classList.toggle('hidden');
            sectionContent.setAttribute('aria-expanded', sectionContent.classList.contains('hidden') ? 'false' : 'true');
        }
    });
});

// Toggle navigation menu on mobile view
document.getElementById('menu-icon').addEventListener('click', function () {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
});

// Debounced scroll event for updating the active link
let debounceTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        let currentSectionId = '';
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                currentSectionId = section.getAttribute('id');
            }
        });

        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    }, 100); // Adjust debounce time as needed
});

// Optional: Light/Dark mode toggle with localStorage persistence
const toggleButton = document.createElement('button');
toggleButton.textContent = localStorage.getItem('darkMode') === 'true' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
toggleButton.style.position = 'fixed';
toggleButton.style.bottom = '20px';
toggleButton.style.right = '20px';
toggleButton.style.padding = '10px 15px';
toggleButton.style.backgroundColor = 'var(--gray-dark)';
toggleButton.style.color = 'var(--white)';
toggleButton.style.border = 'none';
toggleButton.style.borderRadius = '5px';
toggleButton.style.cursor = 'pointer';

document.body.appendChild(toggleButton);

toggleButton.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    toggleButton.textContent = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
});

// Dark mode styles
const darkModeStyles = `
    body.dark-mode {
        background-color: var(--gray-dark);
        color: var(--beige-lightest);
    }
    body.dark-mode header, 
    body.dark-mode footer, 
    body.dark-mode .area, 
    body.dark-mode .values, 
    body.dark-mode .reach, 
    body.dark-mode .relevance, 
    body.dark-mode .solution, 
    body.dark-mode .innovation, 
    body.dark-mode .progress {
        background-color: var(--gray);
        color: var(--white);
    }
    body.dark-mode nav ul li a {
        color: var(--white);
    }
    body.dark-mode nav ul li a.active,
    body.dark-mode nav ul li a:hover {
        color: var(--beige-lightest);
    }
`;

// Append dark mode styles to the head
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = darkModeStyles;
document.head.appendChild(styleSheet);

// Initialize dark mode based on saved preference
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        toggleButton.textContent = 'Switch to Light Mode';
    }
});
