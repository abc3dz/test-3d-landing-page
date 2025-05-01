import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface ThreeSceneProps {
  className?: string;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ className }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const spheresRef = useRef<THREE.Mesh[]>([]);
  const frameIdRef = useRef<number>(0);

  // Setup Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    // Create floating spheres
    const createSpheres = () => {
      const spheres: THREE.Mesh[] = [];
      const colors = [0x4285F4, 0x34A853, 0xFBBC05, 0xEA4335];
      
      for (let i = 0; i < 15; i++) {
        const geometry = new THREE.SphereGeometry(0.2,8,8);
        const material = new THREE.MeshBasicMaterial({
          color: colors[Math.floor(Math.random() * colors.length)],
          wireframe: true,
        });
        
        const sphere = new THREE.Mesh(geometry, material);
        
        // Random positions
        sphere.position.x = (Math.random() - 0.5) * 10;
        sphere.position.y = (Math.random() - 0.5) * 10;
        sphere.position.z = (Math.random() - 0.5) * 5 - 3;
        
        scene.add(sphere);
        spheres.push(sphere);
        
        // Animate with GSAP
        animateSphere(sphere);
      }
      
      spheresRef.current = spheres;
    };
    
    const animateSphere = (sphere: THREE.Mesh) => {
      // Create random animation duration and delay
      const duration = 10 + Math.random() * 20;
      const delay = Math.random() * 5;
      
      // Animate position with GSAP
      gsap.to(sphere.position, {
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 5 - 3,
        duration: duration,
        delay: delay,
        ease: 'power1.inOut',
        onComplete: () => {
          // Continuous animation
          animateSphere(sphere);
        }
      });
      
      // Also animate rotation
      gsap.to(sphere.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: duration * 0.6,
        delay: delay,
        ease: 'none',
      });
    };
    
    createSpheres();
    
    // Handle resizing
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      // Rotate the spheres gently
      spheresRef.current.forEach(sphere => {
        sphere.rotation.x += 0.001;
        sphere.rotation.y += 0.001;
      });
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      frameIdRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameIdRef.current);
      
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose geometries and materials to prevent memory leaks
      spheresRef.current.forEach(sphere => {
        sphere.geometry.dispose();
        (sphere.material as THREE.Material).dispose();
      });
    };
  }, []);

  return <div ref={mountRef} className={`absolute top-0 left-0 w-full h-full -z-10 ${className || ''}`} />;
};

export default ThreeScene;