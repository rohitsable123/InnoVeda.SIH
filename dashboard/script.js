// Initialize AOS animation
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize feather icons
    feather.replace();
    
    // Animate progress ring
    const circle = document.querySelector('.progress-ring__circle');
    if (circle) {
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
    
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;
    
        const offset = circumference - (65 / 100) * circumference;
        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, 300);
    }

    // Initialize Tippy tooltips (if you add Tippy.js plugin!)
    if (typeof tippy !== 'undefined') {
        tippy('[data-tippy-content]', {
            theme: 'light',
            animation: 'scale',
            arrow: true
        });
    }
});
