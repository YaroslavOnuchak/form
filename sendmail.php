<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

require 'phpmailer/src/SMTP.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/lanuage');
$mail->IsHTML(true);

$from_who_mail = "exam@gmail.com" ;
$mail->Password   = 'pass';                               //SMTP password

// $mail->SMTPDebug = 2;
//   $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

 $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';   
    $mail->SMTPSecure = 'tls';                 // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = $from_who_mail;                     // SMTP username
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 587;   

// from who mail
$mail->setFrom($from_who_mail, 'kyky owl');
//  to
$mail->addAddress($_POST['email']);
// tema
$mail->Subject = "hi , it's me";  


// hand
$hand = "right";
if ($_POST['hand'] == "left") {
    $hand = "left";
}
echo '$_POST';

// body mail
$body = '<h1>welcom super mail</h1>';
echo $_POST;
if (trim(!empty($_POST['name']))) {
    $body.= '<p><strong>Name: </strong>'.$_POST['name'].'</p>';
}
if (trim(!empty($_POST['email']))) {
    $body.= '<p><strong>Email: </strong>'.$_POST['email'].'</p>';
}
if (trim(!empty($_POST['hand']))) {
    $body.= '<p><strong>Hand: </strong>'.$_POST['hand'].'</p>';
}
if (trim(!empty($_POST['age']))) {
    $body.= '<p><strong>Age: </strong>'.$_POST['age'].'</p>';
}
if (trim(!empty($_POST['message']))) {
    $body.= '<p><strong>Message: </strong>'.$_POST['message'].'</p>';
}

$fileAttach ="";
// add file
if (!empty($_FILES['imageE']['tmp_name'])) {
    // path upload file
    $filePath = __DIR__ . "/files/". $_FILES['imageE']['name'];
    // dowload file
    if (copy($_FILES['imageE']['tmp_name'], $filePath)) {
        $fileAttach = $filePath;
        $body .= '<p><strong>photo add: </strong>';
        $mail->addAttachment($fileAttach);
    }
}
$mail->Body = $body;
//  sending
if (!$mail->send()) {
    $message = 'error';
} else {
    $message = 'data sendet';
}
$response = ['message' => $message];

header('Content-type : application/json');
// echo json_encode($response);
?>
