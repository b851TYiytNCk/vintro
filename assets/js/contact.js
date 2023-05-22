document.addEventListener('DOMContentLoaded', function(){

    const winWidth = window.innerWidth;

    const btnSubmit = document.querySelector('.btn-submit');
    const tgLink = document.querySelector('.tg_link');

    const notMobile = winWidth > 768;

    if ( notMobile ) {

        const cursor = new MouseFollower({
            container: 'body',
            speed: 0.55
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
        
        attachCursorStyle(cursorInverseElements, '-inverse-scaled');
    
    
        function addHideCursor(el) {
            el.addEventListener('mouseenter', () => {
                cursor.hide(); // you can pass multiple states separated by whitespace
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.show();
            });
        }
    
        addHideCursor(btnSubmit);
        addHideCursor(tgLink);

    }

    const nameInput = document.querySelector('.name_input');
    const emailInput = document.querySelector('.email_input');
    const textInput = document.querySelector('.text_input');

    const lastRowBr = document.querySelector('.last-row-br');


    function spanEdit(spanEl, placeholder) {
        
        let p = spanEl,
            s = window.getSelection(),
            r = document.createRange();

        spanEl.addEventListener('click', function(e) {
            
            const tgt = e.target;
            
            if ( !tgt.classList.contains('active') ) {
                
                r.setStart(p, 0);
                r.setEnd(p, 0);
                s.removeAllRanges();
                s.addRange(r);
                //tgt.innerHTML = '';
            }

        });
        
        spanEl.addEventListener('focusout', function(e) {
            
            const tgt = e.target;
            
            if (tgt.innerHTML.length < 1) {
                
                tgt.style.color = '#d8d8d8';

                tgt.innerHTML = placeholder;
                tgt.classList.remove('active');

                if ( tgt.classList.contains('text_input') ) {
                    lastRowBr.style.display = 'inline';
                }
                
            }
        });

        spanEl.addEventListener('keyup', function(e) {
            
            const tgt = e.target;
            
            if ( !tgt.classList.contains('active') ) {
                
                tgt.style.color = 'transparent';

                tgt.innerText = tgt.innerText.slice(0, 1);
                
                r.setStart(p, 1);
                r.setEnd(p, 1);
                s.removeAllRanges();
                s.addRange(r);

                if ( tgt.classList.contains('text_input') ) {
                    lastRowBr.style.display = 'none';
                }

                tgt.classList.add('active');

            }

        });
    }

    spanEdit(nameInput, 'Rudolf');
    spanEdit(emailInput, 'r@email.com');
    spanEdit(textInput, 'the new website development for my company');


    const textBr = document.querySelector('.span-br');

    nameInput.addEventListener('input', function(e) {

        let nameNumb;

        if (winWidth > 1800) {
            nameNumb = 212;
        } else if (winWidth > 1366) {
            nameNumb = 212;
        } else if (winWidth > 1023) {
            nameNumb = 154;
        }

        const tgt = e.target;

        const nameWidth = tgt.offsetWidth;
        const textWidth = textInput.offsetWidth;

        if ( winWidth > 768 ) {

            if ( nameWidth > nameNumb ) {
                textBr.style.display = 'none';
                lastRowBr.style.display = 'none';
            } else {
                textBr.style.display = 'inline';
            }

        }

    });

    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch (url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        
        return await response.json(); // parses JSON response into native JavaScript objects
    }


    const hello = document.querySelector('.hello');
    const feedback = document.querySelector('.feedback_main');

    function nameValidtaion(name) {
        if (name.innerHTML.length > 1 && 
            name.classList.contains('active') ) {
            return true;
        }
    }

    function emailValidation(email) {
        if (email.innerHTML.length > 5 && 
            email.innerHTML.includes('@') && 
            email.classList.contains('active')) {
            return true;
        }
    }

    function textValidation(textarea) {
        if (textarea.innerHTML.length > 5 &&
            textarea.classList.contains('active')) {
            return true;
        }
    }

    btnSubmit.addEventListener('click', function(){
        
        const name = nameInput;
        const email = emailInput;
        const textarea = textInput;

        const noticeWrap = document.querySelector('.contact_notice_wrap');
        const noticeName = document.querySelector('.contact_notice_text--name');
        const noticeEmail = document.querySelector('.contact_notice_text--email');
        const noticeSubj = document.querySelector('.contact_notice_text--subj');

        const notices = document.querySelectorAll('.contact_notice_text');

        noticeWrap.classList.remove('active');
        setTimeout( () => {
            notices.forEach( (e) => { e.style.display = 'none' });
        }, 1000);

        if ( nameValidtaion(name) &&
             emailValidation(email) && 
             textValidation(textarea)) {
            
                postData('/send.php', { 
                    name: name.innerText,
                    email: email.innerText,
                    text: textarea.innerText
                })
                .then((data) => {
                    console.log(data); // JSON data parsed by `response.json()` call
                    if (data.error) {
                        switch (data.error) {
                            case 'all':
                                [noticeName, noticeSubj, noticeEmail].forEach( (e) => {
                                    e.style.display = 'inline';
                                });
                                break;
                            case 'name_email':
                                [noticeName, noticeEmail].forEach( (e) => {
                                    e.style.display = 'inline';
                                });
                                break;
                            case 'name_text':
                                [noticeName, noticeSubj].forEach( (e) => {
                                    e.style.display = 'inline';
                                });
                                break;
                            case 'email_text':
                                [noticeSubj, noticeEmail].forEach( (e) => {
                                    e.style.display = 'inline';
                                });
                                break;
    
                        }
                    } else {
                        const nameSent = document.querySelector('.contact_input.name_input.active').innerHTML;
                        document.querySelector('#hello_name').innerHTML = nameSent;

                        switchTabs(feedback, hello);
                    }
                
                });

        } else {

            setTimeout( () => {
                if (!nameValidtaion(name)) {
                    noticeName.style.display = 'inline';
                }
                
                if (!textValidation(textarea)) {
                    noticeSubj.style.display = 'inline';
                }
    
                if (!emailValidation(email)) {
                    noticeEmail.style.display = 'inline';
                }
                
                noticeWrap.classList.add('active');
            }, 1000);

        }

    });

    function switchTabs(fadeTab, showTab) {
        fadeTab.classList.add('transparent');
        setTimeout( () => {
            
            fadeTab.style.display = 'none';
            showTab.style.display = 'block';
            
            setTimeout( () => {
                showTab.classList.remove('transparent');
            }, 5);

        }, 500);
    }
  

});