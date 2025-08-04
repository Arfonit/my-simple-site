document.addEventListener('DOMContentLoaded', () => {
  // === ТЕМА ===
  const themeToggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.add(savedTheme);

  themeToggleBtn?.addEventListener('click', () => {
    const current = document.body.classList.contains('dark') ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.body.classList.remove(current);
    document.body.classList.add(next);
    localStorage.setItem('theme', next);
  });

  // === ЗВУК ===
  const hoverSound = new Audio('sound.mp3');
  document.addEventListener('mouseover', function (e) {
    if (e.target.classList.contains('animated-button') || e.target.id === 'scrollTopBtn') {
      hoverSound.currentTime = 0;
      hoverSound.play().catch(() => {});
    }
  });

  // === Scroll-to-top ===
  const scrollBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // === СЛАЙДЕР ===
  const slidesContainer = document.querySelector('.slides');
  const slides = document.querySelectorAll('.slides img');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentSlide = 0;

  function updateSlider() {
    const offset = currentSlide * 100;
    slidesContainer.style.transform = `translateX(-${offset}%)`;
  }

  if (prevBtn && nextBtn && slides.length) {
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlider();
    });

    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    });

    updateSlider();
  }
});

// === ФОРМА ОБРАТНОЙ СВЯЗИ ===
const feedbackForm = document.getElementById('feedbackForm');
const responseBlock = document.getElementById('formResponse');

if (feedbackForm) {
  feedbackForm.addEventListener('submit', function (e) {
    e.preventDefault(); // не отправляем форму

    const name = feedbackForm.name.value.trim();
    const email = feedbackForm.email.value.trim();
    const message = feedbackForm.message.value.trim();

    if (!name || !email || !message) {
      responseBlock.textContent = 'Пожалуйста, заполните все поля.';
      responseBlock.style.color = 'red';
      return;
    }

    // Простая имитация отправки
    responseBlock.textContent = `Спасибо, ${name}! Мы скоро с вами свяжемся.`;
    responseBlock.style.color = 'green';

    feedbackForm.reset(); // очищаем форму
  });
}

