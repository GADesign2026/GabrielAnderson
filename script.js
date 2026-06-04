/**
 * ================================================================
 * GA DESIGN - PROFESSIONAL PORTFOLIO INTERACTION ENGINE
 * Author: Gabriel Anderson
 * Description: Particle system, animations, dynamic filtering,
 *              lightbox modal, auto counter, and expandable grid.
 * ================================================================
 */

// ==========================================
// 1. CONFIGURATION & EDITABLE DATA
// ==========================================
const COUNTERS_CONFIG = {
    projetos: 200,        // Total projects completed
    clientes: 100,         // Total happy clients
    experiencia: 6       // Years of experience
};

// Initial services database (can be expanded dynamically by UI button)
let servicesDatabase = [
    { id: 1, title: 'Criação de Logos', desc: 'Sua logo é o rosto da sua empresa. Desenvolvo identidades visuais marcantes para ajudar seu negócio a se destacar no mercado.', icon: 'logo' },
    { id: 2, title: 'Identidade Visual', desc: 'Muito além da logo: desenvolvo a identidade visual da sua marca para que ela tenha uma aparência profissional e consistente em todos os lugares.', icon: 'branding' },
    { id: 3, title: 'Artes para Redes Sociais', desc: 'Posts personalizados para Instagram, Facebook e outras redes sociais, criados para transmitir profissionalismo e destacar seu negócio.', icon: 'social' },
    { id: 4, title: 'Flyers Digitais', desc: 'Flyers digitais criados para divulgar promoções, eventos, produtos e serviços de forma profissional e atrativa.', icon: 'flyer' },
    { id: 5, title: 'Artes Promocionais', desc: 'Banners criativos e profissionais para divulgar produtos, serviços, promoções e fortalecer a presença da sua marca.', icon: 'banner' },
    { id: 6, title: 'Cardápios Digitais', desc: 'Cardápios desenvolvidos para apresentar seus produtos de forma organizada, atrativa e profissional, valorizando seu negócio.', icon: 'menu' },
    { id: 7, title: 'Thumbnails para YouTube', desc: 'Capas personalizadas para YouTube, criadas para chamar a atenção do público e destacar seus vídeos.', icon: 'youtube' },
    { id: 8, title: 'Convites Digitais', desc: 'Convites digitais personalizados para casamentos, aniversários, festas e eventos, criados com um visual elegante e exclusivo para cada ocasião.', icon: 'invite' },
    { id: 9, title: 'Design para Empresas', desc: 'Materiais personalizados para empresas, desenvolvidos para fortalecer a comunicação da marca e transmitir mais profissionalismo.', icon: 'corporate' },
    { id: 10, title: 'Capas para Música e Playlists', desc: 'Artes para músicas e playlists criadas para traduzir a identidade sonora de cada faixa ou álbum de forma visual e impactante.', icon: 'music' },
    { id: 11, title: 'Desenvolvimento de Sites', desc: 'Criação de sites personalizados que ajudam empresas e profissionais a apresentarem seus serviços de forma clara, profissional e atrativa na internet.', icon: 'globe' }
];

// SVG Icon templates used dynamically
const SVG_ICONS = {
    logo: `<svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm1 17.93V17a1 1 0 0 0-2 0v2.93A8 8 0 0 1 4.07 13H7a1 1 0 0 0 0-2H4.07A8 8 0 0 1 11 4.07V7a1 1 0 0 0 2 0V4.07A8 8 0 0 1 19.93 11H17a1 1 0 0 0 0 2h2.93A8 8 0 0 1 13 19.93zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>`,
    branding: `<svg viewBox="0 0 24 24"><path d="M19 2H5C3.3 2 2 3.3 2 5v14c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3V5c0-1.7-1.3-3-3-3zm-7 15c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"/></svg>`,
    social: `<svg viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/></svg>`,
    flyer: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0-4H7V7h10v2zm0 8H7v-2h10v2z"/></svg>`,
    banner: `<svg viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 3.99L19.53 19H4.47L12 5.99zM13 16h-2v2h2v-2zm0-6h-2v4h2v-4z"/></svg>`,
    menu: `<svg viewBox="0 0 24 24"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm8-3h-3v7h3v9h2V3c0-1.66-1.34-3-3-3z"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24"><path d="M23 12s0-4.18-.37-5.57c-.22-.8-.85-1.43-1.65-1.65C19.58 4.4 12 4.4 12 4.4S4.4 4.4 3.02 4.78c-.8.22-1.43.85-1.65 1.65C1 7.82 1 12 1 12s0 4.18.38 5.57c.22.8.85 1.43 1.65 1.65C4.4 19.6 12 19.6 12 19.6s7.58 0 8.96-.38c.8-.22 1.43-.85 1.65-1.65.37-1.39.37-5.57.37-5.57zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z"/></svg>`,
    invite: `<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    corporate: `<svg viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm10 12h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm4 12h-2v-2h2v2zm0-4h-2v-2h2v2z"/></svg>`,
    music: `<svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>`,
    spark: `<svg viewBox="0 0 24 24"><path d="M12 2l2.4 7.2h7.6L16 13.6l2.4 7.2-6.4-4.8-6.4 4.8 2.4-7.2-6-4.4h7.6z"/></svg>`,
    globe: `<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 0 1 5.08 16zm2.95-8H5.08a7.987 7.987 0 0 1 3.84-3.56A15.65 15.65 0 0 0 7.54 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.34.16-2h4.68c.09.66.16 1.32.16 2s-.07 1.34-.16 2zm1.81 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></svg>`
};

// Portfolio Database including rich concept details
const portfolioData = [
    { id: 'l1', title: 'Cantinho dos Pequenos', category: 'logos', categoryLabel: 'Logos', image: 'assets/logo_1.jpg' },
    { id: 'l2', title: 'Rei da Massa', category: 'logos', categoryLabel: 'Logos', image: 'assets/logo_2.png' },
    { id: 'l3', title: 'Tatiane Rodrigues', category: 'logos', categoryLabel: 'Logos', image: 'assets/logo_3.png' },
    { id: 'l4', title: 'Açaí do Brabo', category: 'logos', categoryLabel: 'Logos', image: 'assets/logo_4.png' },
    { id: 'l5', title: 'Geek On', category: 'logos', categoryLabel: 'Logos', image: 'assets/logo_5.jpg' },
    { id: 'l6', title: "Afonso's Lanchonete & Pizzaria", category: 'logos', categoryLabel: 'Logos', image: 'assets/logo_6.jpg' },
    {
        id: 'c1',
        title: "Cardápio Afonso's",
        category: 'cardapios',
        categoryLabel: 'Cardápios',
        image: 'assets/cardapio_afonsos_p1.jpg',
        gallery: [
            'assets/cardapio_afonsos_p1.jpg',
            'assets/cardapio_afonsos_p2.jpg',
            'assets/cardapio_afonsos_p4.jpg',
            'assets/cardapio_afonsos_p3.jpg'
        ]
    },
];

// ==========================================
// 2. PRELOADER & LOADING BAR
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const preloaderBar = document.getElementById('preloader-bar');
    const preloaderPercent = document.getElementById('preloader-percent');

    let percent = 0;
    const intervalTime = 12; // Controls loading speed (fast and engaging)

    const loadingInterval = setInterval(() => {
        percent += 1;
        if (preloaderBar) preloaderBar.style.width = `${percent}%`;
        if (preloaderPercent) preloaderPercent.textContent = `${percent}%`;

        if (percent >= 100) {
            clearInterval(loadingInterval);

            // Fade out preloader smoothly
            setTimeout(() => {
                if (preloader) {
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';
                }

                // Trigger initial scroll reveals once page is visible
                setTimeout(handleScrollReveal, 100);
            }, 300);
        }
    }, intervalTime);

    // Initialize component renders
    renderServices();
    initPortfolioGrid();
    setupCounterValues();
});

// ==========================================
// 3. RESPONSIVE MENU (HAMBURGER)
// ==========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        // Prevent body scroll when menu open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close menu when clicking link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ==========================================
// 4. HEADER BACKGROUND TRANSITION ON SCROLL
// ==========================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    handleScrollReveal();
    handleActiveNavLink();
});

// Highlight menu links matching currently scrolled section
function handleActiveNavLink() {
    const scrollPosition = window.scrollY + 150;
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPosition >= top && scrollPosition < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ==========================================
// 5. SCROLL-TRIGGERED ANIMATIONS (REVEAL)
// ==========================================
function handleScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 80; // trigger pixel before viewing

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

// ==========================================
// 6. CANVAS PARTICLE SYSTEM (HERO)
// ==========================================
const canvas = document.getElementById('heroCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let mouse = {
        x: null,
        y: null,
        radius: 120
    };

    // Resize canvas
    function resizeCanvas() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Mouse interaction within canvas bounding rect
    window.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Create Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 15) + 5;

            // Neon violet/purple tones
            const colors = [
                'rgba(168, 85, 247, 0.45)', // primary roxo
                'rgba(236, 72, 153, 0.4)',  // secondary rosa
                'rgba(124, 58, 237, 0.35)', // deep violet
                'rgba(99, 102, 241, 0.3)'   // indigo
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];

            // Random floating speed vectors
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        update() {
            // Natural float movement
            this.x += this.vx;
            this.y += this.vy;

            // Boundaries bounce
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

            // Mouse interactive physics (repel)
            if (mouse.x != null && mouse.y != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let maxDistance = mouse.radius;
                    let force = (maxDistance - distance) / maxDistance;
                    let directionX = forceDirectionX * force * this.density;
                    let directionY = forceDirectionY * force * this.density;

                    this.x -= directionX * 0.15;
                    this.y -= directionY * 0.15;
                }
            }
        }
    }

    // Populate particle list
    function initParticles() {
        particlesArray = [];
        let numberOfParticles = Math.min((canvas.width * canvas.height) / 8000, 110);
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }

        requestAnimationFrame(animate);
    }

    initParticles();
    animate();

    // Reinicializar se a tela mudar drasticamente
    window.addEventListener('resize', initParticles);
}

// ==========================================
// 7. COUNTERS (PROGRESSIVE NUMBER ANIMATION)
// ==========================================
function setupCounterValues() {
    // Populate dynamic numbers on the UI before scroll
    const prjNum = document.getElementById('count-projetos');
    const cliNum = document.getElementById('count-clientes');
    const expNum = document.getElementById('count-experiencia');

    if (prjNum) prjNum.textContent = '0';
    if (cliNum) cliNum.textContent = '0';
    if (expNum) expNum.textContent = '0';

    // Setup observer to animate when they enter screen
    const countersSection = document.getElementById('contadores');
    if (countersSection) {
        let animated = false;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !animated) {
                animated = true;
                animateCounter('count-projetos', COUNTERS_CONFIG.projetos, '+');
                animateCounter('count-clientes', COUNTERS_CONFIG.clientes, '+');
                animateCounter('count-experiencia', COUNTERS_CONFIG.experiencia, '+ anos');
            }
        }, { threshold: 0.2 });

        observer.observe(countersSection);
    }
}

function animateCounter(elementId, targetValue, suffix = '') {
    const el = document.getElementById(elementId);
    if (!el) return;

    let currentValue = 0;
    const duration = 1500; // ms
    const increment = Math.max(1, Math.ceil(targetValue / (duration / 16))); // ~60fps

    const countInterval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(countInterval);
        }
        el.textContent = `${currentValue}${suffix}`;
    }, 16);
}

// ==========================================
// 8. SERVIÇOS RENDERING & EXPANSION
// ==========================================
const servicosGrid = document.getElementById('servicosGrid');
const addServiceBtn = document.getElementById('addServiceBtn');
const addServicePanel = document.getElementById('addServicePanel');
const cancelServiceBtn = document.getElementById('cancelServiceBtn');
const saveServiceBtn = document.getElementById('saveServiceBtn');

// Render services in grid
function renderServices() {
    if (!servicosGrid) return;

    servicosGrid.innerHTML = '';

    servicesDatabase.forEach((service, index) => {
        const card = document.createElement('div');
        card.className = 'servico-card reveal';
        // Add staggered transitions manually
        card.style.transitionDelay = `${(index % 3) * 0.1}s`;

        const iconSvg = SVG_ICONS[service.icon] || SVG_ICONS['spark'];

        card.innerHTML = `
            <div class="servico-icon-wrapper">
                ${iconSvg}
            </div>
            <h3 class="servico-title">${service.title}</h3>
            <p class="servico-desc">${service.desc}</p>
        `;

        servicosGrid.appendChild(card);
    });

    // Recalculate triggers
    setTimeout(handleScrollReveal, 100);
}

// Toggle Service Addition Panel
if (addServiceBtn && addServicePanel) {
    addServiceBtn.addEventListener('click', () => {
        addServicePanel.classList.toggle('active');
        if (addServicePanel.classList.contains('active')) {
            addServicePanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Select default icon
            const firstIcon = document.querySelector('.icon-option');
            if (firstIcon) firstIcon.click();
        }
    });
}

if (cancelServiceBtn && addServicePanel) {
    cancelServiceBtn.addEventListener('click', () => {
        addServicePanel.classList.remove('active');
        resetServiceForm();
    });
}

// Select icon in form
const iconOptions = document.querySelectorAll('.icon-option');
iconOptions.forEach(opt => {
    opt.addEventListener('click', () => {
        iconOptions.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
    });
});

function resetServiceForm() {
    const titleInput = document.getElementById('new-service-title');
    const descInput = document.getElementById('new-service-desc');
    if (titleInput) titleInput.value = '';
    if (descInput) descInput.value = '';
    iconOptions.forEach(o => o.classList.remove('selected'));
}

// Save dynamic new service card
if (saveServiceBtn) {
    saveServiceBtn.addEventListener('click', () => {
        const titleInput = document.getElementById('new-service-title');
        const descInput = document.getElementById('new-service-desc');
        const selectedIconOpt = document.querySelector('.icon-option.selected');

        if (!titleInput || !descInput) return;

        const title = titleInput.value.trim();
        const desc = descInput.value.trim();
        const icon = selectedIconOpt ? selectedIconOpt.getAttribute('data-icon') : 'spark';

        if (title === '' || desc === '') {
            alert('Por favor, preencha o título e a descrição do serviço.');
            return;
        }

        // Add to database
        const newId = servicesDatabase.length + 1;
        servicesDatabase.push({
            id: newId,
            title: title,
            desc: desc,
            icon: icon
        });

        // Re-render
        renderServices();

        // Close and clean panel
        addServicePanel.classList.remove('active');
        resetServiceForm();

        // Animate grid to show insertion highlight
        setTimeout(() => {
            const newlyCreatedCard = servicosGrid.lastElementChild;
            if (newlyCreatedCard) {
                newlyCreatedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                newlyCreatedCard.style.borderColor = 'var(--secondary-neon)';
                newlyCreatedCard.style.boxShadow = '0 0 25px rgba(236, 72, 153, 0.4)';

                // Revert highlight border after 1.5s
                setTimeout(() => {
                    newlyCreatedCard.style.borderColor = '';
                    newlyCreatedCard.style.boxShadow = '';
                }, 1800);
            }
        }, 300);
    });
}

// ==========================================
// 9. PORTFOLIO GRID & TABS FILTER
// ==========================================
const portfolioGrid = document.getElementById('portfolioGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioEmpty = document.getElementById('portfolioEmpty');

function initPortfolioGrid() {
    if (!portfolioGrid) return;

    portfolioGrid.innerHTML = '';

    portfolioData.forEach((item, index) => {
        const portfolioCard = document.createElement('div');
        portfolioCard.className = `portfolio-item show ${item.category}`;
        portfolioCard.setAttribute('data-id', item.id);

        portfolioCard.innerHTML = `
            <div class="portfolio-img-wrapper">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="portfolio-overlay">
                    <span class="portfolio-cat">${item.categoryLabel}</span>
                    <h3 class="portfolio-title-card">${item.title}</h3>

                </div>
            </div>
        `;

        // Lightbox modal trigger hook
        portfolioCard.addEventListener('click', () => {
            openLightboxModal(item);
        });

        portfolioGrid.appendChild(portfolioCard);
    });

    setupFilterClicks();
}

function setupFilterClicks() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active style from all filter links
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            const items = portfolioGrid.querySelectorAll('.portfolio-item');
            let visibleCount = 0;

            items.forEach(item => {
                // Check matching category
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                    visibleCount++;
                } else {
                    item.classList.remove('show');
                    item.classList.add('hide');
                }
            });

            // Manage empty results helper
            if (portfolioEmpty) {
                portfolioEmpty.style.display = (visibleCount === 0) ? 'block' : 'none';
            }
        });
    });
}

// ==========================================
// 10. PORTFOLIO DETAIL LIGHTBOX (MODAL)
// ==========================================
const modal = document.getElementById('portfolioModal');
const modalClose = document.getElementById('modalClose');

// Gallery state
let currentGallery = [];
let currentGalleryIndex = 0;

function openLightboxModal(item) {
    if (!modal) return;

    const mImg = document.getElementById('modal-img');
    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');
    const galleryCounter = document.getElementById('galleryCounter');

    // Set up gallery or single image
    if (item.gallery && item.gallery.length > 1) {
        currentGallery = item.gallery;
        currentGalleryIndex = 0;
        if (mImg) mImg.src = currentGallery[0];

        // Show nav controls
        if (galleryPrev) galleryPrev.style.display = 'flex';
        if (galleryNext) galleryNext.style.display = 'flex';
        if (galleryCounter) {
            galleryCounter.style.display = 'block';
            galleryCounter.textContent = `1 / ${currentGallery.length}`;
        }
    } else {
        currentGallery = [];
        if (mImg) mImg.src = item.image;

        // Hide nav controls
        if (galleryPrev) galleryPrev.style.display = 'none';
        if (galleryNext) galleryNext.style.display = 'none';
        if (galleryCounter) galleryCounter.style.display = 'none';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function navigateGallery(direction) {
    if (!currentGallery.length) return;
    const mImg = document.getElementById('modal-img');
    const galleryCounter = document.getElementById('galleryCounter');

    currentGalleryIndex = (currentGalleryIndex + direction + currentGallery.length) % currentGallery.length;

    if (mImg) {
        mImg.style.opacity = '0';
        setTimeout(() => {
            mImg.src = currentGallery[currentGalleryIndex];
            mImg.style.opacity = '1';
        }, 150);
    }
    if (galleryCounter) galleryCounter.textContent = `${currentGalleryIndex + 1} / ${currentGallery.length}`;
}

if (modalClose) {
    modalClose.addEventListener('click', closeLightboxModal);
}

// Gallery nav buttons
const galleryPrevBtn = document.getElementById('galleryPrev');
const galleryNextBtn = document.getElementById('galleryNext');
if (galleryPrevBtn) galleryPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); navigateGallery(-1); });
if (galleryNextBtn) galleryNextBtn.addEventListener('click', (e) => { e.stopPropagation(); navigateGallery(1); });

// Close lightbox clicking backdrop overlay
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeLightboxModal();
        }
    });

    // Escape key closes modal, arrow keys navigate gallery
    window.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active')) {
            if (e.key === 'Escape') closeLightboxModal();
            if (e.key === 'ArrowLeft') navigateGallery(-1);
            if (e.key === 'ArrowRight') navigateGallery(1);
        }
    });
}

function closeLightboxModal() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        currentGallery = [];
        currentGalleryIndex = 0;
    }
}
