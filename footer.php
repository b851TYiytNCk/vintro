    <!-- <script src="assets/js/min/.min.js"></script> -->
    <?php 
        	$currentpage = $_SERVER['REQUEST_URI'];
        	if( $currentpage=="/" || $currentpage=="/index.php" 
        		|| $currentpage=="/index" || $currentpage=="" ):?>
    <script src="assets/js/min/parallax.min.js"></script>
    <? endif; ?>
</body>