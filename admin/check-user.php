<?php

include '../incs/db-settings.php';

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
  die('Connection failed: ' . mysqli_connect_error());
}

$username = isset( $_POST['username'] ) ? preg_replace( '/[^\-\_\/\. a-zA-Z0-9]/', '', $_POST['username'] ) : '';

$sql = "SELECT * FROM clients WHERE username='$username'";
$result = mysqli_query($conn, $sql);

echo mysqli_num_rows($result) > 0;

mysqli_close($conn);

?>