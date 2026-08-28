// Main script file - Core portfolio functionality
// Note: portfolioData is defined in utils.js

// Get DOM elements (modal-related elements are in modal.js)
const introScreen = document.getElementById('intro-screen');
const introAvatar = document.getElementById('intro-avatar');
const gameContainer = document.getElementById('game-container');
const mainPageAvatar = document.getElementById('avatar');
const dialogueBox = document.getElementById('dialogue-box');
const dialogueText = document.getElementById('dialogue-text');
const computerHotspot = document.getElementById('hotspot-computer');
const phoneHotspot = document.getElementById('hotspot-phone');
const bookshelfHotspot = document.getElementById('hotspot-bookshelf');
const bulletinHotspot = document.getElementById('hotspot-bulletin');
const cloudsHotspot = document.getElementById('hotspot-clouds');

// Initial state - hide main content
gameContainer.classList.add('hidden');

// Set intro avatar source
introAvatar.src = 'assets/pics/avatar.png';

// Intro screen click listener - clicking anywhere takes you to portfolio
introScreen.addEventListener('click', () => {
    playSound(clickSound, 0.3);
    startBackgroundMusic(); // Start music when entering portfolio
    startPortfolioTransition();
});

// Function to handle portfolio transition
function startPortfolioTransition() {
    // Hide the main page avatar initially
    mainPageAvatar.style.opacity = '0';
    
    // Get current positions before any changes
    const currentRect = introAvatar.getBoundingClientRect();
    const currentTop = currentRect.top;
    const currentLeft = currentRect.left;
    
    // Create a clone of the avatar for the morph animation
    const morphAvatar = introAvatar.cloneNode(true);
    morphAvatar.style.position = 'fixed';
    morphAvatar.style.top = `${currentTop}px`;
    morphAvatar.style.left = `${currentLeft}px`;
    morphAvatar.style.zIndex = '1001';
    morphAvatar.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
    morphAvatar.style.pointerEvents = 'none';
    
    // Hide the original avatar
    introAvatar.style.opacity = '0';
    
    // Add the morph avatar to the body
    document.body.appendChild(morphAvatar);
    
    // Reveal game container
    gameContainer.classList.remove('hidden');
    
    // Wait for the game container to be visible, then get target positions
    setTimeout(() => {
        // Get target avatar position relative to viewport
        const targetRect = mainPageAvatar.getBoundingClientRect();
        const targetTop = targetRect.top;
        const targetLeft = targetRect.left;
        const targetWidth = targetRect.width;
        const targetHeight = targetRect.height;

        // Start the morph animation
        requestAnimationFrame(() => {
            morphAvatar.style.top = `${targetTop}px`;
            morphAvatar.style.left = `${targetLeft}px`;
            morphAvatar.style.width = `${targetWidth}px`;
            morphAvatar.style.height = `${targetHeight}px`;
        });

        // Start intro screen fade (slightly delayed)
        setTimeout(() => {
            introScreen.style.opacity = '0';
        }, 200);

        // Clean up and show main avatar
        setTimeout(() => {
            introScreen.style.display = 'none';
            mainPageAvatar.style.opacity = '1';
            mainPageAvatar.style.transition = 'opacity 0.3s ease';
            
            // Remove the morph avatar
            document.body.removeChild(morphAvatar);
            
            // Show welcome dialogue after a short delay
            setTimeout(() => {
                dialogueText.textContent = "Click around! Everything's interactive.";
                dialogueBox.style.display = 'block';
            }, 500);
        }, 1400);
    }, 50);
}

// Project carousel state is defined in carousel.js

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
                        <button class="carousel-btn prev-btn" id="prev-project">◀</button>
                        <button class="carousel-btn next-btn" id="next-project">▶</button>
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
                    Use Arrow Keys or WASD to move! Bounce from platform to platform and climb as high as you can.
                </div>
                <div class="cloud-game-container" id="cloud-game-area">
                    <canvas id="cloud-game-canvas" class="cloud-game-canvas" width="360" height="480" aria-label="Cloud Hopper game canvas"></canvas>
                    <div class="cloud-game-score" id="cloud-score">Platforms Climbed: 0</div>
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
}

// Function to hide modal with animation
function hideModal() {
    modal.classList.remove('modal-visible');
    // Wait for animation to complete before hiding
    setTimeout(() => {
    modal.style.display = 'none';
        if (currentOpenHotspot === 'clouds') {
            stopCloudGame();
        }
        currentOpenHotspot = null; // Reset when modal closes
    }, 300);
}

// Function to check if modal is currently open
function isModalOpen() {
    return modal.style.display === 'block';
}

// Add hover sound effects to hotspots with cooldown and avatar reaction
const hotspots = [computerHotspot, phoneHotspot, bookshelfHotspot, bulletinHotspot, cloudsHotspot];
hotspots.forEach(hotspot => {
    hotspot.addEventListener('mouseenter', () => {
        const now = Date.now();
        if (now - lastHoverSoundTime > hoverSoundCooldown) {
            playSound(clickSound, 0.3); // Lower volume for hover
            lastHoverSoundTime = now;
        }
        // Switch to yay avatar
        mainPageAvatar.src = 'assets/pics/avatar-yay.png';
    });
    
    hotspot.addEventListener('mouseleave', () => {
        // Switch back to normal avatar
        mainPageAvatar.src = 'assets/pics/avatar.png';
    });
});

// Add hover sound to resume button and avatar
const resumeButton = document.getElementById('resume-button');
const hoverElements = [resumeButton, mainPageAvatar];
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        const now = Date.now();
        if (now - lastHoverSoundTime > hoverSoundCooldown) {
            playSound(clickSound, 0.3);
            lastHoverSoundTime = now;
        }
    });
});

// Add click event listeners to hotspots with toggle functionality
computerHotspot.addEventListener('click', () => {
    if (isModalOpen() && currentOpenHotspot === 'computer') {
        playSound(whooshSound, 0.8, 0.2);
        hideModal();
        currentProjectIndex = 0; // Reset project index
    } else {
        playSound(whooshSound, 0.8, 0.2);
        // If switching from another hotspot, instantly reset
        if (isModalOpen()) {
            modal.classList.remove('modal-visible');
            modal.style.display = 'none';
            currentOpenHotspot = null;
        }
        currentProjectIndex = 0; // Reset to first project
    renderModalContent('projects');
        setTimeout(() => {
            showModal(computerHotspot);
            currentOpenHotspot = 'computer';
            attachProjectCarouselListeners();
        }, 10);
    }
});

phoneHotspot.addEventListener('click', () => {
    if (isModalOpen() && currentOpenHotspot === 'phone') {
        playSound(whooshSound, 0.8, 0.2);
        hideModal();
    } else {
        playSound(whooshSound, 0.8, 0.2);
        // If switching from another hotspot, instantly reset
        if (isModalOpen()) {
            modal.classList.remove('modal-visible');
            modal.style.display = 'none';
            currentOpenHotspot = null;
        }
    renderModalContent('contact');
        setTimeout(() => {
            showModal(phoneHotspot);
            currentOpenHotspot = 'phone';
        }, 10);
    }
});

bookshelfHotspot.addEventListener('click', () => {
    if (isModalOpen() && currentOpenHotspot === 'bookshelf') {
        playSound(whooshSound, 0.8, 0.2);
        hideModal();
    } else {
        playSound(whooshSound, 0.8, 0.2);
        // If switching from another hotspot, instantly reset
        if (isModalOpen()) {
            modal.classList.remove('modal-visible');
            modal.style.display = 'none';
            currentOpenHotspot = null;
        }
    renderModalContent('aboutMe');
        setTimeout(() => {
            showModal(bookshelfHotspot);
            currentOpenHotspot = 'bookshelf';
        }, 10);
    }
});

bulletinHotspot.addEventListener('click', () => {
    if (isModalOpen() && currentOpenHotspot === 'bulletin') {
        playSound(whooshSound, 0.8, 0.2);
        hideModal();
    } else {
        playSound(whooshSound, 0.8, 0.2);
        // If switching from another hotspot, instantly reset
        if (isModalOpen()) {
            modal.classList.remove('modal-visible');
            modal.style.display = 'none';
            currentOpenHotspot = null;
        }
    renderModalContent('experiences');
        setTimeout(() => {
            showModal(bulletinHotspot);
            currentOpenHotspot = 'bulletin';
        }, 10);
    }
});

cloudsHotspot.addEventListener('click', () => {
    if (isModalOpen() && currentOpenHotspot === 'clouds') {
        playSound(whooshSound, 0.8, 0.2);
        hideModal();
        stopCloudGame();
    } else {
        playSound(whooshSound, 0.8, 0.2);
        // If switching from another hotspot, instantly reset
        if (isModalOpen()) {
            modal.classList.remove('modal-visible');
            modal.style.display = 'none';
            currentOpenHotspot = null;
            stopCloudGame();
        }
        renderModalContent('cloudGame');
        setTimeout(() => {
            showModal(cloudsHotspot);
            currentOpenHotspot = 'clouds';
            initCloudGame();
        }, 10);
    }
});

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

// Close button event listener
closeButton.addEventListener('click', () => {
    playSound(whooshSound, 0.8, 0.2);
    hideModal();
});

// Escape key event listener
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        hideModal();
    }
});

// Close modal when clicking outside of it
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        hideModal();
    }
});

// Random dialogue system
const dialogues = {
    anytime: [
        "Feel free to snoop around :)",
        "That computer over there? Full of projects.",
        "Psst... the bookshelf has all the good stuff."
    ],
    nighttime: [
        "Late night coding? Me too!"
    ]
};

let lastDialogue = "";

function getRandomDialogue() {
    const hour = new Date().getHours();
    const isNighttime = hour >= 20 || hour < 6; // 8 PM to 6 AM
    
    // Combine available dialogues
    let availableDialogues = [...dialogues.anytime];
    if (isNighttime) {
        availableDialogues = availableDialogues.concat(dialogues.nighttime);
    }
    
    // Filter out the last shown dialogue to avoid immediate repeats
    if (lastDialogue) {
        availableDialogues = availableDialogues.filter(d => d !== lastDialogue);
    }
    
    // Pick random dialogue
    const randomDialogue = availableDialogues[Math.floor(Math.random() * availableDialogues.length)];
    lastDialogue = randomDialogue;
    
    return randomDialogue;
}

// Avatar click event listener for dialogue box
mainPageAvatar.addEventListener('click', () => {
    playSound(clickSound, 0.3);
    if (dialogueBox.style.display === 'none' || dialogueBox.style.display === '') {
        dialogueText.textContent = getRandomDialogue();
        dialogueBox.style.display = 'block';
    } else {
        dialogueBox.style.display = 'none';
    }
});

// Hide dialogue box when clicking elsewhere
document.addEventListener('click', (event) => {
    if (dialogueBox.style.display === 'block' && 
        !mainPageAvatar.contains(event.target) && 
        !dialogueBox.contains(event.target)) {
        dialogueBox.style.display = 'none';
    }
});

// ===== CLOUD HOPPER GAME LOGIC =====

const cloudGameState = {
    running: false,
    score: 0,
    requestId: null,
    lastFrameTime: 0,
    canvas: null,
    context: null,
    scoreDisplay: null,
    restartButton: null,
    platforms: [],
    jumpedPlatforms: new Set(),
    keys: {},
    cameraY: 0,
    nextPlatformY: 0,
    highestPlatformY: 0,
    lastPlatformX: 0,
    minPlatformSpace: 15,
    maxPlatformSpace: 20,
    player: {
        x: 0,
        y: 0,
        dx: 0,
        dy: 0,
        width: 28,
        height: 36
    },
    gravity: 0.33,
    drag: 0.3,
    bounceVelocity: -12.5,
    platformWidth: 65,
    platformHeight: 18,
    platformStart: 0,
    boundKeyDown: null,
    boundKeyUp: null
};

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function initCloudGame() {
    stopCloudGame();

    const gameArea = document.getElementById('cloud-game-area');
    const canvas = document.getElementById('cloud-game-canvas');
    const scoreDisplay = document.getElementById('cloud-score');
    const restartBtn = document.getElementById('restart-game');

    if (!gameArea || !canvas || !scoreDisplay) {
        return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
        return;
    }

    cloudGameState.running = true;
    cloudGameState.canvas = canvas;
    cloudGameState.context = context;
    cloudGameState.scoreDisplay = scoreDisplay;
    cloudGameState.restartButton = restartBtn;
    cloudGameState.score = 0;
    cloudGameState.platforms = [];
    cloudGameState.jumpedPlatforms = new Set();
    cloudGameState.keys = {};
    cloudGameState.cameraY = 0;
    cloudGameState.nextPlatformY = 0;
    cloudGameState.highestPlatformY = 0;
    cloudGameState.lastPlatformX = 0;
    cloudGameState.minPlatformSpace = 15;
    cloudGameState.maxPlatformSpace = 20;
    cloudGameState.lastFrameTime = performance.now();

    resizeCloudGameCanvas();
    seedCloudGameWorld();
    bindCloudGameControls();

    if (restartBtn) {
        restartBtn.onclick = () => {
            playSound(clickSound, 0.3);
            initCloudGame();
        };
    }

    scoreDisplay.classList.remove('cloud-game-over');
    updateCloudGameScore();
    drawCloudGame();
    cloudGameState.requestId = requestAnimationFrame(gameLoop);
}

function stopCloudGame() {
    cloudGameState.running = false;

    if (cloudGameState.requestId) {
        cancelAnimationFrame(cloudGameState.requestId);
        cloudGameState.requestId = null;
    }

    if (cloudGameState.boundKeyDown) {
        document.removeEventListener('keydown', cloudGameState.boundKeyDown);
        cloudGameState.boundKeyDown = null;
    }

    if (cloudGameState.boundKeyUp) {
        document.removeEventListener('keyup', cloudGameState.boundKeyUp);
        cloudGameState.boundKeyUp = null;
    }

    if (cloudGameState.restartButton) {
        cloudGameState.restartButton.onclick = null;
    }

    cloudGameState.canvas = null;
    cloudGameState.context = null;
    cloudGameState.scoreDisplay = null;
    cloudGameState.restartButton = null;
}

function resizeCloudGameCanvas() {
    if (!cloudGameState.canvas) return;

    const rect = cloudGameState.canvas.getBoundingClientRect();
    const width = Math.max(320, Math.floor(rect.width || 360));
    const height = Math.max(420, Math.floor(rect.height || 480));

    cloudGameState.canvas.width = width;
    cloudGameState.canvas.height = height;
    cloudGameState.platformStart = height - 50;
}

function seedCloudGameWorld() {
    const width = cloudGameState.canvas.width;
    const height = cloudGameState.canvas.height;
    const startPlatform = {
        id: Math.random().toString(36).slice(2, 11),
        x: width / 2 - cloudGameState.platformWidth / 2,
        y: cloudGameState.platformStart,
        width: cloudGameState.platformWidth,
        height: cloudGameState.platformHeight
    };

    cloudGameState.platforms.push(startPlatform);
    cloudGameState.jumpedPlatforms.add(startPlatform.id);

    let y = startPlatform.y;
    while (y > -height) {
        y -= cloudGameState.platformHeight + random(cloudGameState.minPlatformSpace, cloudGameState.maxPlatformSpace);

        let x;
        do {
            x = random(25, width - 25 - cloudGameState.platformWidth);
        } while (
            y > height / 2 &&
            x > width / 2 - cloudGameState.platformWidth * 1.5 &&
            x < width / 2 + cloudGameState.platformWidth * 0.5
        );

        cloudGameState.platforms.push({
            id: Math.random().toString(36).slice(2, 11),
            x,
            y,
            width: cloudGameState.platformWidth,
            height: cloudGameState.platformHeight
        });
    }

    cloudGameState.highestPlatformY = cloudGameState.platforms.reduce((lowest, platform) => Math.min(lowest, platform.y), startPlatform.y);
    cloudGameState.nextPlatformY = cloudGameState.highestPlatformY - cloudGameState.platformHeight - random(cloudGameState.minPlatformSpace, cloudGameState.maxPlatformSpace);
    cloudGameState.lastPlatformX = startPlatform.x;

    cloudGameState.player.x = startPlatform.x + cloudGameState.platformWidth / 2 - cloudGameState.player.width / 2;
    cloudGameState.player.y = startPlatform.y - cloudGameState.player.height;
    cloudGameState.player.dx = 0;
    cloudGameState.player.dy = cloudGameState.bounceVelocity;
    cloudGameState.cameraY = Math.max(0, cloudGameState.player.y - height / 2);
}

function bindCloudGameControls() {
    cloudGameState.boundKeyDown = handleCloudGameKeyDown;
    cloudGameState.boundKeyUp = handleCloudGameKeyUp;
    document.addEventListener('keydown', cloudGameState.boundKeyDown);
    document.addEventListener('keyup', cloudGameState.boundKeyUp);
}

function handleCloudGameKeyDown(event) {
    if (!cloudGameState.running) return;

    const key = event.key.toLowerCase();
    cloudGameState.keys[key] = true;

    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' ', 'space'].includes(key)) {
        event.preventDefault();
    }
}

function handleCloudGameKeyUp(event) {
    cloudGameState.keys[event.key.toLowerCase()] = false;
}

function gameLoop(timestamp) {
    if (!cloudGameState.running) return;

    const rawDelta = timestamp - cloudGameState.lastFrameTime;
    const delta = Math.min(2, Math.max(0.5, rawDelta / 16.67));
    cloudGameState.lastFrameTime = timestamp;

    const canvas = cloudGameState.canvas;
    if (!canvas) return;

    const previousY = cloudGameState.player.y;

    const leftPressed = cloudGameState.keys.arrowleft || cloudGameState.keys.a;
    const rightPressed = cloudGameState.keys.arrowright || cloudGameState.keys.d;

    if (leftPressed && !rightPressed) {
        cloudGameState.player.dx = -3.5;
    } else if (rightPressed && !leftPressed) {
        cloudGameState.player.dx = 3.5;
    } else {
        cloudGameState.player.dx *= 1 - cloudGameState.drag * 0.12 * delta;
        if (Math.abs(cloudGameState.player.dx) < 0.01) {
            cloudGameState.player.dx = 0;
        }
    }

    cloudGameState.player.dy += cloudGameState.gravity * delta;
    cloudGameState.player.x += cloudGameState.player.dx * delta;
    cloudGameState.player.y += cloudGameState.player.dy * delta;

    if (cloudGameState.player.x < -cloudGameState.player.width) {
        cloudGameState.player.x = canvas.width;
    } else if (cloudGameState.player.x > canvas.width) {
        cloudGameState.player.x = -cloudGameState.player.width;
    }

    const targetCameraY = cloudGameState.player.y - canvas.height / 2;
    if (targetCameraY < cloudGameState.cameraY) {
        cloudGameState.cameraY += (targetCameraY - cloudGameState.cameraY) * Math.min(1, 0.25 * delta);
    }

    resolveCloudGameCollisions(previousY);
    spawnCloudGamePlatformsIfNeeded();
    trimCloudGamePlatforms();
    drawCloudGame();

    if (cloudGameState.player.y - cloudGameState.cameraY > canvas.height + 60) {
        endCloudGame();
        return;
    }

    cloudGameState.requestId = requestAnimationFrame(gameLoop);
}

function resolveCloudGameCollisions(previousY) {
    if (cloudGameState.player.dy <= 0) return;

    const player = cloudGameState.player;
    const previousBottom = previousY + player.height;
    const currentBottom = player.y + player.height;
    const playerLeft = player.x + 4;
    const playerRight = player.x + player.width - 4;

    let landingPlatform = null;
    let landingTop = Number.POSITIVE_INFINITY;

    for (const platform of cloudGameState.platforms) {
        const crossesTop = previousBottom <= platform.y && currentBottom >= platform.y;
        const horizontalOverlap = playerRight >= platform.x && playerLeft <= platform.x + platform.width;

        if (crossesTop && horizontalOverlap && platform.y < landingTop) {
            landingTop = platform.y;
            landingPlatform = platform;
        }
    }

    if (!landingPlatform) return;

    player.y = landingPlatform.y - player.height;
    player.dy = cloudGameState.bounceVelocity;

    if (!cloudGameState.jumpedPlatforms.has(landingPlatform.id)) {
        cloudGameState.jumpedPlatforms.add(landingPlatform.id);
        cloudGameState.score += 1;
        updateCloudGameScore();
        playSound(chimeSound, 0.4);
    } else {
        playSound(clickSound, 0.15);
    }
}

function spawnCloudGamePlatformsIfNeeded() {
    const width = cloudGameState.canvas.width;
    while (cloudGameState.nextPlatformY > cloudGameState.cameraY - 100) {
        let x;
        const maxHorizontalShift = 110;
        const unclampedX = cloudGameState.lastPlatformX + random(-maxHorizontalShift, maxHorizontalShift);
        const minX = 10;
        const maxX = width - 10 - cloudGameState.platformWidth;
        x = Math.max(minX, Math.min(maxX, unclampedX));

        const platform = {
            id: Math.random().toString(36).slice(2, 11),
            x,
            y: cloudGameState.nextPlatformY,
            width: cloudGameState.platformWidth,
            height: cloudGameState.platformHeight
        };

        cloudGameState.platforms.push(platform);
        cloudGameState.lastPlatformX = x;
        cloudGameState.highestPlatformY = Math.min(cloudGameState.highestPlatformY, platform.y);

        cloudGameState.minPlatformSpace += 0.4;
        cloudGameState.maxPlatformSpace += 0.4;
        cloudGameState.maxPlatformSpace = Math.min(cloudGameState.maxPlatformSpace, cloudGameState.canvas.height / 2);

        cloudGameState.nextPlatformY -= cloudGameState.platformHeight + random(cloudGameState.minPlatformSpace, cloudGameState.maxPlatformSpace);
    }
}

function trimCloudGamePlatforms() {
    const cutoff = cloudGameState.cameraY + cloudGameState.canvas.height + 100;
    cloudGameState.platforms = cloudGameState.platforms.filter(platform => platform.y <= cutoff);
}

function drawCloudGame() {
    const context = cloudGameState.context;
    const canvas = cloudGameState.canvas;
    if (!context || !canvas) return;

    const width = canvas.width;
    const height = canvas.height;

    const sky = context.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#86d7ff');
    sky.addColorStop(1, '#eaf8ff');
    context.fillStyle = sky;
    context.fillRect(0, 0, width, height);

    drawCloudGameBackdrop(context, width, height);

    for (const platform of cloudGameState.platforms) {
        const screenY = platform.y - cloudGameState.cameraY;
        if (screenY < -80 || screenY > height + 40) continue;

        context.fillStyle = '#2f9e44';
        context.fillRect(platform.x, screenY, platform.width, platform.height);
        context.strokeStyle = '#1f6f31';
        context.lineWidth = 2;
        context.strokeRect(platform.x, screenY, platform.width, platform.height);
    }

    const playerScreenY = cloudGameState.player.y - cloudGameState.cameraY;
    drawCloudGamePlayer(context, cloudGameState.player.x, playerScreenY, cloudGameState.player.width, cloudGameState.player.height);
}

function drawCloudGameBackdrop(context, width, height) {
    context.save();
    context.fillStyle = 'rgba(255, 255, 255, 0.16)';

    const cloudBands = [
        { x: 30, y: 50, scale: 1.0 },
        { x: width * 0.65, y: 90, scale: 1.2 },
        { x: width * 0.18, y: 180, scale: 0.8 },
        { x: width * 0.78, y: 230, scale: 0.9 },
        { x: width * 0.45, y: 310, scale: 1.1 }
    ];

    for (const cloud of cloudBands) {
        context.beginPath();
        context.ellipse(cloud.x, cloud.y, 42 * cloud.scale, 18 * cloud.scale, 0, 0, Math.PI * 2);
        context.ellipse(cloud.x + 28 * cloud.scale, cloud.y - 10 * cloud.scale, 32 * cloud.scale, 16 * cloud.scale, 0, 0, Math.PI * 2);
        context.ellipse(cloud.x + 52 * cloud.scale, cloud.y, 40 * cloud.scale, 18 * cloud.scale, 0, 0, Math.PI * 2);
        context.fill();
    }

    context.restore();
}

function drawCloudGamePlayer(context, x, y, width, height) {
    context.save();

    context.fillStyle = '#ffe45c';
    context.strokeStyle = '#1a1a1a';
    context.lineWidth = 3;
    context.beginPath();
    drawCloudGameRoundedRectPath(context, x, y, width, height, 7);
    context.fill();
    context.stroke();

    context.fillStyle = '#1a1a1a';
    context.beginPath();
    context.arc(x + width * 0.35, y + height * 0.4, 2.2, 0, Math.PI * 2);
    context.arc(x + width * 0.65, y + height * 0.4, 2.2, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.moveTo(x + width * 0.32, y + height * 0.66);
    context.quadraticCurveTo(x + width * 0.5, y + height * 0.78, x + width * 0.68, y + height * 0.66);
    context.stroke();

    context.restore();
}

function drawCloudGameRoundedRectPath(context, x, y, width, height, radius) {
    const cornerRadius = Math.min(radius, width / 2, height / 2);
    context.moveTo(x + cornerRadius, y);
    context.lineTo(x + width - cornerRadius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + cornerRadius);
    context.lineTo(x + width, y + height - cornerRadius);
    context.quadraticCurveTo(x + width, y + height, x + width - cornerRadius, y + height);
    context.lineTo(x + cornerRadius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - cornerRadius);
    context.lineTo(x, y + cornerRadius);
    context.quadraticCurveTo(x, y, x + cornerRadius, y);
    context.closePath();
}

function updateCloudGameScore() {
    if (cloudGameState.scoreDisplay) {
        cloudGameState.scoreDisplay.textContent = `Platforms Climbed: ${cloudGameState.score}`;
    }
}

function endCloudGame() {
    if (!cloudGameState.running) return;

    cloudGameState.running = false;
    if (cloudGameState.requestId) {
        cancelAnimationFrame(cloudGameState.requestId);
        cloudGameState.requestId = null;
    }

    playSound(whooshSound, 0.5);

    if (cloudGameState.scoreDisplay) {
        cloudGameState.scoreDisplay.textContent = `Game Over! Score: ${cloudGameState.score}`;
        cloudGameState.scoreDisplay.classList.add('cloud-game-over');
    }
}
