import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function CSSFallbackNetwork() {
  return (
    <div className="w-full h-full relative overflow-hidden" data-testid="three-canvas-fallback">
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: '#00A8E8',
            boxShadow: '0 0 8px rgba(0,168,232,0.6)',
            opacity: Math.random() * 0.6 + 0.2,
            animation: `floatNode ${Math.random() * 8 + 4}s ease-in-out infinite ${Math.random() * 4}s alternate`,
          }}
        />
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`line-${i}`}
          className="absolute"
          style={{
            width: `${Math.random() * 120 + 40}px`,
            height: '1px',
            left: `${Math.random() * 80}%`,
            top: `${Math.random() * 100}%`,
            background: 'linear-gradient(90deg, transparent, rgba(0,168,232,0.3), transparent)',
            transform: `rotate(${Math.random() * 360}deg)`,
            animation: `fadeLineNode ${Math.random() * 6 + 3}s ease-in-out infinite ${Math.random() * 3}s alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes floatNode {
          0% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          100% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.floor(Math.random() * 20 + 5)}px, ${Math.random() > 0.5 ? '' : '-'}${Math.floor(Math.random() * 20 + 5)}px) scale(1.4); opacity: 0.8; }
        }
        @keyframes fadeLineNode {
          0% { opacity: 0.1; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

export function ThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    let renderer: THREE.WebGLRenderer;

    try {
      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        45,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 8;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);

      const particleCount = 180;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const velocities: { x: number; y: number; z: number }[] = [];

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
        velocities.push({
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.005,
        });
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: 0x00a8e8,
        size: 0.08,
        transparent: true,
        opacity: 0.85,
      });

      const particles = new THREE.Points(geometry, material);

      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00a8e8,
        transparent: true,
        opacity: 0.15,
      });

      const lineGeometry = new THREE.BufferGeometry();
      const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);

      const networkGroup = new THREE.Group();
      networkGroup.add(particles);
      networkGroup.add(linesMesh);
      scene.add(networkGroup);

      let animationFrameId: number;
      let autoRotY = 0;
      let autoRotX = 0;

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        const pos = particles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          pos[i * 3] += velocities[i].x;
          pos[i * 3 + 1] += velocities[i].y;
          pos[i * 3 + 2] += velocities[i].z;
          if (Math.abs(pos[i * 3]) > 5) velocities[i].x *= -1;
          if (Math.abs(pos[i * 3 + 1]) > 5) velocities[i].y *= -1;
          if (Math.abs(pos[i * 3 + 2]) > 5) velocities[i].z *= -1;
        }
        particles.geometry.attributes.position.needsUpdate = true;

        const linePositions: number[] = [];
        const threshold = 1.6;
        for (let i = 0; i < particleCount; i++) {
          for (let j = i + 1; j < particleCount; j++) {
            const dx = pos[i * 3] - pos[j * 3];
            const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
            const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
            if (dx * dx + dy * dy + dz * dz < threshold * threshold) {
              linePositions.push(
                pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
                pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
              );
            }
          }
        }
        linesMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

        autoRotY += 0.001;
        autoRotX += 0.0004;

        const targetY = autoRotY + mouseRef.current.x * 0.3;
        const targetX = autoRotX + mouseRef.current.y * 0.3;
        networkGroup.rotation.y += (targetY - networkGroup.rotation.y) * 0.05;
        networkGroup.rotation.x += (targetX - networkGroup.rotation.x) * 0.05;

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        if (!mountRef.current) return;
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      };

      const handleMouseMove = (e: MouseEvent) => {
        mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      };

      const handleClick = () => {
        material.size = 0.18;
        setTimeout(() => { material.size = 0.08; }, 200);
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('click', handleClick);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('click', handleClick);
        cancelAnimationFrame(animationFrameId);
        if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        lineGeometry.dispose();
        lineMaterial.dispose();
        renderer.dispose();
      };
    } catch {
      setWebglFailed(true);
      return undefined;
    }
  }, []);

  if (webglFailed) {
    return <CSSFallbackNetwork />;
  }

  return <div ref={mountRef} className="w-full h-full" data-testid="three-canvas" />;
}
