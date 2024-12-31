import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';

const auth = getAuth(app);

const RegisterPage = () => {
  const containerRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const form = containerRef.current;

    // Animasi masuk untuk form container
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

    // Animasi berantai untuk elemen di dalam form
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
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirect ke halaman utama setelah registrasi berhasil
    } catch (err) {
      setError('Registrasi gagal. Silakan coba lagi.');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
      <div ref={containerRef} className="bg-gray-800 rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-6 text-center">
          Daftar
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-6" onSubmit={handleRegister}>
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
                className="mt-1 block w-full pl-10 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-orange-400 focus:border-orange-400 text-white"
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
                className="mt-1 block w-full pl-10 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-orange-400 focus:border-orange-400 text-white"
              />
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">
              Konfirmasi Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-gray-500 text-lg" />
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full pl-10 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-orange-400 focus:border-orange-400 text-white"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            Daftar
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          Sudah punya akun?{' '}
          <button
            onClick={() => navigate('/Login')}
            className="text-orange-500 hover:text-orange-600 hover:underline transition-colors duration-200"
          >
            Login di sini
          </button>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;
