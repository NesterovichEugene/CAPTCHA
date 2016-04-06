<?php
$letters = 'abcdefghigklmnopqrstuvwxyz123456789';
$code = "";

$img = imagecreatetruecolor(100, 50);

$y = rand(intval(0.6*50), intval(0.8*50));
$color = imagecolorallocate($img, 168, 199, 54);
$black = imagecolorallocate($img, 0, 0, 0);
imagecolortransparent($img, $black);
$width = 16;

while(true) {
	for ($i = 0; $i < 5; $i++) {
		$letter = $letters[rand(0, strlen($letters) - 1)];

		if (empty($x)) {
			$x = 10;
		} else {
			$x = $x + $width;
		}
		$angle = rand(-10, 10);
		$size = rand(intval(0.4 * 50), intval(0.6 * 50));
		$code .= $letter;

		imagettftext($img, $size, $angle, $x, $y, $color, "font/gatsby.ttf", $letter);
	}

	if (strpos($code, file_get_contents("dictionary/dictionary.txt")) == false) {
		break;
	}
}

setcookie('key3', md5($code));
header('Content-Type: image/png');
imagepng($img);
imagedestroy($img);
