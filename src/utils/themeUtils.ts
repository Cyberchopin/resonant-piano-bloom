
export type ThemeName = 'stardust' | 'forest' | 'mist';

export interface ThemeConfig {
  name: ThemeName;
  backgroundColor: string;
  gradientClass: string;
  triggerColors: string[];
  particleColors: string[];
  textColor: string;
}

export const themes: Record<ThemeName, ThemeConfig> = {
  stardust: {
    name: 'stardust',
    backgroundColor: '#0a192f',
    gradientClass: 'bg-gradient-stardust',
    triggerColors: [
      '#f8c6ff', // Light purple
      '#a2d2ff', // Light blue
      '#ccd6f6', // Silver
      '#ffcaa6', // Light orange
      '#ffd6ff', // Light pink
      '#d4e8ff', // Baby blue
      '#ffffbf', // Light yellow
    ],
    particleColors: [
      'rgba(248, 198, 255, 0.8)',
      'rgba(162, 210, 255, 0.8)',
      'rgba(204, 214, 246, 0.8)',
      'rgba(255, 202, 166, 0.8)',
    ],
    textColor: '#ccd6f6',
  },
  forest: {
    name: 'forest',
    backgroundColor: '#1a4027',
    gradientClass: 'bg-gradient-forest',
    triggerColors: [
      '#9fff9c', // Light green
      '#eaac8b', // Light brown
      '#ffd166', // Gold
      '#c2f784', // Moss green
      '#d8f8b7', // Light lime
      '#e6c870', // Amber
      '#b1cc74', // Olive green
    ],
    particleColors: [
      'rgba(159, 255, 156, 0.8)',
      'rgba(234, 172, 139, 0.8)',
      'rgba(255, 209, 102, 0.8)',
      'rgba(194, 247, 132, 0.8)',
    ],
    textColor: '#f1faea',
  },
  mist: {
    name: 'mist',
    backgroundColor: '#e5eaf1',
    gradientClass: 'bg-gradient-mist',
    triggerColors: [
      '#d0e8f2', // Silver blue
      '#f9c6d7', // Light pink
      '#c5d7ea', // Light blue gray
      '#a9c7c5', // Light teal
      '#e6b8d9', // Lavender
      '#c9d3df', // Gray blue
      '#eedffc', // Pale purple
    ],
    particleColors: [
      'rgba(208, 232, 242, 0.8)',
      'rgba(249, 198, 215, 0.8)',
      'rgba(197, 215, 234, 0.8)',
      'rgba(169, 199, 197, 0.8)',
    ],
    textColor: '#4a5568',
  },
};

export const getRandomTriggerColor = (theme: ThemeConfig): string => {
  const index = Math.floor(Math.random() * theme.triggerColors.length);
  return theme.triggerColors[index];
};

export const getRandomParticleColor = (theme: ThemeConfig): string => {
  const index = Math.floor(Math.random() * theme.particleColors.length);
  return theme.particleColors[index];
};
