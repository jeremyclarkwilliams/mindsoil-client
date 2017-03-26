<nav class="nav-main">
  <a href="<?= $baseurl ?>/" class="logo link"><?php include "logo.php"; ?></a>
  <button class="btn-menu"></button>
  <ul class="link-list">
    <li class="link-item"><a href="<?= $baseurl ?>/about" class="link<? if ($page_class == "about") echo " on" ?>">About</a></li>
    <li class="link-item"><a href="<?= $baseurl ?>/projects" class="link<? if ($page_class == "project" || $page_class == "projects") echo " on" ?>">Projects</a></li>
    <li class="link-item"><a href="<?= $baseurl ?>/contact" class="link<? if ($page_class == "contact") echo " on" ?>">Contact</a></li>
    <? if (preg_match('/client\/\w+/', $path)): ?>
    <li class="link-item"><a href="<?= $baseurl ?>/client/logout" class="link">Log Out</a></li>
    <? else: ?>
    <li class="link-item"><a href="<?= $baseurl ?>/client" class="link<? if ($page_class == "client") echo " on" ?>">Client Login</a></li>
    <? endif; ?>
  </ul>
</nav>
