import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!headerRef.current || !logoRef.current || !navItemsRef.current) return;
    
    // Create timeline for header animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1 }
    )
    .fromTo(
      navItemsRef.current.children,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.8 },
      '-=0.5'
    );
  }, []);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-10">
      <div ref={logoRef} className="text-white text-2xl font-bold">ABCzezeze</div>
      <nav>
        <ul ref={navItemsRef} className="flex gap-8">
          <li><a href="#home" className="text-white hover:text-blue-400 transition-colors">Home</a></li>
          <li><a href="#about" className="text-white hover:text-blue-400 transition-colors">About</a></li>
          <li><a href="#services" className="text-white hover:text-blue-400 transition-colors">Services</a></li>
          {/*<li><a href="#contact" className="text-white hover:text-blue-400 transition-colors">Contact</a></li>*/}
        </ul>
      </nav>
    </header>
  );
};

export default Header;