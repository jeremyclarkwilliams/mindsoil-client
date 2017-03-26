<!DOCTYPE html>
<html lang="en">

<?
  $baseurl = 'http://localhost/~jeremy/mindsoil_p2';
  $path = $_SERVER['REQUEST_URI'];
  $page = basename($path);
  $page_name = $page_class = str_replace('.php', '', $page);
  $canonicalurl = rtrim($baseurl . parse_url($path, PHP_URL_PATH), '/');
  if (preg_match('/ocearch|carmageddon|claudiaendler/', $page)) { $page_class = 'project'; }
  elseif (preg_match('/client\/\w+/', $path)) { $page_class = 'client directory'; }
  elseif (preg_match('/client/', $page)) { $page_class = 'client'; }
  elseif (preg_match('/admin/', $path)) { $page_class = 'admin'; }
  elseif (preg_match('/mindsoil|index|contact/', $page_name) || $path == '/') { $home = true; $page_class = 'home swiper-container'; }
?>

<head>
  <title>Mindsoil</title>
  <meta name="description" content="We create emotional connections between brands and their audience." />
  <meta name="keywords" content="" />
  <meta name="author" content="Jeremy Williams" />
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" >
  <link href="//cdnjs.cloudflare.com/ajax/libs/Swiper/3.3.1/css/swiper.min.css" rel="stylesheet">
  <link href="<?= $baseurl ?>/css/fonts-din.css" rel="stylesheet" />
  <link href="<?= $baseurl ?>/css/main-compiled.css" rel="stylesheet" />
  <link href="<?= $baseurl ?>/css/mobile-compiled.css" rel="stylesheet" />

  <link rel="icon" href="favicon.ico" type="image/x-icon" />
  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
  <link rel="canonical" href="<?= $canonicalurl ?>" />
</head>

<body class="<?= $page_class ?>">