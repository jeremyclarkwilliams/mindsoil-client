  <script src="//cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>  
  <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/Swiper/3.3.1/js/swiper.jquery.min.js"></script>
  <script src="<?= $baseurl ?>/js/main.js"></script>
  <? if (preg_match('/mindsoil|index|contact/', $page_name) || ($path == '/')): ?>
  <script src="<?= $baseurl ?>/js/contact.js"></script>
  <? elseif (preg_match('/client/', $page)): ?>
  <script src="<?= $baseurl ?>/js/login.js"></script>
  <? elseif (preg_match('/client\/\w+/', $path)): ?>
  <script src="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
  <script src="<?= $baseurl ?>/js/vendor/jquery.iframe-transport.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/blueimp-file-upload/9.12.4/js/jquery.fileupload.min.js"></script>
  <script src="<?= $baseurl ?>/js/client.js"></script>
  <? elseif (preg_match('/admin/', $path)): ?>
  <script src="<?= $baseurl ?>/js/admin.js"></script>
  <? endif; ?>

</body>

</html>
