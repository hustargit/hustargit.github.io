// 修改页面加载动画函数
function initPageLoader() {
    const loader = document.querySelector('.page-loader');
    if (!loader) return;

    // 确保加载动画立即可见
    loader.style.display = 'flex'; // 必须是 flex 才能居中
    loader.style.opacity = '1';
    loader.style.visibility = 'visible';
    loader.style.zIndex = '10000';

    // 为行星添加旋转动画
    const loaderPlanet = document.querySelector('.loader-planet');
    if (loaderPlanet) {
        loaderPlanet.style.animation = 'rotate 2s linear infinite';
    }

    // 新增：为文本添加动态效果
    const loaderText = document.querySelector('.loader-text');
    if (loaderText) {
        loaderText.style.animation = 'fadeInOut 1.5s ease-in-out infinite alternate, pulseText 3s linear infinite';
    }

    // 延长显示时间到8秒
    setTimeout(() => {
        // 添加隐藏类（触发淡出动画）
        loader.classList.add('hidden');
        document.body.classList.add('loaded');

        // 动画完成后移除元素 - 匹配CSS中的3秒过渡时间
        setTimeout(() => {
            loader.style.display = 'none';
        }, 3000); // 匹配CSS transition时间
    }, 3000); // 延长至8秒
}


// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    // 确保页面加载动画优先执行
    initPageLoader();

    // 其他初始化功能
    initSmoothScroll();
    
    // 自定义鼠标跟随效果
    initCustomCursor();
    
    // 页面加载动画
    initPageLoader();
    
    // 技能进度条动画
    initSkillsAnimation();
    
    // 回到顶部按钮
    initBackToTopButton();
    
    // 增强鼠标悬停效果
    initHoverEffects();
    
    // 滚动动画
    initScrollAnimations();
    
    // 动态文字效果
    initTypingEffect();
    
    // 创建视差滚动星星
    createParallaxStars();
    
    // 处理视差滚动效果
    handleParallaxScroll();
    
    // 添加滚动进度指示器
    initScrollProgress();
    
    // 设置导航栏活动状态
    setActiveNavLink();
    
    // 优化作品集卡片3D效果
    enhancePortfolioCards();
    
    // 增强粒子交互效果
    initParticleInteraction();
    
    // 增强翻转卡片效果
    enhanceFlipCards();
    
    // 创建优化的流星雨效果
    initMeteorShower();
    
    // 增强行表交互
    enhanceFormInteraction();
    
    // 增强行星系统效果
    enhancePlanetSystem();

    // 初始化宇宙效果
    initCosmicEffects();
    
    // 添加全局样式
    addStyles();
});

// 初始化宇宙效果
function initCosmicEffects() {
    // 创建小行星带 - 这些函数已经在enhancePlanetSystem中调用，防止重复调用
    // createAsteroidBelt();
    
    // 添加行星光照效果
    // addPlanetLightingEffect();
    
    // 添加动态星云
    createDynamicNebulae();
}

// 创建动态星云
function createDynamicNebulae() {
    const backgroundContainer = document.getElementById('backgroundContainer');
    if (!backgroundContainer) return;
    
    // 创建3-5个星云
    const nebulaCount = Math.floor(Math.random() * 3) + 3;
    
    for (let i = 0; i < nebulaCount; i++) {
        const nebula = document.createElement('div');
        nebula.className = 'nebula-enhanced';
        
        // 随机大小和位置
        const size = Math.random() * 300 + 200;
        nebula.style.width = `${size}px`;
        nebula.style.height = `${size}px`;
        nebula.style.left = `${Math.random() * 100}%`;
        nebula.style.top = `${Math.random() * 100}%`;
        
        // 随机颜色
        const hue = Math.random() * 60 + 180; // 蓝色到青色范围
        nebula.style.background = `radial-gradient(circle, hsla(${hue}, 100%, 70%, 0.1), transparent 70%)`;
        nebula.style.filter = `blur(${Math.random() * 30 + 20}px)`;
        
        // 随机动画
        const duration = Math.random() * 50 + 50;
        nebula.style.animation = `nebulaFloat ${duration}s linear infinite`;
        
        backgroundContainer.appendChild(nebula);
    }
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// 自定义鼠标跟随效果
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    const easeFactor = 0.1;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    function animateFollower() {
        let dx = mouseX - followerX;
        let dy = mouseY - followerY;
        followerX += dx * easeFactor;
        followerY += dy * easeFactor;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
    
    // 鼠标进入/离开页面时的效果
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
}

// 技能进度条动画
function initSkillsAnimation() {
    const skillElements = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillElements.forEach(element => {
        observer.observe(element);
    });
}

// 回到顶部按钮
function initBackToTopButton() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 增强鼠标悬停效果
function initHoverEffects() {
    document.querySelectorAll('a, button, .portfolio-item, .timeline-item, article').forEach(element => {
        element.addEventListener('mouseenter', () => {
            const cursor = document.querySelector('.cursor');
            const cursorFollower = document.querySelector('.cursor-follower');
            
            if (cursor && cursorFollower) {
                cursor.style.transform = 'scale(0.5)';
                cursor.style.borderColor = 'var(--accent-color)';
                cursorFollower.style.transform = 'scale(2)';
                cursorFollower.style.background = `radial-gradient(circle, rgba(0, 242, 255, 0.5), transparent)`;
            }
        });
        
        element.addEventListener('mouseleave', () => {
            const cursor = document.querySelector('.cursor');
            const cursorFollower = document.querySelector('.cursor-follower');
            
            if (cursor && cursorFollower) {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = 'var(--primary-color)';
                cursorFollower.style.transform = 'scale(1)';
                cursorFollower.style.background = 'var(--gradient-1)';
            }
        });
    });
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section, .timeline-item, article').forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
    
    // 为不同部分添加不同的动画类
    document.querySelectorAll('#about h2, #portfolio h2, #blog h2, #contact h2').forEach(el => {
        el.classList.add('fade-up');
    });
    
    document.querySelectorAll('.portfolio-item:nth-child(odd)').forEach(el => {
        el.classList.add('fade-in-left');
    });
    
    document.querySelectorAll('.portfolio-item:nth-child(even)').forEach(el => {
        el.classList.add('fade-in-right');
    });
    
    document.querySelectorAll('article, .skills-container').forEach(el => {
        el.classList.add('zoom-in');
    });
    
    // 设置交错延迟
    document.querySelectorAll('.timeline-item').forEach((el, index) => {
        el.classList.add('fade-up');
        el.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // 观察元素
    const enhancedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                enhancedObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('.fade-up, .fade-in-left, .fade-in-right, .zoom-in').forEach(el => {
        enhancedObserver.observe(el);
    });
}

// 动态文字效果
function initTypingEffect() {
    const phrases = [
        "将想法转化为数字体验的探索者",
        "创意开发者",
        "基础语言学习者",
        "星际旅行者"
    ];
    
    const element = document.querySelector('.hero p');
    if (!element) return;
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            element.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // 删除速度更快
        } else {
            element.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // 打字速度正常
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            // 完成打字，等待一段时间后开始删除
            isDeleting = true;
            typingSpeed = 1000; // 打完一个短语后暂停时间
        } else if (isDeleting && charIndex === 0) {
            // 完成删除，切换到下一个短语
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // 切换短语前的暂停时间
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // 开始打字效果
    setTimeout(type, 1000);
}

// 创建视差滚动星星
function createParallaxStars() {
    const container = document.querySelector('.background-container');
    if (!container) return;
    
    const starCount = 50;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const size = Math.random() > 0.8 ? 'large' : (Math.random() > 0.5 ? 'medium' : 'small');
        star.className = `parallax-element star-${size}`;
        
        // 随机位置
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // 随机视差速度
        const depth = Math.random() * 0.5 + 0.1;
        star.setAttribute('data-depth', depth);
        
        container.appendChild(star);
    }
    
    // 添加几个星云
    for (let i = 0; i < 3; i++) {
        const nebula = document.createElement('div');
        nebula.className = 'parallax-element nebula';
        nebula.style.left = `${Math.random() * 100}%`;
        nebula.style.top = `${Math.random() * 100}%`;
        const depth = Math.random() * 0.3 + 0.05;
        nebula.setAttribute('data-depth', depth);
        container.appendChild(nebula);
    }
}

// 处理视差滚动效果
function handleParallaxScroll() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // 元素视差
        parallaxElements.forEach(element => {
            const depth = element.getAttribute('data-depth');
            const movement = scrollY * depth;
            element.style.transform = `translateY(${movement}px)`;
        });
        
        // 部分视差
        parallaxSections.forEach(section => {
            const depth = section.getAttribute('data-speed') || 0.1;
            const offset = section.offsetTop;
            const distance = scrollY - offset;
            
            if (Math.abs(distance) < window.innerHeight) {
                const movement = distance * depth;
                section.style.transform = `translateY(${movement}px)`;
            }
        });
    });
}

// 添加滚动进度指示器
function initScrollProgress() {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        const progressBar = document.querySelector('.scroll-progress');
        
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
        
        // 导航栏滚动效果
        const nav = document.querySelector('nav');
        if (nav) {
            if (scrollTop > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    });
}

// 设置导航栏活动状态
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight/3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// 优化作品集卡片3D效果
function enhancePortfolioCards() {
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rotateY = (x / (rect.width / 2)) * 5; // 调整最大旋转角度为5度
            const rotateX = -(y / (rect.height / 2)) * 5; // 调整最大旋转角度为5度

            item.style.transform = `translateY(-10px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            item.style.transition = 'transform 0.2s ease'; // 添加平滑过渡
            
            // 添加光照效果
            const cardLight = item.querySelector('.card-light') || document.createElement('div');
            if (!cardLight.classList.contains('card-light')) {
                cardLight.className = 'card-light';
                item.appendChild(cardLight);
            }
            
            const lightX = ((e.clientX - rect.left) / rect.width) * 100;
            const lightY = ((e.clientY - rect.top) / rect.height) * 100;
            cardLight.style.background = `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255, 255, 255, 0.2), transparent 50%)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = `translateY(0) perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            item.style.transition = 'transform 0.5s ease'; // 恢复时也添加平滑过渡
            
            const cardLight = item.querySelector('.card-light');
            if (cardLight) {
                cardLight.style.background = 'transparent';
            }
        });
    });
}

// 增强粒子交互效果
function initParticleInteraction() {
    document.addEventListener('click', (e) => {
        // 创建爆炸效果
        const explosion = document.createElement('div');
        explosion.className = 'explosion';
        explosion.style.left = e.clientX + 'px';
        explosion.style.top = e.clientY + 'px';
        document.body.appendChild(explosion);
        
        // 创建多个粒子
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'explosion-particle';
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3 + 2;
            const size = Math.random() * 5 + 3;
            const color = `hsl(${Math.random() * 60 + 180}, 100%, 70%)`; // 蓝色系
            
            particle.style.left = e.clientX + 'px';
            particle.style.top = e.clientY + 'px';
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.background = color;
            
            document.body.appendChild(particle);
            
            // 动画
            let posX = e.clientX;
            let posY = e.clientY;
            let opacity = 1;
            
            const animate = () => {
                posX += Math.cos(angle) * speed;
                posY += Math.sin(angle) * speed + 0.5; // 添加重力效果
                opacity -= 0.02;
                
                particle.style.left = posX + 'px';
                particle.style.top = posY + 'px';
                particle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };
            
            requestAnimationFrame(animate);
        }
        
        // 移除爆炸效果
        setTimeout(() => {
            explosion.remove();
        }, 300);
    });
}

// 增强翻转卡片效果
function enhanceFlipCards() {
    document.querySelectorAll('.flip-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            // 添加光晕效果
            card.style.boxShadow = '0 20px 40px rgba(0, 242, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            // 移除光晕效果
            card.style.boxShadow = '';
        });
    });
}

// 创建流星雨效果
function initMeteorShower() {
    // 添加流星CSS样式
    const meteorStyle = document.createElement('style');
    meteorStyle.textContent = `
        .meteor-enhanced {
            position: absolute;
            width: 200px;
            height: 2px;
            background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1));
            border-radius: 50%;
            box-shadow: 0 0 10px #fff, 0 0 20px rgba(255, 255, 255, 0.5);
            transform-origin: left center;
            z-index: 1;
            pointer-events: none;
        }

        .meteor-enhanced::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 30px;
            height: 1px;
            background: rgba(255, 255, 255, 0.8);
            box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.6);
            border-radius: 50%;
        }

        .meteor-enhanced::before {
            content: '';
            position: absolute;
            top: -2px;
            left: 0;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            box-shadow: 0 0 20px 4px white;
            animation: meteorFlicker 0.2s ease-in-out infinite alternate;
        }

        @keyframes meteorFlicker {
            0% { opacity: 0.7; }
            100% { opacity: 1; }
        }
    `;
    document.head.appendChild(meteorStyle);

    // 创建流星函数
    function createMeteor() {
        if (Math.random() > 0.7) { // 30%的概率创建流星
            const meteor = document.createElement('div');
            meteor.className = 'meteor-enhanced';
            
            // 随机起始位置 - 从屏幕上方或左侧开始
            const startFromTop = Math.random() > 0.5;
            let startX, startY;
            
            if (startFromTop) {
                startX = Math.random() * window.innerWidth;
                startY = -50;
            } else {
                startX = -50;
                startY = Math.random() * window.innerHeight * 0.5; // 上半部分屏幕
            }
            
            // 计算角度和终点
            let angle;
            if (startFromTop) {
                angle = Math.random() * 30 + 30; // 30-60度角
            } else {
                angle = Math.random() * 30 + 15; // 15-45度角
            }
            
            // 设置位置
            meteor.style.top = `${startY}px`;
            meteor.style.left = `${startX}px`;
            
            // 设置旋转角度 - 确保与运动方向一致
            meteor.style.transform = `rotate(${angle}deg)`;
            
            // 随机大小和速度
            const scale = Math.random() * 0.5 + 0.5;
            const duration = Math.random() * 1 + 0.8; // 0.8-1.8秒
            
            meteor.style.transform = `rotate(${angle}deg) scale(${scale})`;
            
            // 计算终点位置
            const distance = Math.max(window.innerWidth, window.innerHeight) * 1.5;
            const radians = angle * Math.PI / 180;
            const endX = startX + Math.cos(radians) * distance;
            const endY = startY + Math.sin(radians) * distance;
            
            // 添加动画
            meteor.animate([
                { transform: `rotate(${angle}deg) scale(${scale})` },
                { transform: `translate(${endX - startX}px, ${endY - startY}px) rotate(${angle}deg) scale(${scale})`, opacity: 0 }
            ], {
                duration: duration * 1000,
                easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
                fill: 'forwards'
            });
            
            document.body.appendChild(meteor);
            
            // 移除流星
            setTimeout(() => {
                meteor.remove();
            }, duration * 1000);
            
            // 添加流星粒子效果
            createMeteorParticles(meteor, angle, duration, startX, startY);
        }
    }
    
    // 创建流星粒子效果
    function createMeteorParticles(meteor, angle, duration, startX, startY) {
        // 创建5-10个粒子
        const particleCount = Math.floor(Math.random() * 5) + 5;
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'meteor-particle';
                particle.style.position = 'absolute';
                particle.style.width = '2px';
                particle.style.height = '2px';
                particle.style.background = 'white';
                particle.style.borderRadius = '50%';
                particle.style.boxShadow = '0 0 5px white';
                particle.style.opacity = '0.8';
                
                // 获取流星当前位置
                const meteorRect = meteor.getBoundingClientRect();
                const meteorX = meteorRect.left + Math.random() * meteorRect.width;
                const meteorY = meteorRect.top + Math.random() * meteorRect.height;
                
                particle.style.left = `${meteorX}px`;
                particle.style.top = `${meteorY}px`;
                
                // 随机方向偏移
                const particleAngle = angle + (Math.random() * 60 - 30);
                const particleSpeed = Math.random() * 2 + 1;
                const particleDuration = Math.random() * 0.5 + 0.3;
                
                // 计算终点
                const radians = particleAngle * Math.PI / 180;
                const endX = meteorX + Math.cos(radians) * particleSpeed * 100;
                const endY = meteorY + Math.sin(radians) * particleSpeed * 100;
                
                // 添加动画
                particle.animate([
                    { transform: 'scale(1)', opacity: 0.8 },
                    { transform: `translate(${endX - meteorX}px, ${endY - meteorY}px) scale(0)`, opacity: 0 }
                ], {
                    duration: particleDuration * 1000,
                    easing: 'ease-out',
                    fill: 'forwards'
                });
                
                document.body.appendChild(particle);
                
                // 移除粒子
                setTimeout(() => {
                    particle.remove();
                }, particleDuration * 1000);
                
            }, Math.random() * duration * 500); // 在流星生命周期的前半段随机时间创建粒子
        }
    }
    
    // 定期创建流星
    setInterval(createMeteor, 1500);
    
    // 初始创建几个流星
    for (let i = 0; i < 3; i++) {
        setTimeout(createMeteor, Math.random() * 1500);
    }
}

// 增强行表交互
function enhanceFormInteraction() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('focusin', () => {
            form.classList.add('focused');
        });
        
        form.addEventListener('focusout', () => {
            form.classList.remove('focused');
        });
        
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                if (input.value) {
                    input.classList.add('has-content');
                } else {
                    input.classList.remove('has-content');
                }
            });
        });
    });
}

// 增强行星系统效果
function enhancePlanetSystem() {
    const planetSystem = document.querySelector('.planet-system');
    if (!planetSystem) return;
    
    // 添加3D旋转效果
    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 50;
        const y = (window.innerHeight / 2 - e.clientY) / 50;
        
        planetSystem.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });
    
    // 动态创建行星环
    const rings = document.querySelector('.planet-rings');
    if (rings) {
        // 创建多层环
        for (let i = 0; i < 3; i++) {
            const ring = document.createElement('div');
            ring.className = 'planet-ring';
            ring.style.position = 'absolute';
            ring.style.width = `${120 - i * 15}px`;
            ring.style.height = `${20 - i * 5}px`;
            ring.style.borderRadius = '50%';
            ring.style.border = `2px solid rgba(255, 255, 255, ${0.1 - i * 0.02})`;
            ring.style.top = '50%';
            ring.style.left = '50%';
            ring.style.transform = `translate(-50%, -50%) rotateX(75deg)`;
            ring.style.boxShadow = `0 0 ${10 - i * 2}px rgba(255, 255, 255, ${0.2 - i * 0.05})`;
            rings.appendChild(ring);
        }
    }
    
    // 创建行星表面动态纹理
    const planetMain = document.querySelector('.planet-main');
    if (planetMain) {
        // 添加随机陨石坑
        for (let i = 0; i < 8; i++) {
            const crater = document.createElement('div');
            crater.className = 'crater';
            crater.style.position = 'absolute';
            crater.style.width = `${Math.random() * 10 + 5}px`;
            crater.style.height = `${Math.random() * 10 + 5}px`;
            crater.style.borderRadius = '50%';
            crater.style.background = 'rgba(40, 62, 81, 0.8)';
            crater.style.boxShadow = 'inset 0 0 4px rgba(0, 0, 0, 0.8)';
            crater.style.left = `${Math.random() * 80}%`;
            crater.style.top = `${Math.random() * 80}%`;
            planetMain.appendChild(crater);
        }
    }
    
    // 创建小行星带
    createAsteroidBelt();
    
    // 添加行星光照效果
    addPlanetLightingEffect();
}

// 创建小行星带
function createAsteroidBelt() {
    const planetSystem = document.querySelector('.planet-system');
    if (!planetSystem) return;
    
    // 创建小行星带容器
    const asteroidBelt = document.createElement('div');
    asteroidBelt.className = 'asteroid-belt';
    asteroidBelt.style.position = 'absolute';
    asteroidBelt.style.width = '200px';
    asteroidBelt.style.height = '200px';
    asteroidBelt.style.top = '50%';
    asteroidBelt.style.left = '50%';
    asteroidBelt.style.transform = 'translate(-50%, -50%)';
    asteroidBelt.style.borderRadius = '50%';
    planetSystem.appendChild(asteroidBelt);
    
    // 创建多个小行星
    for (let i = 0; i < 20; i++) {
        const asteroid = document.createElement('div');
        asteroid.className = 'asteroid';
        
        // 随机大小和位置
        const size = Math.random() * 4 + 2;
        const angle = Math.random() * 360;
        const distance = 100 + Math.random() * 10; // 距离中心的半径
        
        asteroid.style.position = 'absolute';
        asteroid.style.width = `${size}px`;
        asteroid.style.height = `${size}px`;
        asteroid.style.background = `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, 0.8)`;
        asteroid.style.borderRadius = '50%';
        asteroid.style.boxShadow = '0 0 3px rgba(255, 255, 255, 0.5)';
        
        // 设置位置
        const x = Math.cos(angle * Math.PI / 180) * distance;
        const y = Math.sin(angle * Math.PI / 180) * distance;
        asteroid.style.left = `calc(50% + ${x}px)`;
        asteroid.style.top = `calc(50% + ${y}px)`;
        
        // 设置动画
        const orbitDuration = Math.random() * 10 + 15;
        asteroid.style.animation = `asteroidOrbit ${orbitDuration}s linear infinite`;
        
        // 随机初始延迟
        asteroid.style.animationDelay = `-${Math.random() * orbitDuration}s`;
        
        asteroidBelt.appendChild(asteroid);
    }
    
    // 添加小行星带动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes asteroidOrbit {
            0% { transform: rotate(0deg) translateX(0) translateY(0); }
            100% { transform: rotate(360deg) translateX(0) translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

// 添加行星光照效果
function addPlanetLightingEffect() {
    const planetMain = document.querySelector('.planet-main');
    if (!planetMain) return;
    
    // 创建光照效果层
    const lightingEffect = document.createElement('div');
    lightingEffect.className = 'planet-lighting';
    lightingEffect.style.position = 'absolute';
    lightingEffect.style.top = '0';
    lightingEffect.style.left = '0';
    lightingEffect.style.width = '100%';
    lightingEffect.style.height = '100%';
    lightingEffect.style.borderRadius = '50%';
    lightingEffect.style.background = 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), transparent 50%)';
    lightingEffect.style.pointerEvents = 'none';
    
    planetMain.appendChild(lightingEffect);
    
    // 添加动态光照效果
    window.addEventListener('mousemove', (e) => {
        const rect = planetSystem.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // 计算鼠标相对于行星中心的位置
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        
        // 计算光照位置百分比
        const lightX = 50 + dx / 10;
        const lightY = 50 + dy / 10;
        
        // 更新光照渐变
        lightingEffect.style.background = `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255, 255, 255, 0.3), transparent 70%)`;
    });
}

// 添加样式
function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .card-light {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            border-radius: 15px;
        }
        
        .spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        form.focused {
            transform: translateY(-5px);
            box-shadow: 0 25px 50px rgba(0, 242, 255, 0.3);
        }
        
        input.has-content, textarea.has-content {
            background: rgba(255, 255, 255, 0.15);
            border-color: var(--galaxy-color);
        }
    `;
    document.head.appendChild(style);
}


