function toggleMenu() {
    var menu = document.getElementById('menuOverlay');
    menu.classList.toggle('active');

}



document.querySelector("h1").onmouseover = function(event) {
    if (!this.dataset.originalText) {
        this.dataset.originalText = this.innerText; // Save the original text
    }

    let iterations = 0;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let intervalDuration = 30; // Initial interval duration
    const slowdownFactor = 1.15; // Factor by which the interval duration increases

    const shuffle = () => {
        this.innerText = this.innerText.split("")
            .map((letter, index) => {
                if (index < iterations) {
                    return this.dataset.originalText.charAt(index);
                }
                return letters[Math.floor(Math.random() * 26)];
            })
            .join("");

        iterations++;

        if (iterations >= this.dataset.originalText.length) {
            this.innerText = this.dataset.originalText; // Reset to original text
            return;
        }

        // Increase the interval duration for slowdown
        intervalDuration *= slowdownFactor;

        // Set the next timeout
        setTimeout(shuffle, intervalDuration);
    };

    // Start the shuffling process
    setTimeout(shuffle, intervalDuration);
};



