document.addEventListener('DOMContentLoaded', function() {

    const winWidth = window.innerWidth;

    const notMobile = winWidth > 768;

    if ( notMobile ) {

        const cursorInverseElements = document.querySelectorAll('.footer-links li, .burger-lines-wrap, .menu_open-social');

        const cursor = new MouseFollower({
            container: 'body',
            speed: 0.55
        });

        cursorInverseElements.forEach( function(el){
        
            el.addEventListener('mouseenter', () => {
                cursor.addState('-inverse-scaled'); // you can pass multiple states separated by whitespace
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.removeState('-inverse-scaled');
            });
        });

    }

});