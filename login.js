// Select the form element
const form = document.querySelector('form');

// Add event listener to the form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get the input values
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const rememberMe = document.getElementById('remember-me').checked;

  // Validate the input values
  if (username === '' || password === '') {
    alert('Please fill in all fields');
    return;
  }

  // Send a POST request to the server
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password,
      rememberMe
    })
  })
  .then(response => response.json())
  .then((data) => {
    if (data.success) {
      // Login successful, redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      // Login failed, display error message
      alert('Invalid username or password');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});

// Add event listener to the social login buttons
document.querySelectorAll('.social-button').forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    // Handle social login logic here
    // For example, redirect to a social login page
    window.location.href = `/${button.textContent.toLowerCase()}.html`;
  });
});
