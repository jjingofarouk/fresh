// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Toggle visibility of sections
document.querySelectorAll('h2').forEach(heading => {
    heading.addEventListener('click', function () {
        const sectionContent = this.nextElementSibling;
        if (sectionContent.style.display === 'none' || !sectionContent.style.display) {
            sectionContent.style.display = 'block';
        } else {
            sectionContent.style.display = 'none';
        }
    });
});

// Add an active class to the current section link in the navbar
window.addEventListener('scroll', () => {
    let currentSection = '';

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            currentSection = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});

// Optional: Light/Dark mode toggle
const toggleButton = document.createElement('button');
toggleButton.textContent = 'Toggle Light/Dark Mode';
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
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        toggleButton.textContent = 'Switch to Light Mode';
    } else {
        toggleButton.textContent = 'Switch to Dark Mode';
    }
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
