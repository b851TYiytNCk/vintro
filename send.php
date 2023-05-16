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

$mailValid = !empty( $mail );
$nameValid = !empty( $name );
$textValid = !empty( $text );

if ( $mailValid && $nameValid && $textValid ) {
    
    $name = htmlspecialchars($name);
    $email = htmlspecialchars($email);
    $text = htmlspecialchars($text);

    try {
        //Server settings
        //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'private information';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = 'private information';                                   //Enable SMTP authentication
        $mail->Username   = 'private information';                     //SMTP username
        $mail->Password   = 'private information';                               //SMTP password
        $mail->SMTPSecure = 'private information';            //Enable implicit TLS encryption
        $mail->Port       = 'private information';                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
        $mail->CharSet = 'private information';
        //Recipients
        $mail->setFrom('private information', 'private information');
        $mail->addAddress('private information');               //Name is optional
        $mail->addReplyTo('private information');
        $mail->addCC('private information');
        $mail->addBCC('private information');

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

    $error_arr = array(
        'error' => true
    );

    if (!$mailValid) {
        $error_arr['email'] = 'invalid';
    } 

    if (!$nameValid) {
        $error_arr['name'] = 'invalid';
    } 
     
    if (!$textValid) {
        $error_arr['text'] = 'invalid';
    }

    echo json_encode( $error_arr );
}