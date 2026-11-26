/* ==========================================================================
   Visit Kaptai AI - Smart Tourism Portal (Frontend Logic)
   File: app.js
   Description: Clean, beginner-friendly Vanilla JavaScript handling:
     1. Live Kaptai Weather (Open-Meteo API)
     2. Places Rendering, Real-time Search & "See More" Toggle
     3. "Route from Chittagong" Popup Modal
     4. Interactive Traveler Reviews & Star Picker (Safe text rendering)
     5. AI Chatbox Toggle & n8n Webhook placeholder
   ========================================================================== */

// ==========================================================================
// 1. DATA DEFINITIONS (Places & Routes)
// ==========================================================================

/**
 * List of all 10 tourist spots in Kaptai & Rangamati region.
 * - First 6 places are shown by default.
 * - The remaining 4 items have `extra: true` and are revealed via "See More Places".
 * - Images mapped directly to image/places/ directory.
 */
const places = [
  {
    id: 1,
    name: "Kaptai Lake & Kayak Club",
    short: "Crystal emerald lake water surrounded by lush hills, famous for morning kayaking and sunrise boat rides.",
    full: "Kaptai Lake is the largest man-made lake in Bangladesh. Early morning is the best time for kayaking and boat rides, when the water is calm and the hills are covered in mist. Kayak clubs offer hourly rentals and safety life jackets.",
    image: "image/places/Kaptai Lake & Kayak Club.jpg",
    audio: "Audio/01_kaptai_lake_kayak_club_v2.wav",
    map: "Kaptai Lake Kayak Club",
    video: "Kaptai Lake Kayak Club",
    phone: "01890-837441"
  },
  {
    id: 2,
    name: "Lake Paradise (Bangladesh Navy Picnic Spot)",
    short: "Scenic lakeside picnic spot managed by Bangladesh Navy with panoramic viewpoints and boat pier (carry ID).",
    full: "A pristine, secure lakeside attraction maintained by the Bangladesh Navy. Features tidy walking paths, hillside picnic cottages, breathtaking views of the water horizon, and dedicated boat boarding piers. Valid identification is required at the security gate.",
    image: "image/places/Lake Paradise (Bangladesh Navy Picnic Spot).webp",
    audio: "Audio/02_lake_paradise_navy_camp.wav",
    map: "Lake Paradise Kaptai",
    video: "Lake Paradise Kaptai Navy",
    phone: "01769-772174"
  },
  {
    id: 3,
    name: "Chitmaram Buddhist Temple",
    short: "Historic hilltop golden temple overlooking the Karnaphuli River with Marma heritage (dress modestly).",
    full: "A revered historic Buddhist temple set quietly atop a hill overlooking the winding Karnaphuli River. Renowned for traditional Marma indigenous culture, Buddhist relics, and tranquil meditation surroundings. Visitors must dress modestly and remove shoes upon entering sacred grounds.",
    image: "image/places/Chitmaram Buddhist Temple.jpg",
    audio: "Audio/03_chitmaram_buddhist_temple.wav",
    map: "Chitmaram Buddhist Temple Kaptai",
    video: "Chitmaram Buddhist Temple Kaptai",
    phone: ""
  },
  {
    id: 4,
    name: "Sita Pahar",
    short: "Famous scenic hill along the Karnaphuli River in Raikhali, known for lush trekking trails, Sita Ghat, and local heritage.",
    full: "Rising along the scenic riverbanks in Raikhali, Sita Pahar is steeped in folklore and natural grandeur. An ideal destination for adventure trekkers, featuring forested ridges, natural bamboo groves, and panoramic vistas of the winding Karnaphuli River.",
    image: "image/places/Sita Pahar.jpg",
    audio: "Audio/04_sita_pahar.wav",
    map: "Sita Pahar Kaptai Raikhali",
    video: "Sita Pahar Kaptai",
    phone: ""
  },
  {
    id: 5,
    name: "Karnaphuli Hydroelectric Dam (Kaptai Dam)",
    short: "Iconic hydroelectric dam that formed Kaptai Lake (photography restricted in guarded zones).",
    full: "Constructed across the Karnaphuli River in the early 1960s, this historic dam gave birth to Kaptai Lake. It remains Bangladesh's singular hydroelectric power station. Visitors can view the spillway and spill gates; note that security regulations prohibit photography within guarded defense zones.",
    image: "image/places/Karnaphuli Hydroelectric Dam (Kaptai Dam).jpg",
    audio: "Audio/05_kaptai_dam.wav",
    map: "Kaptai Dam",
    video: "Kaptai Dam Hydroelectric",
    phone: ""
  },
  {
    id: 6,
    name: "Panorama Zoom Restaurant & Lake View",
    short: "Popular hilltop lakeside dining spot famous for sunset views over Kaptai Lake.",
    full: "Perched high above the shoreline, Panorama Zoom Restaurant delivers a panoramic 180-degree view of Kaptai's tranquil waters and surrounding green hills. Best visited late in the afternoon to savor fresh indigenous delicacies while watching the sunset over the lake.",
    image: "image/places/Panorama Zoom Restaurant & Lake View.jpg",
    audio: "Audio/06_panorama_zoom_restaurant.wav",
    map: "Panorama Zoom Restaurant Kaptai",
    video: "Panorama Zoom Restaurant Kaptai",
    phone: "01669-611387"
  },

  // Extra places revealed by clicking "See More Places"
  {
    id: 7,
    name: "Shilchori & Nisarga Pod House",
    short: "Peaceful riverside area with misty hill views and Bangladesh's famous pod-style eco-resorts along the Karnaphuli River.",
    full: "Shilchori is famed for its innovative wooden pod-style eco-resorts nestled right along the pristine riverbanks. Visitors can relax amidst tranquil mist, cross local suspension bridges, and experience hillside eco-cottages away from city noise.",
    image: "image/places/Shilchori & Nisarga Pod House.jpg",
    audio: "Audio/07_shilchori_nisarga_pod_house.wav",
    map: "Nisarga Pod House Shilchori Kaptai",
    video: "Nisarga Pod House Shilchori Kaptai",
    phone: "01818-441100",
    extra: true
  },
  {
    id: 8,
    name: "Karnafuly Tea Garden (Boroichori / Wagga)",
    short: "Lush green tea estate near Boroichori along the Kaptai road, great for morning walks and photography.",
    full: "A verdant carpet of rolling tea bushes situated in the Boroichori and Wagga valley along the road to Kaptai. One of the oldest tea gardens in the Chittagong Hill Tracts, offering serene mornings, refreshing hill air, and scenic photographic spots.",
    image: "image/places/Karnafuly Tea Garden (Boroichori).jpg",
    audio: "Audio/08_karnafuly_tea_garden.wav",
    map: "Karnafuly Tea Garden Boroichori Kaptai",
    video: "Karnafuly Tea Garden Kaptai",
    phone: "01717-122830",
    extra: true
  },
  {
    id: 9,
    name: "Aviary and Eco Park (Rangunia–Kaptai Road)",
    short: "Scenic eco-park and bird sanctuary featuring cable car rides, lake views, and hill trails on the way to Kaptai.",
    full: "Located along the scenic highway between Rangunia and Kaptai, this expansive eco-park features an aerial cable car ride across lush ravines, a large botanical aviary with native and migratory birds, serene walking bridges, and hillside picnic areas.",
    image: "image/places/Aviary and Eco Park (Rangunia–Kaptai Road).jpg",
    audio: "Audio/09_aviary_eco_park.wav",
    map: "Sheikh Russel Aviary and Eco Park Rangunia",
    video: "Sheikh Russel Aviary Eco Park Rangunia",
    phone: "01852-224252",
    extra: true
  },
  {
    id: 10,
    name: "Paharika Picnic Spot & Restaurant",
    short: "Quiet lakeside picnic and hangout spot on the Chittagong–Kaptai Road surrounded by greenery.",
    full: "A quiet and family-friendly picnic spot along the Chittagong–Kaptai corridor surrounded by shade trees and water viewpoints. Perfect for day-trippers seeking a relaxed meal and group leisure in a clean green environment.",
    image: "image/places/Paharika Picnic Spot & Restaurant.jpg",
    audio: "Audio/10_paharika_picnic_spot.wav",
    map: "Paharika Picnic Spot Kaptai",
    video: "Paharika Picnic Spot Kaptai",
    phone: "01723-350834",
    extra: true
  }
];

/**
 * Route details from Chittagong for each of the 10 places.
 * Displayed in the #routeModal popup.
 */
const routes = {
  "Kaptai Lake & Kayak Club": {
    image: "image/route/image.png",
    how: "Take a bus (80 BDT) or CNG (100 BDT) from Bahaddarhat, Chittagong to Lichubagan. From Lichubagan, take local transport to Panorama Zoom / Kaptai Kayak Club (30 BDT).",
    cost: "One-way transport: 110 BDT (bus) or 130 BDT (CNG). Round trip: ~220–260 BDT/person. Kayaking: 100 BDT (30 min) or 200 BDT (1 hr) per boat (2 people)."
  },
  "Lake Paradise (Bangladesh Navy Picnic Spot)": {
    image: "image/route/image copy.png",
    how: "Take a bus (80 BDT) or CNG (100 BDT) from Bahaddarhat to Lichubagan, then go to Kaptai Notun Bazar (50 BDT). From Notun Bazar, hire a reserve CNG directly to Lake Paradise (150 BDT; no local option).",
    cost: "130–150 BDT/person to Notun Bazar + 150 BDT reserve CNG (one-way, ~38 BDT/person if 4 share)."
  },
  "Chitmaram Buddhist Temple": {
    image: "image/route/image copy 2.png",
    how: "Take a bus (80 BDT) or CNG (100 BDT) from Bahaddarhat to Lichubagan, then local transport to Chitmaram ghat (40 BDT), and cross the river by boat (20 BDT).",
    cost: "One-way: 140 BDT (bus) or 160 BDT (CNG). Round trip: ~280–320 BDT/person."
  },
  "Sita Pahar": {
    image: "image/route/image copy 3.png",
    how: "Take a bus (80 BDT) or CNG (100 BDT) from Bahaddarhat to Lichubagan, then local transport along Kaptai Road (35 BDT).",
    cost: "One-way: 115 BDT (bus) or 135 BDT (CNG). Round trip: ~230–270 BDT/person."
  },
  "Karnaphuli Hydroelectric Dam (Kaptai Dam)": {
    image: "image/route/image copy 4.png",
    how: "Take a bus (80 BDT) or CNG (100 BDT) from Bahaddarhat to Lichubagan, then to Project Gate (60 BDT). Entry is restricted (requires a known official); Gate to Dam is 20 BDT.",
    cost: "One-way: 160 BDT (bus) or 180 BDT (CNG). Round trip: ~320–360 BDT/person."
  },
  "Panorama Zoom Restaurant & Lake View": {
    image: "image/route/image copy 5.png",
    how: "Take a bus (80 BDT) or CNG (100 BDT) from Bahaddarhat to Lichubagan, then local transport to Panorama Zoom Restaurant (30 BDT).",
    cost: "One-way: 110 BDT (bus) or 130 BDT (CNG). Round trip: ~220–260 BDT/person (excluding meals)."
  },
  "Shilchori & Nisarga Pod House": {
    image: "image/route/image copy 6.png",
    how: "Take a bus (80 BDT) or CNG (100 BDT) from Bahaddarhat to Lichubagan, then local transport to Shilchori / Nisarga Pod House (~40 BDT).",
    cost: "One-way: ~120 BDT (bus) or ~140 BDT (CNG). Round trip: ~240–280 BDT/person (excluding resort stay)."
  },
  "Karnafuly Tea Garden (Boroichori / Wagga)": {
    image: "image/route/image copy 7.png",
    how: "Take a bus (80 BDT) or CNG (100 BDT) from Bahaddarhat to Lichubagan. Walk 3–4 min along the right-side road to the ferry ghat, cross by boat (10 BDT), then take a reserve CNG to the tea garden (200 BDT).",
    cost: "90–110 BDT/person to ferry + 200 BDT reserve CNG (one-way, split among 4–5 people)."
  },
  "Aviary and Eco Park (Rangunia–Kaptai Road)": {
    image: "image/route/image copy 8.png",
    how: "Take a bus (80 BDT) or CNG (100 BDT) from Bahaddarhat to Lichubagan, then local transport to Aviary & Eco Park (~20 BDT). Note: Closed on Tuesdays.",
    cost: "One-way: ~100 BDT (bus) or ~120 BDT (CNG). Round trip: ~200–240 BDT/person (excluding entry/cable car tickets)."
  },
  "Paharika Picnic Spot & Restaurant": {
    image: "image/route/image copy 9.png",
    how: "Take a bus (80 BDT) or CNG (100 BDT) from Bahaddarhat to Lichubagan, then local transport along Kaptai Road to Paharika (30 BDT).",
    cost: "One-way: 110 BDT (bus) or 130 BDT (CNG). Round trip: ~220–260 BDT/person (excluding meals)."
  }
};


// ==========================================================================
// 2. FEATURE 1: LIVE KAPTAI WEATHER (Open-Meteo API)
// ==========================================================================

/**
 * Fetches real-time weather from Open-Meteo for Kaptai coordinates:
 * Latitude: 22.50, Longitude: 92.21
 */
function fetchKaptaiWeather() {
  const weatherText = document.getElementById("weatherText");
  if (!weatherText) return;

  const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=22.50&longitude=92.21&current=temperature_2m,wind_speed_10m";

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Weather network response was not ok");
      return response.json();
    })
    .then((data) => {
      const temperature = Math.round(data.current.temperature_2m);
      const windSpeed = data.current.wind_speed_10m;
      weatherText.textContent = `Kaptai Live: ${temperature}°C • Wind ${windSpeed} km/h`;
    })
    .catch((error) => {
      console.warn("Weather fetch failed; keeping fallback placeholder text:", error);
    });
}


// ==========================================================================
// 3. FEATURE 2: RENDER PLACES, REAL-TIME SEARCH & "SEE MORE"
// ==========================================================================

const placesGrid = document.getElementById("placesGrid");
const searchInput = document.getElementById("searchInput");
const noResult = document.getElementById("noResult");
const morePlacesBtn = document.getElementById("morePlacesBtn");

let showingAllPlaces = false;

/**
 * Renders all place cards dynamically into #placesGrid.
 * Renders real <img> tags from image/places/ with an emerald/teal gradient fallback.
 */
function renderPlaces() {
  if (!placesGrid) return;
  placesGrid.innerHTML = "";

  places.forEach((place) => {
    const card = document.createElement("div");
    // Extra places start hidden until "See More Places" is clicked
    // Card with soft 3D depth, subtle emerald border, and group hover zoom
    card.className = "place-card card-3d group bg-white rounded-2xl border border-emerald-100/80 p-2 flex flex-col" + (place.extra ? " hidden extra-place" : "");
    card.dataset.search = (place.name + " " + place.short + " " + place.full).toLowerCase();

    // Image container: Displays real <img> tag with smooth 3D hover zoom and emerald/teal fallback gradient
    card.innerHTML = `
      <div class="h-48 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-700 via-teal-700 to-cyan-800">
        <img src="${place.image}" alt="${place.name}" class="w-full h-full object-cover transition duration-500 group-hover:scale-105" onerror="this.style.display='none'" />
      </div>
      <div class="p-4 flex flex-col flex-1">
        <h3 class="font-semibold text-lg text-slate-900">${place.name}</h3>
        <p class="mt-2 text-sm text-slate-600">
          <span class="place-description">${place.short}</span>
          <span class="see-more-toggle cursor-pointer text-emerald-700 font-semibold hover:underline">See more</span>
        </p>
        <div class="mt-auto pt-4">
          <div class="border-t border-slate-100 pt-4 flex flex-wrap gap-2 min-h-[72px] content-start">
            <button type="button" class="route-btn px-3 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition">
              Route from Chittagong
            </button>
            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.map)}" target="_blank"
               class="px-3 py-1.5 rounded-md bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-semibold transition">
              Google Map
            </a>
            <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(place.video)}" target="_blank"
               class="px-3 py-1.5 rounded-md bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 text-xs font-semibold transition">
              Video
            </a>
            <button type="button"
               class="audio-btn px-3 py-1.5 rounded-md bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-semibold inline-flex items-center gap-1 transition">
              🎧 Audio Story
            </button>
            ${place.phone ? `
            <a href="tel:${place.phone}" class="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold inline-flex items-center gap-1 transition">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.5a1 1 0 01-.5 1.2l-2.26 1.13a11 11 0 005.52 5.52l1.13-2.26a1 1 0 011.2-.5l4.5 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z"/>
              </svg>
              ${place.phone}
            </a>` : ""}
          </div>
        </div>
      </div>
    `;

    // Toggle "See more / See less" description on this card
    let isExpanded = false;
    const descSpan = card.querySelector(".place-description");
    const toggleSpan = card.querySelector(".see-more-toggle");

    toggleSpan.addEventListener("click", () => {
      isExpanded = !isExpanded;
      descSpan.textContent = isExpanded ? place.full : place.short;
      toggleSpan.textContent = isExpanded ? " See less" : " See more";
    });

    // "Route from Chittagong" button: opens modal with route information
    const routeButton = card.querySelector(".route-btn");
    routeButton.addEventListener("click", () => {
      openRouteModal(place.name);
    });

    // "Audio Story" button: opens minimal audio player popup
    const audioButton = card.querySelector(".audio-btn");
    audioButton.addEventListener("click", () => {
      openAudioModal(place.audio);
    });

    placesGrid.appendChild(card);
  });
}

/**
 * Toggles visibility of the extra 4 place cards.
 */
function setupSeeMorePlaces() {
  if (!morePlacesBtn) return;

  morePlacesBtn.addEventListener("click", () => {
    showingAllPlaces = !showingAllPlaces;
    const extraCards = document.querySelectorAll(".extra-place");

    extraCards.forEach((card) => {
      card.classList.toggle("hidden", !showingAllPlaces);
    });

    morePlacesBtn.textContent = showingAllPlaces ? "Show Less Places" : "See More Places";
  });
}

/**
 * Filters places in real time as user types in the search input.
 */
function setupPlacesSearch() {
  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    const allCards = document.querySelectorAll(".place-card");
    let matchCount = 0;

    allCards.forEach((card) => {
      if (query === "") {
        // Reset to initial pagination view (hide extra cards if showingAllPlaces is false)
        const isExtra = card.classList.contains("extra-place");
        card.classList.toggle("hidden", isExtra && !showingAllPlaces);
        matchCount++;
      } else {
        // Match against place name, short description, and full description
        const matches = card.dataset.search.includes(query);
        card.classList.toggle("hidden", !matches);
        if (matches) matchCount++;
      }
    });

    // Hide "See More" button during an active search to prevent confusion
    if (morePlacesBtn && morePlacesBtn.parentElement) {
      morePlacesBtn.parentElement.classList.toggle("hidden", query !== "");
    }

    // Show empty state if nothing matches
    if (noResult) {
      noResult.classList.toggle("hidden", matchCount > 0);
    }
  });
}


// ==========================================================================
// 4. FEATURE 3: "ROUTE FROM CHITTAGONG" POPUP MODAL
// ==========================================================================

const routeModal = document.getElementById("routeModal");
const routeTitle = document.getElementById("routeTitle");
const routeHow = document.getElementById("routeHow");
const routeCost = document.getElementById("routeCost");
const routeClose = document.getElementById("routeClose");
const routeImg = document.getElementById("routeImg");

/**
 * Opens route popup for the given place name.
 */
function openRouteModal(placeName) {
  if (!routeModal) return;

  const routeInfo = routes[placeName] || {
    image: "",
    how: "Route details will be updated soon. Please ask in our AI Chat.",
    cost: "Estimated budget will be provided shortly."
  };

  if (routeTitle) routeTitle.textContent = placeName;
  if (routeHow) routeHow.textContent = routeInfo.how;
  if (routeCost) routeCost.textContent = routeInfo.cost;

  if (routeImg) {
    if (routeInfo.image) {
      routeImg.style.display = "block";
      routeImg.src = routeInfo.image;
    } else {
      routeImg.style.display = "none";
      routeImg.src = "";
    }
  }

  routeModal.classList.remove("hidden");
}

/**
 * Closes the route popup modal.
 */
function closeRouteModal() {
  if (routeModal) {
    routeModal.classList.add("hidden");
  }
}

function setupRouteModalEvents() {
  if (!routeModal) return;

  // Close when clicking the 'X' button
  if (routeClose) {
    routeClose.addEventListener("click", closeRouteModal);
  }

  // Close when clicking the dark backdrop outside the modal card
  routeModal.addEventListener("click", (event) => {
    if (event.target === routeModal) {
      closeRouteModal();
    }
  });

  // Close when pressing the Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !routeModal.classList.contains("hidden")) {
      closeRouteModal();
    }
  });
}


// ==========================================================================
// 4B. MINIMAL AUDIO STORY POPUP MODAL
// ==========================================================================

const audioModal = document.getElementById("audioModal");
const storyAudio = document.getElementById("storyAudio");
const audioClose = document.getElementById("audioClose");
const audioPlayPauseBtn = document.getElementById("audioPlayPauseBtn");

/**
 * Opens the minimal audio player popup and plays the selected audio file.
 */
function openAudioModal(audioSrc) {
  if (!audioModal || !storyAudio) return;

  storyAudio.src = audioSrc;
  audioModal.classList.remove("hidden");
  storyAudio.play().catch(() => {
    if (audioPlayPauseBtn) audioPlayPauseBtn.textContent = "Play";
  });
  if (audioPlayPauseBtn) audioPlayPauseBtn.textContent = "Pause";
}

/**
 * Pauses & resets the audio player, then hides the popup.
 */
function closeAudioModal() {
  if (!audioModal || !storyAudio) return;

  storyAudio.pause();
  storyAudio.currentTime = 0;
  audioModal.classList.add("hidden");
}

function setupAudioModalEvents() {
  if (!audioModal || !storyAudio) return;

  // Toggle Play / Pause button
  if (audioPlayPauseBtn) {
    audioPlayPauseBtn.addEventListener("click", () => {
      if (storyAudio.paused) {
        storyAudio.play();
        audioPlayPauseBtn.textContent = "Pause";
      } else {
        storyAudio.pause();
        audioPlayPauseBtn.textContent = "Play";
      }
    });
  }

  // Keep button label synced with native audio controls
  storyAudio.addEventListener("play", () => {
    if (audioPlayPauseBtn) audioPlayPauseBtn.textContent = "Pause";
  });
  storyAudio.addEventListener("pause", () => {
    if (audioPlayPauseBtn) audioPlayPauseBtn.textContent = "Play";
  });

  // Close on '×' button, backdrop click, or Escape key
  if (audioClose) {
    audioClose.addEventListener("click", closeAudioModal);
  }
  audioModal.addEventListener("click", (event) => {
    if (event.target === audioModal) closeAudioModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !audioModal.classList.contains("hidden")) {
      closeAudioModal();
    }
  });
}


// ==========================================================================
// 5. FEATURE 4: TRAVELER REVIEWS & 1-5 STAR RATING PICKER
// ==========================================================================

// Temporary in-memory reviews array initialized with 2 sample reviews
const reviewsData = [
  {
    name: "Farhan Sadik",
    rating: 5,
    text: "Kayaking at 7 AM was unforgettable! The Chattogram route guide here saved us so much time."
  },
  {
    name: "Maliha Rahman",
    rating: 4,
    text: "Chitmaram Temple and Lake Paradise were super peaceful. The boat prices from the AI chat were very accurate."
  }
];

let currentRating = 5;

/**
 * Returns stars as a string (e.g. 5 -> ★★★★★, 4 -> ★★★★☆)
 */
function formatStars(rating) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

/**
 * Renders the review cards safely using textContent (prevents XSS).
 */
function renderReviewsList() {
  const reviewList = document.getElementById("reviewList");
  if (!reviewList) return;

  reviewList.innerHTML = "";

  reviewsData.forEach((rev) => {
    const card = document.createElement("div");
    card.className = "card-3d bg-white rounded-xl border border-emerald-100 p-5";

    const headerDiv = document.createElement("div");
    headerDiv.className = "flex justify-between items-center";

    // Author group: circular emerald initial avatar + reviewer name
    const authorDiv = document.createElement("div");
    authorDiv.className = "flex items-center gap-2.5";

    const avatarSpan = document.createElement("span");
    avatarSpan.className = "w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center";
    avatarSpan.textContent = rev.name.charAt(0).toUpperCase(); // Safe assignment

    const nameP = document.createElement("p");
    nameP.className = "font-semibold text-sm text-slate-900";
    nameP.textContent = rev.name; // Safe assignment

    authorDiv.appendChild(avatarSpan);
    authorDiv.appendChild(nameP);

    const starsSpan = document.createElement("span");
    starsSpan.className = "text-amber-400 text-sm";
    starsSpan.textContent = formatStars(rev.rating); // Safe assignment

    headerDiv.appendChild(authorDiv);
    headerDiv.appendChild(starsSpan);

    const commentP = document.createElement("p");
    commentP.className = "mt-2 text-sm text-slate-600";
    commentP.textContent = rev.text; // Safe assignment

    card.appendChild(headerDiv);
    card.appendChild(commentP);

    reviewList.appendChild(card);
  });
}

/**
 * Interactive 1-5 star picker setup.
 */
function renderStarPicker() {
  const starPicker = document.getElementById("starPicker");
  if (!starPicker) return;

  starPicker.innerHTML = "";

  for (let i = 1; i <= 5; i++) {
    const starBtn = document.createElement("button");
    starBtn.type = "button";
    starBtn.textContent = "★";
    starBtn.className = "transition cursor-pointer focus:outline-none " + (i <= currentRating ? "text-amber-400" : "text-slate-300");

    starBtn.addEventListener("click", () => {
      currentRating = i;
      renderStarPicker();
    });

    starPicker.appendChild(starBtn);
  }
}

/**
 * Handles review form submission.
 */
function setupReviewForm() {
  const reviewForm = document.getElementById("reviewForm");
  const revName = document.getElementById("revName");
  const revComment = document.getElementById("revComment");

  if (!reviewForm) return;

  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameValue = revName ? revName.value.trim() : "";
    const commentValue = revComment ? revComment.value.trim() : "";

    if (!nameValue || !commentValue) {
      alert("Please fill in both your name and comment.");
      return;
    }

    // Add new review to the beginning of the list
    reviewsData.unshift({
      name: nameValue,
      rating: currentRating,
      text: commentValue
    });

    // Reset inputs
    reviewForm.reset();
    currentRating = 5;
    renderStarPicker();
    renderReviewsList();
  });
}


// ==========================================================================
// 6. FEATURE 5: AI CHATBOX (Connected to Live n8n Webhook)
// ==========================================================================

// Live n8n Production Webhook URL
const N8N_WEBHOOK_URL = "https://n8n.hablu-programmer.com/webhook/kaptai-chat";

// Unique session ID generated per page load so n8n Simple Memory remembers conversation history
const sessionId = "user-" + Math.random().toString(36).slice(2, 10);

function setupChatbox() {
  const chatBox = document.getElementById("chatBox");
  const chatToggle = document.getElementById("chatToggle");
  const chatClose = document.getElementById("chatClose");
  const budgetBtn = document.getElementById("budgetBtn");
  const chatInput = document.getElementById("chatInput");
  const chatForm = document.getElementById("chatForm");
  const chatMessages = document.getElementById("chatMessages");
  const sendButton = chatForm ? chatForm.querySelector("button") : null;

  if (!chatBox) return;

  // Toggle chat with floating bottom-right button
  if (chatToggle) {
    chatToggle.addEventListener("click", () => {
      chatBox.classList.toggle("hidden");
      if (!chatBox.classList.contains("hidden") && chatInput) {
        chatInput.focus();
      }
    });
  }

  // Close chat with header 'X' button
  if (chatClose) {
    chatClose.addEventListener("click", () => {
      chatBox.classList.add("hidden");
    });
  }

  // "Let's Estimate the Budget" hero button opens chat directly
  if (budgetBtn) {
    budgetBtn.addEventListener("click", () => {
      chatBox.classList.remove("hidden");
      if (chatInput) {
        chatInput.focus();
        chatInput.placeholder = "Ask e.g. What is the budget for 2 people in Kaptai?";
      }
    });
  }

  // Helper to append a chat bubble safely (uses whitespace-pre-line for bullet points & line breaks)
  function appendChatMessage(text, sender) {
    if (!chatMessages) return null;

    const bubble = document.createElement("div");
    bubble.className = sender === "user"
      ? "bg-emerald-600 text-white rounded-xl px-3 py-2 max-w-[85%] ml-auto text-sm whitespace-pre-line"
      : "bg-white border border-slate-200 rounded-xl px-3 py-2 max-w-[85%] text-sm text-slate-800 whitespace-pre-line";
    bubble.textContent = text; // Safe text assignment

    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return bubble;
  }

  // Async submit handler connected to live n8n AI webhook
  if (chatForm && chatInput) {
    chatForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (!message) return;

      // 1. Render user message bubble & clear input field
      appendChatMessage(message, "user");
      chatInput.value = "";

      // 2. Render temporary "Typing..." bot bubble and disable send button
      const typingBubble = appendChatMessage("Typing...", "bot");
      if (sendButton) {
        sendButton.disabled = true;
        sendButton.classList.add("opacity-50", "cursor-not-allowed");
      }

      try {
        // 3. Send message & sessionId to live n8n webhook
        const response = await fetch(N8N_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: message,
            sessionId: sessionId
          })
        });

        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }

        // 4. Parse JSON reply from n8n ({ "reply": "..." })
        const data = await response.json();
        typingBubble.textContent = data.reply || "Sorry, no reply received.";
      } catch (err) {
        console.error("AI Chat webhook error:", err);
        typingBubble.textContent = "Sorry, I couldn't connect to the AI guide right now. Please try again.";
      } finally {
        // 5. Re-enable send button
        if (sendButton) {
          sendButton.disabled = false;
          sendButton.classList.remove("opacity-50", "cursor-not-allowed");
        }
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      }
    });
  }
}


// ==========================================================================
// 7. FEATURE 6: VAPI AI VOICE CALL (In-Browser Voice Guide)
// ==========================================================================

// Vapi Public API Key & Assistant ID
const VAPI_PUBLIC_KEY = "5f3127a6-1631-4ac5-927f-3d838525ccc5";
const VAPI_ASSISTANT_ID = "7fc52ad1-47d2-4e7c-bdf4-3b2db91f1327";

let vapiInstance = null;
let isCallActive = false;

/**
 * Initializes and handles live voice calls with Kaptai AI Voice Assistant using Vapi
 */
function setupVapiVoiceCall() {
  const callBtn = document.getElementById("vapiCallBtn");
  const callBtnText = document.getElementById("vapiCallBtnText");
  const statusText = document.getElementById("vapiStatus");

  if (!callBtn) return;

  // Helper function to reset button back to default emerald state
  function resetCallButton() {
    isCallActive = false;
    callBtn.className = "inline-flex items-center gap-2 mt-8 px-10 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-lg font-bold shadow-lg transition";
    if (callBtnText) callBtnText.textContent = "Call to Book a Guide";
    if (statusText) {
      statusText.classList.add("hidden");
      statusText.textContent = "";
    }
  }

  // Initialize Vapi SDK instance once loaded
  function initVapi() {
    if (window.vapiSDK && !vapiInstance) {
      vapiInstance = window.vapiSDK.run({
        apiKey: VAPI_PUBLIC_KEY,
        assistant: VAPI_ASSISTANT_ID,
        config: { position: "bottom-left" }
      });

      // Event listener: Call has started and microphone is active
      vapiInstance.on("call-start", () => {
        isCallActive = true;
        callBtn.className = "inline-flex items-center gap-2 mt-8 px-10 py-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-lg font-bold shadow-lg transition";
        if (callBtnText) callBtnText.textContent = "End Voice Call";
        if (statusText) {
          statusText.classList.remove("hidden");
          statusText.textContent = "Live: Speak in Bengali with Kaptai AI Voice Guide...";
        }
      });

      // Event listener: Call has ended
      vapiInstance.on("call-end", () => {
        resetCallButton();
      });

      // Event listener: Voice call error
      vapiInstance.on("error", (err) => {
        console.error("Vapi Voice Call error:", err);
        resetCallButton();
        if (statusText) {
          statusText.classList.remove("hidden");
          statusText.textContent = "Unable to connect voice call. Please check microphone permissions.";
        }
      });
    }
  }

  // Check if SDK is already loaded or wait a moment for deferred script
  if (window.vapiSDK) {
    initVapi();
  } else {
    window.addEventListener("load", initVapi);
  }

  // Button click handler: toggle start/stop voice call
  callBtn.addEventListener("click", () => {
    // If SDK is still loading
    if (!vapiInstance) {
      initVapi();
    }

    if (!vapiInstance) {
      alert("Voice guide service is still loading. Please try again in 2 seconds.");
      return;
    }

    if (!isCallActive) {
      // 1. Start voice call
      if (callBtnText) callBtnText.textContent = "Connecting...";
      if (statusText) {
        statusText.classList.remove("hidden");
        statusText.textContent = "Connecting to Kaptai AI Voice Guide...";
      }
      try {
        vapiInstance.start(VAPI_ASSISTANT_ID);
      } catch (e) {
        console.error("Failed to start Vapi call:", e);
        resetCallButton();
      }
    } else {
      // 2. Stop voice call
      if (callBtnText) callBtnText.textContent = "Ending...";
      try {
        vapiInstance.stop();
      } catch (e) {
        console.error("Failed to stop Vapi call:", e);
        resetCallButton();
      }
    }
  });
}


// ==========================================================================
// 8. INITIALIZATION (DOM CONTENT LOADED)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Fetch real-time weather
  fetchKaptaiWeather();

  // 2. Render places & setup search & "See more places"
  renderPlaces();
  setupSeeMorePlaces();
  setupPlacesSearch();

  // 3. Setup route modal & audio modal interactions
  setupRouteModalEvents();
  setupAudioModalEvents();

  // 4. Setup traveler reviews and star rating picker
  renderStarPicker();
  renderReviewsList();
  setupReviewForm();

  // 5. Setup AI chat widget toggling
  setupChatbox();

  // 6. Setup Vapi AI Voice Guide call
  setupVapiVoiceCall();
});
