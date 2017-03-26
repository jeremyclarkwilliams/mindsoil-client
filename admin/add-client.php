<?php

include '../incs/db-settings.php';

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
  die('Connection failed: ' . mysqli_connect_error());
}

$username = isset( $_POST['username'] ) ? preg_replace( '/[^\-\_\/\. a-zA-Z0-9]/', '', $_POST['username'] ) : '';
$email = isset( $_POST['email'] ) ? preg_replace( '/[^\.\-\_\@a-zA-Z0-9]/', '', $_POST['email'] ) : '';
$password = isset( $_POST['password'] ) ? preg_replace( '/[^\-\_\/\. a-zA-Z0-9]/', '', $_POST['password'] ) : '';
$password = password_hash( $password, PASSWORD_DEFAULT );
$enabled = true;

$sql = "INSERT INTO clients (username, email, password, enabled) VALUES ('$username', '$email', '$password', '$enabled')";

if (mysqli_query($conn, $sql)) {
  mkdir('../client/' . $username);
  echo true;
} else {
  echo false;
}

mysqli_close($conn);

?>