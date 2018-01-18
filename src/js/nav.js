var nav = document.querySelector('.nav');
var navOpen = document.querySelector('.nav-close');

openCloseNav = function() {
	if (navOpen.classList.value.indexOf('nav-open') > 0) {
		navOpen.classList.remove('nav-open');
		navOpen.parentNode.style.overflowY = '';
		navOpen.children[0].classList.remove('nav-list-visible');
	} else {
		navOpen.classList.add('nav-open')
		navOpen.parentNode.style.overflowY = 'hidden';
		setTimeout(function() {navOpen.children[0].classList.add('nav-list-visible');}, 1000)
	}
};

startFunc = function() {
	nav.addEventListener('click', openCloseNav);
};



module.exports = startFunc;