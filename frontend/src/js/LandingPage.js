//Close navbar when clicking to a link in hamburger mode
document.addEventListener('DOMContentLoaded', function () {
    var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    var navbarToggler = document.querySelector('.navbar-toggler');
    var navbarCollapse = document.querySelector('.offcanvas');

    navLinks.forEach(function (navLink) {
        navLink.addEventListener('click', function () {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                var bsOffcanvas = bootstrap.Offcanvas.getInstance(navbarCollapse);
                bsOffcanvas.hide();
            }
        });
    });
});