document.getElementById('validationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let isValid = true;

    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelectorAll('input, textarea').forEach(el => el.classList.remove('error'));

    const patterns = {
        name: /^[a-zA-Zа-яА-ЯёЁ]{1,20}$/,
        email: /^\w+@[a-zA-Z]{2,5}\.[a-zA-Z]{2,3}$/,
        phone: /^\(0\d{2}\)\d{3}-\d{2}-\d{2}$/
    };

    function validateField(field, pattern, errorId, errorMessage) {
        if (!pattern.test(field.value)) {
            isValid = false;
            field.classList.add('error');
            document.getElementById(errorId).textContent = errorMessage;
        }
    }

    validateField(
        document.getElementById('surname'),
        patterns.name,
        'surname-error',
        'Фамилия должна содержать только буквы и не более 20 символов'
    );

    validateField(
        document.getElementById('name'),
        patterns.name,
        'name-error',
        'Имя должно содержать только буквы и не более 20 символов'
    );

    validateField(
        document.getElementById('email'),
        patterns.email,
        'email-error',
        'Введите корректный e-mail'
    );

    validateField(
        document.getElementById('phone'),
        patterns.phone,
        'phone-error',
        'Введите телефон в формате (0xx)xxx-xx-xx.'
    );

    const about = document.getElementById('about');
    if (about.value.length > 250) {
        isValid = false;
        about.classList.add('error');
        document.getElementById('about-error').textContent = 'Текст не должен превышать 250 символов.';
    }

    const course = document.querySelector('input[name="course"]:checked');
    if (!course) {
        isValid = false;
        alert('Выберите курс');
    }

    const city = document.getElementById('city');
    const university = document.getElementById('university');

    if (city.value !== 'Минск' || (course && course.value !== '2') || !university.checked) {
        const confirmation = confirm('Вы уверены в своем ответе?');
        if (!confirmation) {
            isValid = false;
        }
    }

    if (isValid) {
        alert('Форма успешно отправлена!');
    }
});
