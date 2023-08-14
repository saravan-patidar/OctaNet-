const Navbar = document.querySelector('.nav-bar');
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 12) {
        Navbar.classList.add('scrolled-navbar');
    } else {
        Navbar.classList.remove('scrolled-navbar');
    }
});




