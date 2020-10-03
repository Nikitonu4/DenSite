<?php

$name=$_POST['first_name'];
$phone=$_POST['phone_number'];

$to = "nikitonu4@gmail.com ";
$subject = "My subject";
$txt = "Hello Admin: Usser Name: ".$name." Phone: ".$phone."";
$headers = "From: webmaster@example.com";

echo mail($to,$subject,$txt,$headers);
?>