
import React, { useState, useEffect } from "react";
import { getRandomTriggerColor, ThemeConfig, getRandomParticleColor } from "../utils/themeUtils";
import { playNoteWithTone } from "../utils/audioUtils";
import { VisualEffectEngine } from "../utils/canvasUtils";

interface TriggerPointProps {
  id: number;
  size: number;
  note: string;
  theme: ThemeConfig;
  visualEngine?: VisualEffectEngine | null;
  volume: number;
}

const TriggerPoint: React.FC<TriggerPointProps> = ({ 
  id, 
  size, 
  note, 
  theme, 
  visualEngine,
  volume
}) => {
  // Random position with padding from edges
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("#ffffff");
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Initialize position and color
  useEffect(() => {
    const padding = 100; // px from edges
    const x = Math.random() * (window.innerWidth - (padding * 2)) + padding;
    const y = Math.random() * (window.innerHeight - (padding * 2)) + padding;
    setPosition({ x, y });
    
    // Set color based on theme
    setColor(getRandomTriggerColor(theme));
  }, [theme]);
  
  // Update color when theme changes
  useEffect(() => {
    setColor(getRandomTriggerColor(theme));
  }, [theme]);
  
  const handleClick = () => {
    // Play sound
    playNoteWithTone(note, volume);
    
    // Create visual effects
    if (visualEngine) {
      const effectColor = getRandomParticleColor(theme);
      visualEngine.createParticleExplosion(position.x, position.y, effectColor);
      visualEngine.createRipple(position.x, position.y, effectColor);
      visualEngine.createAura(position.x, position.y, effectColor);
    }
    
    // Trigger animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };
  
  return (
    <div 
      className={`trigger-point animate-pulse-soft ${isAnimating ? 'scale-125' : ''}`}
      style={{
        left: position.x - size / 2,
        top: position.y - size / 2,
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow: `0 0 ${size/2}px ${color}`,
        transform: isAnimating ? 'scale(1.2)' : 'scale(1)',
        transition: 'transform 0.3s ease-out'
      }}
      onClick={handleClick}
    />
  );
};

export default TriggerPoint;
