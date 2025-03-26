document.addEventListener("DOMContentLoaded", () => {
    const renderCharacters = async () => {
        const url = "http://localhost:3000/characters";

        try {
            // Fetch character data from the server
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const characters = await response.json();

            // Get the character-bar div
            const characterBar = document.getElementById("character-bar");
            characterBar.innerHTML = ""; // Clear any existing content

            // Loop through each character and create a span
            characters.forEach(character => {
                const span = document.createElement("span");
                span.textContent = character.name; // Set the character's name as the span's text

                // Add a click event listener to display character details
                span.addEventListener("click", () => {
                    const characterDetails = document.getElementById("detailed-info");
                    characterDetails.innerHTML = `
                        <h2>${character.name}</h2>
                        <img src="${character.image}" alt="${character.name}">
                        <p>Votes: <span id="vote-count">${character.votes}</span></p>
                        <form id="votes-form">
                            <input type="number" id="votes-input" placeholder="Enter votes" />
                            <button type="submit">Add Votes</button>
                        </form>
                    `;
                    
                    // Handle votes form submission
                    const votesForm = document.getElementById("votes-form");
                    votesForm.addEventListener("submit", (event) => {
                        event.preventDefault();
                        const votesInput = document.getElementById("votes-input");
                        const voteCount = document.getElementById("vote-count");

                        // Update the votes count
                        const additionalVotes = parseInt(votesInput.value, 10) || 0;
                        character.votes += additionalVotes;
                        voteCount.textContent = character.votes;

                        // Clear the input field
                        votesInput.value = "";
                    }, { once: true }); // Ensure the event listener is added only once
                });

                // Append the span to the character-bar div
                characterBar.appendChild(span);
            });
        } catch (error) {
            console.error("Error fetching characters:", error);
        }
    };

    // Call the function to render characters
    renderCharacters();
});