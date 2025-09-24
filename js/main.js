// Анимация облака технологий с последовательным появлением
function initTechCloud() {
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach((tag, index) => {
        // Задержка для последовательного появления
        const delay = index * 80; // Уменьшили задержку
        tag.style.animationDelay = `${delay}ms`;
        
        // Случайное смещение для более органичного вида
        const randomX = (Math.random() - 0.5) * 15;
        const randomY = (Math.random() - 0.5) * 8;
        tag.style.transform = `translate(${randomX}px, ${randomY}px)`;
        
        // Добавляем класс для анимации при появлении в viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(tag);
    });
}

// Анимированный меняющийся текст
function initDynamicText() {
    const textElement = document.getElementById('dynamic-text');
    if (!textElement) return;

    const phrases = [
        "hello_world()",
        "@property",
        "import this",
        "from bugs import features",
        "while True: code()",
        "def __magic__(self):",
        "future.result()",
        "class FiveMinuteTask(ABC):",
        "if coffee: code()",
        "async def magic():",
        "pip install pip",
        "lambda x: x**2",
        "try: innovate()",
        "class Dev:",
        "self.skills += 1",
        "yield results",
        "import passion", 
        "# TODO: fix it",
        "@dataclass"
    ];

    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let pauseTime = 2000;

    function typeWriter() {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
            textElement.textContent = "> " + currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50;
        } else {
            textElement.textContent = "> " + currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            typingSpeed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Запускаем после небольшой задержки
    setTimeout(typeWriter, 1000);
}

// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Учитываем высоту навигационной панели
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Анимация курсора
function initCursor() {
    const cursor = document.querySelector('.terminal-cursor');
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Плавное следование курсора за мышью
        cursorX += (mouseX - cursorX - 10) * 0.1;
        cursorY += (mouseY - cursorY - 10) * 0.1;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();

    // Мигание курсора
    setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === '0.5' ? '1' : '0.5';
    }, 800);
}

// Анимация появления элементов при скролле
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Добавляем анимацию для различных элементов
    document.querySelectorAll('.project-card, .education-card, .coming-soon-card, .stat-item, .language-badge, .contact-method').forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Активное меню при скролле
function initActiveMenu() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Инициализация всего при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    initDynamicText();
    initSmoothScroll();
    initCursor();
    initScrollAnimations();
    initTechCloud();
    initActiveMenu();
});

// Добавляем CSS для дополнительных анимаций
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--terminal-green) !important;
        font-weight: 600;
    }
    
    .nav-links a.active::after {
        content: ' ▸';
        color: var(--terminal-green);
    }
    
    #dynamic-text {
        min-height: 60px;
        display: inline-block;
    }
    
    /* Улучшенная анимация для tech tags */
    @keyframes techTagAppear {
        0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95) rotate(-5deg);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
        }
    }
`;
document.head.appendChild(style);