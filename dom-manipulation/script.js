
const quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Innovation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "The purpose of our lives is to be happy.", category: "Life" }
];


function showRandomQuote() {
  if (quotes.length === 0) {
      document.getElementById('quoteDisplay').textContent = "No quotes available.";
      return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById('quoteDisplay').textContent = `"${quote.text}" — ${quote.category}`;
}


function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value.trim();
  const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (newQuoteText === '' || newQuoteCategory === '') {
      alert('Please fill in both fields.');
      return;
  }

  quotes.push({ text: newQuoteText, category: newQuoteCategory });
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
}


document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('addQuote').addEventListener('click', addQuote);

showRandomQuote();
