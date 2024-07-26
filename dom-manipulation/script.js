document.addEventListener("DOMContentLoaded", () => {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuoteBtn = document.getElementById("newQuote");
    const addQuoteToArray = document.getElementById("add-quote");

    // Object constructor
    function Quote(text, category) {
        this.text = text;
        this.category = category;
    }
    // Initialize empty array
    let quotesObject = [];
    /*let quoteToDisplay = [];*/

    // Function to add new quote to array
    function addQuote() {
        // Reference values in text and category fields
        let newQuoteText = document.getElementById("newQuoteText").value.trim();
        let newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

        // check if text and category fields are not empty
        if (newQuoteText && newQuoteCategory) {
            // Create the new quote object
            const createAddQuoteForm = new Quote(newQuoteText, newQuoteCategory);
            // Once created push new quote object into array
            quotesObject.push(createAddQuoteForm);
            // Clear input fields
            newQuoteText = "";
            newQuoteCategory = "";
            console.log(quotesObject);
        } else {
            // if text or category is empty alert
            alert("Please enter some text and a category");
            return;
        }
    }

    // Function to generate and display random quote
    function showRandomQuote() {
        // Clear display
        quoteDisplay.innerHTML = "";
        // Check if quotes array is not empty
        if (quotesObject !== "") {
            // Choose a random number
            let randomNumber = Math.floor(Math.random() * quotesObject.length);
            console.log(randomNumber);
            /*quoteToDisplay.push(randomNumber);*/
            for (let i = 0; i < quotesObject.length; i++) {
                console.log(i);
                if (i === randomNumber) {
                    const quoteCard = document.createElement("div");
                    const quoteText = document.createElement("p");
                    const quoteCategory = document.createElement("p");

                    quoteCard.classList.add("card");
                    quoteText.classList.add("text");
                    quoteCategory.classList.add("category");

                    quoteText.innerText = `"${quotesObject[i].text}"`;
                    quoteCategory.innerText = `${quotesObject[i].category}`;

                    quoteCard.appendChild(quoteText);
                    quoteCard.appendChild(quoteCategory);

                    quoteDisplay.appendChild(quoteCard);
                    break;
                }
            }
        } else {
            alert("There are no quotes so there is nothing to display. Please add a quote first.");
        }
    }

    // When show new quote button is clicked show new quote
    newQuoteBtn.addEventListener("click", showRandomQuote);

    // Add new quote object to array
    addQuoteToArray.addEventListener("click", addQuote);
});