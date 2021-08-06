
//////////////////////////////////////
//       Parallax Background        //
//////////////////////////////////////

$(document).ready(function() {
	// Load the page on refresh at the correct location.
	parallaxScroll();

	// Now build a scroll event handler.
	$(window).bind('scroll',function(e){
		parallaxScroll();
	});
});

// Scroll the background layers 
function parallaxScroll(){
	const scrolled = $(window).scrollTop();

	// Change these to adjust how fast items scroll.
	let baseScrollSpeed = 0.04;
	let scrollSpeedIncrement = 0.007;

	// Make things scroll weird!
	$('.parallax-bg').each(function() {
		$(this).css('transform', 'translateY(-' + (0 + (scrolled * baseScrollSpeed)) + 'vh)');
		baseScrollSpeed += scrollSpeedIncrement;
	});

	// Need to work these in better somehow...
	//$('#parallax-bg-cover').css('transform', 'translateY(' + (-(scrolled*.1)) + 'vh)');
	//$('#parallax-bg-cover').css('height',(100+(scrolled*.1))+'%');

	// Show the scroll indicator...
	$('.scroll-fade').css('opacity', 1 - scrolled / 250);
}

//////////////////////////////////////
//           Contact Form           //
//////////////////////////////////////

$(document).ready(function() {

	// Prepare our success message
	function successMessage() {
		const $messageHTML = `
			<div class="success-message">
				<span>Thanks for contacting me! I'll get back to you as soon as possible.</span>
			</div>
		`;
		$('#contactForm').replaceWith( $messageHTML );
	}

	// Hide the honeypot field
	$('#theField').hide();

	// Submit the form
	$('#contactForm').on('submit', function (e) {
		// Prevent redirect
		e.preventDefault();

		// Send the data
		$.ajax({
			type: 'POST',
			url: 'mailer.php',
			data: $('#contactForm').serialize(),
			success: successMessage()
		});
	});
});

//////////////////////////////////////
//           Scroll Button          //
//////////////////////////////////////

$(document).ready(function() {
	$('button.scroll-arrow').on('click', function(e){
		$('html, body').animate({
			scrollTop: $('section:nth-of-type(2)').offset().top
		}, 1000);
	});
});

//////////////////////////////////////
//             Sidenav              //
//////////////////////////////////////

// Method to check what's visible
$.fn.isInViewport = function() {
	let elementTop = $(this).offset().top;
	let elementBottom = elementTop + $(this).outerHeight();

	let viewportTop = $(window).scrollTop();
	let viewportBottom = viewportTop + $(window).height();

	return elementBottom > viewportTop && elementTop < viewportBottom;
};

// Function to build dot nav
function buildNav() {
	let navigation = '<ul class="side-nav">';
	
	$('section').each(function() {
		let sectionName = $(this).find('h2').text();
		let sectionId = $(this).attr('id');

		if( sectionName ) {
			navigation += '<li class="' + sectionId + '"><a href="#' + sectionId + '" title="' + sectionName + '"><span class="label">' + sectionName + '</span><div class="dot"></div></a></li>';
		}
	});

	navigation += '</ul>';

	$('body').prepend(navigation);
}

// Trigger build function
$(document).ready(function() {
	buildNav();
});

// Show nav!
$(window).on('scroll', function() {
	if( $(window).scrollTop() >= ($(window).height() * .75) ) {
		$('.side-nav').addClass('visible');
	} else {
		$('.side-nav').removeClass('visible');
	}
});

// Move dots!
$(window).on('resize scroll', function() {
	$('h2').each(function() {

		let thisSection = $(this).parents('section').attr('id');
		let $thisSectionNav = $('.side-nav .' + thisSection);
		
		if( $(this).isInViewport() ) {
			$(thisSection).addClass('active');
			$thisSectionNav.addClass('active');
		} else {
			$(thisSection).removeClass('active');
			$thisSectionNav.removeClass('active');
		}
	});
});


//////////////////////////////////////
//       Smooth Anchor Scroll       //
//////////////////////////////////////
// Taken from https://css-tricks.com/snippets/jquery/smooth-scrolling/
$(document).ready(function() {
	// Select all links with hashes
	$('a[href*="#"]')
		// Remove links that don't actually link to anything
		.not('[href="#"]')
		.not('[href="#0"]')
		.click(function(event) {
			// On-page links
			if (
				location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
				&& 
				location.hostname == this.hostname
			) {
				// Figure out element to scroll to
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				// Does a scroll target exist?
				if (target.length) {
				// Only prevent default if animation is actually gonna happen
				event.preventDefault();
				$('html, body').animate({
				  scrollTop: target.offset().top
				}, 1000, function() {
				  // Callback after animation
				  // Must change focus!
				  var $target = $(target);
				  $target.focus();
				  if ($target.is(":focus")) { // Checking if the target was focused
					return false;
				  } else {
					$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
					$target.focus(); // Set focus again
				  };
				});
			  }
			}
		});
});	
/////////////////////////
//    Make it snow!    //
/////////////////////////

// function makeItSnow(){

// 	// Create snow div
// 	$('body').append('<div class="snow"></div>').addClass('snowy');

// 	// Create random numbers!
// 	function getRandomArbitrary(min, max) {
// 	  return Math.random() * (max - min) + min;
// 	}

// 	for (var i = 0; i <= 300; i++) {
// 		// Name the flakes
// 		const thisFlake = '.flake-' + i;

// 		// Create snowflake
// 		$('.snow').prepend('<i class="fa fa-snowflake-o flake flake-' + i + '" aria-hidden="true"></i>');

// 		// Set random animation time
// 		$(thisFlake).css('--animation-time', getRandomArbitrary(3, 80) +'s');

// 		// Set random font size
// 		$(thisFlake).css('font-size', getRandomArbitrary(5, 18));

// 		// Add some random blur
// 		$(thisFlake).css('filter', 'blur(' + getRandomArbitrary(0, 3) +'px)');

// 		// Make snow fall only downward
// 		let flakeEntry = getRandomArbitrary(-10, 120);
// 		let flakeOutry = flakeEntry + getRandomArbitrary(10, 100);

// 		// Define animation steps
// 		let fallStart = {
// 			'transform': 'translate3d(' + getRandomArbitrary(-10, 110) + 'vw, ' + flakeEntry + 'vh, 100px) rotateZ(0) scale(1)',
// 			'opacity': '0'
// 		};
// 		let fallMid = {
// 			'opacity': '1'
// 		}
// 		let fallStop = {
// 			'transform': 'translate3d(' + getRandomArbitrary(-10, 110) + 'vw, ' + flakeOutry + 'vw, 100px) rotateZ(359deg) scale(1.75)',
// 			'opacity': '0'
// 		};


// 		// Define keyframes
// 		$.keyframe.define([{
// 			name: 'fall-' + i,
// 			'0%':   fallStart,
// 			'50%':  fallMid,
// 			'100%': fallStop
// 		}]);

// 		// Set animation 
// 		$(thisFlake).css('animation', 'spin-and-fade var(--animation-time) ease-in-out infinite, fall-' + i + ' var(--animation-time) ease-in-out infinite');

// 	}

// 	// Start transforms
// 	$(this).addClass('clicked');

// 	// Remove the button entirely after one second
// 	setTimeout( () => { $(this).hide() }, 1000 );
// }

// $('button.make-snow').on('click', makeItSnow);
