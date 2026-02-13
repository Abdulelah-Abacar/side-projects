import React, { useEffect, useState, useRef, useCallback } from "react";

interface Bubble {
  id: string;
  left: number;
  top: number;
  size: number;
  color: string;
  xDirection: number;
  yDirection: number;
  speed: number;
}

interface BubblesAnimationProps {
  speed?: number;
  bubbleCount?: number;
}

const BubblesAnimation: React.FC<BubblesAnimationProps> = ({
  speed = 5000,
  bubbleCount = 4,
}) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const bubbleRefs = useRef<{ [key: string]: HTMLDivElement }>({});

  // Generate initial bubbles
  const generateBubbles = useCallback(() => {
    const bubbleArray = Array.from({ length: bubbleCount }, (_, index) => ({
      id: `bubble${index + 1}`,
      left: Math.random() * 90, // Random starting position (0% to 90%)
      top: Math.random() * 90, // Random starting position (0% to 90%)
      size: Math.random() * 90 + 85, // Size between 85px and 175px
      color: index < 2 ? "bg-[#FF61F6]" : "bg-[#7ABC10]", // Pink for first two, green for last two
      xDirection: Math.random() > 0.5 ? 1 : -1, // Random horizontal direction
      yDirection: Math.random() > 0.5 ? 1 : -1, // Random vertical direction
      speed: Math.random() * 0.05 + 0.09, // Base movement factor (smaller values for smoother movement)
    }));
    setBubbles(bubbleArray);
  }, [bubbleCount]);

  // Animation loop
  const animateBubbles = useCallback(() => {
    setBubbles((prevBubbles) =>
      prevBubbles.map((bubble) => {
        const movementFactor = 16 / speed; // Assuming 16ms per frame (60fps)
        const newX =
          bubble.left + bubble.xDirection * bubble.speed * movementFactor * 100;
        const newY =
          bubble.top + bubble.yDirection * bubble.speed * movementFactor * 100;

        // Reverse direction if bubble hits screen boundaries
        if (newX < 0 || newX > 100) {
          bubble.xDirection *= -1;
        }
        if (newY < 0 || newY > 100) {
          bubble.yDirection *= -1;
        }

        // Update bubble's DOM style dynamically
        const bubbleRef = bubbleRefs.current[bubble.id];
        if (bubbleRef) {
          bubbleRef.style.transform = `translate(${newX - bubble.left}%, ${
            newY - bubble.top
          }%)`;
        }

        return {
          ...bubble,
          left: newX,
          top: newY,
        };
      })
    );

    // Schedule the next animation frame
    requestAnimationFrame(animateBubbles);
  }, [speed]);

  // Initialize bubbles and start animation
  useEffect(() => {
    generateBubbles();
    const animationId = requestAnimationFrame(animateBubbles);
    return () => cancelAnimationFrame(animationId);
  }, [generateBubbles, animateBubbles]);

  return (
    <div className="relative w-full h-full">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          ref={(el) => {
            if (el) bubbleRefs.current[bubble.id] = el;
          }}
          className={`absolute rounded-full ${bubble.color} opacity-70 blur-lg`}
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            top: `${bubble.top}%`,
          }}
        />
      ))}
    </div>
  );
};

export default BubblesAnimation;
