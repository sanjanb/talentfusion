
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SkillRadarProps {
  skills: {
    name: string;
    value: number;
    category: string;
  }[];
  className?: string;
  size?: number;
  animated?: boolean;
}

const SkillRadar = ({ 
  skills, 
  className,
  size = 300,
  animated = true
}: SkillRadarProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Setup for high resolution canvas
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    
    // Clear canvas
    ctx.clearRect(0, 0, size, size);
    
    const centerX = size / 2;
    const centerY = size / 2;
    const maxRadius = (size / 2) * 0.85;
    
    // Draw background circles
    ctx.lineWidth = 1;
    
    // Draw axes
    const numAxes = skills.length;
    const angleStep = (Math.PI * 2) / numAxes;
    
    // Draw background grid
    for (let r = 1; r <= 5; r++) {
      const radius = (maxRadius / 5) * r;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.2)';
      ctx.stroke();
    }
    
    // Draw axes
    for (let i = 0; i < numAxes; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * maxRadius;
      const y = centerY + Math.sin(angle) * maxRadius;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.3)';
      ctx.stroke();
    }
    
    // Draw skill polygon with animation
    const drawSkills = (progress = 1) => {
      ctx.beginPath();
      
      skills.forEach((skill, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const value = skill.value * progress;
        const radius = (maxRadius * value) / 100;
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.closePath();
      ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.fill();
      
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
      ctx.stroke();
      
      // Draw skill points
      skills.forEach((skill, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const value = skill.value * progress;
        const radius = (maxRadius * value) / 100;
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgb(59, 130, 246)';
        ctx.fill();
      });
    };
    
    if (animated) {
      let progress = 0;
      const animationSpeed = 0.02;
      
      const animate = () => {
        ctx.clearRect(0, 0, size, size);
        
        // Redraw background grid
        for (let r = 1; r <= 5; r++) {
          const radius = (maxRadius / 5) * r;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(100, 116, 139, 0.2)';
          ctx.stroke();
        }
        
        // Redraw axes
        for (let i = 0; i < numAxes; i++) {
          const angle = i * angleStep - Math.PI / 2;
          const x = centerX + Math.cos(angle) * maxRadius;
          const y = centerY + Math.sin(angle) * maxRadius;
          
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          ctx.strokeStyle = 'rgba(100, 116, 139, 0.3)';
          ctx.stroke();
          
          // Draw skill labels
          const labelRadius = maxRadius + 15;
          const labelX = centerX + Math.cos(angle) * labelRadius;
          const labelY = centerY + Math.sin(angle) * labelRadius;
          
          ctx.font = "10px Inter, sans-serif";
          ctx.fillStyle = 'rgba(100, 116, 139, 0.8)';
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(skills[i].name, labelX, labelY);
        }
        
        drawSkills(progress);
        progress += animationSpeed;
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    } else {
      // Draw skill labels
      for (let i = 0; i < numAxes; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const labelRadius = maxRadius + 15;
        const labelX = centerX + Math.cos(angle) * labelRadius;
        const labelY = centerY + Math.sin(angle) * labelRadius;
        
        ctx.font = "10px Inter, sans-serif";
        ctx.fillStyle = 'rgba(100, 116, 139, 0.8)';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(skills[i].name, labelX, labelY);
      }
      
      drawSkills();
    }
  }, [skills, size, animated]);
  
  return (
    <div className={cn("relative", className)}>
      <canvas ref={canvasRef} style={{ width: size, height: size }} className="touch-none" />
    </div>
  );
};

export default SkillRadar;
