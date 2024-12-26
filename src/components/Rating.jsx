import * as React from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const units = ["/Rating/1.png", "/Rating/2.png", "/Rating/3.png", "/Rating/4.png", "/Rating/5.png"];

// Inisialisasi Firestore
const db = getFirestore();

export default function Rating() {
    const [value, setValue] = React.useState(() => {
        const lastRating = localStorage.getItem("lastRating");
        return lastRating ? parseFloat(lastRating) : 5.0;
    });

    const [remainingRatings, setRemainingRatings] = React.useState(() => {
        const remaining = localStorage.getItem("remainingRatings");
        return remaining ? parseInt(remaining, 10) : 3;
    });

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleChange = (event) => {
        const newValue = parseFloat(event.target.value);
        if (remainingRatings > 0) {
            setValue(newValue);
        }
    };

    const handleSliderChange = async () => {
        if (remainingRatings > 0 && !isSubmitting) {
            setIsSubmitting(true);

            try {
                const docRef = await addDoc(collection(db, "ratings"), {
                    value: value,
                    timestamp: new Date(),
                });
                console.log("Document written with ID: ", docRef.id);

                const newRemainingRatings = remainingRatings - 1;
                setRemainingRatings(newRemainingRatings);
                localStorage.setItem("lastRating", value.toString());
                localStorage.setItem("remainingRatings", newRemainingRatings.toString());
            } catch (e) {
                console.error("Error adding document: ", e);
            } finally {
                setIsSubmitting(false);
            }
        }
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
        </div>
    );
}
