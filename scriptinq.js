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

        // This function will be called after the form data is processed on the server
        function onFormSubmitSuccess(url) {
             window.top.location.href = url + '?page=thankyou';
        }

        // Call the server-side function to process the form,
        // and on success, call our local onFormSubmitSuccess function.
        google.script.run
            .withSuccessHandler(onFormSubmitSuccess)
            .withFailureHandler(err => {
                showAlert('送信に失敗しました。時間をおいて再度お試しください。');
                console.error(err);
                submitButton.disabled = false;
                submitButton.textContent = '上記に同意して送信';
            })
            .processInquiryForm(this); // 'this' refers to the form element
    });
});
