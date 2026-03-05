// DOM elements
const emptyState = document.getElementById("empty-state");
const cardContainer = document.getElementById("card-container");
const cardQuestion = document.getElementById("card-question");
const cardAnswer = document.getElementById("card-answer");
const answerSection = document.getElementById("answer-section");
const showAnswerBtn = document.getElementById("show-answer-btn");
const nextBtn = document.getElementById("next-btn");
const deleteBtn = document.getElementById("delete-btn");
const cardCounter = document.getElementById("card-counter");
const cardSource = document.getElementById("card-source");

let flashcards = [];
let currentIndex = 0;

// Load flashcards from storage on popup open
chrome.storage.local.get({ flashcards: [] }, (data) => {
  flashcards = data.flashcards;
  render();
});

// Render the current state
function render() {
  if (flashcards.length === 0) {
    emptyState.style.display = "block";
    cardContainer.style.display = "none";
    cardCounter.textContent = "";
    return;
  }

  emptyState.style.display = "none";
  cardContainer.style.display = "block";

  // Ensure currentIndex is within bounds
  if (currentIndex >= flashcards.length) currentIndex = 0;
  if (currentIndex < 0) currentIndex = flashcards.length - 1;

  const card = flashcards[currentIndex];
  cardQuestion.textContent = card.question;
  cardAnswer.textContent = card.answer;
  cardCounter.textContent = `${currentIndex + 1} / ${flashcards.length}`;

  // Show source URL
  if (card.url) {
    cardSource.innerHTML = `Source: <a href="${card.url}" target="_blank">${card.url}</a>`;
  } else {
    cardSource.textContent = "";
  }

  // Reset to question-only view
  answerSection.style.display = "none";
  showAnswerBtn.style.display = "block";
}

// Show Answer button
showAnswerBtn.addEventListener("click", () => {
  answerSection.style.display = "block";
  showAnswerBtn.style.display = "none";
});

// Next button
nextBtn.addEventListener("click", () => {
  currentIndex++;
  render();
});

// Delete button
deleteBtn.addEventListener("click", () => {
  if (flashcards.length === 0) return;

  flashcards.splice(currentIndex, 1);

  // Save updated array to storage
  chrome.storage.local.set({ flashcards }, () => {
    if (currentIndex >= flashcards.length) currentIndex = 0;
    render();
  });
});