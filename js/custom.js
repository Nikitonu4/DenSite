	// Preloader 
	jQuery(window).on('load', function () {
		jQuery("#status").fadeOut(2000);
		jQuery("#preloader").delay(1800).fadeOut("slow");
	});

	// Menu show Hide
	$(".menu-toggle").on('click', function () {
		$(this).toggleClass("on");
		$('.menu-section').toggleClass("on");
		$("nav ul").toggleClass('hidden');
		$(".nav ul li").on('click', function () {
			$(this).toggleClass("on");
			$('.menu-section').toggleClass("on");
			$('.menu-toggle').toggleClass("on");
			$("nav ul").toggleClass('hidden');
		});
	});

	// Menu js for Position fixed
	$(window).scroll(function () {
		var window_top = $(window).scrollTop() + 1;
		if (window_top > 300) {
			$('header').addClass('menu_fixed animated fadeInDown');
		} else {
			$('header').removeClass('menu_fixed animated fadeInDown');
		}
	});

	//owl carousel 
	$('.slider1').owlCarousel({
		loop: true,
		autoplay: true,
		margin: 10,
		nav: true,
		dots: false,
		autoplayTimeout: 10000,
		items: 1,
		navText: [
			'<img src="../images/Left Arrow.svg">',
			'<img src="../images/Right Arrow.svg">'
		],
		responsive: {
			0: {
				items: 1,
				nav: false,
				dots: true,
			},
			600: {
				items: 1,
				nav: false,
				dots: true,
			},
			992: {
				items: 1,
				nav: false,
				dots: true,
			},
			1000: {
				items: 1,
			}
		}
	});

	$('.slider2').owlCarousel({
		items: 1,
		loop: true,
		margin: 10,
		merge: true,
		lazyLoad: true,
		responsive: {
			678: {
				items: 1,
				mergeFit: true
			},
			1000: {
				items: 6,
				mergeFit: false
			}
		}
	});


	// Single page scroll menu
	var pluginName = 'ScrollIt',
		pluginVersion = '1.0.3';

	/*
	 * OPTIONS
	 */
	var defaults = {
		upKey: 38,
		downKey: 40,
		easing: 'linear',
		scrollTime: 600,
		activeClass: 'active',
		onPageChange: null,
		topOffset: -70
	};

	$.scrollIt = function (options) {

		/*
		 * DECLARATIONS
		 */
		var settings = $.extend(defaults, options),
			active = 0,
			lastIndex = $('[data-scroll-index]:last').attr('data-scroll-index');

		/*
		 * METHODS
		 */

		/**
		 * navigate
		 *
		 * sets up navigation animation
		 */
		var navigate = function (ndx) {
			if (ndx < 0 || ndx > lastIndex) {
				return;
			}

			var targetTop = $('[data-scroll-index=' + ndx + ']').offset().top + settings.topOffset + 1;
			$('html,body').animate({
				scrollTop: targetTop,
				easing: settings.easing
			}, settings.scrollTime);
		};

		/**
		 * doScroll
		 *
		 * runs navigation() when criteria are met
		 */
		var doScroll = function (e) {
			var target = $(e.target).closest("[href]").attr('href') ||
				$(e.target).closest("[data-scroll-goto]").attr('data-scroll-goto');
			navigate(parseInt(target, 10));
		};

		/**
		 * keyNavigation
		 *
		 * sets up keyboard navigation behavior
		 */
		var keyNavigation = function (e) {
			var key = e.which;
			if ($('html,body').is(':animated') && (key == settings.upKey || key == settings.downKey)) {
				return false;
			}
			if (key == settings.upKey && active > 0) {
				navigate(parseInt(active, 10) - 1);
				return false;
			} else if (key == settings.downKey && active < lastIndex) {
				navigate(parseInt(active, 10) + 1);
				return false;
			}
			return true;
		};

		/**
		 * updateActive
		 *
		 * sets the currently active item
		 */
		var updateActive = function (ndx) {
			if (settings.onPageChange && ndx && (active != ndx)) {
				settings.onPageChange(ndx);
			}

			active = ndx;
			$('[href]').removeClass(settings.activeClass);
			$('[href=' + ndx + ']').addClass(settings.activeClass);
		};

		/**
		 * watchActive
		 *
		 * watches currently active item and updates accordingly
		 */
		var watchActive = function () {
			var winTop = $(window).scrollTop();

			var visible = $('[data-scroll-index]').filter(function (ndx, div) {
				return winTop >= $(div).offset().top + settings.topOffset &&
					winTop < $(div).offset().top + (settings.topOffset) + $(div).outerHeight();
			});
			var newActive = visible.first().attr('data-scroll-index');
			updateActive(newActive);
		};

		/*
		 * runs methods
		 */
		$(window).on('scroll', watchActive).scroll();

		$(window).on('keydown', keyNavigation);

		$('.nav').on('click', '[href], [data-scroll-goto]', function (e) {
			e.preventDefault();
			doScroll(e);
		});

	};


	//СДЕЛАТЬ ФОРМУ!!!!!!!!
	$("#form").submit(function (e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "../ajax.php",
			data: $("#form").serialize(),
			success: function (data) {
				alert('okey');
			}
		});
	});