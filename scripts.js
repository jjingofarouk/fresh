// signup.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');

    // Function to display error messages
    function showError(element, message) {
        const errorSpan = document.getElementById(`${element.id}Error`);
        errorSpan.textContent = message;
    }

    // Function to clear all error messages
    function clearErrors() {
        const errors = document.querySelectorAll('.error');
        errors.forEach(error => error.textContent = '');
    }

    // Function to validate email format
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to validate password strength
    function validatePassword(password) {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;
    }

    // Event listener for form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        clearErrors();

        const fname = form.fname.value.trim();
        const lname = form.lname.value.trim();
        const email = form.email.value.trim();
        const password = form.pass.value;
        const confirmPass = form.confirmPass.value;
        const tel = form.tel.value.trim();
        const bdate = form.bdate.value;
        const title = form.title.value;
        const country = form.country.value;
        const gender = form.gender.value;
        const terms = form.terms.checked;

        let valid = true;

        // Validate First Name
        if (!fname) {
            showError(form.fname, 'First name is required.');
            valid = false;
        }

        // Validate Last Name
        if (!lname) {
            showError(form.lname, 'Last name is required.');
            valid = false;
        }

        // Validate Email
        if (!email || !validateEmail(email)) {
            showError(form.email, 'Please enter a valid email address.');
            valid = false;
        }

        // Validate Password
        if (!password || password.length < 8 || !validatePassword(password)) {
            showError(form.pass, 'Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.');
            valid = false;
        }

        // Validate Confirm Password
        if (password !== confirmPass) {
            showError(form.confirmPass, 'Passwords do not match.');
            valid = false;
        }

        // Validate Birthdate
        if (!bdate) {
            showError(form.bdate, 'Birthdate is required.');
            valid = false;
        }

        // Validate Terms and Conditions
        if (!terms) {
            showError(form.terms, 'You must agree to the terms and conditions.');
            valid = false;
        }

        if (!valid) return;

        // Collect form data
        const formData = {
            fname,
            lname,
            email,
            password,
            tel,
            bdate,
            title,
            country,
            gender
        };

        // Send data to the server using AJAX
        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Signup successful!');
                form.reset(); // Reset form on successful submission
            } else {
                showError(form.email, data.message || 'An error occurred. Please try again.');
            }
        })
        .catch(error => {
            showError(form.email, 'An error occurred. Please try again.');
            console.error('Error:', error);
        });
    });
});
