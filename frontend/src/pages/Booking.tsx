import { useParams } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

export default function Booking() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    setLoading(true);
    try {
      const res = await API.post("/book", {
        slot_id: id,
        user_name: name,
      });

      setStatus(res.data.message);
    } catch (err: any) {
      setStatus("Error booking");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Book Slot</h2>

      <input
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleBooking} disabled={loading}>
        {loading ? "Booking..." : "Confirm Booking"}
      </button>

      <p>{status}</p>
    </div>
  );
}
