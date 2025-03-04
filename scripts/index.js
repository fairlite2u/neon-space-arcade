// Game data
const games = [{
    id: 1,
    title: "Rock Paper Scissors",
    description: "Defend Earth from alien invaders in this classic arcade game.",
    icon: "👊✋✌️",
    url: "games/rock-paper-scissors/rock-paper-scissors.html"
  },
  {
    id: 2,
    title: "Space Invaders",
    description: "Defend Earth from alien invaders in this classic arcade game.",
    icon: "👾",
    url: "games/space-invaders.html"
  },
  {
    id: 3,
    title: "Galactic Racer",
    description: "Race through the cosmos at light speed, avoiding obstacles.",
    icon: "🚀",
    url: "games/galactic-racer.html"
  },
  {
    id: 4,
    title: "Alien Puzzle",
    description: "Solve puzzles to communicate with extraterrestrial beings.",
    icon: "👽",
    url: "games/alien-puzzle.html"
  },
  {
    id: 5,
    title: "Cosmic Defender",
    description: "Protect your space station from waves of enemy attacks.",
    icon: "🛸",
    url: "games/cosmic defender.html"
  },
  {
    id: 6,
    title: "Planet Jumper",
    description: "Jump from planet to planet collecting cosmic energy.",
    icon: "🪐",
    url: "games/planet-jumper.html"
  },
  {
    id: 7,
    title: "Starship Builder",
    description: "Design and test your own starship in interstellar challenges.",
    icon: "🌌",
    url: "games/starship-builder.html"
  },
  {
    id: 8,
    title: "Meteor Shower",
    description: "Dodge falling meteors as you collect valuable space minerals.",
    icon: "☄️",
    url: "games/meteor-shower.html"
  },
  {
    id: 9,
    title: "Nebula Match",
    description: "Match colorful nebula patterns to create powerful supernovas.",
    icon: "🌈",
    url: "games/nebula-match.html"
  }
];

// Generate stars for background
// const createStars = () => {
//   const starsContainer = document.getElementById('stars');
//   const numberOfStars = 200;

//   for (let i = 0; i < numberOfStars; i++) {
//     const star = document.createElement('div');
//     star.className = 'star';

//     // Random position
//     const left = Math.random() * 100;
//     const top = Math.random() * 100;

//     // Random size
//     const size = Math.random() * 3;

//     // Random animation delay
//     const delay = Math.random() * 5;

//     star.style.left = `${left}%`;
//     star.style.top = `${top}%`;
//     star.style.width = `${size}px`;
//     star.style.height = `${size}px`;
//     star.style.animationDelay = `${delay}s`;

//     starsContainer.appendChild(star);
//   }
// };

// ADDED
//
function createStars(numStars) {
  const body = document.body;

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    // Random positioning
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    // Random size between 1-3 pixels
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Random twinkle delay and duration
    star.style.animation = `twinkle ${Math.random() * 3 + 2}s ${Math.random() * 3}s infinite`;

    body.appendChild(star);
  }
}

// Create 200 stars when page loads
window.addEventListener('load', () => createStars(200));

// End Added
//


// Create game cards
const createGameCards = () => {
  const gamesGrid = document.getElementById('games-grid');

  games.forEach(game => {
    const gameCard = document.createElement('div');
    gameCard.className = 'game-card';
    gameCard.setAttribute('data-id', game.id);

    gameCard.innerHTML = `
              <div class="game-img">
                  <div class="game-icon">${game.icon}</div>
              </div>
              <div class="game-info">
                  <div class="game-title">${game.title}</div>
                  <div class="game-desc">${game.description}</div>
              </div>
          `;

    gameCard.addEventListener('click', () => openGameModal(game));

    gamesGrid.appendChild(gameCard);
  });
};

// Open game modal
const openGameModal = (game) => {
  const modal = document.getElementById('game-modal');
  const modalTitle = document.getElementById('modal-title');
  const gameContent = document.getElementById('game-content');


  modalTitle.textContent = game.title;

  // Show loading message while iframe loads
  gameContent.innerHTML = `<div class="loading-message">Loading ${game.title}...</div>`;

  // Create iframe to load the game HTML file
  setTimeout(() => {
    gameContent.innerHTML = `
        <iframe src="${game.url}" class="game-iframe" id="game-frame" title="${game.title}"></iframe>
    `;

    // Handle possible loading errors
    const iframe = document.getElementById('game-frame');
    iframe.onerror = () => {
      gameContent.innerHTML = `
            <div style="font-size: 5rem; margin-bottom: 1.5rem;">${game.icon}</div>
            <p>Sorry, there was an error loading the game. Please try again later.</p>
        `;
    };
  }, 500); // Short delay to show loading animation


  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

// Close game modal
const closeGameModal = () => {
  const modal = document.getElementById('game-modal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
};

// Random game selection
const selectRandomGame = () => {
  const randomIndex = Math.floor(Math.random() * games.length);
  const randomGame = games[randomIndex];
  openGameModal(randomGame);
};

// Initialize app
const init = () => {
  // createStars();
  createGameCards();

  // Event listeners
  document.getElementById('random-game').addEventListener('click', selectRandomGame);
  document.getElementById('close-modal').addEventListener('click', closeGameModal);

  // Close modal when clicking outside
  document.getElementById('game-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('game-modal')) {
      closeGameModal();
    }
  });
};

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);