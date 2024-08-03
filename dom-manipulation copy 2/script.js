
document.addEventListener('DOMContentLoaded', () => {
    const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const addQuoteButton = document.getElementById('addQuote');
    const exportQuotesButton = document.getElementById('exportQuotes');
    const categoryFilter = document.getElementById('categoryFilter');
    const notification = document.getElementById('notification');

    const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock server URL

    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    function populateCategories() {
        const categories = [...new Set(quotes.map(quote => quote.category))];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
        loadLastSelectedFilter();
    }

    function filterQuotes() {
        const selectedCategory = categoryFilter.value;
        localStorage.setItem('selectedCategory', selectedCategory);
        const filteredQuotes = selectedCategory === 'all' 
            ? quotes 
            : quotes.filter(quote => quote.category === selectedCategory);
        displayQuotes(filteredQuotes);
    }

    function displayQuotes(quotesToDisplay) {
        quoteDisplay.innerHTML = '';
        quotesToDisplay.forEach(quote => {
            const quoteElement = document.createElement('div');
            quoteElement.textContent = `${quote.text} - ${quote.category}`;
            quoteDisplay.appendChild(quoteElement);
        });
    }

    function showRandomQuote() {
        const selectedCategory = categoryFilter.value;
        const filteredQuotes = selectedCategory === 'all' 
            ? quotes 
            : quotes.filter(quote => quote.category === selectedCategory);
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randomIndex];
        quoteDisplay.textContent = `${randomQuote.text} - ${randomQuote.category}`;
    }

    function addQuote() {
        const newQuoteText = document.getElementById('newQuoteText').value.trim();
        const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

        if (newQuoteText && newQuoteCategory) {
            const newQuote = { text: newQuoteText, category: newQuoteCategory };
            quotes.push(newQuote);
            saveQuotes();
            document.getElementById('newQuoteText').value = '';
            document.getElementById('newQuoteCategory').value = '';
            alert("New quote added!");
            updateCategories(newQuoteCategory);
            syncWithServer(newQuote);
        } else {
            alert("Please enter both quote text and category.");
        }
    }

    function updateCategories(newCategory) {
        if (![...categoryFilter.options].some(option => option.value === newCategory)) {
            const option = document.createElement('option');
            option.value = newCategory;
            option.textContent = newCategory;
            categoryFilter.appendChild(option);
        }
    }

    function loadLastSelectedFilter() {
        const selectedCategory = localStorage.getItem('selectedCategory');
        if (selectedCategory) {
            categoryFilter.value = selectedCategory;
        }
        filterQuotes();
    }

    function syncWithServer(newQuote) {
        fetch(SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newQuote),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Successfully synced with server:', data);
        })
        .catch(error => console.error('Error syncing with server:', error));
    }

    function fetchServerData() {
        fetch(SERVER_URL)
            .then(response => response.json())
            .then(data => {
                const serverQuotes = data.map(post => ({ text: post.title, category: 'Server' }));
                mergeQuotes(serverQuotes);
            })
            .catch(error => console.error('Error fetching data from server:', error));
    }

    function mergeQuotes(serverQuotes) {
        const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
        const mergedQuotes = [...localQuotes, ...serverQuotes];
        localStorage.setItem('quotes', JSON.stringify(mergedQuotes));
        quotes.length = 0;
        quotes.push(...mergedQuotes);
        filterQuotes();
        notification.textContent = 'Data synchronized with server';
        notification.style.display = 'block';
        setTimeout(() => { notification.style.display = 'none'; }, 3000);
    }

    function handleConflictResolution() {
        const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
        // Assume server quotes always take precedence for simplicity
        localStorage.setItem('quotes', JSON.stringify(localQuotes));
        quotes.length = 0;
        quotes.push(...localQuotes);
        filterQuotes();
    }

    function exportToJson() {
        const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quotes.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
            const importedQuotes = JSON.parse(event.target.result);
            quotes.push(...importedQuotes);
            saveQuotes();
            alert('Quotes imported successfully!');
            filterQuotes();
        };
        fileReader.readAsText(event.target.files[0]);
    }

    newQuoteButton.addEventListener('click', showRandomQuote);
    addQuoteButton.addEventListener('click', addQuote);
    exportQuotesButton.addEventListener('click', exportToJson);
    document.getElementById('importFile').addEventListener('change', importFromJsonFile);

    populateCategories();
    filterQuotes();

    // Simulate server data fetching every 10 seconds
    setInterval(fetchServerData, 10000);
});
