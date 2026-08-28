// Keyboard navigation and accessibility module

// Add keyboard navigation for hotspots
const hotspotWrappers = document.querySelectorAll('.hotspot-wrapper');

hotspotWrappers.forEach(wrapper => {
    // Handle Enter and Space key presses
    wrapper.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            // Trigger click on the hotspot inside
            const hotspot = wrapper.querySelector('.hotspot');
            if (hotspot) {
                hotspot.click();
            }
        }
    });
    
    // Add focus/blur visual feedback
    wrapper.addEventListener('focus', () => {
        wrapper.style.outline = '3px solid #4CAF50';
        wrapper.style.outlineOffset = '5px';
    });
    
    wrapper.addEventListener('blur', () => {
        wrapper.style.outline = 'none';
    });
});

// Escape key event listener for modal
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isModalOpen()) {
        hideModal();
    }
});

// Trap focus within modal when it's open
modal.addEventListener('keydown', (event) => {
    if (!isModalOpen()) return;
    
    if (event.key === 'Tab') {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        // If shift+tab on first element, go to last
        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        }
        // If tab on last element, go to first
        else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }
});

// Add keyboard navigation hints to the dialogue
const keyboardHint = "💡 Tip: Use Tab to navigate between interactive elements, Enter/Space to activate, and Escape to close modals.";
