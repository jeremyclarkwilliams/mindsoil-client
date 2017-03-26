<?php session_start();

include '../incs/db-settings.php';

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
  die('Connection failed: ' . mysqli_connect_error());
}

$response = (object) [
  'valid' => false,
  'user' => '',
  'disabled' => false,
];

// Read the form values
$loginEmail = isset( $_POST['email'] ) ? preg_replace( '/[^\.\-\_\@a-zA-Z0-9]/', '', $_POST['email'] ) : '';
$loginPass = isset( $_POST['password'] ) ? preg_replace( '/[^\.\-\' a-zA-Z0-9]/', '', $_POST['password'] ) : '';

$sql = "SELECT * FROM clients WHERE email='$loginEmail'";
$result = mysqli_query($conn, $sql);

if ($result->num_rows > 0) {
  foreach ($result as $row) {
    $hash = $row['password'];
    if ($row['enabled'] == 0) {
      $response->disabled = true;
    } elseif ($row['email'] == $loginEmail && password_verify($loginPass, $hash)) {
      $_SESSION['user'] = $row['username'];
      $_SESSION['dir'] = '/';
      $response->valid = true;
      $response->user = $row['username'];
    }
  }
}

echo json_encode($response);

mysqli_close($conn);

?>
