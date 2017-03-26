<?php session_start();

  $new_path = isset( $_POST['path'] ) ? preg_replace( '/[^\-\_\/\. a-zA-Z0-9]/', '', $_POST['path'] ) : '';

  array_push($_SESSION['dir_history'], $_SESSION['dir']);

  $_SESSION['dir'] = $new_path;

  echo true;

?>