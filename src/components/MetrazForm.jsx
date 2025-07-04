import React, { useState } from "react";

const options = [
  {
    label: "York – 70 m²",
    value: "70",
    description: "Dom rekreacyjny lub całoroczny. Kompaktowa zabudowa.",
  },
  {
    label: "Dalmatyńczyk – 101 m²",
    value: "101",
    description: "Dom dla rodziny 3–4 osobowej z możliwością 3 sypialni.",
  },
  {
    label: "Labrador – 128 m²",
    value: "128",
    description: "Rozbudowany dom rodzinny z dodatkowym pokojem lub biurem.",
  },
  {
    label: "Projekt indywidualny",
    value: "indywidualny",
    description: "Stwórz dom w pełni dopasowany do swoich potrzeb i działki.",
  },
];

const MetrazForm = ({ onSubmit }) => {
  const [selected, setSelected] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected) onSubmit(selected);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Etap 1: Wybierz zakres metrażu
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {options.map((option) => (
            <label
              key={option.value}
              className={`border rounded-xl p-4 cursor-pointer transition shadow-sm ${
                selected === option.value
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="metraz"
                value={option.value}
                checked={selected === option.value}
                onChange={(e) => setSelected(e.target.value)}
                className="hidden"
              />
              <h3 className="text-lg font-bold mb-1">{option.label}</h3>
              <p className="text-sm text-gray-700">{option.description}</p>
            </label>
          ))}
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            disabled={!selected}
            className={`px-6 py-2 rounded text-white font-semibold transition ${
              selected
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Zapisz i przejdź dalej
          </button>
        </div>
      </form>
    </div>
  );
};

export default MetrazForm;
