document.addEventListener("DOMContentLoaded", function (e) {

	document.addEventListener('click', function(e) {
		if (e.target.classList.contains('js-nav__link')) {
			
			let pressedButton = e.target;
		
			let buttons = document.querySelectorAll('.js-nav__link');
			let images = document.querySelectorAll('.js-header__image');
			let descript = document.querySelectorAll('.js-descript__container');

			let pressedButtonIndex;

			buttons.forEach(function(element, i) {
				if (pressedButton === buttons[i]) {
					pressedButtonIndex = i;
				}

				element.classList.remove('nav__link--active');
				images[i].classList.remove('header__image--active');
				descript[i].classList.remove('descript__container--active');
			});

			buttons[pressedButtonIndex].classList.add('nav__link--active');
			images[pressedButtonIndex].classList.add('header__image--active');
			descript[pressedButtonIndex].classList.add('descript__container--active');
		}
	});

	$('.gallery').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 2,
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: false,
		slide: 'figure',

		responsive: [{
			breakpoint: 1280,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},

			{
			breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
});