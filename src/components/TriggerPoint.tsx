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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("#ffffff");
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const padding = 100; // px from edges
    const x = Math.random() * (window.innerWidth - (padding * 2)) + padding;
    const y = Math.random() * (window.innerHeight - (padding * 2)) + padding;
    setPosition({ x, y });
    
    setColor(getRandomTriggerColor(theme));
  }, [theme]);
  
  useEffect(() => {
    setColor(getRandomTriggerColor(theme));
  }, [theme]);
  
  const handleClick = () => {
    playNoteWithTone(note, volume);
    
    if (visualEngine) {
      const effectColor = getRandomParticleColor(theme);
      visualEngine.createParticleExplosion(position.x, position.y, effectColor);
      visualEngine.createRipple(position.x, position.y, effectColor);
      visualEngine.createAura(position.x, position.y, effectColor);
      
      if (theme.name === 'sakura') {
        visualEngine.createFallingPetals(position.x, position.y, effectColor, 8);
      }
    }
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };
  
  const getShapeStyles = () => {
    const baseStyles = {
      position: 'absolute' as const,
      left: position.x - size / 2,
      top: position.y - size / 2,
      width: size,
      height: size,
      backgroundColor: color,
      boxShadow: `0 0 ${size/2}px ${color}`,
      transform: isAnimating ? 'scale(1.2)' : 'scale(1)',
      transition: 'transform 0.3s ease-out',
    };
    
    switch (theme.triggerShape) {
      case 'crystal':
        return {
          ...baseStyles,
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          boxShadow: `0 0 ${size/2}px ${color}, inset 0 0 ${size/6}px rgba(255,255,255,0.8)`,
          animation: 'pulse-soft 5s ease-in-out infinite alternate',
        };
      case 'leaf':
        return {
          ...baseStyles,
          borderRadius: '50% 0 50% 0',
          transform: isAnimating ? 'scale(1.2) rotate(45deg)' : 'scale(1) rotate(45deg)',
        };
      case 'anemone':
        return {
          ...baseStyles,
          borderRadius: '45%',
          boxShadow: `0 0 ${size/4}px ${color}`,
          filter: 'blur(3px)',
          opacity: 0.8,
        };
      case 'petal':
        return {
          ...baseStyles,
          borderRadius: '60% 40% 70% 30% / 40% 50% 60% 50%',
          transform: isAnimating ? 'scale(1.2) rotate(45deg)' : 'scale(1) rotate(15deg)',
          opacity: 0.9,
          boxShadow: `0 0 ${size/3}px ${color}, inset 0 0 ${size/4}px rgba(255,255,255,0.6)`,
        };
      case 'round':
      default:
        return baseStyles;
    }
  };
  
  return (
    <div 
      className={`trigger-point animate-pulse-soft ${isAnimating ? 'scale-125' : ''} ${theme.triggerShape}`}
      style={getShapeStyles()}
      onClick={handleClick}
    />
  );
};

export default TriggerPoint;
