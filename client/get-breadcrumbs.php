<?php session_start();

  $dir_structure = $_SESSION['dir'];
  $dir_array = preg_split('[\/]', $dir_structure, -1, PREG_SPLIT_NO_EMPTY);

  array_unshift($dir_array, '/');

  $paths = [];
  for ($i = 0; $i < count($dir_array); $i++) {
    $path = '';
    for ($j = 0; $j < $i + 1; $j++) {
      $path .= $dir_array[$j];
    }
    array_push($paths, $path);
  }

  print json_encode($dir_array);

?>