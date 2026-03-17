import { useState } from "react";
import API from "../services/api";

export default function Admin() {
  const [doctor, setDoctor] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState("");

  const createDoctor = async () => {
    await API.post("/admin/doctor", { name: doctor });
    alert("Doctor Created");
  };

  const createSlot = async () => {
    await API.post("/admin/slot", {
      doctor_id: doctorId,
      start_time: time,
      total_slots: slots,
    });

    alert("Slot Created");
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      <h3>Create Doctor</h3>
      <input value={doctor} onChange={(e) => setDoctor(e.target.value)} />
      <button onClick={createDoctor}>Create</button>

      <h3>Create Slot</h3>
      <input
        placeholder="Doctor ID"
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)}
      />
      <input
        type="datetime-local"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <input
        placeholder="Total Slots"
        value={slots}
        onChange={(e) => setSlots(e.target.value)}
      />
      <button onClick={createSlot}>Create Slot</button>
    </div>
  );
}
