import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const MembersList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
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
          className="text-4xl md:text-5xl font-extrabold bg-clip-text text-center text-transparent bg-gradient-to-r from-orange-500 to-pink-500 mb-12 drop-shadow-lg relative"
          data-aos="zoom-in"
        >
          Anggota Kelas Casofin
        </h2>

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
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
          {members.map((member, index) => (
            <SwiperSlide key={member.id} className="flex justify-center">
              <div
                className={`member-card bg-gray-800 rounded-2xl shadow-2xl p-4 sm:p-6 transform hover:scale-105 transition-transform duration-300 hover:shadow-orange-400 hover:bg-gray-600 flex flex-col justify-center items-center ${
                  member.name === "Surya Makmur Abadi" ? "bg-gradient-to-br from-orange-500 via-black to-orange-600 border-2 border-orange-500" : ""
                }`}
                onClick={() => window.open(member.instagram, "_blank")}
                style={{
                  cursor: "pointer",
                  width: "260px",
                  height: "340px",
                }}
              >
                <img
                  className="w-28 h-28 rounded-full border-4 border-orange-400 object-cover"
                  src={member.photo}
                  alt={member.name}
                />
                <h3 className="mt-4 text-lg font-semibold text-orange-200">
                  {member.name}
                </h3>
                <p className="mt-2 text-sm text-orange-300 text-center">
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
      `}</style>
    </section>
  );
};

export default MembersList;
