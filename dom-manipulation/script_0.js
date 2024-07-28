document.addEventListener('DOMContentLoaded', () => {
    const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const addQuoteButton = document.getElementById('addQuote');
    const categoryFilter = document.getElementById('categoryFilter');

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
    }

    function filterQuotes() {
        const selectedCategory = categoryFilter.value;
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
            filterQuotes();
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

    newQuoteButton.addEventListener('click', showRandomQuote);
    addQuoteButton.addEventListener('click', addQuote);

    populateCategories();
    filterQuotes();
});
