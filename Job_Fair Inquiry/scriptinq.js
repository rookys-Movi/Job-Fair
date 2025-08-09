document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('inquiryForm');
    const customAlert = document.getElementById('customAlert');
    const customAlertMessage = document.getElementById('customAlertMessage');
    const customAlertClose = document.getElementById('customAlertClose');
    const overlay = document.getElementById('customAlertOverlay');

    function showAlert(message) {
        customAlertMessage.textContent = message;
        customAlert.classList.remove('hidden');
        overlay.classList.remove('hidden');
    }

    function hideAlert() {
        customAlert.classList.add('hidden');
        overlay.classList.add('hidden');
    }

    customAlertClose.addEventListener('click', hideAlert);
    overlay.addEventListener('click', hideAlert);

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Simple validation check
        const requiredFields = form.querySelectorAll('[required]');
        let allFieldsFilled = true;
        requiredFields.forEach(field => {
            if (!field.value.trim() || (field.type === 'checkbox' && !field.checked)) {
                allFieldsFilled = false;
            }
        });

        if (!allFieldsFilled) {
            showAlert('必須項目をすべて入力してください。');
            return;
        }

        // --- Placeholder for actual submission logic ---
        // In a real application, you would call google.script.run here
        // to send the form data to your Code.gs script.
        // For now, we will just redirect to the thank you page.
        
        // Show a "submitting" message
        const submitButton = document.getElementById('submitForm');
        submitButton.disabled = true;
        submitButton.textContent = '送信中...';

        // Get the base URL of the web app
        google.script.run.withSuccessHandler(function(url) {
            // Redirect to the thank you page using the correct URL structure
            window.top.location.href = url + '?page=thankyou';
        }).getWebAppUrl();
    });
});

