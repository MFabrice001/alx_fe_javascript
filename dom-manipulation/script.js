
document.addEventListener('DOMContentLoaded', () => {
    const quotes = [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
        { text: "Life is what happens when you're busy making other plans.", category: "Life" },
        // Add more quotes here
    ];

    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const addQuoteButton = document.getElementById('addQuote');
    const categoryFilter = document.getElementById('categoryFilter');

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
            document.getElementById('newQuoteText').value = '';
            document.getElementById('newQuoteCategory').value = '';
            alert("New quote added!");
            updateCategories(newQuoteCategory);
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

    newQuoteButton.addEventListener('click', showRandomQuote);
    addQuoteButton.addEventListener('click', addQuote);

    populateCategories();
    filterQuotes();
});


// document.addEventListener('DOMContentLoaded', () => {
//     const quotes = [
//         { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
//         { text: "Life is what happens when you're busy making other plans.", category: "Life" },
//         // Add more quotes here
//     ];

//     const quoteDisplay = document.getElementById('quoteDisplay');
//     const newQuoteButton = document.getElementById('newQuote');
//     const addQuoteButton = document.getElementById('addQuote');

//     function showRandomQuote() {
//         const randomIndex = Math.floor(Math.random() * quotes.length);
//         const randomQuote = quotes[randomIndex];
//         quoteDisplay.textContent = `${randomQuote.text} - ${randomQuote.category}`;
//     }

//     function addQuote() {
//         const newQuoteText = document.getElementById('newQuoteText').value.trim();
//         const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

//         if (newQuoteText && newQuoteCategory) {
//             const newQuote = { text: newQuoteText, category: newQuoteCategory };
//             quotes.push(newQuote);
//             document.getElementById('newQuoteText').value = '';
//             document.getElementById('newQuoteCategory').value = '';
//             alert("New quote added!");
//         } else {
//             alert("Please enter both quote text and category.");
//         }
//     }

//     newQuoteButton.addEventListener('click', showRandomQuote);
//     addQuoteButton.addEventListener('click', addQuote);

//     // Show a random quote on initial load
//     showRandomQuote();
// });


//  2 // Array to store quotes
// let quotes = JSON.parse(localStorage.getItem('quotes')) || [
//   { text: "The best way to predict the future is to invent it.", category: "Innovation" },
//   { text: "Life is what happens when you're busy making other plans.", category: "Life" },
//   { text: "The purpose of our lives is to be happy.", category: "Life" }
// ];

// // Function to display a random quote
// function showRandomQuote() {
//   // Check if the quotes array is not empty
//   if (quotes.length === 0) {
//       document.getElementById('quoteDisplay').textContent = "No quotes available.";
//       return;
//   }

//   // Select a random index from the quotes array
//   const randomIndex = Math.floor(Math.random() * quotes.length);
//   const quote = quotes[randomIndex];
  
//   // Update the DOM with the selected quote
//   document.getElementById('quoteDisplay').textContent = `"${quote.text}" — ${quote.category}`;

//   // Save the last viewed quote in session storage
//   sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
// }

// // Function to add a new quote
// function addQuote() {
//   // Get and trim the values from the input fields
//   const newQuoteText = document.getElementById('newQuoteText').value.trim();
//   const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

//   // Validate input fields
//   if (newQuoteText === '' || newQuoteCategory === '') {
//       alert('Please fill in both fields.');
//       return;
//   }

//   // Add the new quote to the quotes array
//   quotes.push({ text: newQuoteText, category: newQuoteCategory });

//   // Save the updated quotes array to local storage
//   saveQuotes();

//   // Clear the input fields
//   document.getElementById('newQuoteText').value = '';
//   document.getElementById('newQuoteCategory').value = '';

//   // Display the newly added quote immediately
//   showRandomQuote();
// }

// // Function to save quotes to local storage
// function saveQuotes() {
//   localStorage.setItem('quotes', JSON.stringify(quotes));
// }

// // Function to handle JSON export
// function exportToJson() {
//   const dataStr = JSON.stringify(quotes, null, 2);
//   const blob = new Blob([dataStr], { type: 'application/json' });
//   const url = URL.createObjectURL(blob);
  
//   // Create a temporary link element
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = 'quotes.json';
  
//   // Trigger the download
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
// }

// // Function to handle JSON import
// function importFromJsonFile(event) {
//   const fileReader = new FileReader();
//   fileReader.onload = function(event) {
//       try {
//           const importedQuotes = JSON.parse(event.target.result);
//           if (Array.isArray(importedQuotes)) {
//               quotes = importedQuotes;
//               saveQuotes();
//               alert('Quotes imported successfully!');
//               showRandomQuote(); // Show a random quote after import
//           } else {
//               alert('Invalid JSON format.');
//           }
//       } catch (error) {
//           alert('Failed to parse JSON.');
//       }
//   };
//   fileReader.readAsText(event.target.files[0]);
// }

// // Event listeners for buttons and file input
// document.getElementById('newQuote').addEventListener('click', showRandomQuote);
// document.getElementById('addQuote').addEventListener('click', addQuote);
// document.getElementById('exportQuotes').addEventListener('click', exportToJson);
// document.getElementById('importFile').addEventListener('change', importFromJsonFile);

// // Load last viewed quote from session storage (if available)
// document.addEventListener('DOMContentLoaded', () => {
//   showRandomQuote();
//   const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
//   if (lastViewedQuote) {
//       const quote = JSON.parse(lastViewedQuote);
//       document.getElementById('quoteDisplay').textContent = `"${quote.text}" — ${quote.category}`;
//   }
// });


// API Endpoint (replace with your actual mock API URL)
// const API_URL = 'https://jsonplaceholder.typicode.com/quotes';

// // Load quotes from local storage or initialize with empty array
// let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// // Fetch quotes from the server
// async function fetchQuotesFromServer() {
//     try {
//         const response = await fetch(API_URL);
//         if (!response.ok) throw new Error('Network response was not ok.');
//         const serverQuotes = await response.json();
        
//         // Update local quotes with server data
//         if (serverQuotes.length) {
//             quotes = serverQuotes;
//             localStorage.setItem('quotes', JSON.stringify(quotes));
//             updateCategoryFilter();
//             showRandomQuote();
//         }
//     } catch (error) {
//         console.error('Failed to fetch quotes from server:', error);
//     }
// }

// // Sync local data with the server
// async function syncWithServer() {
//     try {
//         // Get existing quotes from local storage
//         const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

//         // Check for conflicts and merge data
//         // Here we're assuming server data has precedence
//         await fetchQuotesFromServer();

//         // Optionally, send local changes to the server if needed
//         // await updateServerWithLocalData(localQuotes);
//     } catch (error) {
//         console.error('Sync failed:', error);
//     }
// }

// // Handle conflicts (example: server data takes precedence)
// function handleConflict(localData, serverData) {
//     return serverData; // Simple strategy: server data takes precedence
// }

// // Update the server with local data (example function)
// async function updateServerWithLocalData(localData) {
//     try {
//         const response = await fetch(API_URL, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(localData),
//         });
//         if (!response.ok) throw new Error('Network response was not ok.');
//     } catch (error) {
//         console.error('Failed to update server:', error);
//     }
// }

// // Add a new quote
// async function addQuote() {
//     const newQuoteText = document.getElementById('newQuoteText').value.trim();
//     const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

//     if (newQuoteText === '' || newQuoteCategory === '') {
//         alert('Please fill in both fields.');
//         return;
//     }

//     const newQuote = { text: newQuoteText, category: newQuoteCategory };

//     try {
//         const response = await fetch(API_URL, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(newQuote),
//         });
//         if (!response.ok) throw new Error('Network response was not ok.');

//         const addedQuote = await response.json();
//         quotes.push(addedQuote);
//         saveQuotes();
//         updateCategoryFilter();
//         showRandomQuote();
//     } catch (error) {
//         console.error('Failed to add quote:', error);
//     }
// }

// // Save quotes to local storage
// function saveQuotes() {
//     localStorage.setItem('quotes', JSON.stringify(quotes));
// }

// // Event listeners
// document.getElementById('newQuote').addEventListener('click', showRandomQuote);
// document.getElementById('addQuote').addEventListener('click', addQuote);
// document.getElementById('exportQuotes').addEventListener('click', exportToJson);
// document.getElementById('importFile').addEventListener('change', importFromJsonFile);
// document.getElementById('categoryFilter').addEventListener('change', () => {
//     filterQuotes();
//     saveCategoryFilter();
// });

// // Initialize
// document.addEventListener('DOMContentLoaded', () => {
//     loadQuotes();
//     updateCategoryFilter();
//     showRandomQuote();
//     setInterval(syncWithServer, 60000); // Sync every 60 seconds
// });


// function handleConflict(localData, serverData) {
//   // Example conflict resolution
//   // Notify the user or show options to manually resolve conflicts
//   alert('Data conflict detected. Server data has been applied.');
//   return serverData;
// }