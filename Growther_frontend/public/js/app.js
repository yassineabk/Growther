/* Theme Name: Dorsin - Responsive Landing page template
   Author: Themesbrand
   Version: 1.0.0
   Created: July 2018
   File Description: Main JS file of the template
*/

function initNavbar() {
    document.querySelectorAll('.navbar-nav a').bind('click', function(event) {
      var $anchor = document(this);
      document.querySelector('html, body').stop().animate({
          scrollTop: (document.querySelector($anchor.attr('href')).offset().top - 92)
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
  });
}

function initSticky() {
    document.querySelector(".sticky").sticky({
        topSpacing: 0
    });
}

function initScrollspy() {
    document.querySelector("#navbarCollapse").scrollspy({
        offset:20
    });
}

function init() {
    initNavbar();
    initSticky();
    initScrollspy();
}

init()