// Array to store quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
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

  // Save the last viewed quote in session storage
  sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
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

  // Save the updated quotes array to local storage
  saveQuotes();

  // Clear the input fields
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';

  // Display the newly added quote immediately
  showRandomQuote();
}

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to handle JSON export
function exportToJson() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  // Create a temporary link element
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  
  // Trigger the download
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Function to handle JSON import
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
      try {
          const importedQuotes = JSON.parse(event.target.result);
          if (Array.isArray(importedQuotes)) {
              quotes = importedQuotes;
              saveQuotes();
              alert('Quotes imported successfully!');
              showRandomQuote(); // Show a random quote after import
          } else {
              alert('Invalid JSON format.');
          }
      } catch (error) {
          alert('Failed to parse JSON.');
      }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Event listeners for buttons and file input
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('addQuote').addEventListener('click', addQuote);
document.getElementById('exportQuotes').addEventListener('click', exportToJson);
document.getElementById('importFile').addEventListener('change', importFromJsonFile);

// Load last viewed quote from session storage (if available)
document.addEventListener('DOMContentLoaded', () => {
  showRandomQuote();
  const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
  if (lastViewedQuote) {
      const quote = JSON.parse(lastViewedQuote);
      document.getElementById('quoteDisplay').textContent = `"${quote.text}" — ${quote.category}`;
  }
});
