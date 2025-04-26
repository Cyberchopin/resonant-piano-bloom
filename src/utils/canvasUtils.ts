import { ThemeConfig } from './themeUtils';

export interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  life: number;
  maxLife: number;
}

export interface Ripple {
  x: number;
  y: number;
  size: number;
  maxSize: number;
  speed: number;
  color: string;
  opacity: number;
}

interface AuraEffect {
  x: number;
  y: number;
  size: number;
  maxSize: number;
  speed: number;
  color: string;
  opacity: number;
  pulseDirection: 1 | -1;
  pulseCount: number;
  maxPulses: number;
}

export interface BackgroundParticle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

interface FallingPetal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotationSpeed: number;
  rotation: number;
  color: string;
  opacity: number;
  swayFactor: number;
  swayOffset: number;
}

interface DriftingCloud {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  color: string;
  opacity: number;
}

export class VisualEffectEngine {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  particles: Particle[] = [];
  ripples: Ripple[] = [];
  auras: AuraEffect[] = [];
  backgroundParticles: BackgroundParticle[] = [];
  fallingPetals: FallingPetal[] = [];
  driftingClouds: DriftingCloud[] = [];
  theme: ThemeConfig;
  lastFrameTime: number = 0;
  lastPetalTime: number = 0;
  lastCloudTime: number = 0;
  
  constructor(canvas: HTMLCanvasElement, theme: ThemeConfig) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Could not get canvas context");
    this.ctx = ctx;
    this.theme = theme;
    
    // Initialize background particles
    this.initBackgroundParticles();
    
    // Start animation loop
    this.animate();
  }
  
  setTheme(theme: ThemeConfig) {
    this.theme = theme;
    // Reset background particles for new theme
    this.backgroundParticles = [];
    this.initBackgroundParticles();
    
    // Clear special effects when theme changes
    this.fallingPetals = [];
    this.driftingClouds = [];
  }
  
  initBackgroundParticles() {
    const numParticles = Math.max(20, Math.floor(this.canvas.width * this.canvas.height / 15000));
    
    for (let i = 0; i < numParticles; i++) {
      this.backgroundParticles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.2 + 0.05
      });
    }
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Adjust background particles
    this.backgroundParticles = [];
    this.initBackgroundParticles();
  }
  
  createParticleExplosion(x: number, y: number, color: string, count = 30) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;
      const size = Math.random() * 4 + 2;
      const life = Math.random() * 100 + 50;
      
      this.particles.push({
        x,
        y,
        size,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        color,
        life,
        maxLife: life
      });
    }
  }
  
  createRipple(x: number, y: number, color: string) {
    this.ripples.push({
      x,
      y,
      size: 0,
      maxSize: Math.min(this.canvas.width, this.canvas.height) * 0.3,
      speed: Math.random() * 2 + 3,
      color,
      opacity: 0.7
    });
  }
  
  createAura(x: number, y: number, color: string) {
    this.auras.push({
      x,
      y,
      size: Math.random() * 20 + 40,
      maxSize: Math.random() * 60 + 80,
      speed: Math.random() * 0.5 + 0.2,
      color,
      opacity: 0.5,
      pulseDirection: 1,
      pulseCount: 0,
      maxPulses: Math.floor(Math.random() * 3) + 2
    });
  }
  
  createFallingPetals(x: number, y: number, color: string, count = 5) {
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 10 + 8;
      this.fallingPetals.push({
        x: x + (Math.random() * 40 - 20),
        y: y,
        size: size,
        speedY: Math.random() * 1 + 0.5,
        speedX: Math.random() * 1 - 0.5,
        rotationSpeed: Math.random() * 0.02 - 0.01,
        rotation: Math.random() * Math.PI * 2,
        color: color,
        opacity: 0.8,
        swayFactor: Math.random() * 2 + 1,
        swayOffset: Math.random() * Math.PI * 2
      });
    }
  }
  
  addRandomFallingPetal() {
    if (!this.theme.backgroundEffects?.fallingPetals) return;
    
    const size = Math.random() * 12 + 6;
    this.fallingPetals.push({
      x: Math.random() * this.canvas.width,
      y: -size,
      size: size,
      speedY: Math.random() * 0.7 + 0.3,
      speedX: Math.random() * 0.5 - 0.25,
      rotationSpeed: Math.random() * 0.01 - 0.005,
      rotation: Math.random() * Math.PI * 2,
      color: this.theme.particleColors[Math.floor(Math.random() * this.theme.particleColors.length)],
      opacity: Math.random() * 0.3 + 0.3,
      swayFactor: Math.random() * 1.5 + 0.5,
      swayOffset: Math.random() * Math.PI * 2
    });
  }
  
  addRandomCloud() {
    if (!this.theme.backgroundEffects?.movingClouds) return;
    
    const width = Math.random() * 300 + 100;
    const height = width * (Math.random() * 0.4 + 0.3);
    
    this.driftingClouds.push({
      x: -width,
      y: Math.random() * (this.canvas.height * 0.7),
      width: width,
      height: height,
      speed: Math.random() * 0.2 + 0.05,
      color: 'rgba(255,255,255,0.8)',
      opacity: Math.random() * 0.1 + 0.05
    });
  }
  
  animate = (timestamp: number = 0) => {
    // Calculate delta time for smooth animations
    const deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw background
    this.updateAndDrawBackground(deltaTime);
    
    // Update and draw effects
    this.updateAndDrawEffects(deltaTime);
    
    // Add occasional background elements
    if (this.theme.backgroundEffects?.fallingPetals && 
        timestamp - this.lastPetalTime > 2000) {
      this.addRandomFallingPetal();
      this.lastPetalTime = timestamp;
    }
    
    if (this.theme.backgroundEffects?.movingClouds && 
        timestamp - this.lastCloudTime > 8000) {
      this.addRandomCloud();
      this.lastCloudTime = timestamp;
    }
    
    // Request next frame
    requestAnimationFrame(this.animate);
  };
  
  updateAndDrawBackground(deltaTime: number) {
    // Update background particles
    for (let i = 0; i < this.backgroundParticles.length; i++) {
      const particle = this.backgroundParticles[i];
      
      // Move particle slowly upward
      particle.y -= particle.speed * (deltaTime / 16);
      
      // Wrap around if out of bounds
      if (particle.y < 0) {
        particle.y = this.canvas.height;
        particle.x = Math.random() * this.canvas.width;
      }
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      this.ctx.fill();
    }
    
    // Update and draw drifting clouds
    for (let i = this.driftingClouds.length - 1; i >= 0; i--) {
      const cloud = this.driftingClouds[i];
      
      // Move cloud
      cloud.x += cloud.speed * (deltaTime / 16);
      
      // Remove if out of bounds
      if (cloud.x > this.canvas.width + cloud.width) {
        this.driftingClouds.splice(i, 1);
        continue;
      }
      
      // Draw cloud (simulated with a gradient or shape)
      const gradient = this.ctx.createRadialGradient(
        cloud.x + cloud.width / 2, 
        cloud.y + cloud.height / 2, 
        0, 
        cloud.x + cloud.width / 2, 
        cloud.y + cloud.height / 2, 
        cloud.width / 2
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${cloud.opacity})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
      
      this.ctx.beginPath();
      this.ctx.ellipse(
        cloud.x + cloud.width / 2, 
        cloud.y + cloud.height / 2, 
        cloud.width / 2, 
        cloud.height / 2, 
        0, 0, Math.PI * 2
      );
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    }
  }
  
  updateAndDrawEffects(deltaTime: number) {
    // Update and draw particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      
      // Update position
      p.x += p.speedX * (deltaTime / 16);
      p.y += p.speedY * (deltaTime / 16);
      
      // Apply friction
      p.speedX *= 0.97;
      p.speedY *= 0.97;
      
      // Decrease life
      p.life -= 1 * (deltaTime / 16);
      
      // Remove if life is over
      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }
      
      // Calculate opacity based on life
      const opacity = p.life / p.maxLife;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
      this.ctx.fill();
    }
    
    // Update and draw ripples
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      const r = this.ripples[i];
      
      // Increase size
      r.size += r.speed * (deltaTime / 16);
      
      // Decrease opacity as size increases
      r.opacity = Math.max(0, 0.7 * (1 - r.size / r.maxSize));
      
      // Remove if max size reached
      if (r.size >= r.maxSize) {
        this.ripples.splice(i, 1);
        continue;
      }
      
      // Draw ripple
      this.ctx.beginPath();
      this.ctx.arc(r.x, r.y, r.size, 0, Math.PI * 2);
      this.ctx.strokeStyle = r.color.replace(')', `, ${r.opacity})`).replace('rgb', 'rgba');
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    }
    
    // Update and draw auras
    for (let i = this.auras.length - 1; i >= 0; i--) {
      const a = this.auras[i];
      
      // Update size based on pulse direction
      if (a.pulseDirection === 1) {
        a.size += a.speed * (deltaTime / 16);
        if (a.size >= a.maxSize) {
          a.pulseDirection = -1;
        }
      } else {
        a.size -= a.speed * (deltaTime / 16);
        if (a.size <= a.maxSize / 2) {
          a.pulseDirection = 1;
          a.pulseCount++;
        }
      }
      
      // Remove if all pulses completed
      if (a.pulseCount >= a.maxPulses) {
        this.auras.splice(i, 1);
        continue;
      }
      
      // Draw aura
      this.ctx.beginPath();
      this.ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2);
      
      // Create gradient
      const gradient = this.ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, a.size);
      gradient.addColorStop(0, a.color.replace(')', `, ${a.opacity})`).replace('rgb', 'rgba'));
      gradient.addColorStop(1, a.color.replace(')', `, 0)`).replace('rgb', 'rgba'));
      
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    }
    
    // Update and draw falling petals
    for (let i = this.fallingPetals.length - 1; i >= 0; i--) {
      const petal = this.fallingPetals[i];
      
      // Add gentle sway
      const swayX = Math.sin(petal.swayOffset + (timestamp / 1000) * petal.swayFactor) * 0.5;
      
      // Update position
      petal.y += petal.speedY * (deltaTime / 16);
      petal.x += (petal.speedX + swayX) * (deltaTime / 16);
      petal.rotation += petal.rotationSpeed * (deltaTime / 16);
      
      // Remove if out of bounds
      if (petal.y > this.canvas.height + petal.size) {
        this.fallingPetals.splice(i, 1);
        continue;
      }
      
      // Draw petal
      this.ctx.save();
      this.ctx.translate(petal.x, petal.y);
      this.ctx.rotate(petal.rotation);
      
      // Draw petal shape
      this.ctx.beginPath();
      this.ctx.moveTo(0, -petal.size / 2);
      this.ctx.bezierCurveTo(
        petal.size / 2, -petal.size / 4,
        petal.size / 2, petal.size / 4,
        0, petal.size / 2
      );
      this.ctx.bezierCurveTo(
        -petal.size / 2, petal.size / 4,
        -petal.size / 2, -petal.size / 4,
        0, -petal.size / 2
      );
      
      // Set fill style with opacity
      this.ctx.fillStyle = petal.color.replace(')', `, ${petal.opacity})`).replace('rgb', 'rgba');
      this.ctx.fill();
      this.ctx.restore();
    }
  }
}
