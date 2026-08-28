// Carousel functionality module

// Project carousel state
let currentProjectIndex = 0;

// Function to attach project carousel listeners
function attachProjectCarouselListeners() {
    const prevBtn = document.getElementById('prev-project');
    const nextBtn = document.getElementById('next-project');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            playSound(clickSound, 0.3);
            // Loop back to last project if at first
            if (currentProjectIndex === 0) {
                currentProjectIndex = portfolioData.projects.length - 1;
            } else {
                currentProjectIndex--;
            }
            renderModalContent('projects');
            attachProjectCarouselListeners();
        });
        
        nextBtn.addEventListener('click', () => {
            playSound(clickSound, 0.3);
            // Loop back to first project if at last
            if (currentProjectIndex === portfolioData.projects.length - 1) {
                currentProjectIndex = 0;
            } else {
                currentProjectIndex++;
            }
            renderModalContent('projects');
            attachProjectCarouselListeners();
        });
    }
}
