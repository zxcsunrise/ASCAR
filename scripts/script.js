const textElement = document.querySelector('.sliding-text');

function resetAnimation() {
  textElement.style.animation = 'none';
  void textElement.offsetWidth;
  textElement.style.animation = 'slideLeft 10s linear infinite';
}

textElement.addEventListener('mouseenter', () => {
  textElement.style.animationPlayState = 'paused';
});

textElement.addEventListener('mouseleave', () => {
  textElement.style.animationPlayState = 'running';
});

document.addEventListener('DOMContentLoaded', function () {
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', function () {
      const content = this.nextElementSibling;

      document.querySelectorAll('.accordion-content').forEach(item => {
        if (item !== content) {
          item.style.display = 'none';
        }
      });

      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    });
  });
});


const testimonialsSwiper = new Swiper(".testimonialsSwiper", {
  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },
  slidesPerView: 1.5,
  spaceBetween: 40,
  breakpoints: {
    320: {
      slidesPerView: 1.1,
      spaceBetween: 12,
    },
  },
});
const interiorSwiper = new Swiper(".interiorSwiper", {
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  spaceBetween: 16,
});
const employeesSwiper = new Swiper(".employeesSwiper", {
  spaceBetween: 12,
  slidesPerView: 1.075,
});


// Создаём элемент курсора
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

// Движение курсора
const moveCursor = (e) => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
};

// Определение цвета под курсором
const handleHover = (e) => {
  const target = e.target;
  if (!target) return;

  const style = window.getComputedStyle(target);

  // Функция проверки тёмного цвета
  const isDarkColor = (colorValue) => {
    if (!colorValue || colorValue === 'transparent' || colorValue === 'rgba(0, 0, 0, 0)') return false;

    // Создаём временный элемент для анализа цвета
    const tempEl = document.createElement('div');
    tempEl.style.color = colorValue;
    document.body.appendChild(tempEl);
    const rgb = window.getComputedStyle(tempEl).color;
    document.body.removeChild(tempEl);

    // Парсим RGB значения
    const rgbValues = rgb.match(/\d+/g);
    if (!rgbValues || rgbValues.length < 3) return false;

    // Рассчитываем яркость (формула W3C)
    const brightness = (parseInt(rgbValues[0]) * 299 +
      parseInt(rgbValues[1]) * 587 +
      parseInt(rgbValues[2]) * 114) / 1000;

    return brightness < 128; // Если яркость меньше 128 - считаем цвет тёмным
  };

  // Проверяем цвет текста и фона
  const color = style.color;
  const bgColor = style.backgroundColor;

  // Меняем цвет курсора
  cursor.style.backgroundColor = (isDarkColor(color) || isDarkColor(bgColor)) ? '#fff' : '#212121';

  // Добавляем класс для кликабельных элементов
  if (target.closest('a, button, [role="button"], [onclick], input, textarea, select, label[for]')) {
    cursor.classList.add('custom-cursor--hover');
  } else {
    cursor.classList.remove('custom-cursor--hover');
  }
};

// Скрываем курсор при выходе за пределы окна
const handleMouseOut = (e) => {
  if (!e.relatedTarget && e.target === document.documentElement) {
    cursor.style.opacity = '0';
  }
};

const handleMouseEnter = () => {
  cursor.style.opacity = '1';
};

// Инициализация
const initCursor = () => {
  // Добавляем обработчики
  document.addEventListener('mousemove', moveCursor);
  document.addEventListener('mouseover', handleHover);
  document.addEventListener('mouseout', handleMouseOut);
  document.addEventListener('mouseenter', handleMouseEnter);

  // Убедимся, что курсор поверх всего
  cursor.style.zIndex = '9999';
};

// Запускаем после загрузки DOM
if (document.readyState === 'complete') {
  initCursor();
} else {
  document.addEventListener('DOMContentLoaded', initCursor);
}

document.addEventListener('DOMContentLoaded', function() {
    const cookieNotification = document.getElementById('cookie-notification');
    const cookieAcceptBtn = document.getElementById('cookie-accept');
    
    // Проверяем, было ли уже принято уведомление
    if (!localStorage.getItem('cookieAccepted')) {
        cookieNotification.style.display = 'block';
    }
    
    // Обработчик клика на кнопку принятия
    cookieAcceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookieAccepted', 'true');
        cookieNotification.style.display = 'none';
    });
});

// modal window
document.addEventListener('DOMContentLoaded', function() {
    // Общие функции для работы с модальными окнами
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Открытие модальных окон по кнопкам
    document.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
    });
    
    // Закрытие модальных окон
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        // Закрытие по кнопке закрытия
        modal.querySelectorAll('.close-modal-btn, .modal-cancel-btn').forEach(btn => {
            btn.addEventListener('click', () => closeModal(modal));
        });
        
        // Закрытие по клику вне окна
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Закрытие по Esc
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                closeModal(modal);
            });
        }
    });
    
    // Дополнительно: можно добавить автоматическое закрытие при успешном действии
    document.querySelectorAll('.modal-action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            // Здесь можно добавить логику перед закрытием
            closeModal(modal);
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.getElementById('burgerBtn');
    const burgerNav = document.getElementById('burgerNav');
    
    // Создаем оверлей динамически
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    // Открытие/закрытие меню
    burgerBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        burgerNav.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Блокировка прокрутки страницы
        document.body.style.overflow = burgerNav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Закрытие меню по клику на оверлей
    overlay.addEventListener('click', function() {
        burgerBtn.classList.remove('active');
        burgerNav.classList.remove('active');
        this.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Закрытие меню по Esc
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && burgerNav.classList.contains('active')) {
            burgerBtn.classList.remove('active');
            burgerNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});