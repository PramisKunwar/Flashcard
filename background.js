//Background.js
// Create the context menu item when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "save-as-flashcard",
    title: "Save as Flashcard",
    contexts: ["selection"] // Only show when text is selected
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "save-as-flashcard" && info.selectionText) {
    // Send the selected text to the content script to show the prompt
    chrome.tabs.sendMessage(tab.id, {
      action: "prompt-question",
      selectedText: info.selectionText,
      pageUrl: tab.url
    });
  }
});

// Listen for save requests from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "save-flashcard") {
    chrome.storage.local.get({ flashcards: [] }, (data) => {
      const flashcards = data.flashcards;
      flashcards.push({
        id: Date.now().toString(),
        question: message.question,
        answer: message.answer,
        url: message.url,
        createdAt: new Date().toISOString()
      });
      chrome.storage.local.set({ flashcards }, () => {
        sendResponse({ success: true });
      });
    });
    return true; // Keep message channel open for async response
  }
});