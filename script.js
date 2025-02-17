document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".counter");

    function runCounter(counter) {
        let target = +counter.getAttribute("data-target");
        let count = 0;

        // Adjust speed: Larger numbers go up faster
        let speed = target / (target > 100 ? 15 : 50); // Faster if over 100

        let updateCount = setInterval(() => {
            if (count < target) {
                count += Math.ceil(speed); // Round up to avoid slow crawl
                if (count > target) count = target; // Prevent overshooting
                counter.innerText = count + "%";
            } else {
                clearInterval(updateCount);
                counter.innerText = target + "%"; // Ensure it stops at exact value
            }
        }, 30);
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
                observer.unobserve(entry.target); // Stop after first load
            }
        });
    }, { threshold: 0.6 });

    counters.forEach(counter => observer.observe(counter));
});

