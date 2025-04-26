
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
      {/* Settings button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          onClick={onToggle} 
          className="bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-all duration-200"
        >
          <Settings className="w-5 h-5 text-white" />
        </button>
      </div>
      
      {/* Settings panel */}
      <div 
        className={`settings-panel transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ color: currentTheme ? themes[currentTheme].textColor : 'white' }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button 
            onClick={onToggle}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Theme selection */}
          <div>
            <h3 className="text-lg font-medium mb-2">Theme</h3>
            <div className="flex flex-col space-y-3">
              {Object.entries(themes).map(([themeName, theme]) => (
                <button
                  key={themeName}
                  className={`theme-option-large flex items-center p-2 rounded-md transition-colors ${currentTheme === themeName ? 'bg-white/20' : 'hover:bg-white/10'}`}
                  onClick={() => onThemeChange(themeName as ThemeName)}
                  aria-label={`${theme.displayName} theme`}
                >
                  <div 
                    className="w-8 h-8 rounded-full mr-3"
                    style={{ backgroundColor: theme.backgroundColor, boxShadow: `0 0 10px ${theme.triggerColors[0]}` }}
                  />
                  <span>{theme.displayName}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Volume control */}
          <div>
            <h3 className="text-lg font-medium mb-2">Volume</h3>
            <Slider 
              value={[volume]}
              min={0} 
              max={1} 
              step={0.01}
              onValueChange={handleVolumeChange}
              className="my-4"
            />
          </div>
          
          {/* Heartbeat toggle */}
          <div>
            <h3 className="text-lg font-medium mb-2">Background Heartbeat</h3>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={heartbeatEnabled}
                  onChange={onHeartbeatToggle}
                />
                <div className={`w-10 h-5 rounded-full transition ${heartbeatEnabled ? 'bg-white/50' : 'bg-white/20'}`} />
                <div className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition transform ${heartbeatEnabled ? 'translate-x-5' : ''}`} />
              </div>
              <div className="ml-3">{heartbeatEnabled ? 'On' : 'Off'}</div>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPanel;
