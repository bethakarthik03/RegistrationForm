import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaVenusMars,
  FaComment,
  FaCalendarAlt,
  FaHome,
  FaFlag,
  FaCode,
} from "react-icons/fa";
import { toast } from "react-toastify";

const Registration_form = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {

      name: e.target.name.value,
      email: e.target.email.value,
      phoneno: e.target.phoneno.value,
      gender: e.target.gender.value,
      dob: e.target.dob.value,
      address: e.target.address.value,
      city: e.target.city.value,
      state: e.target.state.value,
      country: e.target.country.value,
      pincode: e.target.pincode.value,
      message: e.target.message.value,
      salary: e.target.salary.value,
      time: new Date().toISOString(),
    };

    try {
      // ✅ Send email via EmailJS
      await emailjs.sendForm(
        "service_hdtw0pa",
        "template_7680psu",
        form.current,
        { publicKey: "yJg6Dps-iuZP61N4G" }
      );
      toast.success("Email sent successfully!");
      setStatus("✅ Sent Successfully");
      form.current.reset();
    } catch (error) {
      console.error(error);
      toast.error("Error sending email");
      setStatus("Error sending email");
    }

    const url =
      "https://script.google.com/macros/s/AKfycbx10GRFjHJ6Ct0iC92Nq79DQiVSbpOKEaY4k8AOMUKx5kkMjsZfmMLotV9Jf39X9aR2wg/exec";

    try {
      // ✅ Send data to Google Sheets
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const data = await response.text();
      console.log(data);
      toast.success("Data saved to Google Sheet!");
    } catch (error) {
      console.error(error);
      toast.error("Error saving data to Google Sheet");
      setStatus("Error sending to Google Sheets");
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-pink-100 py-10 px-4">
      <form
        ref={form}
        onSubmit={handleSubmit}
        className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-xl transition-all duration-300 hover:shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 tracking-wide">
          Registration Form
        </h2>

        <div className="mb-5">
          <label className="block text-gray-700 mb-2 flex items-center gap-2 font-medium">
          <FaUser className="text-blue-500" />
            Full Name
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Enter your full name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        {/* EMAIL */}
        <div className="mb-5">
          <label className="block text-gray-700 mb-2 flex items-center gap-2 font-medium">
          <FaEnvelope className="text-blue-500" />
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="example@gmail.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>
        

        {/* PHONE */}
        <div className="mb-5">
          <label className="block text-gray-700 mb-2 flex items-center gap-2 font-medium">
          <FaPhone className="text-blue-500" />
            Phone
          </label>
          <input
            type="tel"
            name="phoneno"
            required
            placeholder="Enter your phone number"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        {/* GENDER */}
        <div className="mb-5">
          <label className="block text-gray-700 mb-2 flex items-center gap-2 font-medium">
          <FaVenusMars className="text-blue-500" />
            Gender
          </label>
          <div className="flex gap-5">
            {["Male", "Female", "Other"].map((gender) => (
              <label
                key={gender}
                className="flex items-center gap-2 text-gray-700 cursor-pointer"
              >
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  className="accent-blue-600"
                  required
                />
                {gender}
              </label>
            ))}
          </div>
        </div>

        {/* DOB */}
        <div className="mb-5">
          <label className="block text-gray-700 mb-2 flex items-center gap-2 font-medium">
          <FaCalendarAlt className="text-blue-500" />
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        {/* ADDRESS */}
        <div className="mb-5">
          <label className="block text-gray-700 mb-2 flex items-center gap-2 font-medium">
          <FaHome className="text-blue-500" />
            Address
          </label>
          <textarea
            name="address"
            required
            rows="2"
            placeholder="Enter your address"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        {/* CITY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-gray-700 mb-2 flex items-center gap-2 font-medium">
            <FaCity className="text-blue-500" />
              City
            </label>
            <input
              type="text"
              name="city"
              required
              placeholder="Enter your city"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 flex items-center gap-2 font-medium">
            <FaMapMarkerAlt className="text-blue-500" />
              State
            </label>
            <input
              type="text"
              name="state"
              required
              placeholder="Enter your state"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
        </div>

        {/* COUNTRY & PINCODE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-gray-700 mb-2 flex items-center gap-2 font-medium">
            <FaFlag className="text-blue-500" />
              Country
            </label>
            <input
              type="text"
              name="country"
              required
              placeholder="Enter your country"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 flex items-center gap-2 font-medium">
            <FaCode className="text-blue-500" />
              Pincode
            </label>
            <input
              type="text"
              name="pincode"
              required
              placeholder="Enter your pincode"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 mb-2 flex items-center gap-2 font-medium">
          <FaEnvelope className="text-blue-500" />
            Salary
          </label>
          <input
            type="tel"
            name="salary"
            required
            placeholder="Enter your salary"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>
        {/* MESSAGE */}
        <div className="mb-8">
          <label className="block text-gray-700 mb-2 flex items-center gap-2 font-medium">
          <FaComment className="text-blue-500" />
            Message
          </label>
          <textarea
            name="message"
            required
            rows="3"
            placeholder="Enter your message..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        {/* HIDDEN TIME FIELD */}
        <input
          type="hidden"
          name="time"
          value={new Date().toISOString()}
        />
        
        {/* BUTTON */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-black px-6 py-2.5 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition"
          >
            Submit
          </button>
        </div>

        {/* STATUS TEXT (Optional) */}
        {status && (
          <p className="text-center mt-4 text-sm text-gray-600">{status}</p>
        )}
      </form>
    </div>
  );
};

export default Registration_form;