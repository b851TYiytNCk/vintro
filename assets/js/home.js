document.addEventListener('DOMContentLoaded', function(){


    const winWidth = window.innerWidth;

    const notMobile = winWidth > 768;

    let recentSwiperNum,
        recentSlidesPerGroup,
        recentSpaceBetween = 60;

    if ( winWidth > 1024 ) {

        recentSwiperNum = 3.5;
        recentSlidesPerGroup = 3;

    } else if ( notMobile ) {

        recentSwiperNum = 2.5;
        recentSlidesPerGroup = 2;

    } else {

        recentSwiperNum = 1.6;
        recentSlidesPerGroup = 1;
        recentSpaceBetween = 20;

    }

    // parallax init
    const scene = document.getElementById('intro-container');
    const parallaxInstance = new Parallax(scene, {
        inputElement: document.getElementById('first'),
        hoverOnly: true,
        invertX: false,
        invertY: false,
        limitX: 80,
        limitY: 80
    });

    // hover on .areas-grid-item

    let hoveredElement = null;

    // You can pass a scrolling container or `document` here:
    addHoverListeners( hover );
    

    function hover( targetElement, scrolling ) {
        
        if ( hoveredElement === targetElement ) {
            return;
        }

        
        if (hoveredElement) {
            if (hoveredElement.classList.contains('areas-grid-item')) {
         
                hoveredElement.classList.remove('black-top-border');

            }
        }
        
        hoveredElement = targetElement;

        if (targetElement && targetElement.classList.contains('areas-grid-item')) {
            
            //console.log('added');
            hoveredElement.classList.add('black-top-border');

        }
    }

    /**
     * Attaches the necessary event listeners for hovering.
     *
     * @param {EventTarget} scrollContainer The `Element` or `document`
     * whose scroll events should be listened to.
     * @param {EventListener|Function} hover A callback function or an
     * object that implements `EventListener`
     */
    function addHoverListeners(hover) {
        let mouseX, mouseY;
        
        document.addEventListener('mousemove', event => {
            mouseX = event.clientX;
            mouseY = event.clientY;
            
            hover(event.target);
        }, { passive: true });

        // Select the node that will be observed for mutations
        const targetNode = document.querySelector('.scroll-content');

        // Options for the observer (which mutations to observe)
        const config = { attributes: true };

        // Callback function to execute when mutations are observed
        const callback = (mutationList, observer) => {
            for (const mutation of mutationList) {

                const hoverTarget = document.elementFromPoint(mouseX, mouseY);

                if (mutation.type === 'attributes') {
                    hover(hoverTarget, true);
                }
            }
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        
        if ( targetNode ) {
            observer.observe(targetNode, config);
        }
        
    }

    

    // Recent Publications - swiper

    const swiper = new Swiper('.recent-swiper', {
        slidesPerView: recentSwiperNum,
        slidesPerGroup: recentSlidesPerGroup,
        spaceBetween: recentSpaceBetween,
        loop: false,
        on: {
            slideChange: function() {

                if ( this.isEnd ) {

                    this.el.classList.add('reach_end');

                } else {
                    
                    this.el.classList.remove('reach_end');

                }
            }
        }
    });

    if ( notMobile ) {

        const cursorInverseElements = document.querySelectorAll( '.footer-links li, .burger-lines-wrap, .menu_open-social' );

        const cursor = new MouseFollower({
            container: 'body',
            speed: 0.55
        });

        cursorInverseElements.forEach( function(el) {
            
            el.addEventListener('mouseenter', () => {
                cursor.addState('-inverse-scaled'); // you can pass multiple states separated by whitespace
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.removeState('-inverse-scaled');
            });
        });

        const hidingCursorElems = document.querySelectorAll('.intro__top-right-more-link, .intro__get_in_touch, .more_projects_link');

        hidingCursorElems.forEach( function(el) {
            el.addEventListener('mouseenter', () => {
                cursor.hide(); // you can pass multiple states separated by whitespace
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.show();
            });
        });

    }


    // .video_container - target
    // document - root


    const videoContainer = document.querySelector('.video_container');
    const videoElement = document.querySelector('.video_container video');


    let options = {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    };

    const handleIntersect = (entries) => {
        entries.forEach( (entry) => {
            if (entry.isIntersecting) {

                
                let elem = entry.target,
                    ratio = Math.floor(entry.intersectionRatio * 10) / 10;

                if (ratio == 0.2) {
                        elem.classList.replace('grade-90', 'grade-87');
                        elem.classList.add();
                } else 
                    if (ratio == 0.3) {
                        elem.classList.remove('grade-87', 'grade-92');
                        elem.classList.add('grade-90');
                        videoElement.play();
                } else 
                    if (ratio == 0.4) {
                        elem.classList.remove('grade-90', 'grade-95');
                        elem.classList.add('grade-92');

                } else 
                    if (ratio == 0.5) {
                        elem.classList.remove('grade-92', 'grade-97');
                        elem.classList.add('grade-95');
                } else 
                    if (ratio == 0.6) {
                        elem.classList.remove('grade-95', 'grade-100');
                        elem.classList.add('grade-97');
                } else 
                    if (ratio == 0.7) {
                        elem.classList.remove('grade-97');
                        elem.classList.add('grade-100');
                } else 
                    if (ratio == 0) {
                        elem.classList.remove('grade-85', 'grade-87', 'grade-90', 'grade-92', 'grade-95', 'grade-97', 'grade-100');
                }

            }
        });
    }

    const videoObserver = new IntersectionObserver(handleIntersect, options);
    videoObserver.observe(videoContainer);

});