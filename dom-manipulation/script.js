// Array to store quotes
const quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Innovation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "The purpose of our lives is to be happy.", category: "Life" }
];

// Function to display a random quote
function showRandomQuote() {
  // Check if the quotes array is not empty
  if (quotes.length === 0) {
      document.getElementById('quoteDisplay').textContent = "No quotes available.";
      return;
  }

  // Select a random index from the quotes array
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  
  // Update the DOM with the selected quote
  document.getElementById('quoteDisplay').textContent = `"${quote.text}" — ${quote.category}`;
}

// Function to add a new quote
function addQuote() {
  // Get and trim the values from the input fields
  const newQuoteText = document.getElementById('newQuoteText').value.trim();
  const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

  // Validate input fields
  if (newQuoteText === '' || newQuoteCategory === '') {
      alert('Please fill in both fields.');
      return;
  }

  // Add the new quote to the quotes array
  quotes.push({ text: newQuoteText, category: newQuoteCategory });

  // Clear the input fields
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';

  // Display the newly added quote immediately
  showRandomQuote();
}

// Event listeners for buttons
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('addQuote').addEventListener('click', addQuote);

// Display the first quote on page load
document.addEventListener('DOMContentLoaded', () => {
  showRandomQuote();
});
