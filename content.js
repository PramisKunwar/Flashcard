// Content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "prompt-question") {
    showQuestionModal(message.selectedText, message.pageUrl);
  }
});


function showQuestionModal(selectedText, pageUrl) {
  
  const existing = document.getElementById("flashcard-modal-overlay");
  if (existing) existing.remove();

  
  const overlay = document.createElement("div");
  overlay.id = "flashcard-modal-overlay";
  Object.assign(overlay.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "2147483647",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  });

  
  const modal = document.createElement("div");
  Object.assign(modal.style, {
    background: "#fff",
    borderRadius: "12px",
    padding: "24px",
    width: "400px",
    maxWidth: "90vw",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    color: "#1a1a2e"
  });

  modal.innerHTML = `
    <h3 style="margin:0 0 4px;font-size:16px;font-weight:700;color:#1a1a2e;">Save as Flashcard</h3>
    <p style="margin:0 0 16px;font-size:13px;color:#6b7280;">Enter the question for the front of your card.</p>
    <input type="text" id="flashcard-question-input" placeholder="e.g. What is photosynthesis?"
      style="width:100%;padding:10px 12px;border:1.5px solid #d1d5db;border-radius:8px;font-size:14px;
      box-sizing:border-box;outline:none;margin-bottom:12px;" />
    <p style="margin:0 0 6px;font-size:12px;color:#9ca3af;font-weight:600;">ANSWER (highlighted text):</p>
    <div style="background:#f3f4f6;border-radius:8px;padding:10px 12px;font-size:13px;color:#374151;
      max-height:120px;overflow-y:auto;margin-bottom:16px;line-height:1.5;">${escapeHTML(selectedText)}</div>
    <div style="display:flex;gap:8px;justify-content:flex-end;">
      <button id="flashcard-cancel-btn"
        style="padding:8px 16px;border:1.5px solid #d1d5db;background:#fff;border-radius:8px;
        font-size:13px;cursor:pointer;color:#374151;font-weight:500;">Cancel</button>
      <button id="flashcard-save-btn"
        style="padding:8px 16px;border:none;background:#2563eb;color:#fff;border-radius:8px;
        font-size:13px;cursor:pointer;font-weight:600;">Save Card</button>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  
  const input = document.getElementById("flashcard-question-input");
  setTimeout(() => input.focus(), 50);

  
  document.getElementById("flashcard-cancel-btn").addEventListener("click", () => {
    overlay.remove();
  });

  
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });

  
  document.getElementById("flashcard-save-btn").addEventListener("click", () => {
    const question = input.value.trim();
    if (!question) {
      input.style.borderColor = "#ef4444";
      input.placeholder = "Please enter a question!";
      return;
    }

    chrome.runtime.sendMessage({
      action: "save-flashcard",
      question: question,
      answer: selectedText,
      url: pageUrl
    }, (response) => {
      if (response && response.success) {
        
        modal.innerHTML = `
          <div style="text-align:center;padding:20px 0;">
            <div style="font-size:32px;margin-bottom:8px;">✅</div>
            <p style="font-size:15px;font-weight:600;color:#1a1a2e;margin:0;">Flashcard saved!</p>
          </div>
        `;
        setTimeout(() => overlay.remove(), 1200);
      }
    });
  });

  
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      document.getElementById("flashcard-save-btn").click();
    }
  });
}


function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}