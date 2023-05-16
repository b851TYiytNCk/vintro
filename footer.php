</div> <!-- #content -->

<div class="cookie_container">
    <div class="cookie_popup">
        <div class="popup_text first_text">We use cookies on our site. If you want to know how we use this data please refer to <a href="/policy">Privacy policy</a> page.</div>
        <div class="popup_text second_text">Our agency launch was very recent, so some of the content is ready, but it's on the schedule and hasn't been published yet. You can keep an eye on our publishing schedule on the website and/or subscribe to our social media accounts. Other than that, enjoy exploring!</div>
        <button class="popup_btn" id="first_btn">
            <span class="first_span">OK</span>
            <span class="sec_span">OK, got it!</span>
        </button>
    </div>
</div>


<?php

    if ( $currentpage == "/" || 
         $currentpage == "/index.php" ||
         $currentpage == "/index" || 
         $currentpage == "" || 
         $currentpage == "/main" || 
         $currentpage == "/main") {
            
            $currentpage = 'home';

    } elseif 
        ($currentpage == "/about-us" ||
         $currentpage == "/about-us.php") {
            $currentpage = 'about'; 
    } else {

        $currentpage = substr($currentpage, 1);
        
        if ( str_contains($currentpage, '.php') ) {
            $currentpage = substr($currentpage, 0, -4);
        }

    } ?>

        <script src="assets/js/min/<?php echo $currentpage;?>.min.js"></script>

</body>