<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require './PHPMailer/src/Exception.php';
require './PHPMailer/src/PHPMailer.php';
require './PHPMailer/src/SMTP.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$email = $data['email'];
$text = $data['text'];

if ($mail && $name && $email && $text) {
    
    $name = htmlspecialchars($name);
    $email = htmlspecialchars($email);
    $text = htmlspecialchars($text);

    try {
        //Server settings
        //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'vintro.agency';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'hello@vintro.agency';                     //SMTP username
        $mail->Password   = '+yP2OEicdU?5';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
        $mail->CharSet = 'utf-8';
        //Recipients
        $mail->setFrom('hello@vintro.agency', 'Vintro Agency');
        $mail->addAddress('hello@vintro.agency');               //Name is optional
        $mail->addReplyTo('hello@vintro.agency');
        $mail->addCC('hello@vintro.agency');
        $mail->addBCC('hello@vintro.agency');

        //Attachments
        // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
        // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'New request!';
        $mail->Body    .= '<p>Name: '. $name .'</p>';
        $mail->Body    .= '<p>Subject: '. $text .'</p>';
        $mail->Body    .= '<p>Email: '. $email .'</p>';
        
        // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $mail->send();
        $obj = array(
            "success" => true,
            "data" => array(
                "text" => "text"
            )
        );

        echo json_encode($obj);

    } catch (Exception $e) {
        echo json_encode("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
    }

} else {

    if (!$email && !$name && !$text) {
        echo json_encode(array(
            "error" => "all"
        ));
    } elseif (!$email && !$name) {
        echo json_encode(array(
            "error" => "name_email"
        ));
    } elseif (!$text && !$name) {
        echo json_encode(array(
            "error" => "name_text"
        ));
    } elseif (!$text && !$email) {
        echo json_encode(array(
            "error" => "email_text"
        ));
    }

    print_r(json_encode(array(
        "msg" => $data
    )));
}