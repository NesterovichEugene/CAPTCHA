<?php

$right_answer = $_COOKIE['right-answer'];
if(md5($_POST["code"]) == $_COOKIE["key".$right_answer])
	$results = "success";
else
	$results = "wrong";

echo $results;