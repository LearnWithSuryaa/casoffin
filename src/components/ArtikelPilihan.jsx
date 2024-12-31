import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";

gsap.registerPlugin(ScrollTrigger);

const ArtikelPilihan = ({ articles }) => {
  useEffect(() => {
    const cards = document.querySelectorAll(".artikel-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".artikel-grid",
          start: "top 80%",
        },
      }
    );

    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-16 relative">
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl md:text-5xl font-extrabold bg-clip-text text-center text-transparent bg-gradient-to-r from-orange-500 to-pink-500 mb-12 drop-shadow-lg relative"
          data-aos="zoom-in"
        >
          Artikel Pilihan
        </h2>
        <div
          className="artikel-grid grid md:grid-cols-3 gap-8 relative"
          data-aos="fade-up"
        >
          {articles.map((item, index) => (
            <div
              key={index}
              className="artikel-card bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-6 rounded-lg shadow-2xl hover:shadow-orange-500 transition-transform transform hover:rotate-2 hover:scale-105 relative overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-orange-400/10 via-transparent to-black opacity-80 -z-10"></div>
              <div className="overflow-hidden rounded-lg mb-4">
                <img
                  src={item.image}
                  alt={`Artikel ${item.title}`}
                  className="transform hover:scale-110 transition duration-500 rounded-lg border-2 border-orange-500"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-orange-400">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.description}</p>
              <Link
                to={item.link}
                className="block mt-4 text-orange-500 hover:text-orange-300 hover:underline font-semibold"
              >
                Baca Selengkapnya &rarr;
              </Link>
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default ArtikelPilihan;
