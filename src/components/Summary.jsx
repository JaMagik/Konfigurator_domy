import React, { useRef } from "react";
import {
  priceList,
  installationOptions,
  finishOptions,
  exteriorOptions
} from "../data/configOptions";
import jsPDF from "jspdf";

const Summary = ({
  metraz,
  landData,
  installations,
  finishings,
  exterior,
  onBack,
}) => {
  const pdfRef = useRef();

  const getImageData = async (url) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const type = blob.type;
      const format = type.includes("png")
        ? "PNG"
        : type.includes("jpeg") || type.includes("jpg")
        ? "JPEG"
        : type.includes("webp")
        ? "WEBP"
        : null;
      if (!format) return null;
      const data = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
      return { data, format }; // Poprawione: zwracamy obiekt
    } catch {
      return null;
    }
  };

  const findImage = (options, category, name) => {
    const opts = options[category];
    if (!opts) return null;
    const found = opts.find((o) => o.name === name);
    return found ? found.image : null;
  };

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

    if (installations) addSinglePrices(installations); // Poprawione, aby pasowało do struktury danych
    if (finishings) addSinglePrices(finishings);     // Poprawione
    if (exterior) addSinglePrices(exterior);

    return total;
  };

  const totalCost = calculateTotal();

  const handleDownloadPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const center = pageWidth / 2;

    pdf.setFontSize(18);
    pdf.text("Podsumowanie wyceny", center, 20, { align: "center" });
    pdf.setFontSize(12);
    pdf.text(`Całkowity koszt: ${totalCost.toLocaleString("pl-PL")} zł`, center, 30, { align: "center" });

    // Metraż
    pdf.addPage();
    pdf.setFontSize(16);
    pdf.text("Metraż", 10, 20);
    pdf.setFontSize(12);
    pdf.text(metraz, 10, 30);

    // Działka
    pdf.addPage();
    pdf.setFontSize(16);
    pdf.text("Działka i lokalizacja", 10, 20);
    pdf.setFontSize(12);
    pdf.text(`Lokalizacja: ${landData.lokalizacja || "Brak"}`, 10, 30);
    pdf.text(`Posiadasz działkę: ${{
      tak: "Tak",
      zakup: "W trakcie zakupu",
      nie: "Nie"
    }[landData.posiadanie] || "Nieokreślono"}`, 10, 40);
    pdf.text(`Rodzaj budowy: ${{
      zgłoszenie: "Budowa na zgłoszenie",
      pozwolenie: "Pozwolenie na budowę"
    }[landData.rodzajBudowy] || "Nieokreślono"}`, 10, 50);

    // Instalacje
    pdf.addPage();
    pdf.setFontSize(16);
    pdf.text("Instalacje", 10, 20);
    let y = 30;
    for (const [category, item] of Object.entries(installations)) {
      pdf.setFontSize(12);
      pdf.text(`${category}: ${item || "Brak"}`, 10, y);
      const imgUrl = findImage(installationOptions, category, item);
      if (imgUrl) {
        const result = await getImageData(imgUrl); // Poprawione wywołanie
        if (result) {
          pdf.addImage(result.data, result.format, pageWidth - 60, y - 5, 50, 30);
        }
      }
      y += 40;
      if (y > 250) {
        pdf.addPage();
        pdf.text("Instalacje", 10, 20);
        y = 30;
      }
    }

    // Wykończenie wnętrz
    pdf.addPage();
    pdf.setFontSize(16);
    pdf.text("Wykończenie wnętrz", 10, 20);
    y = 30;
    for (const [category, item] of Object.entries(finishings)) {
      pdf.setFontSize(12);
      pdf.text(`${category}: ${item || "Brak"}`, 10, y);
      const imgUrl = findImage(finishOptions, category, item);
      if (imgUrl) {
        const result = await getImageData(imgUrl); // Poprawione wywołanie
        if (result) {
          pdf.addImage(result.data, result.format, pageWidth - 60, y - 5, 50, 30);
        }
      }
      y += 40;
      if (y > 250) {
        pdf.addPage();
        pdf.text("Wykończenie wnętrz", 10, 20);
        y = 30;
      }
    }

    // Wykończenie zewnętrzne
    pdf.addPage();
    pdf.setFontSize(16);
    pdf.text("Wykończenie zewnętrzne", 10, 20);
    y = 30;
    for (const [category, item] of Object.entries(exterior)) {
      pdf.setFontSize(12);
      pdf.text(`${category}: ${item || "Brak"}`, 10, y);
      const imgUrl = findImage(exteriorOptions, category, item);
      if (imgUrl) {
        const result = await getImageData(imgUrl); // Poprawione wywołanie
        if (result) {
            pdf.addImage(result.data, result.format, pageWidth - 60, y - 5, 50, 30);
        }
      }
      y += 40;
      if (y > 250) {
        pdf.addPage();
        pdf.text("Wykończenie zewnętrzne", 10, 20);
        y = 30;
      }
    }

    pdf.addPage();
    pdf.setFontSize(18);
    pdf.text("Całkowity koszt", center, 40, { align: "center" });
    pdf.setFontSize(16);
    pdf.text(`${totalCost.toLocaleString("pl-PL")} zł`, center, 60, { align: "center" });

    pdf.save("wycena_dom_modulowy.pdf");
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
        </section>

        {/* Instalacje */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">🔌 Instalacje</h3>
          {Object.entries(installations).map(([category, item]) => (
            <div key={category}>
              <strong>{category}:</strong> {item || "Brak"}
            </div>
          ))}
        </section>

        {/* Wykończenie wnętrz */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">🎨 Wykończenie wnętrz</h3>
          {Object.entries(finishings).map(([category, item]) => (
            <div key={category}>
              <strong>{category}:</strong> {item || "Brak"}
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