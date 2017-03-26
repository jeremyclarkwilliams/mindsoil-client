<?php session_start();

  $dir = $_SESSION['user'] . $_SESSION['dir'];

  $new_folder = isset( $_POST['folder'] ) ? preg_replace( '/[^\-\_ a-zA-Z0-9]/', '', $_POST['folder'] ) : '';
  $new_folder = strtolower($new_folder);

  $_SESSION['dir'] .= '/' . $new_folder;

  $dir = $dir . '/' . $new_folder;

  echo mkdir($dir, 0777, true);

?>