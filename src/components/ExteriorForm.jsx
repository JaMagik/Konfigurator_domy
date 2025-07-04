import React, { useState } from "react";

const elewacje = [
  { name: "Tynk", image: "/images/elewacja/tynk.png" },
  { name: "Deska elewacyjna", image: "/images/elewacja/deska.png" },
  { name: "Płyty HPL", image: "/images/elewacja/plyty.png" },
];

const dachy = [
  { name: "Blachodachówka", image: "/images/dach/blacha.jpg" },
  { name: "Panel na rąbek", image: "/images/dach/ranbek.jpg" },
  { name: "Papa termozgrzewalna", image: "/images/dach/papa.jpg" },
];

const stolarka = [
  { name: "PCV 3-szybowa", image: "/images/stolarka/pcv.jpeg" },
  { name: "Aluminium", image: "/images/stolarka/aluminium.png" },
];


const ExteriorForm = ({ onSubmit, onBack }) => {
  const [selected, setSelected] = useState({
    elewacja: "",
    dach: "",
    stolarka: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelected((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selected);
  };

  const renderOptions = (options, fieldName) => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {options.map((option) => (
        <label
          key={option.name}
          className={`border rounded-md overflow-hidden cursor-pointer transition hover:shadow-lg ${
            selected[fieldName] === option.name ? "border-blue-600" : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name={fieldName}
            value={option.name}
            checked={selected[fieldName] === option.name}
            onChange={handleChange}
            className="hidden"
          />
          <img
            src={option.image}
            alt={option.name}
            className="w-full h-32 object-cover"
          />
          <div className="p-2 text-center text-sm font-medium">{option.name}</div>
        </label>
      ))}
    </div>
  );

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Etap 5: Wykończenie zewnętrzne
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* Elewacja */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Rodzaj elewacji</h3>
          {renderOptions(elewacje, "elewacja")}
        </div>

        {/* Dach */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Pokrycie dachu</h3>
          {renderOptions(dachy, "dach")}
        </div>

        {/* Stolarka */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Stolarka zewnętrzna</h3>
          {renderOptions(stolarka, "stolarka")}
        </div>

        {/* Przyciski */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            ◀ Poprzedni krok
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Zapisz wykończenie zewnętrzne
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExteriorForm;
