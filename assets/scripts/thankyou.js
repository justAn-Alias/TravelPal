// Trigger confetti when page loads
window.onload = function() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Add class to trigger animations
    document.querySelector('.thank-you-container').classList.add('visible');
}