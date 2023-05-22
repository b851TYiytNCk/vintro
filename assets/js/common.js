function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {

    options = {
      path: '/',
      ...options
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
}

function deleteCookie(name) {
    setCookie(name, "", {
      'max-age': -1
    })
}

document.addEventListener('DOMContentLoaded', function(){

    let winWidth = window.innerWidth;

    const notMobile = winWidth > 768;

    const mainCube = document.querySelector('.cube-wrap');
    const introSection = document.querySelector('#intro'); 

    const aboutTopCube = document.querySelector('.first_top_cube');
    const aboutBotCube = document.querySelector('.first_bot_cube');

    let multiplier,
        closeTop;

    if (winWidth > 2559) {
      closeTop = 95;
    } else if (winWidth > 1366) {
      closeTop = 71;
    } else if ( notMobile ) {
      closeTop = 70;
    } // else {
    //   closeTop = 72;
    // }  

    if ( notMobile ) {

      // smooth scrolling
      const scrollbar = window.Scrollbar;

      const mainScrollBar = scrollbar.init(document.querySelector('#content'), {
        syncCallbacks: true,
      });

      mainScrollBar.addListener( function(status) { 
          
        closeMenu.forEach( (e) => {
          e.style.top = status.offset.y + closeTop + 'px';
        });

        menuOpen.style.top = status.offset.y + 'px';
        
      });

      if ( mainCube ) {

        multiplier = -4;
  
        mainScrollBar.addListener( function(status) {
          introSection.style.top = (status.offset.y / multiplier) + 'px';
        });
  
      }
  
      if ( aboutTopCube ) {
  
        multiplier = 5;
  
        mainScrollBar.addListener( function(status) {
          aboutTopCube.style.top = (status.offset.y / multiplier) + 'px';
          aboutBotCube.style.top = (status.offset.y / (multiplier * 2)) + 'px';
        });
  
      }

    } else {

      if ( mainCube ) {

        multiplier = -4;
  
        window.addEventListener( 'scroll',  function() {
          introSection.style.top = (this.scrollY / multiplier) + 'px';
        });
  
      }

      if ( aboutTopCube ) {
  
        multiplier = 5;
  
        window.addEventListener( 'scroll', function() {
          aboutTopCube.style.top = (window.scrollY / multiplier) + 'px';
          aboutBotCube.style.top = (window.scrollY / (multiplier * 2)) + 'px';
        });
  
      }

    }

    // sidebar
    const closeMenu = document.querySelectorAll('.closemenu');
    const menuOpen = document.querySelector('.menu_open'); 

    const body = document.body;

    if ( body.classList.contains('about') || 
         body.classList.contains('home') ) {

        const options = {
          root: null,
          rootMargin: "0px",
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
        };

        const handleIntersect = (entries) => {
          entries.forEach( (entry) => {
              if (entry.isIntersecting) {
  
                  
                  let elem = entry.target,
                      ratio = Math.floor(entry.intersectionRatio * 10) / 10,
                      selector = elem.id ? elem.id : elem.classList;
  
                  //console.log('elem: ' + selector + ', ratio: ' + ratio);

                  const line = elem.querySelector('.side_title_line');
  
                  if (ratio == 0.2) {
                    line.classList.remove('active');
                  } else if (ratio == 0.3) {
                    line.classList.add('active');
                  } else if (ratio == 0.9) {
                    line.classList.add('active');
                  }
  
              }
          });
      }

        const sectionObserver = new IntersectionObserver(handleIntersect, options)
        const sections = document.querySelectorAll('section:not(section section)');

        sections.forEach( function (section) {
          sectionObserver.observe(section);
        });

    }
  

    const cookieContainer = document.querySelector('.cookie_container');
    const cookiePopup = document.querySelector('.cookie_popup');

    if ( !getCookie('useragreed') ) {
        cookieContainer.style.display = "flex";
    }

    const firstSpan = document.querySelector('.first_span');
    const secondSpan = document.querySelector('.sec_span');
    
    const firstText = document.querySelector('.first_text');
    const secondText = document.querySelector('.second_text');

    firstSpan.addEventListener('click', function(){
      
        setCookie('useragreed', '1', {secure: true, 'max-age': 604800});

        firstSpan.classList.add('hidden');
        firstText.classList.add('hidden');

        setTimeout( () => {
            
            cookiePopup.style.maxWidth = '100%';

            setTimeout( () => {
                firstSpan.style.display = 'none';
                firstText.style.display = 'none';
            

                secondSpan.classList.add('d-block');
                secondText.classList.add('d-block');

                setTimeout( () => {
                    secondSpan.style.opacity = '1';
                    secondText.style.opacity = '1';
                }, 50);

            }, 100);

        }, 400)
    });

    secondSpan.addEventListener('click', function(){
      
      cookieContainer.style.opacity = 0;
      
      setTimeout( () => {
          cookieContainer.style.display = "none";
      }, 350);

    });

    // Burger Menu Start
    const menu = document.querySelector('.menu_open');
    const headerMenuClose = document.querySelectorAll('.closemenu');
   
    const headerBurgerWrap = document.querySelector('#main-header .burger-lines-wrap');
    const footerBurgerWrap = document.querySelector('#feedback .burger-lines-wrap');
   
    let burgerAble = true,
        burgerClosable = true;
   
    headerMenuClose.forEach( function(e) {
   
        e.addEventListener('click', function() {
        
            if ( burgerClosable ) {
   
                // disable burger-menu click, while menu is open
                burgerAble = false;
   
                // burger-lines-wrap has visible children without 'active' class
                const burgerWrap = this.parentElement;
   
                burgerWrap.classList.remove('active');
                
                setTimeout(()=>{
                   burgerWrap.classList.remove('centered');
                }, 100);
   
   
                // at first, it's needed to move shown menu visually 
                menu.classList.remove('moved') 
                
                // now we need to hide it completely
                setTimeout( function() {
   
                    menu.classList.remove( 'opened' );
   
                    if ( footerBurgerWrap && headerBurgerWrap ) {
   
                        if ( e == headerMenuClose[0] ) {
                        
                            footerBurgerWrap.style.zIndex = '249';
    
                        } else {
                            
                            headerBurgerWrap.style.zIndex = '249';
    
                        }
   
                    }
   
                    setTimeout( function(){
                        
                        burgerAble = true;
   
                    }, 400);
   
                }, 100);
   
            }
    
        });
    })
   
    const headerBurger = document.querySelectorAll('.burger-lines');
   
    headerBurger.forEach( function(e) {
   
        e.addEventListener('click', function(){
        
            if (burgerAble) {
   
                burgerClosable = false
                
                menu.classList.add('opened');
   
                const burgerWrap = this.parentElement;
                
                setTimeout( () => {
   
                    menu.classList.add('moved');
   
                        burgerWrap.classList.add('active');
                    
                    setTimeout( ()=> {
                        
                        burgerWrap.classList.add('centered');
   
                    }, 100);
                    
   
                    if ( footerBurgerWrap && headerBurgerWrap ) {
                        
                        if ( e == headerBurger[0] ) {            
                        
                            footerBurgerWrap.style.zIndex = '0';
    
                        } else {
                            
                            headerBurgerWrap.style.zIndex = '0';
    
                        }
   
                    }
   
   
                    setTimeout( function(){
                        burgerClosable = true;
                    }, 300);
                    
                }, 100);
   
            }
            
        });
   
    });

    const feedBackLink = document.querySelector( '.feedback-heading a' );

    if ( feedBackLink && winWidth < 769 ) {

      feedBackLink.addEventListener( 'click', function(e) {

        e.preventDefault();

      });

    }

    

});