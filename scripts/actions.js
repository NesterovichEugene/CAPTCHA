$(document).ready(function() {
	var right_answer = 0;
	var setCookie = function(){
		right_answer = Math.floor(Math.random() * (3 - 1 +1) + 1);
		document.cookie = 'right-answer='+right_answer;
	};
	setCookie();

	var animals = [
		{
			src:"images/cat.png",
			name: "cat"
		},
		{
			src:"images/cow.png",
			name:"cow"
		},
		{
			src:"images/crocodile.png",
			name:"crocodile"
		},
		{
			src:"images/dog.png",
			name:"dog"
		},
		{
			src:"images/elephant.png",
			name:"elephant"
		},
		{
			src:"images/fish.png",
			name:"fish"
		},
		{
			src:"images/goat.png",
			name:"goat"
		},
		{
			src:"images/lion.png",
			name:"lion"
		},
		{
			src:"images/zebra.png",
			name:"zebra"
		}
	];

	var rand = [];
	rand['1']=0;
	rand['2']=0;
	rand['3']=0;

	var animals_generator = function() {
		rand['1'] = Math.floor(Math.random() * (animals.length - 0) + 0);
		while (true) {
			rand['2'] = Math.floor(Math.random() * (animals.length - 0) + 0);
			rand['3'] = Math.floor(Math.random() * (animals.length - 0) + 0);
			if (rand['2'] !== rand['1'] && rand['2'] !== rand['3'] && rand['3'] !== rand['1'])
				break;
		}
		$('#animal1').prop('src', animals[rand['1']].src);
		$('#animal2').prop('src', animals[rand['2']].src);
		$('#animal3').prop('src', animals[rand['3']].src);
	};
	animals_generator();

	$('#goal').text("Input code with "+animals[rand[right_answer]].name);

	$("#submit").click(function () {
			if ($('#code').val() !== '') {
				$.ajax({
					type: "POST",
					data: {
						code: $('#code').val()
					},
					url: "verification.php",
					success: function (result) {
						if(result === "success"){
							$('.success').fadeIn(700).fadeOut(1500);
							$("#refresh").trigger('click');
						}
						if(result === "wrong"){
							$('.wrong').fadeIn(700).fadeOut(1500);
						}
					}
				});
			}
		}
	);

	$(document).keypress(function(e) {
		if(e.which == 13) {
			$('#submit').trigger('click');
		}
	});

	$("#refresh").click(function () {
		setCookie();
		$('.animals').fadeOut(300);
		setTimeout(animals_generator, 300);
		$('.animals').fadeIn(200);
		$('#image-one').prop('src', 'captcha_generator.php?'+Math.random());
		$('#image-two').prop('src', 'captcha_generator1.php?'+Math.random());
		$('#image-three').prop('src', 'captcha_generator2.php?'+Math.random());
		$('#code').val('');
		$('#goal').fadeOut(300);
		setTimeout(function(){$('#goal').text("Input code with "+animals[rand[right_answer]].name)}, 300);
		$('#goal').fadeIn(200);
		$('#slider').offset({left: $('#slide-string').offset().left, top: $('#slide-string').offset().top-2});
		$('#image-one').css('visibility', 'hidden');
		$('#image-two').css('visibility', 'hidden');
		$('#image-three').css('visibility', 'hidden');
	});

	$('#slider').draggable({
		containment: "parent",
		axis: "x",
		drag: function(){
			var start = $('#slide-string').offset().left;
			var offset = $(this).offset();
			var xPos = offset.left-start;
			if(xPos > 5 && xPos < 60) $('#image-one').css('visibility', 'visible');
			else $('#image-one').css('visibility', 'hidden');

			if(xPos > 90 && xPos < 160) $('#image-two').css('visibility', 'visible');
			else $('#image-two').css('visibility', 'hidden');

			if(xPos > 200 && xPos < 255) $('#image-three').css('visibility', 'visible');
			else $('#image-three').css('visibility', 'hidden');
		}
	});

	$('#slider').mouseup(function(){
		$('#code').focus();
	});
});