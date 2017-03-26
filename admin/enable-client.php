<?php

include '../incs/db-settings.php';

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
  die('Connection failed: ' . mysqli_connect_error());
}

$username = $_POST['username'];
$enabled = $_POST['enabled'];

$sql = "UPDATE clients SET enabled = NOT '$enabled' WHERE username='$username'";

if (mysqli_query($conn, $sql)) {
  echo !$enabled;
} else {
  echo 'Error';
}

mysqli_close($conn);

?>