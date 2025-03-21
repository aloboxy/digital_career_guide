"use client";
import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log(formData); // You can replace this with an API call to send the data to a server.
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-gray-700 text-lg mb-8 text-center">
          Welcome to Digital Career Guide – Your AI-powered educational
          resource hub! We are here to assist with all your learning, research,
          and academic needs.
        </p>

        {/* Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              How Can We Help You?
            </h2>
            <p className="text-gray-600 mb-6">
              At Digital Career Guide, our goal is to empower students, researchers,
              and educators with precise, well-organized, and insightful
              information. Reach out to us with your questions or requests!
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows={4}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
                >
                  Submit
                </button>
              </form>
            ) : (
              <div className="text-green-500 font-bold mt-4">
                Thank you for contacting us! We will get back to you shortly.
              </div>
            )}
          </div>

          {/* Contact Info Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-4">
              Have a question or need specific assistance? We are here to help!
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800">Email:</h3>
                <p className="text-gray-600">digital.career@digital.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Phone:</h3>
                <p className="text-gray-600">+231779204578</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Live Chat:</h3>
                <p className="text-gray-600">Available 24/7 on our website</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Address:</h3>
                <p className="text-gray-600">
                 Liberia
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500">
            Digital Career Guide – Empowering Your Academic Success!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
