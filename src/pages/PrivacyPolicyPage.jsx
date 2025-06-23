import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { div } from "framer-motion/client";

const PrivacyPolicyPage = () => {
  return (
    <div>
    <div className="min-h-screen bg-gray-900 text-orange-400 flex items-center justify-center px-4">
        <NavBar />
      <div className="max-w-3xl w-full bg-gray-800/70 backdrop-blur-md shadow-lg rounded-2xl p-10 border border-orange-500">
        <h1 className="text-4xl font-extrabold mb-6 text-orange-500 tracking-wide text-center">
          Kebijakan Privasi
        </h1>

        <p className="mb-4 text-lg leading-relaxed">
          Aplikasi ini menggunakan layanan Google untuk autentikasi. Kami tidak
          menyimpan data pribadi seperti email atau nama lengkap tanpa izin
          eksplisit dari pengguna.
        </p>

        <p className="mb-4 text-lg leading-relaxed">
          Data yang dikumpulkan hanya digunakan untuk keperluan login dan tidak
          dibagikan kepada pihak ketiga.
        </p>

        <p className="text-lg leading-relaxed">
          Dengan menggunakan aplikasi ini, Anda menyetujui kebijakan privasi ini. Jika ada pertanyaan, silakan hubungi tim pengembang melalui kontak yang tersedia.
        </p>

        <div className="mt-8 text-sm text-orange-300 italic text-right">
          Terakhir diperbarui: 23 Juni 2025
        </div>
      </div>
    </div>
    <div>
        <Footer />
    </div>
    </div>
  );
};

export default PrivacyPolicyPage;
