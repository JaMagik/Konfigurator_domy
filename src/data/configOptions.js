export const installationOptions = {
  "Centralne ogrzewanie": [
    { name: "maty grzewcze podłogowe", image: "/images/ogrzewanie/maty.png" },
    { name: "maty grzewcze podczerwieni", image: "/images/ogrzewanie/podczerwien.png" },
    { name: "pompa ciepła + kotłownia", image: "/images/ogrzewanie/pompa.png" },
  ],
  "Instalacja wodno-kanalizacyjna": [
    { name: "instalacja według opracowania", image: "/images/wodkan/standard.jpg" }
  ],
"Wentylacja": [
  { "name": "wentylacja grawitacyjna", "image": "/images/wentylacja/grawitacyjna.webp" },
  { "name": "wentylacja mechaniczna z rekuperacją", "image": "/images/wentylacja/reku.jpeg" }
],
 "Elektryka": [
  {
    name: "Podstawowa instalacja",
    image: "https://placehold.co/300x200?text=elektryka+podstawowa"
  },
  {
    name: "Rozszerzony pakiet (projekt indywidualny, smart home)",
    image: "https://placehold.co/300x200?text=elektryka+pakiet"
  }
 ],

 "Fotowoltaika": [
  { name: "Brak", image: "https://placehold.co/300x200?text=pv+brak" },
  { name: "3 kWp", image: "https://placehold.co/300x200?text=pv+3kWp" },
  { name: "10 kWp", image: "https://placehold.co/300x200?text=pv+10kWp" }
 ],
 "Klimatyzacja": [
  { name: "Brak", image: "https://placehold.co/300x200?text=klima+brak" },
  { name: "W pakiecie", image: "https://placehold.co/300x200?text=klima+pakiet" }
 ]
};
  
export const finishOptions = {
  "Ściany wewnętrzne": [
    {
      name: "płyta + szpachlowanie",
      image: "https://placehold.co/300x200?text=sciana+1"
    },
    {
      name: "płyta + szpachlowanie + malowanie",
      image: "https://placehold.co/300x200?text=sciana+2"
    },
    
  ],
  "Sufit podwieszany": [
    {
      name: "1 płyta + szpachlowanie + malowanie",
      image: "https://placehold.co/300x200?text=sufit+1"
    },

  ],
  "Drzwi wewnętrzne": [
    { name: "wersja light", image: "https://placehold.co/300x200?text=drzwi+light" },
    {
      name: "wersja prestige",
      image: "https://placehold.co/300x200?text=drzwi+prestige"
    },
  ],
  "Schody": [
    { name: "schody sosnowe", image: "https://placehold.co/300x200?text=schody+sosna" },
    { name: "schody dębowe", image: "https://placehold.co/300x200?text=schody+debowe" },
  ],
  "Projekt wnętrz": [
    {
      name: "indywidualny projekt wnętrz",
      image: "https://placehold.co/300x200?text=projekt+wnetrz"
    },
    {
      name: "zabudowa meblowa",
      image: "https://placehold.co/300x200?text=wnetrze+meble"
    },
    { name: "AGD/RTV", image: "https://placehold.co/300x200?text=AGD+RTV" },
  ],
  "Kuchnia": [
    { name: "zabudowa kuchenna", image: "https://placehold.co/300x200?text=kuchnia+meble" },
    { name: "AGD", image: "https://placehold.co/300x200?text=AGD" },
  ],
  "Łazienka": [
    { name: "płytki", image: "https://placehold.co/300x200?text=plytki" },
    { name: "biały montaż", image: "https://placehold.co/300x200?text=bialy+montaz" },
    { name: "zabudowa łazienkowa", image: "https://placehold.co/300x200?text=lazienka+meble" },
  ]
};

export const exteriorOptions = {
  elewacja: [
    { name: "Tynk", image: "/images/elewacja/tynk.png" },
    { name: "Deska elewacyjna", image: "/images/elewacja/deska.png" },
    { name: "Płyty HPL", image: "/images/elewacja/plyty.png" }
  ],
  dach: [
    { name: "Blachodachówka", image: "/images/dach/blacha.jpg" },
    { name: "Panel na rąbek", image: "/images/dach/ranbek.jpg" },
    { name: "Papa termozgrzewalna", image: "/images/dach/papa.jpg" }
  ],
  stolarka: [
    { name: "PCV 3-szybowa", image: "/images/stolarka/pcv.jpeg" },
    { name: "Aluminium", image: "/images/stolarka/aluminium.png" }
  ]
};



  
  export const priceList = {
    // Instalacje
    "maty grzewcze podłogowe": 5000,
    "maty grzewcze podczerwieni": 6000,
    "pompa ciepła + kotłownia": 25000,
    "instalacja według opracowania": 8000,
    "zmiękczacz wody": 2000,
    "wentylacja grawitacyjna": 3500,
    "wentylacja mechaniczna z rekuperacją": 12000,
    "podstawowa instalacja": 5000,
    "projekt indywidualny": 2500,
    "LAN": 1200,
    "monitoring": 1800,
    "alarm": 1500,
    "inteligentny dom": 5000,
    "3 kWp": 13000,
    "10 kWp": 32000,
    "pojedyncze pomieszczenie": 3000,
    "cały budynek": 9000,
  
    // Wykończenie
    "płyta + szpachlowanie": 2000,
    "płyta + szpachlowanie + malowanie": 3000,
    "2x płyta + szpachlowanie + malowanie": 4000,
    "1 płyta + szpachlowanie + malowanie": 2500,
    "2 płyty + szpachlowanie + malowanie": 3500,
    "wersja light": 1000,
    "wersja prestige": 2500,
    "schody sosnowe": 4000,
    "schody dębowe": 7000,
    "indywidualny projekt wnętrz": 3000,
    "zabudowa meblowa": 6000,
    "AGD/RTV": 10000,
    "oświetlenie": 4000,
    "projekt kuchni": 2000,
    "zabudowa kuchenna": 8000,
    "AGD": 7000,
    "wzmocnienie ściany": 1000,
    "projekt łazienki": 1500,
    "płytki": 5000,
    "biały montaż": 4000,
    "zabudowa łazienkowa": 6000
  };
  