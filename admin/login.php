<?php session_start();

// Define login constants
$user = 'jeremy';
$pass = 'test';
$response = false;

// Read the form values
$loginUser = isset( $_POST['user'] ) ? preg_replace( '/[^\.\-\' a-zA-Z0-9]/', '', $_POST['user'] ) : '';
$loginPass = isset( $_POST['password'] ) ? preg_replace( '/[^\.\-\' a-zA-Z0-9]/', '', $_POST['password'] ) : '';

if ($loginUser == $user && $loginPass = $pass) {
  $_SESSION['admin'] = true;
  $response = true;
}

echo $response;

?>
