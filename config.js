/* ============================================================
   HOUSEWARMING CONFIG
   This is the ONLY file you should need to edit for a new family.
   Replace the sample values below with the real details.
   Dates use ISO format: "YYYY-MM-DDTHH:MM:SS+05:30" (Kerala is +05:30)
   ============================================================ */

window.HOUSEWARMING_CONFIG = {

  // ---- Opening ----
  bismillahArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  bismillahTransliteration: "Bismillāhir Raḥmānir Raḥīm",
  bismillahTranslation: "In the name of Allah, the Most Beneficent and the Most Gracious",

  // ---- The house ----
  // The short line above the house name (e.g. "Warming Our New Home")
  heroTagline: "Warming Our New Home",
  heroTaglineML: "ഞങ്ങളുടെ പുതിയ വീട് തിളങ്ങുന്നു",
  // The house's name, shown large — e.g. "Al-Hayy"
  houseName: "Al-Hayy",
  houseNameML: "അൽ-ഹയ്യ്",

  // ---- The family ----
  owners: {
    // Shown as "Dream Home of ..."
    line: "Mr. Saleem & Mrs. Jaseela",
    lineML: "മിസ്റ്റർ സലീം & മിസിസ് ജസീല",
  },
  // Optional — shown in parentheses under the owners' names,
  // e.g. remembering parents or family elders. Leave "" to hide.
  memoryNote: "(Late Kunjahammed Haji & Khalid KP)",
  memoryNoteML: "(മരണപ്പെട്ട കുഞ്ഞഹമ്മദ് ഹാജി & ഖലീദ് കെ.പി.)",

  // Optional children line. Leave names: [] to hide this card.
  children: {
    tag: "Happy Children",
    tagML: "സന്തോഷമുള്ള കുട്ടികൾ",
    names: ["Muhammed M", "Jaza Fathima M"],
    namesML: ["മുഹമ്മദ് എം", "ജസ ഫാത്തിമ എം"],
  },

  // Main event date shown in the big countdown (usually the housewarming/open-house date)
  eventDateISO: "2026-10-11T13:00:00+05:30",
  // Optional Hijri date line shown under the Gregorian date, plain text
  hijriDate: "Rabī' al-Ākhir 30, 1448 AH",
  hijriDateML: "റബീഉൽ ആഖിർ 30, 1448 ഹിജ്റ",
  // Optional short time line, e.g. "1 PM Onwards" (also shown per-event below)
  heroTimeNote: "1 PM Onwards",
  heroTimeNoteML: "ഉച്ചയ്ക്ക് 1 മണി മുതൽ",

  // A short, well-known Islamic dua for blessing a home — not a Qur'an verse,
  // keep it short and respectfully presented.
  blessingArabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا",
  blessingTransliteration: "Allāhumma bārik lanā fīmā razaqtanā",
  blessingMeaning: "O Allah, bless us in what You have provided for us",
  blessingMeaningML: "അല്ലാഹുമ്മ, നീ ഞങ്ങൾക്ക് നൽകിയതിൽ ഞങ്ങൾക്ക് അനുഗ്രഹിക്കണം",

  // ---- Events (add, remove, or reorder freely) ----
  events: [
    {
      label: "Housewarming Ceremony",
      labelML: "ഗൃഹപ്രവേശന ചടങ്ങ്",
      date: "11 October 2026",
      dateML: "2026 ഒക്ടോബർ 11",
      time: "1:00 PM",
      timeML: "ഉച്ചയ്ക്ക് 1:00",
      venue: "Al-Hayy, Muttiacherry",
      venueML: "അൽ-ഹയ്യ്, മുട്ടിയച്ചേരി",
//      note: "Dua & ribbon-cutting",
      noteML: "ദുആ & റിബൺ മുറിക്കൽ",
    },
//    {
//      label: "Open House & Lunch",
//      labelML: "വീട് തുറക്കൽ & ഉച്ചഭക്ഷണം",
//      date: "11 October 2026",
//      dateML: "2026 ഒക്ടോബർ 11",
//      time: "1:30 PM onwards",
//      timeML: "ഉച്ചയ്ക്ക് 1:30 മുതൽ",
//      venue: "Al-Hayy, Muttiacherry",
//      venueML: "അൽ-ഹയ്യ്, മുട്ടിയച്ചേരി",
//      note: "Guests welcome throughout the afternoon",
//      noteML: "ഉച്ചകാലത്ത് അതിഥികൾക്ക് സ്വാഗതം",
//    },
  ],

  // ---- Venue / map ----
  // mapQuery can be an address or "lat,lng" — used to build a Google Maps embed
  venue: {
    name: "Al-Hayy",
    nameML: "അൽ-ഹയ്യ്",
    address: "Muttiacherry, Kadayankot, Kerala",
    addressML: "മുട്ടിയച്ചേരി, കടയങ്കോട്ട്, കേരളം",
    mapQuery: "11.766214893388776,75.58487468323811",
    directionsUrl: "https://maps.google.com/?q=11.766214893388776,75.58487468323811",
    // Additional direction buttons
    additionalDirections: [
      {
        label: "Get Direction from\nPanoor",
        labelML: "ഖിവാമുൽ ഇസ്ലാം മദ്രസയിൽ നിന്നും വഴി കാണുക",
        url: "https://www.google.com/maps/dir/?api=1&origin=Panoor&waypoints=11.761565486308514%2C75.5869899867986%7C11.765383336810364%2C75.58664559988044&destination=11.766214893388776%2C75.58487468323811"
      },
      {
        label: "Get Direction from\nThaikandi palam",
        labelML: "തൈക്കണ്ടി പാലത്തുനിന്നും വഴി കാണുക",
        url: "https://maps.google.com/?q=11.765670879778595,75.58671520742415+to+11.766214893388776,75.58487468323811"
      }
    ]
  },

  // ---- Gallery ----
  // Put real photos of the new home in assets/gallery/ and list the filenames here.
  // Leave empty to show elegant placeholder tiles instead.
  gallery: [
    // "assets/gallery/photo1.jpg",
    // "assets/gallery/photo2.jpg",
  ],

  // ---- Contact ----
  // Shown as a "Call Us" button. Use the full number with country code
  // for the tel: link (e.g. "+919999999999"); displayLabel is optional
  // text shown in the button instead of the raw number.
  contact: {
    phone: "+919562535408",
    displayLabel: "", // e.g. "Call Saleem" — leave "" to just show "Call Us"
    displayLabelML: "", // e.g. "സലീമിനെ വിളിക്കുക"
  },

  // ---- Background music (optional) ----
  // Off by default. To enable: set enabled:true and add an mp3 to assets/audio/
  music: {
    enabled: false,
    src: "assets/audio/background.mp3",
  },

  // ---- Footer ----
  // Shown as "Best compliments from: <text>". Leave "" to hide.
  complimentsFrom: "Muttiacherry and Kadayankot family",
  complimentsFromML: "മുട്ടിയച്ചേരി കുടുംബവും കടയങ്കോട്ട് കുടുംബവും",
  footerNote: "With the blessings of both families",
  footerNoteML: "രണ്ട് കുടുംബങ്ങളുടെയും അനുഗ്രഹത്തോടെ",
  hostedBy: "",
  hostedByML: "",

  // ---- Optional palette override ----
  // Leave as null to use the default palette in styles.css.
  // To customise, uncomment and set hex values.
  paletteOverride: null,
  /* paletteOverride: {
    ink: "#2B241C",
    green: "#3C5A4A",
    gold: "#C9A24B",
    terracotta: "#A85C32",
    ivory: "#FBF6EC",
    sand: "#E8DCC3",
  }, */
};
