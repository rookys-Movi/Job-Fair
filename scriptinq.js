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
        event.preventDefault();

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

        const submitButton = document.getElementById('submitForm');
        submitButton.disabled = true;
        submitButton.textContent = '送信中...';
        
        const formData = new FormData(form);
        const dataObject = {};
        formData.forEach((value, key) => { dataObject[key] = value; });

        // Add the secret token for validation
        dataObject.secret = '8qZ$p#vT2@nK*wG7hB5!sF8aU';

        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzWMskETGtSl35LFt3aIM5rzmQe3E4k79o3QAjFEOdB8ZLj_J5VSAunRhRB9qCMpZD6/exec";

        fetch(SCRIPT_URL, {
            method: 'POST',
            // Use 'cors' mode and handle the actual response
            mode: 'cors', 
            headers: {
                'Content-Type': 'text/plain;charset=utf-8', // Send as text/plain
            },
            body: JSON.stringify(dataObject),
            redirect: 'follow'
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                // Redirect to the thank you page on success
                window.top.location.href = 'thankyou_jobfair.html';
            } else {
                throw new Error(data.message || 'Unknown error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showAlert('送信に失敗しました。時間をおいて再度お試しください。');
            submitButton.disabled = false;
            submitButton.textContent = '上記に同意して送信';
        });
    });
});