// Modal functionality module

let currentOpenHotspot = null; // Track which hotspot opened the current modal

const modal = document.getElementById('popup-modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const closeButton = document.getElementById('close-button');

// Function to render modal content based on page name
function renderModalContent(pageName) {
    let title = '';
    let content = '';

    switch(pageName) {
        case 'projects':
            title = 'What I\'ve built';
            const project = portfolioData.projects[currentProjectIndex];
            content = `
                <div class="projects-carousel">
                        <div class="project-item">
                        <div class="project-header">
                            <h4 class="project-title">${project.title}</h4>
                            <a href="${project.github_link}" target="_blank" class="github-icon-link" title="View on GitHub">
                                <img src="assets/icons/github.svg" alt="GitHub" class="github-icon">
                            </a>
                        </div>
                        <p class="project-description">${project.description}</p>
                    </div>
                    <div class="carousel-controls">
                        <button class="carousel-btn prev-btn" id="prev-project" aria-label="Previous project">◀</button>
                        <button class="carousel-btn next-btn" id="next-project" aria-label="Next project">▶</button>
                    </div>
                </div>
            `;
            break;

        case 'experiences':
            title = 'Work I\'ve Done';
            content = `
                <div class="experiences-container">
                    ${portfolioData.experiences.map(exp => `
                        <div class="experience-item">
                            <h4 class="experience-role">${exp.role}</h4>
                            <p class="experience-company">${exp.company} • ${exp.dates}</p>
                            <div class="experience-description">${exp.description.replace(/\n/g, '<br>')}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            break;

        case 'aboutMe':
            title = 'Who I Am';
            content = `
                <div class="about-container">
                    <p class="bio">${portfolioData.aboutMe.bio}</p>
                    
                    <div class="education-section">
                        <h4>Academic History</h4>
                        <div class="timeline">
                            ${portfolioData.aboutMe.education.map((edu, index) => `
                                <div class="timeline-item">
                                    <div class="timeline-marker"></div>
                                    <div class="timeline-content">
                                        <div class="timeline-year">${edu.year}</div>
                                        <div class="timeline-degree">${edu.degree}</div>
                                        <div class="timeline-institution">${edu.institution}</div>
                                        ${edu.score ? `<div class="timeline-score">Score: ${edu.score}</div>` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="skills-section">
                        <h4>What I've Learnt</h4>
                        ${Object.entries(portfolioData.aboutMe.skills).map(([category, skills]) => `
                            <div class="skill-category">
                                <div class="skill-category-title">${category}</div>
                                <div class="skill-icons">
                                    ${skills.map(skill => `
                                        <div class="skill-item">
                                            <img src="assets/icons/${skill.icon}" alt="${skill.name}" class="skill-icon">
                                            <div class="skill-name">${skill.name}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            break;

        case 'contact':
            title = 'Reach out';
            content = `
                <div class="contact-container">
                    <div class="contact-icons-wrapper">
                        <a href="mailto:${portfolioData.contact.email}" class="contact-icon-item" title="Email me">
                            <img src="assets/icons/gmail.svg" alt="Email" class="contact-icon">
                            <div class="contact-label">Email</div>
                        </a>
                        <a href="${portfolioData.contact.linkedin}" target="_blank" class="contact-icon-item" title="Connect on LinkedIn">
                            <img src="assets/icons/linkedin.svg" alt="LinkedIn" class="contact-icon">
                            <div class="contact-label">LinkedIn</div>
                        </a>
                        <a href="${portfolioData.contact.github_profile}" target="_blank" class="contact-icon-item" title="View my GitHub">
                            <img src="assets/icons/refinedgithub.svg" alt="GitHub" class="contact-icon">
                            <div class="contact-label">GitHub</div>
                        </a>
                    </div>
                </div>
            `;
            break;

        case 'cloudGame':
            title = 'Cloud Hopper';
            content = `
                <div class="cloud-game-instructions">
                    Use Arrow Keys or WASD to move! Jump from cloud to cloud going upwards! 🌥️
                </div>
                <div class="cloud-game-container" id="cloud-game-area">
                    <div class="cloud-game-score" id="cloud-score">Clouds Jumped: 0</div>
                </div>
                <button class="cloud-game-restart" id="restart-game">Restart Game</button>
            `;
            break;

        default:
            title = 'Error';
            content = '<p>Content not found.</p>';
    }

    modalTitle.textContent = title;
    modalContent.innerHTML = content;
}

// Function to show modal with animation from hotspot position
function showModal(hotspotElement) {
    // Get the hotspot's position
    const hotspotRect = hotspotElement.getBoundingClientRect();
    const hotspotCenterX = hotspotRect.left + hotspotRect.width / 2;
    const hotspotCenterY = hotspotRect.top + hotspotRect.height / 2;
    
    // Calculate offset from screen center
    const screenCenterX = window.innerWidth / 2;
    const screenCenterY = window.innerHeight / 2;
    const offsetX = hotspotCenterX - screenCenterX;
    const offsetY = hotspotCenterY - screenCenterY;
    
    // Remove visible class first to reset
    modal.classList.remove('modal-visible');
    
    // Show modal
    modal.style.display = 'block';
    
    // Set initial position at hotspot location
    modal.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(0.3)`;
    
    // Force reflow to ensure transform is applied
    modal.offsetHeight;
    
    // Trigger animation after a small delay
    setTimeout(() => {
        modal.classList.add('modal-visible');
    }, 10);
    
    // Set focus to modal for accessibility
    modal.focus();
}

// Function to hide modal with animation
function hideModal() {
    modal.classList.remove('modal-visible');
    // Wait for animation to complete before hiding
    setTimeout(() => {
    modal.style.display = 'none';
        currentOpenHotspot = null; // Reset when modal closes
        
        // Return focus to the hotspot that opened the modal
        if (currentOpenHotspot) {
            const hotspotWrapper = document.getElementById(`hotspot-${currentOpenHotspot}-wrapper`);
            if (hotspotWrapper) {
                hotspotWrapper.focus();
            }
        }
    }, 300);
}

// Function to check if modal is currently open
function isModalOpen() {
    return modal.style.display === 'block';
}

// Close button event listener
closeButton.addEventListener('click', () => {
    playSound(whooshSound, 0.8, 0.2);
    hideModal();
});

// Close modal when clicking outside of it
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        hideModal();
    }
});
