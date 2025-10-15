// Audio functionality
const bgMusic = document.getElementById('bg-music');
const clickSound = document.getElementById('click-sound');
const chimeSound = document.getElementById('chime-sound');
const whooshSound = document.getElementById('whoosh-sound');
const musicToggle = document.getElementById('music-toggle');

let isMusicPlaying = false;
let lastHoverSoundTime = 0;
const hoverSoundCooldown = 200; // milliseconds between hover sounds
let currentOpenHotspot = null; // Track which hotspot opened the current modal

// Function to play sound effect
function playSound(sound, volume = 1.0, startTime = 0) {
    if (sound) {
        sound.volume = volume;
        sound.currentTime = startTime;
        sound.play().catch(err => console.log('Sound play failed:', err));
    }
}

// Start background music after user interaction
function startBackgroundMusic() {
    if (!isMusicPlaying) {
        bgMusic.volume = 0.3; // Set to 30% volume
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggle.classList.remove('music-muted');
            musicToggle.classList.add('music-playing');
        }).catch(err => console.log('Music play failed:', err));
    }
}

// Toggle music on/off
musicToggle.addEventListener('click', () => {
    playSound(clickSound, 0.3);
    if (isMusicPlaying) {
        bgMusic.pause();
        isMusicPlaying = false;
        musicToggle.classList.remove('music-playing');
        musicToggle.classList.add('music-muted');
    } else {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggle.classList.remove('music-muted');
            musicToggle.classList.add('music-playing');
        }).catch(err => console.log('Music play failed:', err));
    }
});

// Portfolio data object
const portfolioData = {
    projects: [
        {
            title: "Neurocontrol System for Prosthetic Devices",
            description: "Developing a non-invasive brain-computer interface that decodes EEG signals from the motor cortex to control assistive prosthetic devices. This project involves applying Continuous Wavelet Transform on PhysioNet EEG motor imagery data and building a spatio-temporal CNN for real-time classification using Python, TensorFlow, MNE, and CWT.",
            github_link: "https://github.com/sruthiscodes/capstone"
        },
        {
            title: "Multi-Modal Adventure Story Engine",
            description: "Designed and built a dynamic storytelling engine that combines local large language models with both text and visual outputs to create immersive narrative scenes. Utilized Python, llama.cpp, ChromaDB, and Replicate API for image diffusion, deploying a FastAPI backend to enable multi-turn user interactions and maintain plot continuity.",
            github_link: "https://github.com/sruthiscodes/adventure-story-game"
        },
        {
            title: "Gesture-Controlled Drone",
            description: "Developed an innovative gesture-based drone control system using ROS 2 Humble, simulated in Gazebo. Integrated MediaPipe for real-time hand gesture recognition and landmark detection, and implemented the control logic in Python to translate gestures into drone commands. Structured the project with modular ROS 2 packages, managed via CMake and setup.py, and built with colcon on Linux for seamless deployment.",
            github_link: "https://github.com/sruthiscodes/gesture-controlled-drone"
        },
        {
            title: "EmoStream – Real-Time Reaction Pipeline",
            description: "Created a real-time emoji-based feedback system for live video content engagement. Developed asynchronous Flask APIs with millisecond latency, integrated Kafka's pub/sub architecture for high-throughput event streaming, and processed events with Spark Streaming to enable dynamic content personalization.",
            github_link: "https://github.com/sruthiscodes/emostream"
        },
        {
            title: "Secure Live Video Streaming Platform",
            description: "Built a privacy-focused live video transmission system optimized for low-latency and encrypted delivery across devices. Implemented SSL encryption alongside an OpenCV-based frame processing pipeline to enable secure, real-time peer-to-peer media exchange over TCP sockets.",
            github_link: "https://github.com/sruthiscodes/live-video-streaming"
        },
        {
            title: "Nimble: Scalable Restaurant Discovery & Ordering Platform",
            description: "Created a full-stack eCommerce application using the MERN stack, featuring a scalable design for restaurant discovery and ordering. Developed RESTful APIs for menu browsing, cart management, and secure order placement, with robust user authentication, session management, and real-time order tracking to enhance user experience.",
            github_link: "https://github.com/sruthiscodes/nimble"
        }
    ],
    experiences: [
        {
            role: "Summer Intern",
            company: "dentsu, Bengaluru, India",
            dates: "June 2025 – July 2025",
            description: "• Built a scalable Model Context Protocol (MCP) framework for Merkury, managing 260+ million user profiles\n• Developed a secure natural language to SQL tool using Snowflake Cortex Analyst and Azure OpenAI\n• Used LangGraph to orchestrate an XGBoost-based lookalike audience model for automated targeting\n• Created MCP tools to enable agentic AI workflows across enterprise applications"
        },
        {
            role: "Teaching Assistant — Data Analytics",
            company: "PES University, Bengaluru, India",
            dates: "June 2025 – Present",
            description: "• Developed detailed worksheets on Recommender Systems for 300+ students\n• Designed problem statements and conducted hackathons engaging 300+ students in practical challenges"
        },
        {
            role: "Teaching Assistant — Microprocessors and Computer Architecture",
            company: "PES University, Bengaluru, India",
            dates: "Jan 2025 – May 2025",
            description: "• Prepared and reviewed lecture materials including summaries and practice questions\n• Graded lab work and assignments for over 100 students with constructive feedback"
        }
    ],
    aboutMe: {
        bio: "I'm currently a senior at PES University in Bengaluru, grinding through my Computer Science Engineering degree (with equal parts love and chaos). I’ve been curious about tech ever since I got my first tiny Lenovo laptop at age four. That feeling just kept growing and today, I love building things trying to fix things with tech, one small step at a time. Still figuring it out. Still chasing that same spark :)",
        skills: [
            "Python", "TensorFlow", "PyTorch",
            "Kafka", "PySpark", "SQL", "Snowflake",
            "FastAPI", "Flask"
          ],          
          education: "Bachelor of Technology in Computer Science and Engineering\nPES University, Bengaluru\n2022–2026\n\nIndian School Certificate (12th Grade)\nNPS International, Chennai\nPercentage: 93.8%\n2022\n\nIndian Certificate of Secondary Education (10th Grade)\nNPS International, Chennai\nPercentage: 94.17%\n2020",
          resume_link: "https://drive.google.com/file/d/1R0U3IRAHfpFIeKElfqRq9KWfT3EaOVR9/view?usp=sharing"
    },
    contact: {
        email: "sruthisivakumar31@gmail.com",
        linkedin: "https://www.linkedin.com/in/sruthisivakumar31/",
        github_profile: "https://github.com/sruthiscodes"
    }
};

// Get DOM elements
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
const modal = document.getElementById('popup-modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const closeButton = document.getElementById('close-button');

// Initial state - hide main content
gameContainer.classList.add('hidden');

// Set intro avatar source
introAvatar.src = 'avatar.png';

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
                dialogueText.textContent = "Welcome to my little corner of the internet :) Make yourself at home!";
                dialogueBox.style.display = 'block';
            }, 500);
        }, 1400);
    }, 50);
}

// Function to render modal content based on page name
function renderModalContent(pageName) {
    let title = '';
    let content = '';

    switch(pageName) {
        case 'projects':
            title = 'My Projects';
            content = `
                <div class="projects-container">
                    ${portfolioData.projects.map(project => `
                        <div class="project-item">
                            <h4 class="project-title">${project.title}</h4>
                            <p class="project-description">${project.description}</p>
                            <div class="project-links">
                                <a href="${project.github_link}" target="_blank" class="project-link github-link">GitHub</a>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            break;

        case 'experiences':
            title = 'Work Experience';
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
            title = 'About Me';
            content = `
                <div class="about-container">
                    <p class="bio">${portfolioData.aboutMe.bio}</p>
                    <div class="skills-section">
                        <h4>Skills:</h4>
                        <div class="skills-list">
                            ${portfolioData.aboutMe.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                    <div class="education-section">
                        <h4>Education:</h4>
                        <p>${portfolioData.aboutMe.education.replace(/\n/g, '<br>')}</p>
                    </div>
                </div>
            `;
            break;

        case 'contact':
            title = 'Get In Touch';
            content = `
                <div class="contact-container">
                    <div class="contact-item">
                        <h4>Email</h4>
                        <a href="mailto:${portfolioData.contact.email}" class="contact-link">${portfolioData.contact.email}</a>
                    </div>
                    <div class="contact-item">
                        <h4>LinkedIn</h4>
                        <a href="${portfolioData.contact.linkedin}" target="_blank" class="contact-link">Connect with me</a>
                    </div>
                    <div class="contact-item">
                        <h4>GitHub</h4>
                        <a href="${portfolioData.contact.github_profile}" target="_blank" class="contact-link">View my code</a>
                    </div>
                </div>
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
        currentOpenHotspot = null; // Reset when modal closes
    }, 300);
}

// Function to check if modal is currently open
function isModalOpen() {
    return modal.style.display === 'block';
}

// Add hover sound effects to hotspots with cooldown
const hotspots = [computerHotspot, phoneHotspot, bookshelfHotspot, bulletinHotspot];
hotspots.forEach(hotspot => {
    hotspot.addEventListener('mouseenter', () => {
        const now = Date.now();
        if (now - lastHoverSoundTime > hoverSoundCooldown) {
            playSound(clickSound, 0.3); // Lower volume for hover
            lastHoverSoundTime = now;
        }
    });
});

// Add click event listeners to hotspots with toggle functionality
computerHotspot.addEventListener('click', () => {
    if (isModalOpen() && currentOpenHotspot === 'computer') {
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
    renderModalContent('projects');
        setTimeout(() => {
            showModal(computerHotspot);
            currentOpenHotspot = 'computer';
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
        "Feel free to snoop around tee-hee",
        "That computer over there? Full of projects.",
        "Click around! Everything's interactive.",
        "Psst... the bookshelf has all the good stuff.",
        "My phone's right there if you wanna reach out."
    ],
    nighttime: [
        "Late night coding? Me too."
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
