import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";

const CekKhodam = () => {
  const [name, setName] = useState("");
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [lastGenerated, setLastGenerated] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrors({ name: "Nama harus diisi dong~ Jangan skip ya! 🫣" });
      setResult(null);
    } else {
      setErrors({});
      const now = Date.now();

      if (lastGenerated[name] && now - lastGenerated[name] < 10 * 60 * 1000) {
        setResult("Woi, tunggu 10 menit lagi buat cek ulang! ✋");
      } else {
        const khodam = calculateKhodam(name);
        setResult(khodam);
        setLastGenerated({ ...lastGenerated, [name]: now });
      }
    }
  };

  const calculateKhodam = (name) => {
    const khodamTypes = [
      "cakil ijo",
      "Tikus got",
      "Wibu bawang",
      "Pecel gravitasi",
      "Soto gravitasi",
      "Mulyono",
      "Kanebo kering",
      "LC suhat",
      "Gus",
      "Maklor",
      "Macan songgoriti",
      "Pcong pink",
      "Kuntilanak recing",
      "Belut listrik",
      "Rayap besi",
      "Ayam kalkun",
      "Bajing loncat",
      "Buaya sunda",
      "Kanjut badak",
      "Pagar besi",
      "Batu bata",
      "Helm bogo",
      "Gitar spanyol",
      "Sate babi",
      "Gelas pecah",
      "Genderuwo botak",
      "Kuntilanak karaoke",
      "Tas LV",
      "Macan putih",
      "Harimau hitam",
      "Korek api",
      "Agus kopling",
      "Batako",
      "Bedhes buntung",
      "Gus miftah",
      "Vero sleep man",
      "Ulo gondrong",
      "Lembu suro",
      "Sapi perah",
      "Lc dinoyo",
      "Bajing kero",
      "pot cuscus",
      "jaket ijo penjahat kelamin",
      "Gemek",
      "Kunti berjenggot",
      "Babi ijo",
      "Kontol cincak",
      "Kontol kejepit",
      "Bagas dribel",
      "Pelak cengken",
      "Agus pengkor",
      "Jamet cekeng",
      "Windah batubata",
      "Windah bersaudara",
      "Kuda Cuky",
    ];
    const randomIndex = Math.floor(Math.random() * khodamTypes.length);
    return `✨ ${khodamTypes[randomIndex]} ✨`;
  };

  return (
    <div>
      {/* Background Music */}
      <audio autoPlay loop className="hidden">
        <source src="/audio/khodam.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div className="bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white min-h-screen flex flex-col items-center py-12 px-6 font-sans">
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600 tracking-wide drop-shadow-lg">
            Cek Khodam
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Temukan siapa "temen tak kasat mata" kamu hari ini dan tingkatkan
            vibes harianmu! 🔮
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="mt-10 bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-xl shadow-lg w-full max-w-xl transform hover:scale-105 transition-transform duration-300 border border-orange-500 backdrop-blur-md"
        >
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-lg font-medium mb-2 text-orange-300"
            >
              Nama Kamu:
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama kamu"
              className="w-full p-4 border border-orange-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-orange-500 bg-gray-700 text-white text-lg shadow-inner"
            />
            {errors.name && (
              <p className="text-sm text-red-400 mt-2">{errors.name}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-400 via-pink-500 to-red-600 text-white py-3 px-6 rounded-lg hover:opacity-90 transition-all font-bold text-lg tracking-wide shadow-xl"
          >
            Cek Sekarang 🚀
          </button>
        </form>

        {result && (
          <section className="mt-10 bg-gradient-to-b from-gray-800 via-gray-900 to-black p-8 rounded-xl shadow-xl text-center max-w-xl border border-orange-500 transform hover:scale-105 transition-transform duration-300">
            {result === "Woi, tunggu 10 menit lagi buat cek ulang! ✋" ? (
              <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
                {result}
              </p>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-orange-300 mb-4">
                  Khodam Kamu Hari Ini:
                </h3>
                <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
                  {result}
                </p>
                <p className="mt-4 text-sm text-gray-400 italic">
                  "Percuma punya khodam, tapi gapunya someone to talk 😔"
                </p>
              </>
            )}
          </section>
        )}

        <footer className="mt-12 bg-gray-800 p-6 rounded-xl shadow-lg text-center max-w-3xl border border-gray-700">
          <h2 className="text-3xl font-bold text-orange-300 mb-4">
            Apa itu Khodam?
          </h2>
          <p className="text-gray-300 text-lg">
            Khodam itu kayak spirit guide yang bantuin kamu lebih semangat atau
            hoki di hari tertentu. Di sini, kamu bisa cek siapa khodam yang
            mendukung vibes kamu hari ini! 🌟
          </p>
        </footer>
      </div>
      <Footer />
    </div>
  );
};

export default CekKhodam;
