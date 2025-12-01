"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

// Initialize EmailJS - Make sure to replace with your actual public key
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "test_public_key");

export default function ContactForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Send email via backend API with nodemailer
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to_email: "ajumobiisaac96@gmail.com",
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
        onSuccess();
      } else {
        const errorData = await response.json();
        alert("Failed to send message. " + (errorData.error || "Please try again."));
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 rounded-xl border border-white border-opacity-20 bg-transparent"
    >
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
        Send a Quick Message
      </h3>
      <p className="text-gray-200 mb-8 text-base">
        Our team will get back to you within 24 hours.
      </p>

      <div className="space-y-4">
        {/* Name Field */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg bg-transparent border border-white border-opacity-40 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4A300] transition-all duration-300 ${
              errors.name ? "ring-2 ring-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg bg-transparent border border-white border-opacity-40 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4A300] transition-all duration-300 ${
              errors.email ? "ring-2 ring-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <textarea
            name="message"
            placeholder="Message box"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg bg-transparent border border-white border-opacity-40 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4A300] transition-all duration-300 resize-none ${
              errors.message ? "ring-2 ring-red-500" : ""
            }`}
          />
          {errors.message && (
            <p className="text-red-400 text-sm mt-1">{errors.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-fit mt-6 px-8 py-3 bg-white text-[#0A1F44] rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mx-auto block"
      >
        {isLoading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}