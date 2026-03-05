#  Highlight to Flashcard — Chrome Extension
A lightweight Chrome extension that lets students turn highlighted text on any webpage into flashcards for active recall study.

--- 
![My extension](/image.png)

##  Purpose
When reading study material online, students often highlight text but never revisit it. This extension solves that by converting highlighted text into flashcards instantly — no accounts, no cloud, no complexity.

---

##  Features
- **Highlight → Save**: Select text on any webpage, right-click, and save it as a flashcard
- **Question Prompt**: A clean modal asks you to enter the question (front of card); the highlighted text becomes the answer (back of card)
- **Popup Review**: Click the extension icon to review your flashcards one at a time
- **Show/Hide Answer**: Test yourself by revealing the answer only when ready
- **Delete Cards**: Remove flashcards you've mastered
- **Persistent Storage**: Flashcards are saved locally using `chrome.storage.local` and persist across browser restarts
- **Source Tracking**: Each flashcard stores the source URL for reference

---

##  File Structure
```
flashcard-extension/
├── manifest.json      
├── background.js      
├── content.js         
├── popup.html         
├── popup.js           
├── popup.css          
└── icons/
    ├── icon48.png     
    └── icon128.png    
```

---

##  Installation
1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions`
3. Enable **Developer mode** (toggle in top-right)
4. Click **Load unpacked**
5. Select the `flashcard-extension` folder
6. The extension icon will appear in your toolbar

---

##  How to Use
1. **Highlight** any text on a webpage
2. **Right-click** → select **"Save as Flashcard"**
3. Enter a **question** for the front of the card in the modal that appears
4. Click **Save Card**
5. Click the **extension icon** in the toolbar to review your flashcards
6. Use **Show Answer**, **Next**, and **Delete** to study

---

##  Flashcard Data Format
Each flashcard is stored as a simple object:
```json
{
  "id": "1709654321000",
  "question": "What is photosynthesis?",
  "answer": "Photosynthesis is the process by which green plants convert sunlight into chemical energy...",
  "url": "https://en.wikipedia.org/wiki/Photosynthesis",
  "createdAt": "2026-03-05T10:00:00.000Z"
}
```

---

##  Tech Stack
- **Manifest V3** — latest Chrome extension standard
- **Vanilla JavaScript** — no frameworks or build tools
- **HTML + CSS** — simple, clean UI
- **Chrome APIs** — `contextMenus`, `storage.local`, `tabs`, `runtime`


---

##  Intentionally Not Included
- No AI features
- No login or accounts
- No cloud sync
- No spaced repetition
- No notifications or analytics
- No backend server

---

##  License
This project is made for Hack Club.