const quoteContainer = document.getElementById('quote-container');    
const quoteText = document.getElementById('quote');    
const authorText = document.getElementById('author');    
const twitterBtn = document.getElementById('twitter');    
const newQuoteBtn = document.getElementById('new-quote');   
const loader = document.getElementById('loader');

let apiQuotes = [];


function ShowloadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
//Show New Quote
function newQuote() {
    ShowloadingSpinner();
    // Pick a random quote
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
   // Check if Author field is blank and replace it with 'unknown author'
   if (!quote.author) {
     authorText.textContent = 'Unknown Author';
   } else {
    authorText.textContent =quote.author;
   }
   //Check Quote length to determine styling
   if (quote.text.length >50) {
    quoteText.classList.add('long-quote');
   } else {
    quoteText.classList.remove('long-quote');
   }
   // Set Quote, Hide loader
   quoteText.textContent = quote.text;
   removeLoadingSpinner();
}

// Get Quotes from API
async function getQuotes() {
    ShowloadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
   //const apiUrl = 'https://quotable.io/random';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
       
        } catch (error) {
        
        //Catch Error Here
   }
   
}
//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();
