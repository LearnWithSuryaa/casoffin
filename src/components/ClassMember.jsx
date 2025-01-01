import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebaseConfig";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const MembersList = () => {
  const [members, setMembers] = useState([]);
  const [displayedMembers, setDisplayedMembers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [newMember, setNewMember] = useState({
    name: "",
    motto: "",
    instagram: "",
  });
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const containerRef = useRef(null);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "members"));
        const membersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMembers(membersData);
        setDisplayedMembers(membersData.slice(0, 12));
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const fetchMoreMembers = () => {
    const nextMembers = members.slice(
      displayedMembers.length,
      displayedMembers.length + 12
    );
    if (nextMembers.length === 0) {
      setHasMore(false);
    } else {
      setDisplayedMembers((prev) => [...prev, ...nextMembers]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({ ...prev, [name]: value }));
  };

  const uploadImage = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `members/${file.name}-${Date.now()}`);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
  };

  const handleAddMember = async (e) => {
    e.preventDefault();

    try {
      let photoURL = "";
      if (uploadedPhoto) {
        if (!uploadedPhoto.type.startsWith("image/")) {
          alert("Mohon unggah file gambar!");
          return;
        }

        if (uploadedPhoto.size > 2 * 1024 * 1024) {
          // 2MB limit
          alert("Ukuran gambar tidak boleh lebih dari 2MB!");
          return;
        }

        photoURL = await uploadImage(uploadedPhoto);
      }

      const newMemberData = { ...newMember, photo: photoURL };
      const docRef = await addDoc(collection(db, "members"), newMemberData);
      const addedMember = { id: docRef.id, ...newMemberData };

      setMembers((prev) => [addedMember, ...prev]);
      setDisplayedMembers((prev) => [addedMember, ...prev]);
      setNewMember({ name: "", motto: "", instagram: "" });
      setUploadedPhoto(null);

      alert("Member berhasil ditambahkan!");
    } catch (error) {
      console.error("Error adding member:", error);
      alert("Terjadi kesalahan saat menambahkan member.");
    }
  };

  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll(".member-card");
    elements?.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [displayedMembers]);

  return (
    <section
      className="bg-black text-white py-20 relative overflow-hidden"
      ref={containerRef}
    >
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500 mb-8 drop-shadow-lg">
          Anggota Kelas Casofin
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedMembers.map((member) => (
            <div
              key={member.id}
              className={`member-card bg-gray-800 rounded-2xl shadow-2xl p-4 sm:p-6 transform hover:scale-105 transition-transform duration-300 hover:shadow-orange-400 hover:bg-gray-600 ${
                member.name === "Surya Makmur Abadi" ? "bg-gradient-to-br from-orange-500 via-black to-orange-600 border-2 border-orange-500" : ""
              }`}
              onClick={() => window.open(member.instagram, "_blank")}
              style={{
                cursor: "pointer",
              }}
            >
              <img
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 border-4 border-orange-400"
                src={member.photo}
                alt={member.name}
              />
              <h3 className="text-lg sm:text-xl font-semibold text-pink-500 mb-2">
                {member.name}
              </h3>
              <p className="text-sm sm:text-base text-gray-400">{member.motto}</p>
            </div>
          ))}
        </div>

        {hasMore && (
          <button
            onClick={fetchMoreMembers}
            className="mt-10 px-6 py-3 w-full sm:w-auto bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg shadow-lg hover:from-orange-500 hover:to-pink-600 hover:shadow-xl transition-all duration-300"
          >
            Tampilkan Lebih Banyak
          </button>
        )}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-48 h-48 bg-orange-500 opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-400 opacity-20 blur-3xl rounded-full"></div>
      </div>
    </section>
  );
};

export default MembersList;
