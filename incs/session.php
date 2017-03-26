<?php session_start();

$path = $_SERVER['REQUEST_URI'];

// in client directory as admin
if (preg_match('/client\/\w+/', $path) && isset($_SESSION['admin'])) {
  $_SESSION['user'] = end(explode('/', $path));
}

// in client directory but session user not set, send back to client login page
else if (preg_match('/client\/\w+/', $path) && !isset($_SESSION['user'])) {
  header('Location: http://localhost/~jeremy/mindsoil_p2/client');
  die();
}

// back in main site and session user not logged out, send to client directory page
else if (preg_match('/client/', basename($path)) && isset($_SESSION['user'])) {
  $_SESSION['dir_history'] = [];
  $_SESSION['dir'] = '/';
  header('Location: http://localhost/~jeremy/mindsoil_p2/client/' . $_SESSION['user']);
  die();
}

// in admin panel but session admin not set, send back to admin login page
else if (preg_match('/admin\/\w+/', $path) && !isset($_SESSION['admin'])) {
  header('Location: http://localhost/~jeremy/mindsoil_p2/admin');
  die();
}

?>
