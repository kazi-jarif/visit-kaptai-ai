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
 * List of all tourist spots in Kaptai & Rangamati.
 * - First 6 places are shown by default.
 * - The remaining 4 items have `extra: true` and are revealed via "See More Places".
 */
const places = [
  {
    name: "Kaptai Lake & Kayak Club",
    short: "Crystal emerald lake water surrounded by lush hills, famous for peaceful kayaking and sunrise boat rides.",
    full: "Kaptai Lake is the largest man-made lake in Bangladesh. Early morning is the best time for kayaking and boat rides, when the water is calm and the hills are covered in mist.",
    image: "image/places/kaptai-lake.jpg",
    map: "Kaptai Lake",
    video: "Kaptai Lake"
  },
  {
    name: "Lake Paradise (Navy Camp)",
    short: "Scenic lakeside picnic spot managed by Bangladesh Navy with panoramic viewpoints and boat pier.",
    full: "A peaceful spot good for picnics, sunset views and short boat trips. Follow the entry rules and visiting hours at the gate.",
    image: "image/places/lake-paradise.jpg",
    map: "Lake Paradise Kaptai",
    video: "Lake Paradise Kaptai"
  },
  {
    name: "Chitmaram Buddhist Temple",
    short: "Historic hilltop golden temple overlooking the Karnaphuli River with serene Marma heritage.",
    full: "A well-known Buddhist temple with a quiet atmosphere and a river view. Dress modestly and remove shoes before entering the temple area.",
    image: "image/places/chitmaram-temple.jpg",
    map: "Chitmaram Buddhist Temple Kaptai",
    video: "Chitmaram Buddhist Temple Kaptai"
  },
  {
    name: "Shilchori & Hanging Bridge View",
    short: "Misty hill trails, riverside suspension views, and quiet eco-resorts away from city crowds.",
    full: "A calm area for walking, photography and enjoying the hills. Wear comfortable shoes because some trails can be slippery after rain.",
    image: "image/places/shilchori.jpg",
    map: "Shilchori Kaptai",
    video: "Shilchori Kaptai"
  },
  {
    name: "Kaptai National Park",
    short: "Dense tropical forest reserve home to teak trees, nature trails, and wild birds along Kaptai road.",
    full: "A protected forest area good for bird watching and nature walks. Keep the forest clean and do not disturb wildlife.",
    image: "image/places/national-park.jpg",
    map: "Kaptai National Park",
    video: "Kaptai National Park"
  },
  {
    name: "Zoom Restaurant & Lake View",
    short: "Iconic hilltop lakeside dining spot famous for sunset views over Kaptai Lake.",
    full: "A good place to relax after sightseeing. Come near sunset for the best view, and arrive early on weekends because it gets crowded.",
    image: "image/places/zoom-restaurant.jpg",
    map: "Zoom Restaurant Kaptai",
    video: "Zoom Restaurant Kaptai"
  },

  // Extra places revealed by clicking "See More Places"
  {
    name: "Karnaphuli Dam (Kaptai Dam)",
    short: "The hydroelectric dam that created Kaptai Lake.",
    full: "A major landmark of the region. Photography is restricted in some parts, so follow the signs and instructions of the guards.",
    image: "image/places/kaptai-dam.jpg",
    map: "Kaptai Dam",
    video: "Kaptai Dam",
    extra: true
  },
  {
    name: "Rajban Vihar",
    short: "Famous Buddhist monastery near Rangamati.",
    full: "One of the most important Buddhist temples in the hill region, with beautiful architecture and a peaceful garden.",
    image: "image/places/rajban-vihar.jpg",
    map: "Rajban Vihar",
    video: "Rajban Vihar",
    extra: true
  },
  {
    name: "Rangamati Hanging Bridge",
    short: "Iconic suspension bridge over the lake.",
    full: "A popular photo spot and a symbol of Rangamati. Visit in the morning to avoid crowds.",
    image: "image/places/hanging-bridge.jpg",
    map: "Rangamati Hanging Bridge",
    video: "Rangamati Hanging Bridge",
    extra: true
  },
  {
    name: "Shuvolong Waterfall",
    short: "A scenic waterfall reached by a boat ride.",
    full: "Reached by boat from the Rangamati side. Best visited in or just after the rainy season when the water flow is strong.",
    image: "image/places/shuvolong.jpg",
    map: "Shuvolong Waterfall",
    video: "Shuvolong Waterfall",
    extra: true
  }
];

/**
 * Route details from Chittagong for each place.
 * Displayed in the #routeModal popup.
 */
const routes = {
  "Kaptai Lake & Kayak Club": {
    how: "Take a Rangamati-bound bus from Chittagong city (Bahaddarhat or Oxygen area) and get off at Kaptai Rastar Matha. This takes about 1.5 to 2 hours. From there, take a CNG or rickshaw to the lake ghat (10 to 15 minutes).",
    cost: "Bus: ৳100–150 per person. CNG/rickshaw: ৳50–150. Total about ৳300–500 per person for a round trip."
  },
  "Lake Paradise (Navy Camp)": {
    how: "Reach Kaptai Rastar Matha by Rangamati-bound bus from Chittagong (about 1.5 to 2 hours), then take a CNG to Lake Paradise (about 10 minutes). Carry an ID because there are entry checks.",
    cost: "Bus: ৳100–150. CNG: ৳100–200. Entry ticket: small fee at the gate. Total about ৳400–600 per person round trip."
  },
  "Chitmaram Buddhist Temple": {
    how: "Go to Kaptai by bus from Chittagong, then continue by boat or CNG toward Chitmaram. The last part of the route can change with the water level, so confirm with a local guide.",
    cost: "Bus: ৳100–150. Boat or CNG for the last part: ৳300–1,000 depending on group size. Temple entry is usually free."
  },
  "Shilchori & Hanging Bridge View": {
    how: "Take a bus from Chittagong toward Kaptai, then a CNG or local boat to the Shilchori area. A local guide is recommended because the trails and boat points are not well marked.",
    cost: "Bus: ৳100–150. CNG/boat: ৳300–800. Guide: ask on call. Budget ৳600–1,200 per person."
  },
  "Kaptai National Park": {
    how: "The park is along the Kaptai road. Take a Kaptai-bound bus from Chittagong and tell the helper your stop, or hire a CNG from Kaptai Rastar Matha.",
    cost: "Bus: ৳100–150. CNG: ৳100–300. Park entry ticket: small fee. Total about ৳400–600 per person."
  },
  "Zoom Restaurant & Lake View": {
    how: "Reach Kaptai Rastar Matha by bus from Chittagong, then take a CNG to the restaurant. Best to arrive in the late afternoon for sunset.",
    cost: "Bus: ৳100–150. CNG: ৳100–200. Meal: ৳300–600 per person. Total about ৳700–1,100 per person."
  },
  "Karnaphuli Dam (Kaptai Dam)": {
    how: "Take a Kaptai-bound bus from Chittagong (about 1.5 to 2 hours) and get off at Kaptai. The dam area is reachable by a short CNG ride. Photography is restricted in some parts.",
    cost: "Bus: ৳100–150. CNG: ৳50–150. Total about ৳300–400 per person round trip."
  },
  "Rajban Vihar": {
    how: "Take a Rangamati-bound bus from Chittagong (about 2.5 to 3 hours), then a CNG from Rangamati town to Rajban Vihar.",
    cost: "Bus: ৳150–250. CNG: ৳100–200. Total about ৳500–800 per person round trip."
  },
  "Rangamati Hanging Bridge": {
    how: "Take a Rangamati-bound bus from Chittagong, then walk or take a CNG from the bus stand to the bridge. Entry to the bridge area has a small ticket.",
    cost: "Bus: ৳150–250. CNG: ৳50–100. Bridge ticket: small fee. Total about ৳400–700 per person round trip."
  },
  "Shuvolong Waterfall": {
    how: "Go to Rangamati by bus, then hire a boat from the tourist ghat to Shuvolong. The boat ride takes about 45 minutes to 1 hour each way.",
    cost: "Bus: ৳150–250. Boat: ৳1,500–3,000 per boat (shared among the group). Budget ৳1,000–1,800 per person."
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
 * Uses emerald/slate placeholder boxes with zero broken image tags.
 */
function renderPlaces() {
  if (!placesGrid) return;
  placesGrid.innerHTML = "";

  places.forEach((place) => {
    const card = document.createElement("div");
    // Extra places start hidden until "See More Places" is clicked
    // Card with subtle emerald border, shadow on hover, and smooth translate effect
    card.className = "place-card bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition p-2 flex flex-col" + (place.extra ? " hidden extra-place" : "");
    card.dataset.search = (place.name + " " + place.short + " " + place.full).toLowerCase();

    // Placeholder gradient box: Deep teal to emerald gradient matching the Kaptai lake palette
    card.innerHTML = `
      <div class="h-48 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-700 via-teal-700 to-cyan-800 flex flex-col items-center justify-center text-emerald-100 p-4 text-center">
        <svg class="w-10 h-10 mb-2 opacity-80" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
        <span class="text-xs font-semibold tracking-wide uppercase">${place.name}</span>
      </div>
      <div class="p-4 flex flex-col flex-1">
        <h3 class="font-bold text-lg text-slate-900">${place.name}</h3>
        <p class="mt-2 text-sm text-slate-600">
          <span class="place-description">${place.short}</span>
          <span class="see-more-toggle cursor-pointer text-emerald-700 font-semibold hover:underline">See more</span>
        </p>
        <div class="mt-auto pt-4">
          <div class="border-t border-slate-100 pt-4 flex flex-wrap gap-2">
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

/**
 * Opens route popup for the given place name.
 */
function openRouteModal(placeName) {
  if (!routeModal) return;

  const routeInfo = routes[placeName] || {
    how: "Route details will be updated soon. Please ask in our AI Chat.",
    cost: "Estimated budget will be provided shortly."
  };

  if (routeTitle) routeTitle.textContent = placeName;
  if (routeHow) routeHow.textContent = routeInfo.how;
  if (routeCost) routeCost.textContent = routeInfo.cost;

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
    card.className = "bg-white rounded-xl border border-slate-200 shadow-sm p-5";

    const headerDiv = document.createElement("div");
    headerDiv.className = "flex justify-between items-center";

    const nameP = document.createElement("p");
    nameP.className = "font-semibold text-sm text-slate-900";
    nameP.textContent = rev.name; // Safe assignment

    const starsSpan = document.createElement("span");
    starsSpan.className = "text-amber-400 text-sm";
    starsSpan.textContent = formatStars(rev.rating); // Safe assignment

    headerDiv.appendChild(nameP);
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
// 6. FEATURE 5: AI CHATBOX TOGGLE & N8N WEBHOOK PLACEHOLDER
// ==========================================================================

// Placeholder ready for n8n Webhook connection in the next step
const N8N_WEBHOOK_URL = "PASTE_YOUR_N8N_WEBHOOK_URL_HERE";

function setupChatbox() {
  const chatBox = document.getElementById("chatBox");
  const chatToggle = document.getElementById("chatToggle");
  const chatClose = document.getElementById("chatClose");
  const budgetBtn = document.getElementById("budgetBtn");
  const chatInput = document.getElementById("chatInput");
  const chatForm = document.getElementById("chatForm");
  const chatMessages = document.getElementById("chatMessages");

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

  // Helper to append a chat bubble safely
  function appendChatMessage(text, sender) {
    if (!chatMessages) return null;

    const bubble = document.createElement("div");
    bubble.className = sender === "user"
      ? "bg-emerald-600 text-white rounded-xl px-3 py-2 max-w-[85%] ml-auto text-sm"
      : "bg-white border border-slate-200 rounded-xl px-3 py-2 max-w-[85%] text-sm text-slate-800";
    bubble.textContent = text; // Safe assignment

    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return bubble;
  }

  // Optional: Handle chat message form submission (ready for webhook)
  if (chatForm && chatInput) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (!message) return;

      // Show user message
      appendChatMessage(message, "user");
      chatInput.value = "";

      // Notice placeholder
      if (N8N_WEBHOOK_URL === "PASTE_YOUR_N8N_WEBHOOK_URL_HERE") {
        setTimeout(() => {
          appendChatMessage("Chatbot webhook is ready! Connect your n8n Webhook URL in app.js to enable live AI responses.", "bot");
        }, 500);
      }
    });
  }
}


// ==========================================================================
// 7. INITIALIZATION (DOM CONTENT LOADED)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Fetch real-time weather
  fetchKaptaiWeather();

  // 2. Render places & setup search & "See more places"
  renderPlaces();
  setupSeeMorePlaces();
  setupPlacesSearch();

  // 3. Setup route modal interactions
  setupRouteModalEvents();

  // 4. Setup traveler reviews and star rating picker
  renderStarPicker();
  renderReviewsList();
  setupReviewForm();

  // 5. Setup AI chat widget toggling
  setupChatbox();
});
