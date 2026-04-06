let x = document.getElementById("hamburger");

function hamburger_click() {
    let y = document.getElementsByClassName("nav-list")[0];
    if (y.style.display === "none" || y.style.display === "") {
        y.style.display = "flex";
    }
    else {
        y.style.display = "none";
    }
}
x.addEventListener("click", hamburger_click);

/* --- Carousel Implementation --- */
$(document).ready(function(){
    const $slider = $('.all-services');
    const $counter = $('#slide-counter');

    // Logic to update the "Showing X of Y" counter
    function updateCounter(currentSlide, totalSlides) {
        $counter.text(`Showing ${currentSlide + 1} of ${totalSlides}`);
    }

    // Initialize the counter when the slider finishes loading
    $slider.on('init', function(event, slick){
        updateCounter(slick.currentSlide, slick.slideCount);
    });

    // Main Carousel Configuration
    $slider.slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        prevArrow: $('#prev-btn'),
        nextArrow: $('#next-btn'),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // Update the counter every time the slide changes
    $slider.on('afterChange', function(event, slick, currentSlide){
        updateCounter(currentSlide, slick.slideCount);
    });

    /* 
       AI-Enhanced Feature: 
       Explicitly ensuring the carousel pauses on hover 
       to provide a seamless user experience.
    */
    $('.service-card').on('mouseenter', function() {
        $slider.slick('slickPause');
    }).on('mouseleave', function() {
        $slider.slick('slickPlay');
    });
});