import './style.css';

interface Pokemon {
    name: string;
    type: string;
    description: string;
    link: string;
}

// Client-side routing function
function handleRouting() {
    const path = window.location.pathname;
    const pokemonName = path.split('/').pop();  // Extract the Pokémon name from the URL

    if (pokemonName) {
        displaySinglePokemon(pokemonName);  // Fetch and display the specific Pokémon
    } else {
        fetchData();  // If no Pokémon is in the URL, show the Pokémon list
    }
}

// Function to fetch and display Pokémon list
async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/characters');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Pokemon[] = await response.json();
        const appDiv = document.querySelector<HTMLDivElement>('#app')!;
        appDiv.innerHTML = '';  // Clear the container before appending

        // For each Pokémon, create a card with a link to the dynamic route
        data.forEach((pokemon: Pokemon) => {
            const card = document.createElement('div');
            card.className = 'bg-gray-100 h-[45vh] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300';
            
            const img = document.createElement('img');
            img.src = pokemon.link;
            img.alt = pokemon.name;
            img.className = 'object-cover w-48 h-48 m-auto mt-4 mb-2';
            
            const cardBody = document.createElement('div');
            cardBody.className = 'p-4';
            
            const name = document.createElement('h2');
            name.className = 'mb-2 text-xl font-bold text-black';
            name.textContent = pokemon.name;

            // Create a link that routes to /pokemon/:name
            const link = document.createElement('a');
            link.href = `/pokemon/${pokemon.name}`;
            link.className = 'block px-4 py-2 mb-2 font-bold text-center text-white bg-blue-500 rounded hover:bg-blue-700';
            link.textContent = 'Learn More';

            // Add click event listener to change the URL dynamically
            link.addEventListener('click', (e) => {
                e.preventDefault();  // Prevent default link behavior (page refresh)
                history.pushState({}, '', `/pokemon/${pokemon.name}`);  // Change the URL
                handleRouting();  // Trigger the route handling function
            });

            cardBody.appendChild(name);
            card.appendChild(img);
            card.appendChild(cardBody);
            card.appendChild(link);

            appDiv.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to fetch and display a single Pokémon's details
async function displaySinglePokemon(characterName: string | undefined) {
  try {
      const response = await fetch(`http://localhost:3000/characters/${characterName}`);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Pokemon = await response.json();
      
      const appDiv = document.querySelector<HTMLDivElement>('#app')!;
      appDiv.innerHTML = '';  // Clear the entire page

      // Create a centered card with more space and larger size
      const cardContainer = document.createElement('div');
      cardContainer.className = 'flex items-center justify-center min-h-screen m-auto';  // Center card horizontally and vertically

      const card = document.createElement('div');
      card.className = 'bg-gray-100 w-[70vw] h-[80vh] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center p-8';  // Larger card with padding

      const img = document.createElement('img');
      img.src = data.link;
      img.alt = data.name;
      img.className = 'object-cover mt-4 mb-8 w-72 h-72';  // Larger image, adjust width and height

      const cardBody = document.createElement('div');
      cardBody.className = 'text-center';

      const name = document.createElement('h2');
      name.className = 'mb-4 text-3xl font-bold text-black';  // Bigger title
      name.textContent = data.name;

      const type = document.createElement('p');
      type.className = 'mb-4 text-xl text-gray-700';  // Increase font size
      type.textContent = `Type: ${data.type}`;

      const description = document.createElement('p');
      description.className = 'mb-8 text-lg text-gray-700';  // Larger description
      description.textContent = data.description;

      const backButton = document.createElement('button');
      backButton.className = 'px-6 py-3 font-bold text-white bg-red-500 rounded hover:bg-red-700';  // Larger back button
      backButton.textContent = 'Go Back';
      
      // Add back button event to go back to the list view
      backButton.addEventListener('click', () => {
          history.pushState({}, '', '/');  // Change the URL back to the home page
          handleRouting();  // Trigger the route handling function
      });

      cardBody.appendChild(name);
      cardBody.appendChild(type);
      cardBody.appendChild(description);
      card.appendChild(img);
      card.appendChild(cardBody);
      card.appendChild(backButton);

      // Append card to container and container to the appDiv
      cardContainer.appendChild(card);
      appDiv.appendChild(cardContainer);
  } catch (error) {
      console.error('Error fetching character details:', error);
  }
}

// Handle back/forward browser navigation
window.onpopstate = handleRouting;

// Call the routing function when the page loads
handleRouting();
