import React from 'react';
import { motion } from 'framer-motion';

interface StickVisualizerProps {
  count: number;
}

const StickVisualizer: React.FC<StickVisualizerProps> = ({ count }) => {
  // Configuration for drawing
  const triangleBase = 60;
  const triangleHeight = 52; // sqrt(60^2 - 30^2) ≈ 51.96
  const startX = 10;
  const startY = 10;
  const strokeWidth = 4;
  const color = "#F59E0B"; // Amber-500

  // Coordinates generator
  const getSticks = () => {
    const sticks = [];
    
    for (let i = 0; i < count; i++) {
      const isUpright = i % 2 === 0;
      const offsetX = i * (triangleBase / 2);
      
      if (i === 0) {
        // First triangle (Upright)
        // Left side /
        sticks.push({ x1: startX, y1: startY + triangleHeight, x2: startX + triangleBase/2, y2: startY, id: `t0-l` });
        // Right side \
        sticks.push({ x1: startX + triangleBase/2, y1: startY, x2: startX + triangleBase, y2: startY + triangleHeight, id: `t0-r` });
        // Bottom _
        sticks.push({ x1: startX, y1: startY + triangleHeight, x2: startX + triangleBase, y2: startY + triangleHeight, id: `t0-b` });
      } else {
        // Subsequent triangles
        if (isUpright) {
           const originX = startX + offsetX;
           // Right side \
           sticks.push({ 
             x1: originX + triangleBase/2, 
             y1: startY, 
             x2: originX + triangleBase, 
             y2: startY + triangleHeight, 
             id: `t${i}-r` 
           });
           // Bottom _
           sticks.push({ 
             x1: originX, 
             y1: startY + triangleHeight, 
             x2: originX + triangleBase, 
             y2: startY + triangleHeight, 
             id: `t${i}-b` 
           });
        } else {
          // Current is Inverted (pointing down)
          const originX = startX + offsetX;
          // Top _ (for inverted)
          sticks.push({
             x1: originX,
             y1: startY,
             x2: originX + triangleBase,
             y2: startY,
             id: `t${i}-t`
          });
          // Right / (downwards slant for inverted)
          sticks.push({
             x1: originX + triangleBase,
             y1: startY,
             x2: originX + triangleBase/2,
             y2: startY + triangleHeight,
             id: `t${i}-s`
          });
        }
      }
    }
    return sticks;
  };

  const sticks = getSticks();
  const calculatedWidth = startX * 2 + (count * triangleBase / 2) + triangleBase / 2;
  const containerWidth = Math.max(calculatedWidth, 300);

  return (
    <div className="w-full overflow-x-auto p-4 bg-white rounded-xl shadow-inner border border-slate-200 flex justify-center min-h-[150px] items-center relative">
       {/* Background Grid Pattern for Math feel */}
       <div className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', 
              backgroundSize: '20px 20px' 
            }} 
       />
      <svg 
        width={containerWidth} 
        height={triangleHeight + startY * 2} 
        viewBox={`0 0 ${containerWidth} ${triangleHeight + startY * 2}`}
        className="mx-auto z-10 transition-all duration-300"
      >
        {sticks.map((stick, index) => (
          <motion.line
            key={stick.id}
            x1={stick.x1}
            y1={stick.y1}
            x2={stick.x2}
            y2={stick.y2}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ 
              duration: 0.4, 
              // Faster delay for smoother incremental animation
              delay: index * 0.03, 
              ease: "easeOut" 
            }}
          />
        ))}
        {/* Helper text for counting */}
        {Array.from({ length: count }).map((_, i) => (
             <motion.text 
                key={`label-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                x={startX + (i * triangleBase/2) + triangleBase/2} 
                y={triangleHeight + startY + 25} 
                textAnchor="middle" 
                className="fill-slate-400 text-xs font-mono font-bold"
             >
                {i + 1}
             </motion.text>
        ))}
      </svg>
    </div>
  );
};

export default StickVisualizer;