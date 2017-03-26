<?php session_start();

  $dir = $_SESSION['user'] . $_SESSION['dir'];

  $response = (object) [
    'folders' => [],
    'files' => [],
    'type' => [],
    'folderpath' => [],
    'filepath' => [],
    'ext' => [],
    'preview' => false
  ];

  if ( is_dir($dir) && $dh = opendir($dir) ) {
    while ( ($file = readdir($dh)) !== false ) {
      if ( $file != '.' && $file != '..'  && strpos($file,'.') !== 0 ) {
        $path = $_SESSION['dir'] . '/' . $file;
        $path = str_replace('//', '/', $path);
        if ( is_dir($dir.'/'.$file) ) {
          array_push($response->folders, $file);
          array_push($response->folderpath, $path);
        } else {
          $ext = pathinfo($file, PATHINFO_EXTENSION);
          array_push($response->ext, $ext);
          if ( preg_match('/jpg|jpeg|png|gif/', $ext)) { $type = 'image'; }
          elseif ( preg_match('/mov|mpeg|avi|mp4|m4v|webm|ogg/', $ext)) { $type = 'video'; }
          elseif ( preg_match('/pdf/', $ext)) { $type = 'pdf'; }
          else { $type = 'doc'; }
          array_push($response->type, $type);
          array_push($response->files, $file);
          array_push($response->filepath, $path);
        }
      }
    }
    closedir($dh);
  } else if ( is_file($dir) ) {
    $file = end(explode('/', $dir));
    array_push($response->files, $file);
    $ext = pathinfo($file, PATHINFO_EXTENSION);
    array_push($response->ext, $ext);
    if ( preg_match('/jpg|jpeg|png|gif/', $ext)) { $type = 'image'; }
    elseif ( preg_match('/mov|mpeg|avi|mp4|m4v|webm|ogg/', $ext)) { $type = 'video'; }
    elseif ( preg_match('/pdf/', $ext)) { $type = 'pdf'; }
    else { $type = 'doc'; }
    array_push($response->type, $type);
    array_push($response->filepath, $dir);
    $response->preview = true;
  }

  print json_encode($response);

?>