$(document).ready(function () {

  // unfocus clicked links
  $('a, button, input:submit').on('click', function() {
    $(this).blur();
  });

  // NAV
  // mobile menu
  $('.btn-menu').on('click', function(e) {
    e.stopPropagation();
    $(this).blur();
    $('.nav-main').toggleClass('active');
  });
  $('body').on('click', function() {
    $('.nav-main.active').removeClass('active');
  });

  // HOME
  // home page vertical swiper
  var numHomeSlides = $('.home .section.swiper-slide');
  var homeSwiper = new Swiper ('.home.swiper-container', {
    direction: 'vertical',
    loop: false,
    slidesPerView: 1,
    nextButton: '.btn-down',
    slideClass: 'section',
    keyboardControl: true,
    mousewheelControl: true,
    mousewheelForceToAxis: true,
    onInit: function (swiper) {
      swiper.lockSwipeToPrev();
    },
    onSlideChangeEnd: function (swiper) {
      if (swiper.isBeginning) {
        swiper.lockSwipeToPrev();
        swiper.unlockSwipeToNext();
      } else if (swiper.isEnd) {
        swiper.lockSwipeToNext();
        swiper.unlockSwipeToPrev();
      } else {
        swiper.unlockSwipeToPrev();
        swiper.unlockSwipeToNext();
      }
    },
    onSlideChangeStart: function(swiper) {
      $('.nav-main.active').removeClass('active');
    }
  });

  // home page projects swiper
  var projectsSwiper = new Swiper ('.section-projects.swiper-container', {
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1,
    prevButton: '.btn-prev',
    nextButton: '.btn-next',
    slideClass: 'project',
    pagination: '.pag',
    paginationClickable: true,
    keyboardControl: true,
    mousewheelControl: true,
    mousewheelForceToAxis: true,
    onInit: function (swiper) {
      swiper.lockSwipeToPrev();
    },
    onSlideChangeEnd: function (swiper) {
      if (swiper.isBeginning) {
        swiper.lockSwipeToPrev();
        swiper.unlockSwipeToNext();
      } else if (swiper.isEnd) {
        swiper.lockSwipeToNext();
        swiper.unlockSwipeToPrev();
      } else {
        swiper.unlockSwipeToPrev();
        swiper.unlockSwipeToNext();
      }
    },
    onSlideChangeStart: function(swiper) {
      $('.nav-main.active').removeClass('active');
    }
  });

  // get window dimensions
  var windowWt = $(window).width(),
      windowHt = $(window).height(),
      windowRatio = windowWt / windowHt;

  $(window).on('resize', function () {
    windowWt = $(window).width();
    windowHt = $(window).height();
    windowRatio = windowWt / windowHt;
    // console.log(windowRatio+' '+VideoHome.videoRatio+' '+VideoHome.videoHt+' '+((windowHt - VideoHome.videoHt) / 2));
    if (windowWt > 767) {
      VideoHome.init();
    }
  });

  // set size of homepage video based on aspect ratio
  var VideoHome = {
    init: function() {
      this.videoWt = $('#video-home').width();
      this.videoHt = $('#video-home').height();
      this.videoRatio = this.videoWt / this.videoHt;
      this.setVideo();
    },
    setVideo: function() {
      this.ratio = this.videoRatio - windowRatio;
      if (this.ratio < 0) {
        this.offset = (windowHt - this.videoHt) / 2 + "px";
        $('#video-home').css({
          'width': '100%',
          'height': 'auto',
          'top': this.offset,
          'left': '0'
        });
      } else {
        this.offset = (windowWt - this.videoWt) / 2 + "px";
        $('#video-home').css({
          'width': 'auto',
          'height': '100%',
          'top': '0',
          'left': this.offset
        });
      }
    }
  };
  if (windowWt > 767) {
    VideoHome.init();
  }

  // var vid = document.getElementById('video-home');
  // if (typeof vid !== undefined && null !== vid) {
  //   vid.addEventListener('loadedmetadata', function(e) {
  //     VideoHome.init();
  //   },false);
  // }

  // ABOUT
  // about page quotes swiper
  var quotesSwiper = new Swiper ('.section-quotes .swiper-container', {
    loop: true,
    slidesPerView: 1,
    autoHeight: false,
    effect: 'fade',
    pagination: '.pag',
    paginationClickable: true,
    paginationElement: 'li',
    nextButton: '.btn-next',
    prevButton: '.btn-prev',
    keyboardControl: true
  });

  if ($('.section-quotes .swiper-container').length) {
    quotesSwiper.onResize();
  }

  // PROJECT
  // project video functionality
  var videoPlay = $('#btn-play'),
      videoIndex = 0,
      activeVideo = document.getElementById('video-project') || document.getElementById('video-project-01');
  videoPlay.on('click', function() {
    $(this).hide();
    activeVideo.play();
    activeVideo.onpause = function() {
      videoPlay.show();
    };
  });
  $(document).on('mouseenter', 'video', function() {
    this.setAttribute('controls','controls');
  }).on('mouseleave', 'video', function() {
    this.removeAttribute('controls');
  });

  // project video titles
  var videoTitles = function() {
    $('.btn-video-title.active').removeClass('active');
    var titleSection = $('#section-video-titles'),
        activeTitle = $('.btn-video-title').eq(videoIndex).addClass('active'),
        activeWt = activeTitle.outerWidth(),
        activeLeft = activeTitle.position().left;
    if (windowWt <= 767) {
      titleSection.css({
        'transform': 'translateX(' + (windowWt / 2 - activeLeft - activeWt / 2) + 'px)',
        'text-align': 'left'
      });
    } else {
      titleSection.css({
        'transform': 'translateX(0px)',
        'text-align': 'center'
      });
    }
  };

  $('.btn-video-title').click(function() {
    var $that = $(this);
    var index = $that.index();
    projectVideoSwiper.slideTo(index);
  });

  // project video swiper
  var projectVideoSwiper = new Swiper ('.section-video.swiper-container', {
    direction: 'horizontal',
    autoHeight: true,
    loop: false,
    slidesPerView: 1,
    slideClass: 'video',
    keyboardControl: true,
    mousewheelControl: true,
    mousewheelForceToAxis: true,
    onInit: function (swiper) {
      swiper.lockSwipeToPrev();
      videoTitles();
    },
    onSlideChangeStart: function (swiper) {
      activeVideo.pause();
      videoIndex = swiper.activeIndex;
      activeVideo = document.getElementById('video-project-0' + (videoIndex + 1));
      videoTitles();
    },
    onSlideChangeEnd: function (swiper) {
      if (swiper.isBeginning) {
        swiper.lockSwipeToPrev();
        swiper.unlockSwipeToNext();
      } else if (swiper.isEnd) {
        swiper.lockSwipeToNext();
        swiper.unlockSwipeToPrev();
      } else {
        swiper.unlockSwipeToPrev();
        swiper.unlockSwipeToNext();
      }
    }
  });

  // CONTACT
  // var form = $('#contact-form'),
  //     formMessage = $('.message', form);
  // form.submit(function(e) {
  //   e.preventDefault();
  //   $.ajax({
  //     type: 'POST',
  //     contentType: 'application/x-www-form-urlencoded',
  //     url: 'form/contact.php',
  //     data: form.serialize(),
  //     success: function(response) {
  //       if (response) {
  //         formMessage.removeClass('error').addClass('success')
  //           .text('Thanks for contacting Mindsoil.');
  //       } else {
  //         formMessage.removeClass('success').addClass('error')
  //           .text('Message could not be sent. Please try again.');
  //       }
  //       $('#contact-name, #contact-email, #contact-message').val('');
  //     }
  //   });
  // });

  // FOOTER
  // footer lock to bottom
  var docHt = $('body').height();
  if (docHt < windowHt) {
    $('.footer').addClass('fixed');
  }

});