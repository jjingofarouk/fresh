document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const loadingIndicator = document.getElementById('loadingIndicator');

    // Function to display error messages
    const showError = (element, message) => {
        const errorSpan = document.getElementById(`${element.id}Error`);
        if (errorSpan) {
            errorSpan.textContent = message;
            element.classList.add('input-error');
        }
    };

    // Function to clear all error messages
    const clearErrors = () => {
        document.querySelectorAll('.error').forEach(error => error.textContent = '');
        document.querySelectorAll('.input-error').forEach(input => input.classList.remove('input-error'));
    };

    // Function to validate email format
    const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Function to validate password strength
    const validatePassword = password => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(password);

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        clearErrors();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        let valid = true;

        // Basic HTML5 validation
        form.reportValidity();

        // Validate First Name
        if (!data.fname.trim()) {
            showError(form.fname, 'First name is required.');
            valid = false;
        }

        // Validate Last Name
        if (!data.lname.trim()) {
            showError(form.lname, 'Last name is required.');
            valid = false;
        }

        // Validate Email
        if (!validateEmail(data.email)) {
            showError(form.email, 'Please enter a valid email address.');
            valid = false;
        }

        // Validate Password
        if (!validatePassword(data.password)) {
            showError(form.pass, 'Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.');
            valid = false;
        }

        // Validate Confirm Password
        if (data.password !== data.confirmPass) {
            showError(form.confirmPass, 'Passwords do not match.');
            valid = false;
        }

        // Validate Birthdate
        if (!data.bdate) {
            showError(form.bdate, 'Birthdate is required.');
            valid = false;
        }

        // Validate Terms and Conditions
        if (!data.terms) {
            showError(form.terms, 'You must agree to the terms and conditions.');
            valid = false;
        }

        if (!valid) return;

        try {
            // Show loading indicator
            loadingIndicator.style.display = 'block';

            // Send data to the server using AJAX
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                alert('Signup successful!');
                form.reset(); // Reset form on successful submission
            } else {
                throw new Error(result.message || 'An error occurred. Please try again.');
            }
        } catch (error) {
            showError(form.email, error.message);
            console.error('Error:', error);
        } finally {
            // Hide loading indicator
            loadingIndicator.style.display = 'none';
        }
    };

    // Add event listener for form submission
    form.addEventListener('submit', handleSubmit);
});
