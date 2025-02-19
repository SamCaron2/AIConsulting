<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $company = htmlspecialchars($_POST["company"]);
    $services = isset($_POST["services"]) ? implode(", ", $_POST["services"]) : "No services selected";
    $message = htmlspecialchars($_POST["message"]);

    // Google Sheets API Setup
    $sheet_url = "https://script.google.com/macros/s/AKfycbwlI5d9ZDmW1cveeZjPkF293LxyKBtP47CQ8QnzjPDLnC1s62WFAY4EGXXkN1aBbooc5A/exec";
    
    $data = array(
        "name" => $name,
        "email" => $email,
        "company" => $company,
        "services" => $services,
        "message" => $message
    );

    $options = array(
        "http" => array(
            "header"  => "Content-type: application/x-www-form-urlencoded",
            "method"  => "POST",
            "content" => http_build_query($data),
        ),
    );

    $context  = stream_context_create($options);
    $result = file_get_contents($sheet_url, false, $context);

    if ($result === FALSE) {
        echo "Error saving data.";
    }

    // Send an email notification
    $to = "atreusconsultinggroup@gmail.com";
    $subject = "New Contact Form Submission";
    $headers = "From: $email\r\nReply-To: $email";
    $email_message = "Name: $name\nEmail: $email\nCompany: $company\nServices: $services\nMessage: $message";

    mail($to, $subject, $email_message, $headers);

    // Redirect back to contact page with success message
    header("Location: contact.html?success=true");
}
?>
