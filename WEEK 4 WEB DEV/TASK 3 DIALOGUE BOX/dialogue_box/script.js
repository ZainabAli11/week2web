const modal = document.getElementById('modal');
const openBtn = document.getElementById('openModalBtn');
const closeBtn = document.querySelector('.close-btn');

openBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden'; 
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
});

const closeModal = () => {
  modal.classList.remove('show');
  document.body.style.overflow = ''; 
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300); 
};

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) {
    closeModal();
  }
});
