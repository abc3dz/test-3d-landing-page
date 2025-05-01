import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Content = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  
  // Add to refs array for animation
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  useEffect(() => {
    if (!heroRef.current) return;
    
    // Hero section animation
    gsap.fromTo(
      heroRef.current.children,
      { opacity: 0, y: 100 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        stagger: 0.2,
        delay: 0.5, 
        ease: 'power3.out' 
      }
    );
    
    // Create animations for each section using ScrollTrigger
    sectionsRef.current.forEach((section) => {
      gsap.fromTo(
        section.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });
  }, []);

  return (
    <div className="relative z-0">
      {/* Hero Section */}
      <section 
        id="home" 
        ref={heroRef} 
        className="h-screen flex flex-col justify-center items-center text-center px-4"
      >
        <h1 className="text-white text-6xl font-bold mb-6">Welcome to ABCzezeze</h1>
        <p className="text-gray-300 text-xl max-w-2xl mb-8">
          Explore the possibilities of three-dimensional web experiences with our cutting-edge technology solutions.
        </p>
        {/*<button className="bg-blue-600 text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors">
          Get Started
        </button>*/}
      </section>
      
      {/* About Section */}
      <section 
        id="about" 
        ref={addToRefs} 
        className="min-h-screen flex flex-col justify-center bg-gray-900 py-24 px-8"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white text-5xl font-bold mb-10">About Us</h2>
          <p className="text-gray-300 text-xl mb-8">
            I'm a solo developer and designer creating immersive 3D web experiences that push the boundaries of what's possible on the web.
          </p>
          <p className="text-gray-300 text-xl mb-8">
            My mission is to transform the digital landscape through innovative solutions that engage, inspire, and delight users around the world.
          </p>
        </div>
      </section>
      
      {/* Services Section */}
      <section 
        id="services" 
        ref={addToRefs}
        className="min-h-screen flex flex-col justify-center py-24 px-8"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white text-5xl font-bold mb-16 text-center">Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-gray-800 p-8 rounded-lg">
              <h3 className="text-white text-2xl font-bold mb-4">3D Web Design</h3>
              <p className="text-gray-300">
                Create stunning 3D websites that captivate your audience and provide an unforgettable user experience.
              </p>
            </div>
            
            <div className="bg-gray-800 p-8 rounded-lg">
              <h3 className="text-white text-2xl font-bold mb-4">Interactive Experiences</h3>
              <p className="text-gray-300">
                Build interactive 3D experiences that engage users and showcase your products in new and exciting ways.
              </p>
            </div>
            
            <div className="bg-gray-800 p-8 rounded-lg">
              <h3 className="text-white text-2xl font-bold mb-4">3D Visualization</h3>
              <p className="text-gray-300">
                Transform complex data and concepts into intuitive 3D visualizations that make information accessible.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      {/*<section 
        id="contact" 
        ref={addToRefs}
        className="min-h-screen flex flex-col justify-center bg-gray-900 py-24 px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white text-5xl font-bold mb-10">Get In Touch</h2>
          <p className="text-gray-300 text-xl mb-12">
            Ready to bring your ideas to life in 3D? Reach out to us and let's create something amazing together.
          </p>
          
          <form className="max-w-xl mx-auto">
            <div className="mb-6">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full bg-gray-800 text-white p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full bg-gray-800 text-white p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-8">
              <textarea 
                placeholder="Your Message" 
                rows={5}
                className="w-full bg-gray-800 text-white p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>*/}
    </div>
  );
};

export default Content;