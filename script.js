// Utility function for smooth scrolling
const smoothScroll = (target) => {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error(`Element with selector ${target} not found.`);
    }
};

// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScroll(e.target.getAttribute('href'));

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
    heading.addEventListener('click', () => {
        const sectionContent = heading.nextElementSibling;
        if (sectionContent) {
            sectionContent.classList.toggle('hidden');
            sectionContent.setAttribute('aria-expanded', sectionContent.classList.contains('hidden') ? 'false' : 'true');
        }
    });
});

// Toggle navigation menu on mobile view
document.getElementById('menu-icon').addEventListener('click', () => {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show');
});

// Use Intersection Observer API for updating the active link
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
document.querySelectorAll('section').forEach(section => observer.observe(section));

// Light/Dark mode toggle with localStorage persistence
const toggleButton = document.createElement('button');
toggleButton.textContent = localStorage.getItem('darkMode') === 'true' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
toggleButton.style.position = 'fixed';
toggleButton.style.bottom = '20px';
toggleButton.style.right = '20px';
toggleButton.style.padding = '10px 15px';
toggleButton.style.backgroundColor = 'var(--primary-color)';
toggleButton.style.color = 'var(--white)';
toggleButton.style.border = 'none';
toggleButton.style.borderRadius = '5px';
toggleButton.style.cursor = 'pointer';
toggleButton.style.zIndex = '1000';

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

// Form validation
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        const nameInput = form.querySelector('input[name="name"]');
        const emailInput = form.querySelector('input[name="email"]');
        const messageInput = form.querySelector('textarea[name="message"]');

        if (!nameInput.value.trim()) {
            isValid = false;
            showError(nameInput, 'Name is required');
        } else {
            clearError(nameInput);
        }

        if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
            isValid = false;
            showError(emailInput, 'Valid email is required');
        } else {
            clearError(emailInput);
        }

        if (!messageInput.value.trim()) {
            isValid = false;
            showError(messageInput, 'Message is required');
        } else {
            clearError(messageInput);
        }

        if (isValid) {
            // Submit the form or show success message
            showSuccessMessage(form, 'Form submitted successfully!');
        }
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(input, message) {
    const errorElement = input.nextElementSibling || document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    if (!input.nextElementSibling) {
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    input.classList.add('error');
}

function clearError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.className === 'error-message') {
        errorElement.remove();
    }
    input.classList.remove('error');
}

function showSuccessMessage(form, message) {
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = message;
    form.appendChild(successElement);
    setTimeout(() => successElement.remove(), 3000);
}

// Dynamic content loading
function loadContent(url, targetElement) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            targetElement.innerHTML = html;
        })
        .catch(error => console.error('Error loading content:', error));
}

// Example usage: loadContent('about-us.html', document.getElementById('about-section'));

// Search functionality
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

if (searchInput && searchResults) {
    searchInput.addEventListener('input', debounce(() => {
        const query = searchInput.value.toLowerCase();
        const sections = document.querySelectorAll('section');
        const matches = [];

        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (text.includes(query)) {
                matches.push({
                    title: section.querySelector('h2').textContent,
                    id: section.id
                });
            }
        });

        displaySearchResults(matches);
    }, 300));
}

function debounce(func, delay) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

function displaySearchResults(results) {
    searchResults.innerHTML = '';
    if (results.length === 0) {
        searchResults.innerHTML = '<p>No results found</p>';
    } else {
        const ul = document.createElement('ul');
        results.forEach(result => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${result.id}`;
            a.textContent = result.title;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                smoothScroll(`#${result.id}`);
                searchResults.innerHTML = '';
                searchInput.value = '';
            });
            li.appendChild(a);
            ul.appendChild(li);
        });
        searchResults.appendChild(ul);
    }
}

// Lazy loading images
const lazyImages = document.querySelectorAll('img[data-src]');
const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => lazyLoadObserver.observe(img));

// Add a back-to-top button
const backToTopButton = document.createElement('button');
backToTopButton.textContent = '↑';
backToTopButton.style.position = 'fixed';
backToTopButton.style.bottom = '20px';
backToTopButton.style.left = '20px';
backToTopButton.style.padding = '10px 15px';
backToTopButton.style.backgroundColor = 'var(--primary-color)';
backToTopButton.style.color = 'var(--white)';
backToTopButton.style.border = 'none';
backToTopButton.style.borderRadius = '50%';
backToTopButton.style.cursor = 'pointer';
backToTopButton.style.display = 'none';
backToTopButton.style.zIndex = '1000';

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Add a simple animation to section entrances
const animateSections = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    animateSections.observe(section);
});

// Add this CSS to your stylesheet
const animationStyles = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .fade-in {
        animation: fadeIn 0.5s ease-out forwards;
    }
`;

styleSheet.innerText += animationStyles;
