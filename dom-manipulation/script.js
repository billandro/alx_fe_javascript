document.addEventListener("DOMContentLoaded", () => {
    // Refernce necessary elements
    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuoteBtn = document.getElementById("newQuote");
    const addQuoteToArray = document.getElementById("add-quote");
    const jsonExport = document.getElementById("json-export");
    const jsonImport = document.getElementById("importFile");
    // Object constructor
    function Quote(text, category) {
        this.text = text;
        this.category = category;
    }
    // Initialize empty array
    let quotesObject = [];
    // Active random rumber
    let activeNumber;
    
    // Load array from local storage on load
    function retrieveQuotes() {
        // Retrieve array from local storage
        quotesObject = JSON.parse(localStorage.getItem("quotesObject") || "[]");
        console.log(`Onload ${quotesObject}`);
        activeNumber = JSON.parse(localStorage.getItem("activeNumber"));
        console.log(`Active no on reload: ${activeNumber}`);

        for (let i = 0; i < quotesObject.length; i++) {
            if (i === activeNumber) {
                console.log(`Element at index to load ${i}`);
                const quoteCard = document.createElement("div");
                const quoteText = document.createElement("p");
                const quoteCategory = document.createElement("p");

                quoteCard.classList.add("card");
                quoteText.classList.add("text");
                quoteCategory.classList.add("category");

                quoteText.innerText = `"${quotesObject[i].text}"`;
                quoteCategory.innerText = `- ${quotesObject[i].category}`;

                quoteCard.appendChild(quoteText);
                quoteCard.appendChild(quoteCategory);

                quoteDisplay.appendChild(quoteCard);
                break;
            }
        }
    }

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
            // Save modified array of quotes
            localStorage.setItem("quotesObject", JSON.stringify(quotesObject));
            console.log(`Local storage: ${localStorage}`);
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
            console.log(`Random number ${randomNumber}`);
            // Active number
            activeNumber = randomNumber;
            console.log(`Active number: ${activeNumber}`);

            /*quoteToDisplay.push(randomNumber);*/
            for (let i = 0; i < quotesObject.length; i++) {
                if (i === randomNumber) {
                    console.log(`Index equal to random no is ${i}`);
                    const quoteCard = document.createElement("div");
                    const quoteText = document.createElement("p");
                    const quoteCategory = document.createElement("p");

                    quoteCard.classList.add("card");
                    quoteText.classList.add("text");
                    quoteCategory.classList.add("category");

                    quoteText.innerText = `"${quotesObject[i].text}"`;
                    quoteCategory.innerText = `- ${quotesObject[i].category}`;

                    quoteCard.appendChild(quoteText);
                    quoteCard.appendChild(quoteCategory);

                    quoteDisplay.appendChild(quoteCard);

                    localStorage.setItem("activeNumber", JSON.stringify(activeNumber));

                    break;
                }
            }
        } else {
            alert("There are no quotes so there is nothing to display. Please add a quote first.");
        }
    }

    // Export quotes to JSON function
    function JSONToFile(obj, filename) {
        const blob = new Blob([JSON.stringify(obj, null, 2)], {
            type: "application/json",
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${filename}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // When click export
    jsonExport.addEventListener("click", () => {
        quotesObject = JSON.parse(localStorage.getItem("quotesObject") || "[]");
        console.log(`Array before export: ${quotesObject}`);
        JSONToFile(quotesObject, "testJsonFile");
    });

    // When importing json
    jsonImport.addEventListener("change", (event) => {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
            // Parsing the loaded file
            const importedQuotes = JSON.parse(event.target.result);
            // Push the array of quotes objects into internal array
            quotesObject.push(...importedQuotes);
            // Save new combined array of quotes
            localStorage.setItem("quotesObject", JSON.stringify(quotesObject));
            // Alert user of success
            alert('Quotes imported successfully!');
        };
        console.log(fileReader.readAsText(event.target.files[0]));
        
    });

    // When show new quote button is clicked show new quote
    newQuoteBtn.addEventListener("click", showRandomQuote);

    // Add new quote object to array
    addQuoteToArray.addEventListener("click", addQuote);

    // Initialize quotes
    retrieveQuotes();
});