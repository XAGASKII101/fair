
import { useCallback, useRef } from 'react';

export const useTextToSpeech = () => {
  const hasUserInteracted = useRef(false);

  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) {
      console.log('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set basic properties first
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Function to actually speak
    const performSpeak = () => {
      try {
        // Force resume if paused (common Android issue)
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
        
        window.speechSynthesis.speak(utterance);
        
        // Additional Android fix - resume after short delay
        setTimeout(() => {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
        }, 100);
        
        // Fallback for stubborn browsers
        setTimeout(() => {
          if (window.speechSynthesis.pending && !window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
          }
        }, 300);
        
      } catch (error) {
        console.log('Speech error:', error);
      }
    };

    // Try to set voice if available
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      // Find English voice
      const englishVoice = voices.find(voice => 
        voice.lang.startsWith('en') && 
        (voice.name.includes('Google') || voice.name.includes('Microsoft') || voice.default)
      ) || voices.find(voice => voice.lang.startsWith('en'));
      
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
      
      performSpeak();
    } else {
      // Wait for voices with timeout
      let voiceTimeout;
      
      const handleVoicesLoaded = () => {
        clearTimeout(voiceTimeout);
        const newVoices = window.speechSynthesis.getVoices();
        
        if (newVoices.length > 0) {
          const englishVoice = newVoices.find(voice => 
            voice.lang.startsWith('en')
          );
          
          if (englishVoice) {
            utterance.voice = englishVoice;
          }
        }
        
        performSpeak();
      };
      
      // Listen for voices loaded event
      window.speechSynthesis.addEventListener('voiceschanged', handleVoicesLoaded, { once: true });
      
      // Fallback timeout - speak anyway after 1 second
      voiceTimeout = setTimeout(() => {
        console.log('Voice timeout - speaking without voice selection');
        performSpeak();
      }, 1000);
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  // Enable speech on first user interaction
  const enableSpeech = useCallback(() => {
    if (!hasUserInteracted.current && 'speechSynthesis' in window) {
      hasUserInteracted.current = true;
      // Pre-load voices by creating a silent utterance
      const silent = new SpeechSynthesisUtterance('');
      silent.volume = 0;
      window.speechSynthesis.speak(silent);
      window.speechSynthesis.cancel();
    }
  }, []);

  return { speak, stopSpeaking, enableSpeech };
};
