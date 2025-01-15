import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Particles from "react-tsparticles";

const NotFoundPage = () => {
  useEffect(() => {
    const ghostEyes = document.querySelectorAll('.ghost-eye');
    const onMouseMove = (e) => {
      ghostEyes.forEach((eye) => {
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX) * (180 / Math.PI);
        eye.style.transform = `rotate(${angle}deg) scale(1.1)`;
        eye.style.transition = "transform 0.2s ease-out";
      });
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  const particlesOptions = {
    background: { color: { value: "#000000" } },
    fpsLimit: 60,
    particles: {
      color: { value: "#ff4500" },
      links: { enable: true, distance: 150, color: "#ff4500" },
      move: { enable: true, speed: 2 },
    },
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden text-gray-300">
      <Particles options={particlesOptions} className="absolute inset-0 z-0" />

      <div className="relative text-center z-10">
        <div className="relative mx-auto w-72 h-72 bg-gradient-to-b from-gray-700 to-black rounded-full shadow-2xl overflow-hidden animate-ghostFloat">
          <div className="absolute w-48 h-48 bg-gradient-to-b from-gray-600 to-black rounded-full shadow-lg top-8 left-1/2 transform -translate-x-1/2">
            <div className="ghost-eye absolute w-6 h-6 bg-red-600 rounded-full top-10 left-14 border-2 border-red-800 shadow-lg"></div>
            <div className="ghost-eye absolute w-6 h-6 bg-red-600 rounded-full top-10 right-14 border-2 border-red-800 shadow-lg"></div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-10 bg-gradient-to-b from-red-600 to-red-800 rounded-b-full animate-glow"></div>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-gradient-to-b from-gray-700 to-black rounded-t-full animate-wave"></div>
        </div>
        <h1 className="text-[120px] font-extrabold text-red-600 mt-8 drop-shadow-[0_0_25px_rgba(255,0,0,0.8)] glitch">
          404
        </h1>
        <p className="text-2xl text-gray-300 mt-4">Kamu terjebak di wilayah hantu...</p>
        <Link
          to="/"
          className="mt-8 inline-block px-8 py-3 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-gray-900 transition-all duration-300 ease-out rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(255,0,0,0.8)]"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
