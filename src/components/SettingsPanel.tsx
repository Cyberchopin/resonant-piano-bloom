
import React from "react";
import { Settings, X } from "lucide-react";
import { ThemeName, themes, ThemeConfig } from "../utils/themeUtils";
import { Slider } from "@/components/ui/slider";

interface SettingsPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  currentTheme: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
  volume: number;
  onVolumeChange: (value: number) => void;
  heartbeatEnabled: boolean;
  onHeartbeatToggle: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onToggle,
  currentTheme,
  onThemeChange,
  volume,
  onVolumeChange,
  heartbeatEnabled,
  onHeartbeatToggle
}) => {
  const handleVolumeChange = (value: number[]) => {
    onVolumeChange(value[0]);
  };
  
  return (
    <>
      {/* Refined settings button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          onClick={onToggle} 
          className="bg-white/10 backdrop-blur-lg p-3 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Settings className="w-5 h-5 text-white" />
        </button>
      </div>
      
      {/* Enhanced settings panel */}
      <div 
        className={`settings-panel transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ color: currentTheme ? themes[currentTheme].textColor : 'white' }}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
          <button 
            onClick={onToggle}
            className="p-2 rounded-full hover:bg-white/10 transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-8">
          {/* Theme selection with enhanced visuals */}
          <div>
            <h3 className="text-lg font-medium mb-4">Theme</h3>
            <div className="flex flex-col space-y-3">
              {Object.entries(themes).map(([themeName, theme]) => (
                <button
                  key={themeName}
                  className={`theme-option-large flex items-center p-3 rounded-lg transition-all duration-300 ${
                    currentTheme === themeName 
                      ? 'bg-white/20 shadow-lg' 
                      : 'hover:bg-white/10'
                  }`}
                  onClick={() => onThemeChange(themeName as ThemeName)}
                  aria-label={`${theme.displayName} theme`}
                >
                  <div 
                    className="w-10 h-10 rounded-full mr-4 shadow-lg transition-all duration-300"
                    style={{ 
                      backgroundColor: theme.backgroundColor,
                      boxShadow: `0 0 20px ${theme.triggerColors[0]}`,
                      transform: currentTheme === themeName ? 'scale(1.1)' : 'scale(1)'
                    }}
                  />
                  <span className="text-sm font-medium">{theme.displayName}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Volume control with enhanced slider */}
          <div>
            <h3 className="text-lg font-medium mb-4">Volume</h3>
            <Slider 
              value={[volume]}
              min={0} 
              max={1} 
              step={0.01}
              onValueChange={handleVolumeChange}
              className="my-4"
            />
          </div>
          
          {/* Heartbeat toggle with refined switch */}
          <div>
            <h3 className="text-lg font-medium mb-4">Background Heartbeat</h3>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={heartbeatEnabled}
                  onChange={onHeartbeatToggle}
                />
                <div 
                  className={`w-12 h-6 rounded-full transition-all duration-300 ${
                    heartbeatEnabled ? 'bg-white/50' : 'bg-white/10'
                  }`} 
                />
                <div 
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 transform ${
                    heartbeatEnabled ? 'translate-x-6' : ''
                  }`}
                />
              </div>
              <div className="ml-4 text-sm">{heartbeatEnabled ? 'On' : 'Off'}</div>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPanel;
