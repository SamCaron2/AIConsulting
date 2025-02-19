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

document.addEventListener("DOMContentLoaded", function () {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbw-NwHAtB_rRmxqXgUN921TavvIVfONjMHzlF4ygOyFlcjDYwRIyvNC1DQCl9O_RZ3S_w/exec'; 
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById("msg");

    form.addEventListener('submit', e => {
        e.preventDefault();

        // Collect multiple selected services
        let selectedServices = [];
        document.querySelectorAll('input[name="services"]:checked').forEach(checkbox => {
            selectedServices.push(checkbox.value);
        });

        // Debugging: Ensure selected services are logged
        console.log("Selected Services:", selectedServices);

        // Ensure FormData is populated correctly
        let formData = new FormData(form);
        formData.set("services", selectedServices.join(", ")); // Convert to comma-separated string

        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => response.text()) // Ensure response is processed as text
            .then(data => {
                console.log("Response from Server:", data);
                if (data.trim() === "Success") {
                    msg.innerHTML = "Message sent successfully!";
                    setTimeout(() => { msg.innerHTML = ""; }, 5000);
                    form.reset();
                } else {
                    msg.innerHTML = "Error: " + data;
                }
            })
            .catch(error => {
                console.error('Error!', error);
                msg.innerHTML = "Submission failed. Please try again.";
            });
    });
});




