
import React, { useState, useEffect, useRef } from "react";
import TriggerPoint from "./TriggerPoint";
import SettingsPanel from "./SettingsPanel";
import { themes, ThemeName, ThemeConfig } from "../utils/themeUtils";
import { VisualEffectEngine } from "../utils/canvasUtils";
import { playNoteWithTone } from "../utils/audioUtils";

// Define the piano notes to use
const NOTES = ["C4", "D4", "E4", "G4", "A4", "C5", "D5"];

const PianoHeartbeat: React.FC = () => {
  // State
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("serene");
  const [volume, setVolume] = useState(0.7);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [heartbeatEnabled, setHeartbeatEnabled] = useState(false);
  const [triggerPoints, setTriggerPoints] = useState<Array<{ id: number; size: number; note: string }>>(
    NOTES.map((note, index) => ({
      id: index,
      size: Math.random() * 20 + 40, // Random size between 40-60px
      note
    }))
  );
  
  // Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const visualEngineRef = useRef<VisualEffectEngine | null>(null);
  const heartbeatTimerRef = useRef<number | null>(null);
  
  // Initialize the visual engine when the component mounts
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Create visual engine
    visualEngineRef.current = new VisualEffectEngine(
      canvasRef.current,
      themes[currentTheme]
    );
    
    // Handle window resize
    const handleResize = () => {
      if (canvasRef.current && visualEngineRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        visualEngineRef.current.resizeCanvas();
      }
    };
    
    // Initial setup
    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (heartbeatTimerRef.current) {
        clearInterval(heartbeatTimerRef.current);
      }
    };
  }, []);
  
  // Update visual engine when theme changes
  useEffect(() => {
    if (visualEngineRef.current) {
      visualEngineRef.current.setTheme(themes[currentTheme]);
      
      // Adjust trigger points for the new theme
      setTriggerPoints(prev => 
        prev.map(point => ({
          ...point,
          // Adjust size based on theme - sakura theme has smaller petals
          size: currentTheme === 'sakura' ? 
            Math.random() * 15 + 30 : 
            Math.random() * 20 + 40
        }))
      );
    }
  }, [currentTheme]);
  
  // Handle heartbeat toggle
  useEffect(() => {
    // Clear existing heartbeat
    if (heartbeatTimerRef.current) {
      clearInterval(heartbeatTimerRef.current);
      heartbeatTimerRef.current = null;
    }
    
    // Start heartbeat if enabled
    if (heartbeatEnabled) {
      heartbeatTimerRef.current = window.setInterval(() => {
        // Play a low C note at reduced volume
        playNoteWithTone("C4", volume * 0.2);
        
        // Add visual effect at random position if visual engine exists
        if (visualEngineRef.current) {
          const x = Math.random() * window.innerWidth;
          const y = Math.random() * window.innerHeight;
          visualEngineRef.current.createRipple(x, y, "rgba(255, 255, 255, 0.1)");
        }
      }, 5000); // Every 5 seconds
    }
    
    return () => {
      if (heartbeatTimerRef.current) {
        clearInterval(heartbeatTimerRef.current);
      }
    };
  }, [heartbeatEnabled, volume]);
  
  // Toggle settings panel
  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };
  
  // Handle theme change
  const handleThemeChange = (theme: ThemeName) => {
    setCurrentTheme(theme);
  };
  
  // Handle volume change
  const handleVolumeChange = (value: number) => {
    setVolume(value);
  };
  
  // Toggle heartbeat
  const toggleHeartbeat = () => {
    setHeartbeatEnabled(!heartbeatEnabled);
  };
  
  return (
    <div className="h-full w-full overflow-hidden">
      {/* Background canvas for visual effects */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ background: themes[currentTheme].backgroundColor }}
      />
      
      {/* Trigger points */}
      {triggerPoints.map((point) => (
        <TriggerPoint
          key={point.id}
          id={point.id}
          size={point.size}
          note={point.note}
          theme={themes[currentTheme]}
          visualEngine={visualEngineRef.current}
          volume={volume}
        />
      ))}
      
      {/* Settings panel */}
      <SettingsPanel
        isOpen={settingsOpen}
        onToggle={toggleSettings}
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        heartbeatEnabled={heartbeatEnabled}
        onHeartbeatToggle={toggleHeartbeat}
      />
    </div>
  );
};

export default PianoHeartbeat;
