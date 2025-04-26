
// Audio context singleton
let audioContext: AudioContext | null = null;

// Initialize the audio context (must be called from a user gesture)
export const initAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

// Get the current audio context or create one
export const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    return initAudioContext();
  }
  return audioContext;
};

// Cache for loaded sounds
const soundCache: Record<string, AudioBuffer> = {};

// Load a sound file
export const loadSound = async (url: string): Promise<AudioBuffer> => {
  if (soundCache[url]) {
    return soundCache[url];
  }
  
  const context = getAudioContext();
  
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(arrayBuffer);
    soundCache[url] = audioBuffer;
    return audioBuffer;
  } catch (error) {
    console.error("Error loading sound:", error);
    throw error;
  }
};

// Play a sound with the given settings
export const playSound = (
  buffer: AudioBuffer,
  options: { volume?: number; pan?: number; detune?: number } = {}
): void => {
  const context = getAudioContext();
  
  // Create source
  const source = context.createBufferSource();
  source.buffer = buffer;
  
  // Create gain (volume) node
  const gainNode = context.createGain();
  gainNode.gain.value = options.volume ?? 1;
  
  // Create panner if pan is specified
  if (options.pan) {
    const panNode = context.createStereoPanner();
    panNode.pan.value = Math.max(-1, Math.min(1, options.pan)); // Clamp between -1 and 1
    
    source.connect(panNode);
    panNode.connect(gainNode);
  } else {
    source.connect(gainNode);
  }
  
  // Apply detune if specified (cents)
  if (options.detune) {
    source.detune.value = options.detune;
  }
  
  // Connect to output
  gainNode.connect(context.destination);
  
  // Play the sound
  source.start(0);
};

// The piano note URLs - we're using placeholder URLs that would need to be replaced
// with actual piano sound files in a real implementation
export const pianoNotes = {
  C4: '/sounds/C4.mp3',
  D4: '/sounds/D4.mp3',
  E4: '/sounds/E4.mp3',
  G4: '/sounds/G4.mp3',
  A4: '/sounds/A4.mp3',
  C5: '/sounds/C5.mp3',
  D5: '/sounds/D5.mp3',
};

// We'll use a workaround since we don't have actual sound files
export const playNoteWithTone = (note: string, volume = 1) => {
  try {
    const context = getAudioContext();
    
    // Create oscillator (simulates a note)
    const osc = context.createOscillator();
    osc.type = 'sine';
    
    // Set frequency based on note
    const noteToFreq: Record<string, number> = {
      C4: 261.63,
      D4: 293.66,
      E4: 329.63,
      G4: 392.00,
      A4: 440.00,
      C5: 523.25,
      D5: 587.33,
    };
    
    osc.frequency.value = noteToFreq[note] || 440;
    
    // Create gain node for volume and decay
    const gainNode = context.createGain();
    gainNode.gain.value = volume;
    
    // Connect nodes
    osc.connect(gainNode);
    gainNode.connect(context.destination);
    
    // Start oscillator
    osc.start();
    
    // Apply decay envelope
    gainNode.gain.setValueAtTime(volume, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 3);
    
    // Stop oscillator after decay
    osc.stop(context.currentTime + 3);
  } catch (error) {
    console.error("Error playing note with tone:", error);
  }
};
