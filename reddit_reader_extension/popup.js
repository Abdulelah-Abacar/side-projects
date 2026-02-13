// Cross-browser compatibility
const browserAPI = typeof browser !== "undefined" ? browser : chrome;

let readerModeActive = false;
let speechActive = false;
let currentTab = null;

// Get current tab
async function getCurrentTab() {
  const tabs = await browserAPI.tabs.query({
    active: true,
    currentWindow: true,
  });
  return tabs[0];
}

// Check if on Reddit post page
function isRedditPost(url) {
  return url && url.includes("reddit.com/r/") && url.includes("/comments/");
}

// Load voices
function loadVoices() {
  const voices = speechSynthesis.getVoices();
  const voiceSelect = document.getElementById("voice");

  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

// Initialize
async function init() {
  currentTab = await getCurrentTab();
  const status = document.getElementById("status");
  const readerBtn = document.getElementById("readerBtn");
  const speechBtn = document.getElementById("speechBtn");
  const stopSpeechBtn = document.getElementById("stopSpeechBtn");
  const rateInput = document.getElementById("rate");
  const rateValue = document.getElementById("rateValue");

  // Check if on Reddit post
  if (!isRedditPost(currentTab.url)) {
    status.textContent = "⚠️ Please open a Reddit post";
    readerBtn.disabled = true;
    return;
  }

  status.textContent = "✅ Reddit post detected!";

  // Load saved state
  const data = await browserAPI.storage.local.get([
    "readerMode",
    "speechRate",
    "voiceIndex",
  ]);
  readerModeActive = data.readerMode || false;

  if (readerModeActive) {
    readerBtn.innerHTML = "<span>📄</span><span>Disable Reader Mode</span>";
    readerBtn.classList.add("active");
    speechBtn.disabled = false;
  }

  if (data.speechRate) {
    rateInput.value = data.speechRate;
    rateValue.textContent = data.speechRate + "x";
  }

  // Load voices
  loadVoices();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
  }

  if (data.voiceIndex !== undefined) {
    document.getElementById("voice").value = data.voiceIndex;
  }

  // Reader mode toggle
  readerBtn.addEventListener("click", async () => {
    readerModeActive = !readerModeActive;

    try {
      const response = await browserAPI.tabs.sendMessage(currentTab.id, {
        action: "toggleReader",
        enabled: readerModeActive,
      });

      console.log("Toggle reader response:", response);

      await browserAPI.storage.local.set({ readerMode: readerModeActive });

      if (readerModeActive) {
        readerBtn.innerHTML = "<span>📄</span><span>Disable Reader Mode</span>";
        readerBtn.classList.add("active");
        speechBtn.disabled = false;
        status.textContent = "✅ Reader mode enabled!";
      } else {
        readerBtn.innerHTML = "<span>📄</span><span>Enable Reader Mode</span>";
        readerBtn.classList.remove("active");
        speechBtn.disabled = true;
        stopSpeechBtn.style.display = "none";
        speechBtn.style.display = "flex";
        status.textContent = "✅ Reader mode disabled";
      }
    } catch (error) {
      console.error("Error toggling reader mode:", error);
      status.textContent = "❌ Error: Please refresh the page and try again";
      readerModeActive = false;
    }
  });

  // Speech controls
  speechBtn.addEventListener("click", async () => {
    speechActive = true;
    speechBtn.style.display = "none";
    stopSpeechBtn.style.display = "flex";
    stopSpeechBtn.classList.add("speaking");

    const rate = parseFloat(rateInput.value);
    const voiceIndex = parseInt(document.getElementById("voice").value) || 0;

    await browserAPI.tabs.sendMessage(currentTab.id, {
      action: "startSpeech",
      rate: rate,
      voiceIndex: voiceIndex,
    });

    status.textContent = "🔊 Speech active...";
  });

  stopSpeechBtn.addEventListener("click", async () => {
    speechActive = false;
    stopSpeechBtn.style.display = "none";
    speechBtn.style.display = "flex";
    stopSpeechBtn.classList.remove("speaking");

    await browserAPI.tabs.sendMessage(currentTab.id, {
      action: "stopSpeech",
    });

    status.textContent = "⏹️ Speech stopped";
  });

  // Save rate changes
  rateInput.addEventListener("input", async (e) => {
    const value = e.target.value;
    rateValue.textContent = value + "x";
    await browserAPI.storage.local.set({ speechRate: value });
  });

  // Save voice changes
  document.getElementById("voice").addEventListener("change", async (e) => {
    await browserAPI.storage.local.set({ voiceIndex: e.target.value });
  });
}

init();
