import React, { useRef } from "react";
import { priceList } from "../data/configOptions";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Summary = ({
  metraz,
  landData,
  installations,
  finishings,
  exterior,
  onBack,
}) => {
  const pdfRef = useRef();

  const calculateTotal = () => {
    let total = 0;

    const addPrices = (obj) => {
      Object.values(obj).forEach((items) => {
        if (Array.isArray(items)) {
          items.forEach((item) => {
            total += priceList[item] || 0;
          });
        }
      });
    };

    const addSinglePrices = (obj) => {
      Object.values(obj).forEach((value) => {
        if (typeof value === "string") {
          total += priceList[value] || 0;
        }
      });
    };

    if (installations) addPrices(installations);
    if (finishings) addPrices(finishings);
    if (exterior) addSinglePrices(exterior);

    return total;
  };

  const totalCost = calculateTotal();

  const handleDownloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("wycena_dom_modulowy.pdf");
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded mt-10">
      <div ref={pdfRef} className="bg-white p-6 rounded text-black">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Podsumowanie konfiguracji
        </h2>

        {/* Metraż */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">📏 Metraż</h3>
          <p>{metraz}</p>
        </section>

        {/* Działka */}
      {/* Działka */}
<section className="mb-6">
  <h3 className="text-xl font-semibold mb-2 text-gray-700">📍 Działka i lokalizacja</h3>
  <p><strong>Lokalizacja:</strong> {landData.lokalizacja || "Brak"}</p>
  <p><strong>Posiadasz działkę:</strong> {{
    tak: "Tak",
    zakup: "W trakcie zakupu",
    nie: "Nie"
  }[landData.posiadanie] || "Nieokreślono"}</p>
  <p><strong>Rodzaj budowy:</strong> {{
    zgłoszenie: "Budowa na zgłoszenie",
    pozwolenie: "Pozwolenie na budowę"
  }[landData.rodzajBudowy] || "Nieokreślono"}</p>
  <p><strong>Status działki:</strong> {
    landData.status && landData.status.length > 0
      ? landData.status.join(", ")
      : "Brak"
  }</p>
</section>


        {/* Instalacje */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">🔌 Instalacje</h3>
          {Object.entries(installations).map(([category, items]) => (
            <div key={category}>
              <strong>{category}:</strong> {items.join(", ")}
            </div>
          ))}
        </section>

        {/* Wykończenie wnętrz */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">🎨 Wykończenie wnętrz</h3>
          {Object.entries(finishings).map(([category, items]) => (
            <div key={category}>
              <strong>{category}:</strong> {items.join(", ")}
            </div>
          ))}
        </section>

        {/* Wykończenie zewnętrzne */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">🏡 Wykończenie zewnętrzne</h3>
          <p><strong>Elewacja:</strong> {exterior?.elewacja || "Brak"}</p>
          <p><strong>Dach:</strong> {exterior?.dach || "Brak"}</p>
          <p><strong>Stolarka:</strong> {exterior?.stolarka || "Brak"}</p>
        </section>

        {/* Całkowity koszt */}
        <div className="text-2xl text-center font-bold mt-6 text-green-700">
          💰 Całkowity koszt: {totalCost.toLocaleString("pl-PL")} zł
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          ◀ Poprzedni krok
        </button>

        <button
          onClick={handleDownloadPDF}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded font-semibold"
        >
          📄 Pobierz jako PDF
        </button>
      </div>
    </div>
  );
};

export default Summary;
