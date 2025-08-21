// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// Form Submission with Formspree
const form = document.getElementById('contactForm');
form.addEventListener('submit', function(event) {
    // Check honeypot field for spam protection
    const honeypot = form.querySelector('input[name="_gotcha"]');
    if (honeypot && honeypot.value !== '') {
        // Spam detected - silently prevent submission
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
    
    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('was-validated');
    } else {
        // Let Formspree handle the submission
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
        submitBtn.disabled = true;
        
        // Note: Formspree will redirect to their thank you page by default
        // To customize, add _next hidden field or use AJAX
    }
});

// Smooth Scroll - only for anchor links, not tel: links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only prevent default for internal anchor links
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Navbar Animation
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// High-Tech Enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Particle Background System
    class ParticleSystem {
        constructor() {
            this.canvas = document.getElementById('particleCanvas');
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.connections = [];
            this.mouse = { x: 0, y: 0 };
            this.init();
        }

        init() {
            this.resize();
            this.createParticles();
            this.animate();
            this.bindEvents();
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        createParticles() {
            const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
            for (let i = 0; i < particleCount; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        }

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Update particles
            this.particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

                // Draw particle
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
                this.ctx.fill();
            });

            // Draw connections
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const dx = this.particles[i].x - this.particles[j].x;
                    const dy = this.particles[i].y - this.particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                        this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                        this.ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 120)})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(() => this.animate());
        }

        bindEvents() {
            window.addEventListener('resize', () => this.resize());
            
            this.canvas.addEventListener('mousemove', (e) => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
                
                // Attract particles to mouse
                this.particles.forEach(particle => {
                    const dx = this.mouse.x - particle.x;
                    const dy = this.mouse.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        particle.vx += dx * 0.00005;
                        particle.vy += dy * 0.00005;
                    }
                });
            });
        }
    }

    // Initialize Particle System
    if (document.getElementById('particleCanvas')) {
        new ParticleSystem();
    }

    // Typewriter Effect
    class TypeWriter {
        constructor(element, texts, speed = 100) {
            this.element = element;
            this.texts = texts;
            this.speed = speed;
            this.textIndex = 0;
            this.charIndex = 0;
            this.isDeleting = false;
            this.start();
        }

        start() {
            this.type();
        }

        type() {
            const currentText = this.texts[this.textIndex];
            
            if (this.isDeleting) {
                this.element.textContent = currentText.substring(0, this.charIndex - 1);
                this.charIndex--;
            } else {
                this.element.textContent = currentText.substring(0, this.charIndex + 1);
                this.charIndex++;
            }

            let typeSpeed = this.speed;

            if (this.isDeleting) {
                typeSpeed /= 2;
            }

            if (!this.isDeleting && this.charIndex === currentText.length) {
                typeSpeed = 2000;
                this.isDeleting = true;
            } else if (this.isDeleting && this.charIndex === 0) {
                this.isDeleting = false;
                this.textIndex = (this.textIndex + 1) % this.texts.length;
                typeSpeed = 500;
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    }

    // Initialize TypeWriter
    const typingElement = document.getElementById('typingText');
    if (typingElement) {
        const texts = [
            'Expert computer repair and network setup services.',
            'HIPAA-compliant cloud backup solutions.',
            'Custom PC builds for your business needs.',
            'Professional IT support in Easley, SC.'
        ];
        new TypeWriter(typingElement, texts, 80);
    }

    // Cursor Trail Effect
    class CursorTrail {
        constructor() {
            this.trail = [];
            this.maxTrail = 20;
            this.init();
        }

        init() {
            document.addEventListener('mousemove', (e) => {
                this.addTrailPoint(e.clientX, e.clientY);
                this.updateTrail();
            });
        }

        addTrailPoint(x, y) {
            this.trail.push({ x, y, life: 1 });
            if (this.trail.length > this.maxTrail) {
                this.trail.shift();
            }
        }

        updateTrail() {
            this.trail.forEach((point, index) => {
                point.life -= 0.05;
                if (point.life <= 0) {
                    this.trail.splice(index, 1);
                }
            });
        }
    }

    // Initialize Cursor Trail
    new CursorTrail();

    // Enhanced Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add stagger effect for service cards
                if (entry.target.classList.contains('service-card')) {
                    const cards = document.querySelectorAll('.service-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.transform = 'translateY(0) scale(1)';
                            card.style.opacity = '1';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.service-card, .team-card').forEach(el => {
        scrollObserver.observe(el);
    });

    // Matrix Rain Effect (enhanced visibility)
    function createMatrixRain() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        canvas.style.opacity = '0.15';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = '01';
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        // Initialize drops with random positions instead of all starting at 1
        const drops = Array(Math.floor(columns)).fill().map(() => Math.random() * canvas.height / fontSize);

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                
                // Create gradient effect for falling characters
                const gradient = ctx.createLinearGradient(0, drops[i] * fontSize - 20, 0, drops[i] * fontSize);
                gradient.addColorStop(0, 'rgba(139, 92, 246, 0.1)');
                gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.8)');
                gradient.addColorStop(1, 'rgba(59, 130, 246, 1)');
                
                ctx.fillStyle = gradient;
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.97) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(draw, 80);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Initialize Matrix Rain (enhanced)
    createMatrixRain();

    // Tech-style button effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.6)';
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            this.style.transform = '';
        });
    });
});
