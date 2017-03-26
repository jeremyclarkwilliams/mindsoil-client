<?php session_start();

  $files = $_POST['files'];

  $zip = new ZipArchive;
  $res = $zip->open('files.zip', ZipArchive::CREATE);
  if ($res === true) {
    foreach ($files as $file) {
      $zip->addFile($_SESSION['user'] . $file, 'files/' . $file);
    }
    $zip->close();
    rename('files.zip', $_SESSION['user'] . '/files.zip');
    echo true;
  } else {
    echo false;
  }

?>