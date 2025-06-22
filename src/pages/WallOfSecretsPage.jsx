import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const WallOfSecretsPage = () => {
  const [secret, setSecret] = useState("");
  const [secrets, setSecrets] = useState([]);
  const [error, setError] = useState("");

  const handlePostSecret = async (e) => {
    e.preventDefault();

    if (!secret.trim()) {
      setError("Rahasia tidak boleh kosong!");
      return;
    }

    setError("");

    const newSecret = {
      text: secret,
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "secrets"), newSecret);
      fetchSecrets();
      setSecret("");
    } catch (error) {
      setError("Gagal menyimpan rahasia. Coba lagi!");
      console.error("Error adding document: ", error);
    }
  };

  const fetchSecrets = async () => {
    try {
      const secretsQuery = query(
        collection(db, "secrets"),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(secretsQuery);
      const secretsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          text: data.text,
          timestamp: data.timestamp?.toDate() || new Date(),
        };
      });
      setSecrets(secretsData);
    } catch (error) {
      console.error("Error fetching secrets: ", error);
    }
  };

  useEffect(() => {
    fetchSecrets();
  }, []);

  const calculateCardSize = (text) => {
    const length = text.length;
    if (length < 50) return "p-4 text-base";
    if (length < 150) return "p-6 text-lg";
    return "p-8 text-xl";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      {/* Background Music */}
      <audio autoPlay loop className="hidden">
        <source src="/audio/secrets.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div className="flex-grow bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white p-8 py-28 font-mono">
        <h1 className="text-5xl font-extrabold text-center text-orange-400 mb-8 animate-pulse">
          Wall of Secrets
        </h1>

        <section className="bg-black/80 p-6 rounded-2xl shadow-xl max-w-lg mx-auto mb-8 backdrop-blur-lg border border-orange-500">
          <details className="mb-4">
            <summary className="text-orange-400 font-bold text-lg cursor-pointer">
              Apa sih ini? Klik untuk tahu lebih lanjut!
            </summary>
            <p className="text-sm text-gray-300 mt-2">
              Yo! Ini adalah Wall of Secrets, tempat dimana kamu bisa nge-post
              rahasia-rahasia terpendam yang pengen kamu share tapi nggak pengen
              orang tahu siapa yang nulis. Santai aja, nggak ada yang bakal
              nge-judge di sini. 🌚✨
            </p>
            <ul className="list-disc list-inside mt-2 text-sm text-gray-300">
              <li>Ketik rahasiamu di box yang disediain.</li>
              <li>
                Pencet tombol "Kirim Rahasia" dan voila! Rahasiamu langsung
                tampil.
              </li>
              <li>
                Rahasia yang udah kamu post bakal muncul dalam bentuk kartu
                keren. 🚀
              </li>
            </ul>
          </details>

          <form onSubmit={handlePostSecret}>
            <textarea
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Tulis rahasiamu di sini..."
              className="w-full p-4 text-sm text-white bg-black/70 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none shadow-inner backdrop-blur-md"
              rows="4"
            />
            {error && <p className="text-red-400 mt-2">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 via-pink-500 to-red-600 text-white py-2 px-4 rounded-lg mt-4 hover:from-pink-500 hover:to-orange-500 transition-transform transform hover:scale-105 shadow-lg"
            >
              Kirim Rahasia
            </button>
          </form>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {secrets.length > 0 ? (
            secrets.map(({ text, id, timestamp }) => (
              <div
                key={id}
                className={`relative bg-gray-800 rounded-3xl shadow-xl transform transition-transform duration-300 border border-orange-500 ${calculateCardSize(
                  text
                )} hover:scale-105 hover:shadow-[0_0_20px_#ff4500,0_0_60px_#ff4500]`}
              >
                <div className="absolute inset-0 rounded-3xl border border-dashed border-orange-500"></div>
                <div className="relative p-6 flex flex-col h-full justify-between">
                  <p className="italic text-gray-300 text-lg">{`"${text}"`}</p>
                  <p className="text-xs text-gray-400 text-right mt-4">
                    Diposting pada: {new Date(timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 animate-pulse col-span-full">
              Belum ada rahasia yang diposting. Jadilah yang pertama!
            </p>
          )}
        </div>
      </div>

      <Footer className="bg-gray-900 text-white py-4 text-center mt-auto" />
    </div>
  );
};

export default WallOfSecretsPage;
