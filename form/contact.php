<?php

// Define some constants
//define( "RECIPIENT_NAME", "Mindsoil" );
//define( "RECIPIENT_EMAIL", "john@mindsoil.com" );
$recipientName = "Mindsoil";
$recipientEmail = "john@mindsoil.com";
// $recipientName = "Test from Mindsoil";
// $recipientEmail = "jwilliams098@ca.rr.com";


// Read the form values
$success = false;
$senderName = isset( $_POST['name'] ) ? preg_replace( "/[^\.\-\' a-zA-Z0-9]/", "", $_POST['name'] ) : "";
$senderEmail = isset( $_POST['email'] ) ? preg_replace( "/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['email'] ) : "";
$message = isset( $_POST['message'] ) ? preg_replace( "/(From:|To:|BCC:|CC:|Subject:|Content-Type:)/", "", $_POST['message'] ) : "";

$message = "Name: " . $senderName . "\r\nEmail: " . $senderEmail . "\r\nMessage: " . $message;

//define( "EMAIL_SUBJECT", "Message from ".$senderName );
$subject = "Message from " . $senderName;

// If all values exist, send the email
if ( $senderName && $senderEmail && $message ) {
  $recipient = $recipientName . " <" . $recipientEmail . ">";
  $headers   = array();
  $headers[] = "MIME-Version: 1.0";
  $headers[] = "Content-type: text/plain; charset=iso-8859-1";
  $headers[] = "From: " . $senderName . " <" . $senderEmail . ">";
  $headers[] = "Reply-To: " . $recipient;
  $headers[] = "Subject: ". $subject;
  $headers[] = "X-Mailer: PHP/" . phpversion();
  $success = mail( $recipient, $subject, $message, implode("\r\n", $headers) );
}

echo $success;

?>