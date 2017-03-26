<?php

include '../incs/db-settings.php';

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
  die('Connection failed: ' . mysqli_connect_error());
}

$username = isset( $_POST['username'] ) ? preg_replace( '/[^\-\_\/\. a-zA-Z0-9]/', '', $_POST['username'] ) : '';
$password = isset( $_POST['password'] ) ? preg_replace( '/[^\-\_\/\. a-zA-Z0-9]/', '', $_POST['password'] ) : '';
$password = password_hash( $password, PASSWORD_DEFAULT );

$sql = "UPDATE clients SET password = '$password' WHERE username='$username'";

if (mysqli_query($conn, $sql)) {
  echo true;
} else {
  echo false;
}

mysqli_close($conn);

?>