import React from "react";

const AboutSection = () => (
  <section className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 relative overflow-hidden">
    <div className="container mx-auto px-6 md:px-12">
      <div className="text-center mb-16">
        <h2
          className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500 mb-8 relative drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] p-4"
          data-aos="fade-up"
        >
          Tentang Casoffin
        </h2>
        <p
          className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed shadow-sm"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Casoffin adalah rumahnya anak-anak Informatika 2024 yang gaspol di dunia
          teknologi. Tempat nongkrong buat yang suka eksperimen, bikin proyek kece,
          dan siap bikin gebrakan di masa depan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div
          className="p-8 rounded-xl bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 shadow-xl hover:shadow-2xl transition-shadow relative overflow-hidden border border-gray-700 group"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-orange-500 opacity-40 blur-3xl rounded-full group-hover:animate-pulse"></div>
          <h3 className="text-3xl md:text-4xl font-bold text-orange-400 mb-4">
            Apa Itu Casoffin?
          </h3>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Casoffin ngebentuk lo buat jadi developer kece dengan skill programming, bikin software, dan problem solving yang out of the box. Di sini, kita belajar sambil nambah portfolio yang legit.
          </p>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Kita bukan sekadar komunitas, tapi gerakan yang ngajak lo jadi agent of change buat teknologi masa depan.
          </p>
        </div>

        <div
          className="p-8 rounded-xl bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 shadow-xl hover:shadow-2xl transition-shadow relative overflow-hidden border border-gray-700 group"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-pink-400 opacity-40 blur-3xl rounded-full group-hover:animate-pulse"></div>
          <h3 className="text-3xl md:text-4xl font-bold text-orange-400 mb-4">
            Mentor Keren
          </h3>
          <div className="flex items-center space-x-6">
            <img
              className="w-28 h-28 rounded-full shadow-2xl transform group-hover:scale-110 transition-transform duration-300 border-4 border-orange-400"
              src="/kelas/fina.png"
              alt="Mentor Keren"
            />
            <div>
              <h4 className="text-2xl font-semibold text-white">
                Fina Rahmayanti
              </h4>
              <p className="text-sm text-gray-400">Dosen Wali</p>
            </div>
          </div>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Bu Fina Rahmayanti udah malang-melintang lebih dari 5 tahun di teknologi. Gaya ngajarnya asik dan relevan, bikin lo pede hadapin tantangan industri.
          </p>
        </div>
      </div>

      <div className="mt-20 text-center">
        <h3
          className="text-3xl md:text-4xl font-semibold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500 mb-6 drop-shadow-lg"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          Misi Kita
        </h3>
        <p
          className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed max-w-4xl mx-auto shadow-sm"
          data-aos="fade-up"
          data-aos-delay="1000"
        >
          Kita di sini buat nge-build leader teknologi masa depan. Fokusnya di skill
          praktis, kerja tim, dan pengalaman langsung biar lo siap terjun ke dunia
          nyata.
        </p>
      </div>
    </div>

    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-0 w-48 h-48 bg-orange-500 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-400 opacity-20 blur-3xl rounded-full"></div>
    </div>
  </section>
);

export default AboutSection;
