//initSubOurPeople
function initSubOurPeople() {
	const stickyEls = document.querySelectorAll('.sticky-statement');

	stickyEls.forEach(el => {
	  let tl = gsap.timeline({
		scrollTrigger: {
		  trigger: el,
		  start: 'bottom 90%',
		  end: 'bottom center',
		  toggleActions: 'play none reverse none',
		  scrub: 1
		}
	  });
	  tl.to(el, {opacity: 0.5, yPercent: -20})
	})
}

$(document).ready(function() {
	initSubOurPeople(); // initSubOurPeople
})