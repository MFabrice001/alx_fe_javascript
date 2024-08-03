let quotes = [];

document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    setInterval(syncQuotesWithServer, 60000); // Sync with server every 60 seconds
});

document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('importFile').addEventListener('change', importFromJsonFile);
document.getElementById('exportButton').addEventListener('click', exportToJsonFile);
document.getElementById('syncButton').addEventListener('click', syncQuotesWithServer);

// Load quotes from local storage on initialization
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
    renderQuotes();
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
    renderQuotes();
}

// Render quotes to the DOM
function renderQuotes() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';
    quotes.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.textContent = `${quote.text} - ${quote.category}`;
        quoteDisplay.appendChild(quoteElement);
    });
}

// Function to show a random quote
function showRandomQuote() {
    if (quotes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    alert(quotes[randomIndex].text);
}

// Function to add a new quote
function addQuote(text, category) {
    const newQuote = { text, category };
    quotes.push(newQuote);
    saveQuotes();
}

// Function to create and display a form for adding new quotes
function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    formContainer.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button onclick="submitNewQuote()">Add Quote</button>
    `;
    document.body.appendChild(formContainer);
}

// Function to handle new quote submission
function submitNewQuote() {
    const text = document.getElementById('newQuoteText').value;
    const category = document.getElementById('newQuoteCategory').value;
    if (text && category) {
        addQuote(text, category);
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        postQuoteToServer({ text, category });
    } else {
        alert('Please enter both a quote and a category.');
    }
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Function to export quotes to a JSON file
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = 'quotes.json';
    downloadAnchor.click();
    URL.revokeObjectURL(url);
}

// Function to fetch quotes from the server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const serverQuotes = await response.json();
        // Assuming serverQuotes is an array of quote objects with 'text' and 'category'
        return serverQuotes.map(quote => ({ text: quote.title, category: 'Default' })); // Adjust as necessary
    } catch (error) {
        console.error('Error fetching quotes from server:', error);
        return [];
    }
}

// Function to post a new quote to the server
async function postQuoteToServer(quote) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quote)
        });
        const result = await response.json();
        console.log('Quote posted to server:', result);
    } catch (error) {
        console.error('Error posting quote to server:', error);
    }
}

// Function to sync quotes with the server
async function syncQuotesWithServer() {
    try {
        const serverQuotes = await fetchQuotesFromServer();
        const updatedQuotes = [...quotes, ...serverQuotes];
        const uniqueQuotes = [...new Map(updatedQuotes.map(quote => [quote.text, quote])).values()];
        
        quotes = uniqueQuotes;
        saveQuotes();
        showNotification('Quotes synced with server!');
    } catch (error) {
        console.error('Error syncing quotes:', error);
        showNotification('Failed to sync quotes with server.');
    }
}

// Function to filter quotes based on category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    if (selectedCategory === 'all') {
        renderQuotes();
    } else {
        const filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
        renderFilteredQuotes(filteredQuotes);
    }
}

// Function to render filtered quotes
function renderFilteredQuotes(filteredQuotes) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';
    filteredQuotes.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.textContent = `${quote.text} - ${quote.category}`;
        quoteDisplay.appendChild(quoteElement);
    });
}

// Function to show notifications
function showNotification(message) {
    const notificationElement = document.getElementById('notifications');
    notificationElement.textContent = message;
    setTimeout(() => {
        notificationElement.textContent = '';
    }, 5000); // Hide notification after 5 seconds
}

// Add categories to the filter dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(quote => quote.category))];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Call populateCategories when quotes are loaded or updated
document.addEventListener('DOMContentLoaded', populateCategories);
