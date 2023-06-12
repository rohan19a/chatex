document.addEventListener("DOMContentLoaded", function () {
  const loadingText = document.getElementById("loading-text");

  // Animate the loading text
  anime({
    targets: loadingText,
    opacity: [0, 1],
    translateY: [-10, 0],
    duration: 1000,
    easing: "easeOutExpo",
    complete: function () {
      // Wait for 2 seconds
      setTimeout(function () {
        // After the timeout, redirect to the main app window
        window.location.href = "index.html";
      }, 5000);
    },
  });
});
