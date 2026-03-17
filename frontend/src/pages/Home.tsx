import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

interface Slot {
  id: number;
  doctor_name: string;
  start_time: string;
  available_slots: number;
}

export default function Home() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const res = await API.get("/slots");
      setSlots(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Slots</h2>
      {slots.length === 0 && <p>No slots available</p>}
      {slots.map((slot) => (
        <div
          key={slot.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{slot.doctor_name}</h3>
          <p>{new Date(slot.start_time).toLocaleString()}</p>
          <p>Available: {slot.available_slots}</p>

          <button
            onClick={() => navigate(`/booking/${slot.id}`)}
            disabled={slot.available_slots === 0}
          >
            {slot.available_slots === 0 ? "Full" : "Book Now"}
          </button>
        </div>
      ))}
    </div>
  );
}
