import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Import Firestore

const units = ["/Rating/1.png", "/Rating/2.png", "/Rating/3.png", "/Rating/4.png", "/Rating/5.png"];

export default function Rating() {
    const safeGetLocalStorage = (key, defaultValue) => {
        try {
            const value = localStorage.getItem(key);
            return value !== null ? JSON.parse(value) : defaultValue;
        } catch {
            return defaultValue;
        }
    };

    const [value, setValue] = useState(() => safeGetLocalStorage("lastRating", 5.0));
    const [remainingRatings, setRemainingRatings] = useState(() => safeGetLocalStorage("remainingRatings", 3));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        localStorage.setItem("lastRating", JSON.stringify(value));
    }, [value]);

    useEffect(() => {
        localStorage.setItem("remainingRatings", JSON.stringify(remainingRatings));
    }, [remainingRatings]);

    const handleChange = (event) => {
        const newValue = parseFloat(event.target.value);
        if (newValue >= 0 && newValue <= 10 && remainingRatings > 0) {
            setValue(newValue);
        }
    };

    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const handleSliderChange = debounce(async () => {
        if (remainingRatings > 0 && !isSubmitting) {
            setIsSubmitting(true);
            setErrorMessage("");

            try {
                const docRef = await addDoc(collection(db, "ratings"), {
                    value: value,
                    timestamp: new Date(),
                });
                console.log("Document written with ID: ", docRef.id);

                setRemainingRatings((prev) => prev - 1);
            } catch (e) {
                console.error("Error adding document: ", e);
                setErrorMessage("Gagal menyimpan rating. Silakan coba lagi.");
            } finally {
                setIsSubmitting(false);
            }
        }
    }, 500);

    const resetRatings = () => {
        setRemainingRatings(3);
        localStorage.setItem("remainingRatings", "3");
    };

    const imgIndex = Math.min(Math.floor(value / 2), units.length - 1);

    return (
        <div style={{ width: "307px", margin: "auto", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "white", marginBottom: "1rem" }}>
                <span style={{ fontWeight: "bold", fontSize: "12px", color: "#ff9900", textShadow: "0px 0px 8px #ff9900" }}>RATE US</span>
                <span style={{ fontWeight: "bold", fontSize: "12px" }}>{value.toFixed(1)}</span>
            </div>

            <div style={{ marginBottom: "1rem" }}>
                <img
                    src={units[imgIndex]}
                    alt={`Rating ${imgIndex + 1}`}
                    style={{ width: "40px", height: "40px", filter: "drop-shadow(0px 0px 8px #ff9900)" }}
                />
            </div>

            <input
                type="range"
                value={value}
                min="0"
                max="10"
                step="0.1"
                onChange={handleChange}
                onMouseUp={handleSliderChange}
                disabled={remainingRatings === 0 || isSubmitting}
                style={{
                    width: "100%",
                    maxWidth: "300px",
                    appearance: "none",
                    height: "8px",
                    background: "linear-gradient(90deg, #ff9900 0%, #ffcc33 100%)",
                    borderRadius: "5px",
                    outline: "none",
                    opacity: 0.9,
                    transition: "opacity .2s",
                    boxShadow: "0px 0px 8px #ff9900",
                }}
            />

            {isSubmitting && <p style={{ color: "#ffcc33", marginTop: "1rem" }}>Menyimpan rating...</p>}
            {errorMessage && <p style={{ color: "red", marginTop: "1rem" }}>{errorMessage}</p>}
            {remainingRatings === 0 && <p style={{ color: "white", marginTop: "1rem" }}>Anda telah memberikan semua rating.</p>}

        </div>
    );
}
