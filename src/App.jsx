import React, { useState } from "react";
import MetrazForm from "./components/MetrazForm";
import LandForm from "./components/LandForm";
// src/App.jsx
import InstallationForm from "./components/InstallationForm";
import FinishForm from "./components/FinishForm";
import ExteriorForm from "./components/ExteriorForm";
import Summary from "./components/Summary";
import ContactForm from "./components/ContactForm";
import logo from "/logo.png"; // public/logo.png

function App() {
  const [step, setStep] = useState(1);
  const [isCustomPath, setIsCustomPath] = useState(false); // 🔁 czy projekt indywidualny

  const [metraz, setMetraz] = useState("");
  const [landData, setLandData] = useState({});
  const [installations, setInstallations] = useState({});
  const [finishings, setFinishings] = useState({});
  const [exterior, setExterior] = useState({});
  const [contact, setContact] = useState({});

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePrevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-kamanBg text-black font-sans">
      {/* Logo + nagłówek */}
      <header className="flex items-center gap-4 px-6 py-4 bg-white shadow-md mb-6">
        <img src={logo} alt="Logo Kaman Home" className="h-10 w-auto" />
        <h1 className="text-xl sm:text-2xl font-semibold">
          Konfigurator domu modułowego 🏡
        </h1>
      </header>

      <main className="px-4">
        {step === 1 && (
          <MetrazForm
            onSubmit={(data) => {
              setMetraz(data);
              if (data === "indywidualny") {
                setIsCustomPath(true);
                setStep(99); // Skok do kontaktu
              } else {
                setIsCustomPath(false);
                handleNextStep();
              }
            }}
          />
        )}

        {step === 2 && (
          <LandForm
            onSubmit={(data) => {
              setLandData(data);
              handleNextStep();
            }}
            onBack={handlePrevStep}
          />
        )}

        {step === 3 && (
          <InstallationForm
            onSubmit={(data) => {
              setInstallations(data);
              handleNextStep();
            }}
            onBack={handlePrevStep}
          />
        )}

        {step === 4 && (
          <FinishForm
            onSubmit={(data) => {
              setFinishings(data);
              handleNextStep();
            }}
            onBack={handlePrevStep}
          />
        )}

        {step === 5 && (
          <ExteriorForm
            onSubmit={(data) => {
              setExterior(data);
              handleNextStep();
            }}
            onBack={handlePrevStep}
          />
        )}

        {step === 6 && (
          <>
            <Summary
              metraz={metraz}
              landData={landData}
              installations={installations}
              finishings={finishings}
              exterior={exterior}
              onBack={handlePrevStep}
            />
            {/* Jeśli nie jest to indywidualny projekt, pokaż przycisk do kontaktu */}
            {!isCustomPath && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setStep(99)}
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                >
                  💬 Uzupełnij formularz kontaktowy
                </button>
              </div>
            )}
          </>
        )}

        {step === 99 && (
          <ContactForm
            onSubmit={(data) => {
              setContact(data);
              alert("Dziękujemy za przesłanie formularza! Skontaktujemy się wkrótce.");
              if (isCustomPath) {
                setStep(1); // Wróć do początku
              } else {
                setStep(6); // Wracaj do podsumowania
              }
            }}
            onBack={() => {
              if (isCustomPath) {
                setStep(1); // Wróć do metrażu
              } else {
                setStep(6); // Wróć do podsumowania
              }
            }}
          />
        )}
      </main>
    </div>
  );
}

export default App;
