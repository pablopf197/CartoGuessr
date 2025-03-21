import { useEffect } from 'react';

let isScreenReaderMode = false;
let lastInteractionWasMouse = false;

export const setScreenReaderMode = (mode) => {
  isScreenReaderMode = mode;
};

const useAccessibility = () => {
  useEffect(() => {
    const handleMouseDown = () => {
      console.log("Mouse down event detected");
      lastInteractionWasMouse = true;
    };

    const handleKeyDown = () => {
      console.log("Key down event detected");
      lastInteractionWasMouse = false;
    };

    const handleFocus = (event) => {
      console.log("Focus event triggered");
      if (lastInteractionWasMouse) {
        console.log("Last interaction was with mouse, skipping speech synthesis");
      }else{
        const activeElement = document.activeElement;
        const ariaLabel = activeElement.getAttribute('aria-label');
        if (ariaLabel) {
          speak(ariaLabel);
        }
      }
    };
    
    document.addEventListener('focusin', handleFocus);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

};

const speak = (text) => {
  console.log("Speaking:", text);
  window.speechSynthesis.cancel();
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = 'en-EN';
  window.speechSynthesis.speak(speech);
};

export default useAccessibility;