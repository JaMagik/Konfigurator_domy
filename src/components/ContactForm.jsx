import React, { useState } from "react";

const ContactForm = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    imie: "",
    email: "",
    telefon: "",
    wiadomosc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Skontaktuj się z nami
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="imie"
          placeholder="Imię i nazwisko"
          value={formData.imie}
          onChange={handleChange}
          required
          className="border px-4 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Adres e-mail"
          value={formData.email}
          onChange={handleChange}
          required
          className="border px-4 py-2 rounded"
        />
        <input
          type="tel"
          name="telefon"
          placeholder="Telefon kontaktowy"
          value={formData.telefon}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <textarea
          name="wiadomosc"
          placeholder="Wiadomość (opcjonalna)"
          value={formData.wiadomosc}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
          rows={4}
        />

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            ◀ Powrót
          </button>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          >
            Wyślij zapytanie
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
