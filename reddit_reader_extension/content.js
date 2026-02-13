// Cross-browser compatibility
const browserAPI = typeof browser !== "undefined" ? browser : chrome;

let readerModeActive = false;
let speechActive = false;
let currentUtterance = null;
let textSegments = [];
let currentSegmentIndex = 0;

// Wait for page to be fully loaded
function waitForContent(selector, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, timeout);
  });
}

// Extract post content with multiple selectors
function extractPostContent() {
  let postTitle = "";
  let postBody = "";

  // New Reddit selectors
  const newRedditTitle =
    document.querySelector('h1[slot="title"]') ||
    document.querySelector("h1") ||
    document.querySelector('[data-adclicklocation="title"]');

  const newRedditBody =
    document.querySelector('div[slot="text-body"]') ||
    document.querySelector('[data-test-id="post-content"] p') ||
    document.querySelector('div[data-click-id="text"] div');

  // Old Reddit selectors
  const oldRedditTitle = document.querySelector(".title > a");
  const oldRedditBody = document.querySelector(".usertext-body .md");

  // Get title
  if (newRedditTitle) {
    postTitle = newRedditTitle.textContent;
  } else if (oldRedditTitle) {
    postTitle = oldRedditTitle.textContent;
  }

  // Get body
  if (newRedditBody) {
    postBody = newRedditBody.textContent;
  } else if (oldRedditBody) {
    postBody = oldRedditBody.textContent;
  }

  // Try getting all paragraphs if body is empty
  if (!postBody) {
    const paragraphs = document.querySelectorAll(
      'div[data-test-id="post-content"] p, .usertext-body p'
    );
    postBody = Array.from(paragraphs)
      .map((p) => p.textContent)
      .join("\n\n");
  }

  console.log("Extracted post:", {
    title: postTitle,
    bodyLength: postBody.length,
  });

  return {
    title: postTitle.trim(),
    body: postBody.trim(),
  };
}

// Extract comments with better selectors
function extractComments() {
  const comments = [];

  // Wait a bit for comments to load
  const commentSelectors = [
    "shreddit-comment",
    '[data-testid="comment"]',
    ".Comment",
    ".comment .entry",
  ];

  let commentElements = [];

  for (const selector of commentSelectors) {
    commentElements = document.querySelectorAll(selector);
    if (commentElements.length > 0) {
      console.log(
        `Found ${commentElements.length} comments using selector: ${selector}`
      );
      break;
    }
  }

  commentElements.forEach((comment, index) => {
    let author = "";
    let body = "";

    // Try different author selectors
    const authorElement =
      comment.querySelector("[author]") ||
      comment.querySelector('a[href*="/user/"]') ||
      comment.querySelector(".author");

    if (authorElement) {
      author =
        authorElement.getAttribute("author") || authorElement.textContent;
    }

    // Try different body selectors
    const bodyElement =
      comment.querySelector('[slot="comment"]') ||
      comment.querySelector('div[id*="comment-content"]') ||
      comment.querySelector(".md") ||
      comment.querySelector("p");

    if (bodyElement) {
      body = bodyElement.textContent;
    }

    // Fallback: get all text content
    if (!body) {
      body = comment.textContent;
      // Remove author name from body if present
      if (author) {
        body = body.replace(author, "").trim();
      }
    }

    if (body && body.length > 10) {
      comments.push({
        id: `comment-${index}`,
        author: author || "Anonymous",
        body: body.trim(),
        element: comment,
      });
    }
  });

  console.log(`Extracted ${comments.length} comments`);

  return comments;
}

// Create reader mode UI
function createReaderMode() {
  const post = extractPostContent();
  const comments = extractComments();

  if (!post.title) {
    alert("Could not extract post content. Please try refreshing the page.");
    return false;
  }

  // Remove existing reader if present
  const existingReader = document.getElementById("reddit-reader-mode");
  if (existingReader) {
    existingReader.remove();
  }

  // Create reader container
  const reader = document.createElement("div");
  reader.id = "reddit-reader-mode";
  reader.innerHTML = `
    <div class="reader-header">
      <button id="exit-reader">✕ Exit Reader Mode</button>
      <span class="reader-title-small">Reddit Reader</span>
    </div>
    <div class="reader-content">
      <article class="reader-post">
        <h1 class="reader-title">${escapeHtml(post.title)}</h1>
        ${
          post.body
            ? `<div class="reader-body">${escapeHtml(post.body)}</div>`
            : '<div class="reader-body"><em>This post has no text body</em></div>'
        }
      </article>
      
      <div class="reader-comments">
        <h2 class="comments-header">Comments (${comments.length})</h2>
        ${
          comments.length > 0
            ? comments
                .map(
                  (comment) => `
          <div class="reader-comment" data-comment-id="${comment.id}">
            <div class="comment-header">
              <span class="comment-author">${escapeHtml(comment.author)}</span>
              <button class="collapse-btn" data-collapsed="false">−</button>
            </div>
            <div class="comment-body">${escapeHtml(comment.body)}</div>
          </div>
        `
                )
                .join("")
            : '<p class="no-comments">No comments found or comments are still loading...</p>'
        }
      </div>
    </div>
    
    <div id="speech-indicator" style="display:none;">
      <div class="speech-bar">
        <span class="speech-icon">🔊</span>
        <span class="speech-text">Speaking...</span>
        <span class="speech-progress">0%</span>
      </div>
    </div>
  `;

  document.body.appendChild(reader);

  // Add event listeners
  document.getElementById("exit-reader").addEventListener("click", () => {
    disableReaderMode();
  });

  // Collapsible comments
  document.querySelectorAll(".collapse-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const comment = e.target.closest(".reader-comment");
      const body = comment.querySelector(".comment-body");
      const isCollapsed = e.target.dataset.collapsed === "true";

      if (isCollapsed) {
        body.style.display = "block";
        e.target.textContent = "−";
        e.target.dataset.collapsed = "false";
      } else {
        body.style.display = "none";
        e.target.textContent = "+";
        e.target.dataset.collapsed = "true";
      }
    });
  });

  return true;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Enable reader mode
function enableReaderMode() {
  if (readerModeActive) return;

  console.log("Enabling reader mode...");
  const success = createReaderMode();

  if (success) {
    document.body.classList.add("reader-mode-active");
    readerModeActive = true;
    console.log("Reader mode enabled successfully");
  } else {
    console.error("Failed to enable reader mode");
  }
}

// Disable reader mode
function disableReaderMode() {
  if (!readerModeActive) return;

  console.log("Disabling reader mode...");
  stopSpeech();
  document.body.classList.remove("reader-mode-active");
  const reader = document.getElementById("reddit-reader-mode");
  if (reader) reader.remove();
  readerModeActive = false;
}

// Start text-to-speech
function startSpeech(rate = 1.0, voiceIndex = 0) {
  if (speechActive) {
    console.log("Speech already active");
    return;
  }

  console.log("Starting speech...", { rate, voiceIndex });

  const post = extractPostContent();
  const comments = extractComments();

  if (!post.title) {
    alert("Could not extract content for speech. Please try again.");
    return;
  }

  // Prepare text segments
  textSegments = [];
  textSegments.push({ type: "title", text: "Post title: " + post.title });

  if (post.body) {
    textSegments.push({ type: "body", text: post.body });
  }

  if (comments.length > 0) {
    textSegments.push({
      type: "separator",
      text: `There are ${comments.length} comments`,
    });

    comments.forEach((comment, index) => {
      textSegments.push({
        type: "comment",
        text: `Comment ${index + 1} by ${comment.author}. ${comment.body}`,
      });
    });
  } else {
    textSegments.push({ type: "separator", text: "No comments available" });
  }

  console.log(`Prepared ${textSegments.length} text segments for speech`);

  currentSegmentIndex = 0;
  speechActive = true;

  // Show speech indicator
  const indicator = document.getElementById("speech-indicator");
  if (indicator) {
    indicator.style.display = "block";
  }

  speakNextSegment(rate, voiceIndex);
}

// Speak next segment
function speakNextSegment(rate, voiceIndex) {
  if (!speechActive || currentSegmentIndex >= textSegments.length) {
    console.log("Speech complete or stopped");
    stopSpeech();
    return;
  }

  const segment = textSegments[currentSegmentIndex];
  console.log(
    `Speaking segment ${currentSegmentIndex + 1}/${textSegments.length}: ${
      segment.type
    }`
  );

  currentUtterance = new SpeechSynthesisUtterance(segment.text);
  currentUtterance.rate = rate;

  const voices = speechSynthesis.getVoices();
  if (voices[voiceIndex]) {
    currentUtterance.voice = voices[voiceIndex];
  }

  // Update progress
  const progress = Math.round(
    (currentSegmentIndex / textSegments.length) * 100
  );
  const progressSpan = document.querySelector(".speech-progress");
  if (progressSpan) {
    progressSpan.textContent = `${progress}%`;
  }

  currentUtterance.onend = () => {
    currentSegmentIndex++;
    speakNextSegment(rate, voiceIndex);
  };

  currentUtterance.onerror = (e) => {
    console.error("Speech error:", e);
    stopSpeech();
  };

  speechSynthesis.speak(currentUtterance);
}

// Stop speech
function stopSpeech() {
  console.log("Stopping speech...");
  speechActive = false;
  speechSynthesis.cancel();
  currentUtterance = null;
  currentSegmentIndex = 0;

  const indicator = document.getElementById("speech-indicator");
  if (indicator) indicator.style.display = "none";
}

// Listen for messages from popup
browserAPI.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message:", message);

  if (message.action === "toggleReader") {
    if (message.enabled) {
      enableReaderMode();
    } else {
      disableReaderMode();
    }
    sendResponse({ success: true, readerModeActive });
  }

  if (message.action === "startSpeech") {
    startSpeech(message.rate, message.voiceIndex);
    sendResponse({ success: true });
  }

  if (message.action === "stopSpeech") {
    stopSpeech();
    sendResponse({ success: true });
  }

  return true; // Keep message channel open for async response
});

console.log("Reddit Reader extension content script loaded!");

// Auto-enable reader mode if previously enabled
browserAPI.storage.local.get(["readerMode"]).then((data) => {
  if (data.readerMode) {
    console.log("Auto-enabling reader mode from saved state");
    setTimeout(() => enableReaderMode(), 1000);
  }
});
