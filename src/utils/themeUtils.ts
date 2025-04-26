
export type ThemeName = 'serene' | 'stardust' | 'forest' | 'deep';

export interface ThemeConfig {
  name: ThemeName;
  displayName: string;
  backgroundColor: string;
  gradientClass: string;
  triggerColors: string[];
  particleColors: string[];
  textColor: string;
  triggerShape: 'round' | 'crystal' | 'leaf' | 'anemone';
}

export const themes: Record<ThemeName, ThemeConfig> = {
  serene: {
    name: 'serene',
    displayName: 'Serene Moonlight Lakeside',
    backgroundColor: '#151c2c',
    gradientClass: 'bg-gradient-serene',
    triggerColors: [
      '#e8f1ff', // Moon white
      '#c3d7eb', // Soft silver
      '#f9f3d9', // Warm pale yellow
      '#d6e5f3', // Light blue
      '#e2dfe9', // Lavender gray
    ],
    particleColors: [
      'rgba(232, 241, 255, 0.8)',
      'rgba(195, 215, 235, 0.8)',
      'rgba(249, 243, 217, 0.8)',
      'rgba(214, 229, 243, 0.8)',
    ],
    textColor: '#e8f1ff',
    triggerShape: 'round',
  },
  stardust: {
    name: 'stardust',
    displayName: 'Whispering Stardust Grotto',
    backgroundColor: '#0a0e1a',
    gradientClass: 'bg-gradient-stardust',
    triggerColors: [
      '#e0e8ff', // Silver
      '#a2c4ff', // Ice blue
      '#d6c2ff', // Soft purple
      '#b3ffea', // Emerald green hint
      '#ecf7ff', // Bright star white
    ],
    particleColors: [
      'rgba(224, 232, 255, 0.8)',
      'rgba(162, 196, 255, 0.8)',
      'rgba(214, 194, 255, 0.8)',
      'rgba(179, 255, 234, 0.8)',
    ],
    textColor: '#e0e8ff',
    triggerShape: 'crystal',
  },
  forest: {
    name: 'forest',
    displayName: 'Pulse of the Forest Heart',
    backgroundColor: '#1a331f',
    gradientClass: 'bg-gradient-forest',
    triggerColors: [
      '#a2d9a1', // Moss green
      '#e6c870', // Warm amber
      '#ffd166', // Soft yellow
      '#ffa9b7', // Soft pink (wildflower)
      '#c2f784', // Fresh leaf green
    ],
    particleColors: [
      'rgba(162, 217, 161, 0.8)',
      'rgba(230, 200, 112, 0.8)',
      'rgba(255, 209, 102, 0.8)',
      'rgba(255, 169, 183, 0.8)',
    ],
    textColor: '#e6eede',
    triggerShape: 'leaf',
  },
  deep: {
    name: 'deep',
    displayName: 'Echoes from the Deep',
    backgroundColor: '#041019',
    gradientClass: 'bg-gradient-deep',
    triggerColors: [
      '#0a5e78', // Deep phosphorescent blue
      '#107855', // Deep emerald
      '#3d2e32', // Deep amber
      '#192f3e', // Dark navy
      '#1f3b32', // Dark teal
    ],
    particleColors: [
      'rgba(10, 94, 120, 0.7)',
      'rgba(16, 120, 85, 0.7)',
      'rgba(61, 46, 50, 0.7)',
      'rgba(25, 47, 62, 0.7)',
    ],
    textColor: '#7ab3cc',
    triggerShape: 'anemone',
  }
};

export const getRandomTriggerColor = (theme: ThemeConfig): string => {
  const index = Math.floor(Math.random() * theme.triggerColors.length);
  return theme.triggerColors[index];
};

export const getRandomParticleColor = (theme: ThemeConfig): string => {
  const index = Math.floor(Math.random() * theme.particleColors.length);
  return theme.particleColors[index];
};
