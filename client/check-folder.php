<?php session_start();

  $dir = $_SESSION['user'] . $_SESSION['dir'];

  $new_folder = isset( $_POST['folder'] ) ? preg_replace( '/[^\-\_ a-zA-Z0-9]/', '', $_POST['folder'] ) : '';
  $new_folder = strtolower($new_folder);

  if ($dh = opendir($dir)) {
    while (($file = readdir($dh)) !== false) {
      if ($file != '.' && $file != '..'  && strpos($file,'.') !== 0) {
        if (is_dir($dir.'/'.$file)) {
          if ($file === $new_folder) { echo true; }
          else { echo false; }
        }
      }
    }
    closedir($dh);
  }

?>