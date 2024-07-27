const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "Inspiration" },
  // Add more quotes here
];

const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const addQuoteForm = document.getElementById('addQuoteForm');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const addQuoteButton = document.getElementById('addQuote');

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.textContent = `"${randomQuote.text}"   
 - ${randomQuote.author}`;
}

newQuoteButton.addEventListener('click', showRandomQuote);

function addQuote() {
  const quoteText = newQuoteText.value.trim();
  const quoteCategory = newQuoteCategory.value.trim();

  if (quoteText && quoteCategory) {
    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);
    newQuoteText.value = '';
    newQuoteCategory.value = '';
    showRandomQuote(); // Display a new quote after adding
  } else {
    alert('Please enter both quote and category.');
  }
}

addQuoteButton.addEventListener('click', addQuote);