import React, { useState } from "react";

const ConnectForm = ({ type, name, onClose, onConfirmChat }) => {
  const [date, setDate] = useState("");
  const [mode, setMode] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [showChat, setShowChat] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "online") {
      // ✅ Trigger chat confirmation (adds to messages tab)
      if (onConfirmChat) onConfirmChat();

      setShowChat(true);
    } else {
      alert(`${type} appointment with ${name} booked for ${date} at ${timeSlot}`);
      onClose();
    }
  };

  if (showChat) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-5 w-[400px] shadow-lg">
          <h2 className="text-lg font-semibold mb-3">Chat with {name}</h2>

          <div className="border h-56 p-3 rounded overflow-y-auto mb-3 bg-gray-50">
            <p className="text-gray-500 text-sm text-center">Chat started...</p>
          </div>

          <div className="flex">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-l p-2 focus:outline-none"
            />
            <button className="bg-blue-600 text-white px-4 rounded-r">
              Send
            </button>
          </div>

          <button
            onClick={onClose}
            className="mt-4 text-red-500 text-sm underline"
          >
            Close Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Connect with {name}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-sm">Select Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="border p-2 rounded"
          />

          <label className="text-sm">Mode</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            required
            className="border p-2 rounded"
          >
            <option value="">Select Mode</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>

          <label className="text-sm">Select Time Slot</label>
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
            className="border p-2 rounded"
          >
            <option value="">Select Time</option>
            <option value="9:00 AM">9:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="5:00 PM">5:00 PM</option>
          </select>

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConnectForm;






