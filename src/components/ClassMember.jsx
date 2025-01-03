import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

const MembersList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animasi berlangsung 1 detik
    });

    const fetchMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "members"));
        const membersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMembers(membersData);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <section className="bg-black text-white py-20 relative">
      <div className="container mx-auto text-center px-4">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-center text-transparent bg-gradient-to-r from-orange-500 to-pink-500 mb-12 drop-shadow-lg relative"
          data-aos="zoom-in"
        >
          Anggota Kelas Casofin
        </h2>

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          navigation={true}
          modules={[EffectCoverflow, Navigation]}
          className="mySwiper"
        >
          {members.map((member) => (
            <SwiperSlide key={member.id} className="flex justify-center">
              <div
                className={`member-card relative bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center transition-transform duration-300 ${
                  member.name === "Surya Makmur Abadi"
                    ? "bg-gradient-to-br from-orange-500 via-black to-orange-600 border-2 border-orange-500"
                    : ""
                }`}
                onClick={() => window.open(member.instagram, "_blank")}
                style={{
                  cursor: "pointer",
                  width: "260px",
                  height: "340px",
                }}
                data-aos="flip-left"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl z-10"
                  style={{
                    pointerEvents: "none",
                  }}
                ></div>
                <img
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-orange-400 object-cover z-20"
                  src={member.photo}
                  alt={member.name}
                />
                <h3 className="mt-4 text-base md:text-lg font-semibold text-orange-200 z-20">
                  {member.name}
                </h3>
                <p className="mt-2 text-sm md:text-base text-orange-300 text-center z-20">
                  {member.motto}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx>{`
        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: white;
        }

        .mySwiper {
          padding: 2rem 0;
        }

        .member-card {
          perspective: 1000px;
        }

        .member-card:hover {
          transform: rotateX(5deg) rotateY(5deg) scale(1.05);
          box-shadow: 0 20px 40px rgba(255, 140, 0, 0.5);
        }

        .member-card:hover .absolute {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default MembersList;
