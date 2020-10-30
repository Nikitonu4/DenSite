jQuery(window).on("load", function () {
  jQuery("#preloader").delay(1800).fadeOut("slow");
});

$(".menu-toggle").on("click", function () {
  $(this).toggleClass("on");
  $(".menu-section").toggleClass("on");
  $("nav ul").toggleClass("hidden");
  $(".nav ul li").on("click", function () {
    $(this).toggleClass("on");
    $(".menu-section").toggleClass("on");
    $(".menu-toggle").toggleClass("on");
    $("nav ul").toggleClass("hidden");
  });
});

$(window).scroll(function () {
  var window_top = $(window).scrollTop() + 1;
  if (window_top > 300) {
    $("header").addClass("menu_fixed animated fadeInDown");
  } else {
    $("header").removeClass("menu_fixed animated fadeInDown");
  }
});

$(".slider1").owlCarousel({
  loop: true,
  autoplay: true,
  margin: 10,
  nav: true,
  dots: false,
  autoplayTimeout: 10000,
  items: 1,
  navText: [
    '<img src="../images/Left Arrow.svg">',
    '<img src="../images/Right Arrow.svg">',
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
    },
  },
});

$(".slider2").owlCarousel({
  items: 1,
  loop: true,
  margin: 10,
  merge: true,
  lazyLoad: true,
  responsive: {
    678: {
      items: 1,
      mergeFit: true,
    },
    1000: {
      items: 6,
      mergeFit: false,
    },
  },
});

var pluginName = "ScrollIt",
  pluginVersion = "1.0.3";

var defaults = {
  upKey: 38,
  downKey: 40,
  easing: "linear",
  scrollTime: 600,
  activeClass: "active",
  onPageChange: null,
  topOffset: -70,
};

$.scrollIt = function (options) {
  var settings = $.extend(defaults, options),
    active = 0,
    lastIndex = $("[data-scroll-index]:last").attr("data-scroll-index");

  var navigate = function (ndx) {
    if (ndx < 0 || ndx > lastIndex) {
      return;
    }

    var targetTop =
      $("[data-scroll-index=" + ndx + "]").offset().top +
      settings.topOffset +
      1;
    $("html,body").animate(
      {
        scrollTop: targetTop,
        easing: settings.easing,
      },
      settings.scrollTime
    );
  };

  var doScroll = function (e) {
    var target =
      $(e.target).closest("[href]").attr("href") ||
      $(e.target).closest("[data-scroll-goto]").attr("data-scroll-goto");
    navigate(parseInt(target, 10));
  };

  var keyNavigation = function (e) {
    var key = e.which;
    if (
      $("html,body").is(":animated") &&
      (key == settings.upKey || key == settings.downKey)
    ) {
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

  var updateActive = function (ndx) {
    if (settings.onPageChange && ndx && active != ndx) {
      settings.onPageChange(ndx);
    }

    active = ndx;
    $("[href]").removeClass(settings.activeClass);
    $("[href=" + ndx + "]").addClass(settings.activeClass);
  };

  var watchActive = function () {
    var winTop = $(window).scrollTop();

    var visible = $("[data-scroll-index]").filter(function (ndx, div) {
      return (
        winTop >= $(div).offset().top + settings.topOffset &&
        winTop < $(div).offset().top + settings.topOffset + $(div).outerHeight()
      );
    });
    var newActive = visible.first().attr("data-scroll-index");
    updateActive(newActive);
  };

  $(window).on("scroll", watchActive).scroll();

  $(window).on("keydown", keyNavigation);

  $(".nav").on("click", "[href], [data-scroll-goto]", function (e) {
    e.preventDefault();
    doScroll(e);
  });

  $(".md_insurance_wrapper").on(
    "click",
    "[href], [data-scroll-goto]",
    function (e) {
      e.preventDefault();
      doScroll(e);
    }
  );
};

$("#call_form").submit(function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "../ajax.php",
    data: $("#call_form").serialize(),
    success: function (data) {
      $(this).find("input").val("");
      $("#call_form").trigger("reset");
      $(".success_wrapper").show("slow");
      setTimeout(function () {
        $(".success_wrapper").hide("slow");
      }, 3000);
    },
  });
});

$("#form").submit(function () {
  $.ajax({
    type: "POST",
    url: "../ajax.php",
    data: $(this).serialize(),
  }).done(function () {
    $(this).find("input").val("");
    $("#form").trigger("reset");
  });
  return false;
});
