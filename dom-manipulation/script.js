// Existing JavaScript code here...

// Function to sync quotes with the server
async function syncQuotesWithServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const serverQuotes = await response.json();
        
        // Assuming serverQuotes is an array of quote objects with 'text' and 'category'
        const updatedQuotes = [...quotes, ...serverQuotes];
        const uniqueQuotes = [...new Map(updatedQuotes.map(quote => [quote.text, quote])).values()];
        
        quotes = uniqueQuotes;
        saveQuotes();
        alert('Quotes synced successfully with the server!');
    } catch (error) {
        console.error('Error syncing quotes:', error);
        alert('Failed to sync quotes with the server.');
    }
}

// Event listener for sync button
document.getElementById('syncButton').addEventListener('click', syncQuotesWithServer);

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
    renderQuotes();
}

// Function to render quotes
function renderQuotes() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';
    quotes.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.textContent = `${quote.text} - ${quote.category}`;
        quoteDisplay.appendChild(quoteElement);
    });
}

// Load quotes from local storage on initialization
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
        renderQuotes();
    }
}

// Call loadQuotes on page load
document.addEventListener('DOMContentLoaded', loadQuotes);

// Existing event listeners and functions here...
