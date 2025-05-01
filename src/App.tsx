import { useEffect } from 'react';
import ThreeScene from './components/ThreeScene';
import Header from './components/Header';
import Content from './components/Content';
import './App.css';

function App() {
  useEffect(() => {
    // Set the body background
    document.body.style.backgroundColor = '#121212';
    document.body.style.margin = '0';
    document.body.style.overflow = 'auto';
    document.body.style.fontFamily = 'Inter, system-ui, sans-serif';
    
    return () => {
      // Clean up if needed
    };
  }, []);

  return (
    <div className="App">
      <ThreeScene />
      <Header />
      <Content />
    </div>
  );
}

export default App;