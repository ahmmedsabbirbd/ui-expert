(function ($) {

	/*** BrowserDetect */
	var BrowserDetect = {
	    init: function () {
	        this.browser = this.searchString(this.dataBrowser) || "Other";
	        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
	    },
	    searchString: function (data) {
	        for (var i = 0; i < data.length; i++) {
	            var dataString = data[i].string;
	            this.versionSearchString = data[i].subString;

	            if (dataString.indexOf(data[i].subString) !== -1) {
	                return data[i].identity;
	            }
	        }
	    },
	    searchVersion: function (dataString) {
	        var index = dataString.indexOf(this.versionSearchString);
	        if (index === -1) {
	            return;
	        }

	        var rv = dataString.indexOf("rv:");
	        if (this.versionSearchString === "Trident" && rv !== -1) {
	            return parseFloat(dataString.substring(rv + 3));
	        } else {
	            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
	        }
	    },

	    dataBrowser: [
	        {string: navigator.userAgent, subString: "Edge", identity: "MSEdge"},
	        {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
	        {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
	        {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
	        {string: navigator.userAgent, subString: "Opera", identity: "Opera"},  
	        {string: navigator.userAgent, subString: "OPR", identity: "Opera"},  

	        {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"}, 
	        {string: navigator.userAgent, subString: "Safari", identity: "Safari"}       
	    ]
	};

	BrowserDetect.init();
	document.body.classList.add( BrowserDetect.browser );

	/*** Get OS Selector */
	var os = ['iphone', 'ipad', 'windows', 'mac', 'linux'];
	var match = navigator.appVersion.toLowerCase().match(new RegExp(os.join('|')));
	if (match) {
	    $('body').addClass(match[0]);
	};
	 
	/*** Sticky header */
	$(window).scroll(function(){
		if($("body").scrollTop() > 0 || $("html").scrollTop() > 0) {
			$(".header").addClass("stop");
		} else {
			$(".header").removeClass("stop");
		}
	});

	/*** Sticky header */
	const body = document.body;
	const scrollUp = "scroll-up";
	const scrollDown = "scroll-down";
	let lastScroll = 100;

	window.addEventListener("scroll", () => {
	  	const currentScroll = window.pageYOffset;
	  	if (currentScroll <= 0) 
	  	{
	    	body.classList.remove(scrollUp);
	    	return;
	  	}

	  	if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) 
	  	{
	    	// down
	    	body.classList.remove(scrollUp);
	    	body.classList.add(scrollDown);
	  	} 
	  	else if ( currentScroll < lastScroll && body.classList.contains(scrollDown) ) 
	  	{
	    	// up
	    	body.classList.remove(scrollDown);
	    	body.classList.add(scrollUp);
	  	}

	  	lastScroll = currentScroll;
	});


	/*** Header height = gutter height */
	function setGutterHeight(){
		var header = document.querySelector('.header'),
			  gutter = document.querySelector('.header_gutter');
		if (gutter) {
			gutter.style.height = header.offsetHeight + 'px';
		}
	}
	window.onload = setGutterHeight;
	window.onresize = setGutterHeight;

	/*** Navbar Menu */
    $('.navbar-toggle').sidr({
        name: 'sidr-main',
        side: 'right',
        source: '#sidr',
        displace: false,
        renaming: false,
    });

    $('.navbar-toggle.in').on('click', function(){
        $.sidr('close', 'sidr-main');
    });

    /*** ScrollDown */
	$('.scrollDown').click(function() {
	    var target = $('#primary');
	    var space = $(this).data('space');

	    if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top - space
	        }, 1e3, "easeInOutExpo");
	    }
	});

	/*** Smooth scroll */
    $('.smoothScroll, .smoothScroll a').click(function() {
       	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
           	var target = $(this.hash);
           	target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           	if (target.length) {
               	$('html,body').animate({
                   scrollTop: target.offset().top - 40
               	}, 1e3, "easeInOutExpo");

               return false;
           }
       	}
    });

    /*/// init Isotope ///*/
	var $grid = $('.product-filter').isotope({
		itemSelector: '.item'
	});

	var filters = {};    /// store filter for each group

	$('.product-filter-button').on( 'click', '.button', function( event ) {
		var $button = $( event.currentTarget );
		var $buttonGroup = $button.parents('.filter-items');
		var filterGroup = $buttonGroup.attr('data-filter-group');
		filters[ filterGroup ] = $button.attr('data-filter');
		var filterValue = concatValues( filters );
		$grid.isotope({ filter: filterValue });
	});

	
	$('.filter-items').each( function( i, buttonGroup ) {
		var $buttonGroup = $( buttonGroup );

		$buttonGroup.on( 'click', 'button', function( event ) {
		$buttonGroup.find('.active').removeClass('active');
			var $button = $( event.currentTarget );
			$button.addClass('active');
		});
	}); /// change is-checked class on buttons


	
	function concatValues( obj ) {
		var value = '';
		for ( var prop in obj ) {
		  value += obj[ prop ];
		}
		return value;
	}  // flatten object by concatting values
 

    /*** History Slider */
	var historytime = 5;
	var $historybar,
		$historyslick,
		historyisPause,
		historytick,
		historypercentTime;

	$historyslick = $('.history-slider');

	$historyslick.slick({
	  	speed: 300,
	  	dots: false,
	  	arrows: false,
	  	infinite: true,
	  	initialSlide: 2,
	  	slidesToShow: 4,
	  	centerMode: true,
	  	centerPadding: '190px 0px 0px',
	  	slidesToScroll: 1,
	  	responsive: [
		    {
		      	breakpoint: 1367,
		      	settings: {
		        	slidesToShow: 3,
		        	initialSlide: 1,
		        	slidesToScroll: 1,
		        	centerPadding: '170px 0 0',
		      	}
		    },
		    {
		      	breakpoint: 992,
		      	settings: {
		        	slidesToShow: 2,
		        	initialSlide: 1,
		        	slidesToScroll: 1,
		        	centerPadding: '150px 0 0',
		      	}
		    },
		    {
		      	breakpoint: 992,
		      	settings: {
		        	slidesToShow: 2,
		        	initialSlide: 1,
		        	slidesToScroll: 1,
		        	centerPadding: '120px 0 0',
		      	}
		    },
		    {
		      	breakpoint: 576,
		      	settings: {
		        	slidesToShow: 1,
		        	initialSlide: 0,
		        	slidesToScroll: 1,
		        	centerPadding: '130px 0 0',
		      	}
		    },
		    {
		      	breakpoint: 481,
		      	settings: {
		        	slidesToShow: 1,
		        	initialSlide: 0,
		        	slidesToScroll: 1,
		        	centerPadding: '60px 0 0',
		      	}
		    }
	  	]
	});

	$historybar = $('.history_slider_control .slider-progress .progress');
 
	$historyslick.on({
		mouseenter: function() {
			historyisPause = true;
		},
		mouseleave: function() {
			historyisPause = false;
		}
	})

	function startProgressbar() {
		resetProgressbar();
			historypercentTime = 0;
			historyisPause = false;
			historytick = setInterval(interval, 10);
		}

	function interval() {
		if( historyisPause === false ) 
		{
			historypercentTime += 1 / (historytime+0.1);
			$historybar.css({
				width: historypercentTime+"%"
			});

			if(historypercentTime >= 100)
			{
				$historyslick.slick('slickNext');
				startProgressbar();
			}
		}
	}

	function resetProgressbar() {
		$historybar.css({
			width: 0+'%' 
		});
		clearTimeout(historytick);
	}
	startProgressbar();

   	
	/*** Rellax */
	var rellax = new Rellax('.rellax');
	var _parallax = $(".parallax-mobile"),
		_speed = 0.6;

	window.onscroll = function(){
	    [].slice.call(_parallax).forEach(function(el,i){
	      var rect = el.getBoundingClientRect();
	      var windowYOffset = window.pageYOffset,
	          elBackgrounPos = "0 " + (windowYOffset * _speed) + "px";
	      
	      el.style.top = elBackgrounPos;

	    });
	};

	/** parallax js*/
	var _parallax = $(".parallax"),
      _speed = -0.5;

	window.onscroll = function(){
	    [].slice.call(_parallax).forEach(function(el,i){
	      var rect = el.getBoundingClientRect();
	      var windowYOffset = window.pageYOffset,
	          elBackgrounPos = "0 " + (windowYOffset * _speed) + "px";
	      
	      el.style.backgroundPosition = elBackgrounPos;

	    });
	};

	/*** Number Counter */
	$('.counter').counterUp({
		delay: 10,
		time: 1000
	});

    /*** Image to SVG */
	$('img.svg').each(function(){
	    var $img = $(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');
	
	    $.get(imgURL, function(data) {
	        // Get the SVG tag, ignore the rest
	        var $svg = $(data).find('svg');
	
	        // Add replaced image's ID to the new SVG
	        if(typeof imgID !== 'undefined') {
	            $svg = $svg.attr('id', imgID);
	        }
	        // Add replaced image's classes to the new SVG
	        if(typeof imgClass !== 'undefined') {
	            $svg = $svg.attr('class', imgClass+' replaced-svg');
	        }
	
	        // Remove any invalid XML tags as per http://validator.w3.org
	        $svg = $svg.removeAttr('xmlns:a');
	        
	        // Check if the viewport is set, else we gonna set it if we can.
	        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
	            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
	        }
	
	        // Replace image with new SVG
	        $img.replaceWith($svg);
	
	    }, 'xml');
	
	});
    
}(jQuery));