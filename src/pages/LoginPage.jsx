import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup, // ✅ Ditambahkan agar tidak undefined
} from 'firebase/auth';
import { app } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const LoginPage = () => {
  const containerRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const form = containerRef.current;

    // 🔹 Animasi masuk menggunakan GSAP
    gsap.fromTo(
      form,
      { opacity: 0, y: 50, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
      }
    );

    gsap.fromTo(
      form.querySelectorAll('h2, form div, button, p'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5,
      }
    );

    // 🔹 Cek apakah user sudah login sebelumnya
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/'); // Redirect ke home jika sudah login
      }
    });

    // 🔹 Cek apakah login melalui redirect berhasil
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          navigate('/'); // Redirect jika sukses
        }
      })
      .catch((err) => {
        console.error('Redirect Error:', err.message);
        setError(`Login dengan Google gagal: ${err.message}`);
      });

    return () => unsubscribe(); // Cleanup listener saat komponen di-unmount
  }, [navigate]);

  // 🔹 Login dengan Email & Password
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirect ke home setelah login
    } catch (err) {
      setError('Login gagal. Periksa kembali email dan password Anda.');
    }
  };

  // 🔹 Login dengan Google
  const handleGoogleLogin = async () => {
    try {
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      
      if (isSafari) {
        await signInWithRedirect(auth, googleProvider); // ✅ Safari tidak mendukung popup
      } else {
        await signInWithPopup(auth, googleProvider); // ✅ Browser lain pakai popup
      }
      
      navigate('/');
    } catch (err) {
      console.error('Error:', err.message);
      setError(`Login dengan Google gagal: ${err.message}`);
    }
  };

  // 🔹 Redirect ke halaman register
  const handleRegisterRedirect = () => {
    navigate('/Register');
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
      <div ref={containerRef} className="bg-gray-800 rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-6 text-center">
          Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-500 text-lg" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full pl-10 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-white"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-gray-500 text-lg" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full pl-10 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-white"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 py-3 flex items-center justify-center bg-gradient-to-r from-blue-300 to-indigo-400 text-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
        >
          <FcGoogle className="text-xl mr-2" /> Login dengan Google
        </button>
        <p className="mt-6 text-center text-gray-400">
          Belum punya akun?{' '}
          <button
            onClick={handleRegisterRedirect}
            className="text-orange-500 hover:text-orange-600 hover:underline transition-colors duration-200"
          >
            Daftar di sini
          </button>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
