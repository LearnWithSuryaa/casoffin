import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-hidden bg-black text-white min-h-screen flex flex-col relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/website-kelas-bf7e0.appspot.com/o/images%2Fnotfound-bg.jpg?alt=media')" }}
      ></div>
      
      <section className="relative flex-grow flex flex-col items-center justify-center text-center px-6 lg:px-8">
        {/* Content */}
        <div className="relative z-10 bg-black bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-6xl font-extrabold text-orange-400 glitch">404</h1>
          <p className="text-lg text-gray-300 mt-4 glitch-text">
            Kamu tersesat dalam dunia nostalgia... 😵
          </p>
          <p className="text-sm text-gray-400 italic">(Mungkin kenangan ini sudah hilang?)</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-full hover:opacity-90 transform hover:scale-105 transition"
          >
            Kembali ke Beranda
          </button>
        </div>
      </section>
      
      {/* Glitch Effect CSS */}
      <style>
        {`
          .glitch {
            position: relative;
            display: inline-block;
            animation: glitch 1s infinite linear alternate-reverse;
          }
          .glitch-text {
            animation: glitch-text 1.5s infinite linear alternate-reverse;
          }
          @keyframes glitch {
            0% { text-shadow: 2px 2px #ff00ff, -2px -2px #00ffff; }
            100% { text-shadow: -2px -2px #ff00ff, 2px 2px #00ffff; }
          }
          @keyframes glitch-text {
            0% { opacity: 0.8; transform: translateX(-1px); }
            100% { opacity: 1; transform: translateX(1px); }
          }
        `}
      </style>
    </div>
  );
};

export default NotFoundPage;
