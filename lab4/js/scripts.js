document.addEventListener('DOMContentLoaded', () => {
    const openFormButton = document.getElementById('openFormButton');
    const closeFormButton = document.getElementById('closeFormButton');
    const formPopup = document.getElementById('formPopup');
    const userForm = document.getElementById('userForm');

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    openFormButton.addEventListener('click', () => {
        formPopup.style.display = 'flex';
    });

    closeFormButton.addEventListener('click', () => {
        formPopup.style.display = 'none';
    });

    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim() === "") {
            nameInput.setCustomValidity("Имя не может быть пустым.");
        } else {
            nameInput.setCustomValidity("");
        }
    });

    emailInput.addEventListener('input', () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            emailInput.setCustomValidity("Введите корректный email.");
        } else {
            emailInput.setCustomValidity("");
        }
    });

    phoneInput.addEventListener('input', () => {
        const phonePattern = /^\+?\d{11}$/;
        if (!phonePattern.test(phoneInput.value)) {
            phoneInput.setCustomValidity("Введите корректный номер телефона (11 цифр).");
        } else {
            phoneInput.setCustomValidity("");
        }
    });

    userForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!userForm.checkValidity()) {
            alert("Пожалуйста, исправьте ошибки в форме перед отправкой.");
            return;
        }

        const formData = new FormData(userForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone')
        };


        fetch('http://localhost:8000/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                console.log('Успешная отправка:', result);
                alert(result.message || 'Информация успешно отправлена!');
                userForm.reset();
                formPopup.style.display = 'none';
            })
            .catch(error => {
                console.error('Ошибка при отправке:', error);
                alert('Не удалось отправить данные. Пожалуйста, попробуйте снова.');
            });
    });
});
