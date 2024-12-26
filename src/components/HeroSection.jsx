import React, { useState } from 'react';

const HeroSection = () => {
  const [kodam, setKodam] = useState('');
  const [name, setName] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const kodamList = [
    "cakil ijo", "Tikus got", "Wibu bawang", "Pecel gravitasi", "Soto gravitasi", "Mulyono",
    "Kanebo kering", "LC suhat", "Darah biru", "Maklor", "Macan songgoriti", "Pocong pink", "Kuntilanak recing",
    "Belut listrik", "Rayap besi", "Ayam kalkun", "Bajing loncat", "Buaya sunda", "Kanjut badak",
    "Pagar besi", "Batu bata", "Helm bogo", "Gitar spanyol", "Sate babi", "Gelas pecah", "Genderuwo botak",
    "Kuntilanak karaoke", "Tas LV", "Macan putih", "Harimau hitam", "Korek api", "Agus kopling", "Batako",
    "Bedhes buntung", "Gus miftah", "Vero sleep man", "Ulo gondrong", "Lembu suro", "Sapi perah", "Lc dinoyo",
    "Bajing kero", "pot cuscus", "jaket ijo penjahat kelamin", "Gemek", "kunti berjenggot", "babi ijo",
    "kontol cincak", "kontol kejepit", "bagas dribel", "pelak cengken", "Agus pengkor", "jamet cekeng",
    "windah batubata", "windah bersaudara"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomKodam = kodamList[Math.floor(Math.random() * kodamList.length)];
    setKodam(randomKodam);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/background.jpeg')",
        backgroundPosition: "center bottom",
      }}
    >
      <div className="absolute inset-0 bg-orange-800 bg-opacity-70 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-black z-0"></div>
      <div className="container relative z-10 mx-auto px-4 sm:px-6 py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Selamat Datang di <span className="text-orange-300">Casofin</span>
          </h1>
          <p className="mt-4 text-sm sm:text-lg text-gray-200">
            Mengabadikan momen berharga bersama teman-teman kelas kami. Jelajahi kenangan yang penuh cerita dan tawa.
          </p>
          <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-4">
            <button
              onClick={() => handleScrollTo('gallery')}
              className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-medium bg-orange-500 hover:bg-orange-600 rounded-full transition-transform transform hover:scale-105"
            >
              Lihat Galeri Foto
            </button>
            <button
              onClick={() => handleScrollTo('about')}
              className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-medium border-2 border-orange-500 hover:border-orange-600 text-white hover:text-orange-500 rounded-full transition-all"
            >
              Tentang Kami
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="relative mx-auto w-full max-w-md text-center lg:text-left lg:ml-auto lg:mt-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-900 blur-xl opacity-50 rounded-full"></div>
          <div className="relative p-6 bg-gray-800 bg-opacity-80 rounded-lg shadow-2xl">
            <h2 className="text-xl font-bold text-orange-400">Masukkan Nama Anda</h2>
            <p className="mt-2 text-sm text-gray-300">Cek Khodam dan temukan makna di balik nama Anda.</p>
            <form className="mt-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Masukkan nama kamu"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 text-sm text-gray-900 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
              <button
                type="submit"
                className={`mt-4 w-full px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-transform transform ${isAnimating ? 'scale-105' : ''}`}
              >
                Cek
              </button>
            </form>
            {kodam && (
              <div className="mt-6 p-4 bg-gray-700 bg-opacity-80 rounded-lg text-center">
                <p className="text-sm text-orange-300">Khodam <span className="font-bold text-orange-500">{name}</span> hari ini adalah...</p>
                <p className="mt-2 text-xl font-bold text-orange-500">✨ {kodam} ✨</p>
                <p className="mt-4 text-xs text-gray-400 italic">"Percuma punya khodam, kalau selalu feeling lonely 😔"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
