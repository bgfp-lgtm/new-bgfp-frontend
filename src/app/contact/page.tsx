"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaPaperPlane, FaChevronDown } from "react-icons/fa";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Basic Validation
    if (!form.name || !form.email || !form.message || !form.inquiryType) {
      setStatus("error");
      return;
    }

    try {
      setStatus("submitting");

      // 2. Your Specific Google Apps Script URL
      const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbz_le-IdpRryQJHTL7TTl0aXRp5O3Zj0mD7y8vDa5R1kyB9PH5KzrAhxnu7ZCk3xDIGlg/exec";

      // 3. Send data using fetch
      // Note: 'no-cors' is used because Google Apps Script
      // redirects the request, which browsers block by default.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      // 4. Update UI Status and Reset Form
      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        inquiryType: "",
        message: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  return (
    <main className="bg-white min-h-screen text-black selection:bg-red-600 selection:text-white">
      {/* Split Layout Container */}
      <div className="w-full max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* LEFT COLUMN: Sticky Info & Branding */}
        <div className="relative p-6 md:p-12 lg:p-24 flex flex-col justify-between h-fit lg:h-screen lg:sticky lg:top-0 border-r border-gray-100">
          {/* Header */}
          <div className="space-y-8">
            <div className="w-12 h-1 bg-red-600"></div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
              Let's build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">
                something bold.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-md font-medium leading-relaxed">
              Ready to transform your digital presence? We are currently
              accepting new partnerships.
            </p>
          </div>

          {/* Contact Details */}
          <div className="mt-16 lg:mt-0 space-y-12">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-red-600 mb-4">
                Direct Inquiry
              </label>
              <Link
                href="mailto:bgfp@birthgiverfilmproduction.com"
                className="block text-xl md:text-3xl font-bold hover:text-red-600 transition-colors duration-300 break-all leading-tight"
              >
                bgfp@birthgiverfilmproduction.com
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group cursor-pointer">
                <label className="block text-xs font-bold uppercase tracking-widest text-red-600 mb-2">
                  Studio
                </label>
                <p className="text-lg font-medium text-gray-900 group-hover:translate-x-2 transition-transform duration-300">
                  Seymour Road London,
                  <br />
                  UK N8 0BH
                </p>
              </div>
              <div className="group">
                <label className="block text-xs font-bold uppercase tracking-widest text-red-600 mb-2">
                  Call Us
                </label>
                <Link
                  href="tel:+447776842718"
                  className="text-lg font-medium text-gray-900 hover:text-red-600 transition-colors"
                >
                  +44 7776 842718
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Interactive Form */}
        <div className="p-6 md:p-12 lg:p-24 flex flex-col justify-center bg-white">
          <form
            onSubmit={handleSubmit}
            className="space-y-16 max-w-xl mx-auto w-full pt-12 lg:pt-0"
          >
            {/* 01 Name */}
            <div
              className={`relative border-b-2 transition-colors duration-500 ${
                activeField === "name" ? "border-red-600" : "border-gray-200"
              }`}
            >
              <label
                className={`absolute left-0 transition-all duration-300 pointer-events-none font-bold uppercase text-xs tracking-widest ${
                  activeField === "name" || form.name
                    ? "-top-6 text-red-600"
                    : "top-4 text-gray-400"
                }`}
              >
                01 / Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                onFocus={() => setActiveField("name")}
                onBlur={() => setActiveField(null)}
                className="w-full bg-transparent py-4 text-2xl md:text-4xl font-bold text-black focus:outline-none placeholder-transparent"
                placeholder="Name"
                required
              />
            </div>

            {/* 02 Email */}
            <div
              className={`relative border-b-2 transition-colors duration-500 ${
                activeField === "email" ? "border-red-600" : "border-gray-200"
              }`}
            >
              <label
                className={`absolute left-0 transition-all duration-300 pointer-events-none font-bold uppercase text-xs tracking-widest ${
                  activeField === "email" || form.email
                    ? "-top-6 text-red-600"
                    : "top-4 text-gray-400"
                }`}
              >
                02 / Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onFocus={() => setActiveField("email")}
                onBlur={() => setActiveField(null)}
                className="w-full bg-transparent py-4 text-2xl md:text-4xl font-bold text-black focus:outline-none placeholder-transparent"
                placeholder="Email"
                required
              />
            </div>

            {/* 03 Phone */}
            <div
              className={`relative border-b-2 transition-colors duration-500 ${
                activeField === "phone" ? "border-red-600" : "border-gray-200"
              }`}
            >
              <label
                className={`absolute left-0 transition-all duration-300 pointer-events-none font-bold uppercase text-xs tracking-widest ${
                  activeField === "phone" || form.phone
                    ? "-top-6 text-red-600"
                    : "top-4 text-gray-400"
                }`}
              >
                03 / Phone (Optional)
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                onFocus={() => setActiveField("phone")}
                onBlur={() => setActiveField(null)}
                className="w-full bg-transparent py-4 text-2xl md:text-4xl font-bold text-black focus:outline-none placeholder-transparent"
                placeholder="Phone"
              />
            </div>

            {/* 04 Inquiry Type */}
            <div
              className={`relative border-b-2 transition-colors duration-500 ${
                activeField === "inquiryType"
                  ? "border-red-600"
                  : "border-gray-200"
              }`}
            >
              <label
                className={`absolute left-0 transition-all duration-300 pointer-events-none font-bold uppercase text-xs tracking-widest ${
                  activeField === "inquiryType" || form.inquiryType
                    ? "-top-6 text-red-600"
                    : "top-4 text-gray-400"
                }`}
              >
                04 / Inquiry Type
              </label>
              <div className="relative">
                <select
                  name="inquiryType"
                  value={form.inquiryType}
                  onChange={handleChange}
                  onFocus={() => setActiveField("inquiryType")}
                  onBlur={() => setActiveField(null)}
                  required
                  className="w-full bg-transparent py-4 text-2xl md:text-4xl font-bold text-black focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="" disabled></option>
                  <option value="Software Development">
                    Software Development
                  </option>
                  <option value="Film Production">Film Production</option>
                  <option value="Marketing">Marketing</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-red-600">
                  <FaChevronDown size={20} />
                </div>
              </div>
            </div>

            {/* 05 Message */}
            <div
              className={`relative border-b-2 transition-colors duration-500 ${
                activeField === "message" ? "border-red-600" : "border-gray-200"
              }`}
            >
              <label
                className={`absolute left-0 transition-all duration-300 pointer-events-none font-bold uppercase text-xs tracking-widest ${
                  activeField === "message" || form.message
                    ? "-top-6 text-red-600"
                    : "top-4 text-gray-400"
                }`}
              >
                05 / Project Details
              </label>
              <textarea
                name="message"
                rows={3}
                value={form.message}
                onChange={handleChange}
                onFocus={() => setActiveField("message")}
                onBlur={() => setActiveField(null)}
                className="w-full bg-transparent py-4 text-xl md:text-3xl font-bold text-black focus:outline-none placeholder-transparent resize-none leading-tight"
                placeholder="Message"
                required
              />
            </div>

            {/* Action Button */}
            <div className="pt-8">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group relative inline-flex h-20 md:h-24 w-full items-center justify-between px-8 md:px-12 overflow-hidden bg-black text-white hover:bg-red-600 transition-colors duration-500 rounded-2xl"
              >
                <span className="relative z-10 text-xl md:text-2xl font-bold tracking-wide flex items-center gap-4">
                  {status === "submitting" ? "Processing..." : "Send Message"}
                </span>

                <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 bg-white text-black rounded-full flex items-center justify-center transition-transform duration-500 group-hover:-rotate-45 group-hover:scale-110">
                  {status === "success" ? (
                    <FaPaperPlane className="w-5 h-5" />
                  ) : (
                    <FaArrowRight className="w-6 h-6" />
                  )}
                </div>
              </button>

              {status === "error" && (
                <p className="mt-6 text-red-600 font-bold text-sm tracking-widest uppercase">
                  * Please fill out all required fields.
                </p>
              )}
              {status === "success" && (
                <p className="mt-6 text-green-600 font-bold text-sm tracking-widest uppercase">
                  * Message sent successfully.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <section className="w-full h-[50vh] min-h-[400px] relative bg-zinc-100 overflow-hidden group p-10 mt-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2479.231221193306!2d-0.12267682337651047!3d51.582315771832815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b947c49b085%3A0xc3f58a36916578a1!2sSeymour%20Rd%2C%20London%20N8%200BH%2C%20UK!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full object-cover transition-all duration-700 rounded-2xl"
        ></iframe>
      </section>

      {/* <CTASectionTwo /> */}
    </main>
  );
}
