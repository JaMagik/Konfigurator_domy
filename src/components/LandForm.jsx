import React, { useState } from "react";

const LandForm = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    lokalizacja: "",
    posiadanie: "", // "tak", "nie", "zakup"
    rodzajBudowy: "" // "zgłoszenie", "pozwolenie"
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Etap 2: Działka i miejsce budowy</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Lokalizacja */}
        <div>
          <label htmlFor="lokalizacja" className="block font-medium mb-1">
            Lokalizacja budowy (miejscowość lub kod pocztowy):
          </label>
          <input
            type="text"
            id="lokalizacja"
            name="lokalizacja"
            value={formData.lokalizacja}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="np. 25-001 Kielce"
            required
          />
        </div>

        {/* Czy masz działkę */}
        <div>
          <p className="font-medium mb-1">Czy posiadasz działkę?</p>
          <div className="flex gap-4">
            {["tak", "zakup", "nie"].map((value) => (
              <label key={value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="posiadanie"
                  value={value}
                  checked={formData.posiadanie === value}
                  onChange={handleChange}
                  className="accent-blue-600"
                />
                {value === "tak"
                  ? "Tak"
                  : value === "zakup"
                  ? "W trakcie zakupu"
                  : "Nie"}
              </label>
            ))}
          </div>
        </div>

        {/* Rodzaj budowy */}
        <div>
          <p className="font-medium mb-1">Rodzaj planowanej budowy:</p>
          <div className="flex gap-4">
            {["zgłoszenie", "pozwolenie"].map((value) => (
              <label key={value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="rodzajBudowy"
                  value={value}
                  checked={formData.rodzajBudowy === value}
                  onChange={handleChange}
                  className="accent-blue-600"
                />
                {value === "zgłoszenie"
                  ? "Budowa na zgłoszenie"
                  : "Pozwolenie na budowę"}
              </label>
            ))}
          </div>
        </div>


        {/* Przyciski */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            ◀ Poprzedni krok
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Zapisz dane działki
          </button>
        </div>
      </form>
    </div>
  );
};

export default LandForm;
