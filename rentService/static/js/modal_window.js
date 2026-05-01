const modal = document.getElementById('modalWindow');
const openBtn = document.getElementById('openModalBtn');
const closeBtn = document.getElementById('closeModalBtn');

// Функция открытия
function openModal() {
  modal.style.display = 'block';
}

// Функция закрытия
function closeModal() {
  modal.style.display = 'none';
}

// Обработчики событий
openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

document.addEventListener('click', (event) => {

    if (event.target === modal) {
        return;
    }

    if (modal.contains(event.target))
    {
        return;
    }

    if (event.target === openBtn) {
        return;
    }

    if (openBtn.contains(event.target))
    {
        return;
    }

    modal.style.display = 'none';
});
