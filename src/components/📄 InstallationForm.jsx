import React, { useState } from "react";
import { installationOptions } from "../data/configOptions";

const InstallationForm = ({ onSubmit, onBack }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleChange = (category, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const missing = filteredCategories.some(
      ([category]) => !selectedOptions[category]
    );

    if (missing) {
      alert("Proszę wybrać jedną opcję w każdej kategorii.");
      return;
    }

    onSubmit(selectedOptions);
  };

  const filteredCategories = Object.entries(installationOptions).filter(
    ([category]) => category !== "Instalacja wodno-kanalizacyjna"
  );

  return (
    <div className="w-full max-w-5xl mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Etap 3: Instalacje
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {filteredCategories.map(([category, options]) => {
          // dodajemy "Brak" tylko jeśli nie istnieje
          const optionsWithBrak = options.some((o) => o.name === "Brak")
            ? options
            : [{ name: "Brak", image: "" }, ...options];

          return (
            <div key={category} className="bg-gray-50 p-5 rounded-md shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">{category}</h3>
              <div className="flex flex-wrap gap-4">
                {optionsWithBrak.map(({ name, image }) => (
                  <label
                    key={name}
                    className={`flex flex-col items-center w-36 text-center border p-2 rounded shadow hover:shadow-lg cursor-pointer transition ${
                      selectedOptions[category] === name
                        ? "border-blue-600"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={category}
                      value={name}
                      checked={selectedOptions[category] === name}
                      onChange={(e) => handleChange(category, e.target.value)}
                      className="mb-2"
                      required
                    />
                    {image && (
                      <img
                        src={image}
                        alt={name}
                        className="w-full h-24 object-cover mb-2 rounded"
                      />
                    )}
                    <span className="text-sm font-medium">{name}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}

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
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
          >
            Zapisz i przejdź dalej
          </button>
        </div>
      </form>
    </div>
  );
};

export default InstallationForm;
