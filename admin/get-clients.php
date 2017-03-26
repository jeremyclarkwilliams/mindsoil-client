<?php

include '../incs/db-settings.php';

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
  die('Connection failed: ' . mysqli_connect_error());
}

$sql = "SELECT * FROM clients";
$result = mysqli_query($conn, $sql);

$rows = array();

if ($result->num_rows > 0) {
  while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
  }
}

echo json_encode($rows);

mysqli_close($conn);

?>