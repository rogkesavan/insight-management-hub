import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface GlobeProps {
  locations: Array<{
    location: {
      latitude: number;
      longitude: number;
    };
    status: string;
  }>;
}

const Globe: React.FC<GlobeProps> = ({ locations }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    globe: THREE.Mesh;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create globe
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: '#4F46E5',
      opacity: 0.8,
      transparent: true,
      wireframe: true,
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Add location markers
    locations.forEach(({ location, status }) => {
      const markerGeometry = new THREE.SphereGeometry(0.1, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({
        color: status === 'Active' ? '#22C55E' : '#EF4444',
      });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      
      // Convert lat/long to 3D coordinates
      const phi = (90 - location.latitude) * (Math.PI / 180);
      const theta = (location.longitude + 180) * (Math.PI / 180);
      const x = -5 * Math.sin(phi) * Math.cos(theta);
      const y = 5 * Math.cos(phi);
      const z = 5 * Math.sin(phi) * Math.sin(theta);
      
      marker.position.set(x, y, z);
      scene.add(marker);
    });

    camera.position.z = 15;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.005;
      renderer.render(scene, camera);
    };

    globeRef.current = { scene, camera, renderer, globe };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !globeRef.current) return;
      const { camera, renderer } = globeRef.current;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [locations]);

  return <div ref={containerRef} className="w-full h-[300px] rounded-lg" />;
};

export default Globe;