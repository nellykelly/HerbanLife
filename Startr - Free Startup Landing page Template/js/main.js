// When the DOM is ready, run this function

$(document).ready(function() {

  

  //#HEADER

	var slideHeight = $(window).height();

	$('#headere-top figure .item').css('height',slideHeight);



	$(window).resize(function(){'use strict',

		$('#headere-top figure .item').css('height',slideHeight);

	});

  

  

  

  //Scroll Menu

	$(window).on('scroll', function(){

		if( $(window).scrollTop()>600 ){

			$('.header-top .header-fixed-wrapper').addClass('navbar-fixed-top animated fadeInDown');

			

		} else {

			$('.header-top .header-fixed-wrapper').removeClass('navbar-fixed-top animated fadeInDown');

		}

	});

	

	

	 $(window).scroll(function(){                          

            if ($(this).scrollTop() > 200) {

                $('#menu').fadeIn(500);

            } else {

                $('#menu').fadeOut(500);

            }

        });

	

	// Navigation Scroll

	$(window).scroll(function(event) {

		Scroll();

	});



	$('.navbar-collapse ul li a').on('click', function() {  

		$('html, body').animate({scrollTop: $(this.hash).offset().top - 1}, 1000);

		return false;

	});

	

	// User define function

	function Scroll() {

		var contentTop      =   [];

		var contentBottom   =   [];

		var winTop      =   $(window).scrollTop();

		var rangeTop    =   200;

		var rangeBottom =   500;

		$('.navbar-collapse').find('.scroll a').each(function(){

			contentTop.push( $( $(this).attr('href') ).offset().top);

			contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );

		})

		$.each( contentTop, function(i){

			if ( winTop > contentTop[i] - rangeTop ){

				$('.navbar-collapse li.scroll')

				.removeClass('active')

				.eq(i).addClass('active');			

			}

		})

	};

  

  // affix

  var width = $(window).width();

  var top = $('.tp-banner-container').length == 0 ? -1 : $('.section-one').offset().top - $('.navbar').height() * 2;

  $('.navbar').affix({

    offset: {

      top: top

    , bottom: function () {

        return (this.bottom = $('.footer').outerHeight(true))

      }

    }

  });

  

  var owl = $("#owl-demo");



      owl.owlCarousel({

        

        itemsCustom : [

          [0, 1],

          [450, 1],

          [600, 1],

          [700, 1],

          [1000, 1],

          [1200, 1],

          [1400, 1],

          [1600, 1]

        ],

        navigation : true,

		autoPlay : 3000,



      });

	  

	  

	  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({

          disableOn: 700,

          type: 'iframe',

          mainClass: 'mfp-fade',

          removalDelay: 160,

          preloader: false,



          fixedContentPos: false

        });



});
// New shit
const $window = $(window);
const $body = $('body');

class Slideshow {
	constructor (userOptions = {}) {
    const defaultOptions = {
      $el: $('.slideshow'),
      showArrows: false,
      showPagination: true,
      duration: 10000,
      autoplay: true
    }
    
    let options = Object.assign({}, defaultOptions, userOptions);
    
		this.$el = options.$el;
		this.maxSlide = this.$el.find($('.js-slider-home-slide')).length;
    this.showArrows = this.maxSlide > 1 ? options.showArrows : false;
    this.showPagination = options.showPagination;
		this.currentSlide = 1;
		this.isAnimating = false;
		this.animationDuration = 1200;
		this.autoplaySpeed = options.duration;
		this.interval;
		this.$controls = this.$el.find('.js-slider-home-button');
    this.autoplay = this.maxSlide > 1 ? options.autoplay : false;

		this.$el.on('click', '.js-slider-home-next', (event) => this.nextSlide());
		this.$el.on('click', '.js-slider-home-prev', (event) => this.prevSlide());
    this.$el.on('click', '.js-pagination-item', event => {
      if (!this.isAnimating) {
        this.preventClick();
  this.goToSlide(event.target.dataset.slide);
      }
    });

		this.init();
	}
  
  init() {
    this.goToSlide(1);
    if (this.autoplay) {
      this.startAutoplay();
    }
    
    if (this.showPagination) {
      let paginationNumber = this.maxSlide;
      let pagination = '<div class="pagination"><div class="container">';
      
      for (let i = 0; i < this.maxSlide; i++) {
        let item = `<span class="pagination__item js-pagination-item ${ i === 0 ? 'is-current' : ''}" data-slide=${i + 1}>${i + 1}</span>`;
        pagination  = pagination + item;
      }
      
      pagination = pagination + '</div></div>';
      
      this.$el.append(pagination);
    }
  }
  
  preventClick() {
		this.isAnimating = true;
		this.$controls.prop('disabled', true);
		clearInterval(this.interval);

		setTimeout(() => {
			this.isAnimating = false;
			this.$controls.prop('disabled', false);
      if (this.autoplay) {
			  this.startAutoplay();
      }
		}, this.animationDuration);
	}

	goToSlide(index) {    
    this.currentSlide = parseInt(index);
    
    if (this.currentSlide > this.maxSlide) {
      this.currentSlide = 1;
    }
    
    if (this.currentSlide === 0) {
      this.currentSlide = this.maxSlide;
    }
    
    const newCurrent = this.$el.find('.js-slider-home-slide[data-slide="'+ this.currentSlide +'"]');
    const newPrev = this.currentSlide === 1 ? this.$el.find('.js-slider-home-slide').last() : newCurrent.prev('.js-slider-home-slide');
    const newNext = this.currentSlide === this.maxSlide ? this.$el.find('.js-slider-home-slide').first() : newCurrent.next('.js-slider-home-slide');
    
    this.$el.find('.js-slider-home-slide').removeClass('is-prev is-next is-current');
    this.$el.find('.js-pagination-item').removeClass('is-current');
    
		if (this.maxSlide > 1) {
      newPrev.addClass('is-prev');
      newNext.addClass('is-next');
    }
    
    newCurrent.addClass('is-current');
    this.$el.find('.js-pagination-item[data-slide="'+this.currentSlide+'"]').addClass('is-current');
  }
  
  nextSlide() {
    this.preventClick();
    this.goToSlide(this.currentSlide + 1);
	}
   
	prevSlide() {
    this.preventClick();
    this.goToSlide(this.currentSlide - 1);
	}

	startAutoplay() {
		this.interval = setInterval(() => {
			if (!this.isAnimating) {
				this.nextSlide();
			}
		}, this.autoplaySpeed);
	}

	destroy() {
		this.$el.off();
	}
}

(function() {
	let loaded = false;
	let maxLoad = 3000;  
  
	function load() {
		const options = {
      showPagination: true
    };

    let slideShow = new Slideshow(options);
	}
  
	function addLoadClass() {
		$body.addClass('is-loaded');

		setTimeout(function() {
			$body.addClass('is-animated');
		}, 600);
	}
  
	$window.on('load', function() {
		if(!loaded) {
			loaded = true;
			load();
		}
	});
  
	setTimeout(function() {
		if(!loaded) {
			loaded = true;
			load();
		}
	}, maxLoad);

	addLoadClass();
})();
