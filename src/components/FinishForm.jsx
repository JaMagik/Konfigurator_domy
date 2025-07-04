import React, { useState } from "react";
import { finishOptions } from "../data/configOptions";

const FinishForm = ({ onSubmit, onBack }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleChange = (category, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const missing = Object.keys(finishOptions).some(
      (category) => !selectedOptions[category]
    );

    if (missing) {
      alert("Proszę wybrać jedną opcję w każdej kategorii.");
      return;
    }

    onSubmit(selectedOptions);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        Etap 4: Wykończenie wnętrz
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {Object.entries(finishOptions).map(([category, options]) => {
          const hasBrak = options.some((o) => o.name === "Brak");
          const optionsWithBrak = hasBrak
            ? options
            : [{ name: "Brak", image: "/images/brak.webp" }, ...options];

          return (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-2 text-green-800">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {optionsWithBrak.map(({ name, image }) => (
                  <label
                    key={name}
                    className={`flex flex-col items-center w-36 text-center border p-2 rounded shadow hover:shadow-lg cursor-pointer transition ${
                      selectedOptions[category] === name
                        ? "border-green-600"
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
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-24 object-cover mb-2 rounded opacity-90"
                      onError={(e) =>
                        (e.currentTarget.src = "/images/brak.webp")
                      }
                    />
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
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Zapisz wykończenie
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinishForm;

