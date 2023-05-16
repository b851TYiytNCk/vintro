document.addEventListener('DOMContentLoaded', function(){
    
    // parallax init

    const winWidth = window.innerWidth;

    let abSlNum,
        abSlGr,
        abSlSpace;


    if ( winWidth > 768 ) {
        
        abSlNum = 3.5;
        abSlGr = 4;
        abSlSpace = 60;

    } else {

        abSlNum = 1.6;
        abSlGr = 1;
        abSlSpace = 20;

    }


    const topScene = document.querySelector('.first_top_cube');
    const botScene = document.querySelector('.first_bot_cube');
    
    const options = {
        inputElement: document.getElementById('first'),
        hoverOnly: true,
        invertX: false,
        invertY: false,
        limitX: 50,
        limitY: 50
    }

    const topSceneInstance = new Parallax(topScene, options);
    const botSceneInstance = new Parallax(botScene, options);


    // Processes slider and Values&Vision slider - swiper
    const swiper = new Swiper('.about_slider', {
        slidesPerView: abSlNum,
        slidesPerGroup: abSlGr,
        spaceBetween: abSlSpace,
        loop: false,
        on: {
            slideChange: function() {

                if ( winWidth > 450 ) {

                    if (this.isEnd) {
                        this.el.classList.add('reach_end');
                    } else {
                        this.el.classList.remove('reach_end');
                    }

                }

            },
            reachEnd: function() {

                if ( winWidth < 769  && winWidth < 450 ) {
                    
                    this.el.classList.add('reach_end');

                }
            }
        }
    });

    function attachCursorStyle(els, className) {
        els.forEach( function(el){
        
            el.addEventListener('mouseenter', () => {
                cursor.addState(className); // you can pass multiple states separated by whitespace
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.removeState(className);
            });
        });
    }

    const cursorInverseElements = document.querySelectorAll('.footer-links li, .burger-lines-wrap, .menu_open-social');
    const cursorSmallInverseElements = document.querySelectorAll('.members_soc_item');

    attachCursorStyle(cursorInverseElements, '-inverse-scaled');
    attachCursorStyle(cursorSmallInverseElements, '-small-inverse-scaled');

    const cursor = new MouseFollower({
        container: 'body',
        speed: 0.55
    });

});