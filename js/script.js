document.addEventListener('DOMContentLoaded', function(){
        /*Easy selector helper function */
        const select = (el, all = false) => {
                if (!el || typeof el !== 'string') return null;
                el = el.trim();
                if (all) {
                        return [...document.querySelectorAll(el)];
                } else {
                        return document.querySelector(el);
                }
        }
        /* Easy event listener function */
        const on = (type, el, listener, all = false) => {
                let selectEl = select(el, all)
                if (selectEl) {
                if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
                } else {
                selectEl.addEventListener(type, listener)
                }
                }
        }
        /* Easy on scroll event listener  */
        const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
        }
        
        // header on scroll
        let selectHeader = select('.header')
        if (selectHeader) {
        const headerScrolled = () => {
        if (window.scrollY > 100) {
                selectHeader.classList.add('scrolling')
        } else {
                selectHeader.classList.remove('scrolling')
        }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(window, headerScrolled)
        }

        // anchors
        document.body.addEventListener('click', function(e) {
        if (!e.target.matches('.js-scrollTo')) return;
        let href = e.target.getAttribute('href');
        if (!href) return;
        if (href.startsWith('/')) href = href.slice(1);
        if (href.startsWith('#')) {
                const targetElement = document.querySelector(href);
                if (!targetElement) return;

                e.preventDefault();

                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const duration = 800; // Faster scroll (800ms)
                const start = window.scrollY;
                let startTime = null;

                function easeInOutQuad(t) {
                return t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t;
                }

                function step(timestamp) {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeInOutQuad(progress);

                // Recalculate target position dynamically
                const targetY = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                const scrollTo = start + (targetY - start) * easedProgress;

                window.scrollTo(0, scrollTo);

                if (progress < 1) {
                        requestAnimationFrame(step);
                }
                }

                requestAnimationFrame(step);
        }
        }, true);

        // Burger 
        const burger  = select('.js-burger');
        const overlay = select('.js-overlay');
        const nav     = select('.js-nav');

        if (burger && nav) {

        const toggleMenu = () => {
                burger.classList.toggle('clicked');
                if(overlay){
                overlay.classList.toggle('show');
                }
                nav.classList.toggle('show');
        };

        const closeMenu = () => {
                burger.classList.remove('clicked');
                if(overlay){
                overlay.classList.remove('show');
                }
                nav.classList.remove('show');
        };

        on('click', '.js-burger', toggleMenu);
        on(
        'click',
        '.js-overlay, .header-nav__link, .js-burger-close, .js-scrollTo',
        closeMenu,
        true
        );
        }

        // dynamic swiper appear 
        function loadSwiperScript() {
                return new Promise((resolve) => {
                        const existingScript = document.querySelector(
                        'script[src="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js"]'
                        );

                        if (existingScript) {
                        resolve();
                        return;
                        }

                        const swiperScript = document.createElement('script');
                        swiperScript.src = 'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js';
                        swiperScript.async = true;

                        swiperScript.onload = () => resolve();
                        document.body.appendChild(swiperScript);
                });
        }
        const swiperObserverCallback = (entries) => {
                entries.forEach(entry => {
                if (entry.isIntersecting) {

                        loadSwiperScript().then(() => {
                                const swiperInterface = document.querySelector('.swiperInterface');

                                if (!swiperInterface) return;

                                const paginationBullets = document.querySelectorAll('.js-interface-nav');

                                function updateState(swiper) {
                                const currentIndex = swiper.realIndex;

                                paginationBullets.forEach((bullet, index) => {
                                        bullet.classList.toggle('_active', index === currentIndex);
                                });

                                swiperInterface.classList.toggle('is-first-slide', currentIndex === 0);
                                }

                                const swiperGraph = new Swiper(swiperInterface, {
                                        autoHeight: true,
                                        slidesPerView: 1, 
                                        loop: false,
                                        speed: 500,
                                        spaceBetween: 150,
                                        lazy: {
                                                loadPrevNext: true,
                                                },
                                        on: {
                                                init(swiper) {
                                                        updateState(swiper); 
                                                },
                                                slideChange(swiper) {
                                                        updateState(swiper);
                                                },
                                                slideChangeTransitionEnd(swiper) {
                                                }
                                        }
                                });

                                new Swiper('.swiperFeedbacks', {
                                        slidesPerView: 1, 
                                        loop: true,
                                        speed: 500,
                                        spaceBetween: 21,
                                        pagination: {
                                        el: ".swiper-pagination",
                                        },
                                        navigation: {
                                                nextEl: ".swiperFeedbacks-arrow.swiper-button-next",
                                                prevEl: ".swiperFeedbacks-arrow.swiper-button-prev",
                                        },
                                        breakpoints: {
                                                768: {
                                                        slidesPerView: 2, 
                                                        spaceBetween: 20,
                                                },
                                                1200: {
                                                        slidesPerView: 2,
                                                        spaceBetween: 40,
                                                },
                                        },
                                });

                                paginationBullets.forEach((bullet) => {
                                        bullet.addEventListener('click', () => {
                                                const slideIndex = Number(bullet.dataset.slide);
                                                swiperGraph.slideToLoop(slideIndex);
                                        });
                                });
                        });

                        swiperObserver.disconnect();
                        }
                });
        };
        const swiperObserver = new IntersectionObserver(swiperObserverCallback, {
                rootMargin: '80px 0px', 
        });
        document.querySelectorAll('.swiper').forEach(el => {
        swiperObserver.observe(el);
        });

        // modal 
        document.addEventListener('click', function (e) {
                if (!e.target.matches('[data-show-modal]')) return;
                else{
                        e.preventDefault();
                        var modal = document.querySelectorAll('#'+e.target.dataset.id);
                        Array.prototype.forEach.call(modal, function (el) {
                                el.classList.add('active');
                        });     
                }
        });
        document.addEventListener('click', function (e) {
        if (!e.target.matches('[data-close-modal]')) return;
        else{
            e.target.closest('.modal').classList.remove('active');
        }
        });

        // button from 
        function initButtonFromTracking() {
                document.addEventListener('click', function (e) {
                const btn = e.target.closest('[data-btnfrom]');
                if (!btn) return;

                const value = btn.dataset.btnfrom || '';

                document.querySelectorAll('.js-buttonfrom').forEach(input => {
                input.value = value;
                });
                });
        }
        initButtonFromTracking();


        // Observer for animation on scroll 
        const inViewport = (entries, observer) => {
        entries.forEach(entry => {
                const el = entry.target;

                el.classList.toggle("is-inViewport", entry.isIntersecting);

                if (entry.isIntersecting && !el.classList.contains('watched')) {
                let delay = el.getAttribute('data-delay');
                if (window.innerWidth < 992 && delay) {
                        const delayNum = parseFloat(delay) || 0;
                        delay = Math.min(delayNum, 0.2) + 's';
                }

                if (delay) {
                        el.style.transitionDelay = delay;
                        el.style.animationDelay = delay;
                }

                el.classList.add("watched");
                }
        });
        };

        let ioConfiguration = {
        rootMargin: '0% 0% 0% 0%',
        threshold: 0.2
        };

        const Obs = new IntersectionObserver(inViewport, ioConfiguration);
        document.querySelectorAll('[data-inviewport]').forEach(EL => {
        Obs.observe(EL);
        });

})
