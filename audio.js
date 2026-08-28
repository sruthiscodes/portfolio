// Audio functionality module

const bgMusic = document.getElementById('bg-music');
const clickSound = document.getElementById('click-sound');
const chimeSound = document.getElementById('chime-sound');
const whooshSound = document.getElementById('whoosh-sound');
const musicToggle = document.getElementById('music-toggle');

let isMusicPlaying = false;
let lastHoverSoundTime = 0;
const hoverSoundCooldown = 200; // milliseconds between hover sounds

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
