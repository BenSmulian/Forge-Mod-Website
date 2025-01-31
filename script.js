document.querySelector('nav').addEventListener('scroll', function () {
    if (window.scrollY > 100) {
        this.style.background = 'rgba(255, 255, 255, 0.95)';
        this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        this.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
        this.style.boxShadow = 'none';
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Handle search functionality (you'll need to add your own logic here)
document.querySelector('.search-container input').addEventListener('input', function () {
    // This is where you would typically implement the search logic
    console.log(`Search term: ${this.value}`);
});

document.querySelector('.search-container button').addEventListener('click', function () {
    // This is where you would typically handle the search action
    console.log(`Performing search with terms: ${document.querySelector('.search-container input').value}`);
});

// Basic JavaScript functionality for search and navigation
document.addEventListener('DOMContentLoaded', function () {
    const pageCardsContainer = document.getElementById('pageCards');
    const contentContainer = document.getElementById('contentContainer');
    const searchInput = document.querySelector('.search-container input');

    // List of available pages
    const pages = [
        { title: 'Minecarft Mods Basics', file: 'minecraft-mods-basics.html' },
        { title: 'Creating a Custom Item', file: 'creating-a-custom-item.html' },
        { title: 'Creating a Custom Block', file: 'creating-a-custom-block.html' },
        { title: 'Creating Custom Tools and Weapons', file: 'creating-custom-tools-and-weapons.html' },
        { title: 'Custom Enchantments and Effects', file: 'custom-enchantments-and-effects.html' },
        { title: 'Advanced Item Creation', file: 'advanced-item-creation-with-custom-attributes.html' },
        { title: 'Custom Crafting Recipes', file: 'custom-crafting-recipes.html' },
        { title: 'Custom Blocks and Item Interactions', file: 'custom-blocks-and-item-interaction.html' },
        // Add more pages as needed
    ];

    // Load page cards
    function loadPageCards() {
        pageCardsContainer.innerHTML = '';
        pages.forEach(page => {
            const card = document.createElement('div');
            card.className = 'page-card';
            card.textContent = page.title;
            card.addEventListener('click', () => loadPage(page.file));
            pageCardsContainer.appendChild(card);
        });
    }

    // Load a specific page
    function loadPage(pageFile) {
        fetch(`pages/${pageFile}`)
            .then(response => response.text())
            .then(html => {
                contentContainer.innerHTML = html;
                // Add the page class to the loaded content
                const pageElement = contentContainer.querySelector('.container');
                if (pageElement) {
                    pageElement.classList.add('page');
                }
            })
            .catch(error => {
                console.error('Error loading page:', error);
            });
    }

    // Handle search input
    searchInput.addEventListener('input', function (e) {
        const searchTerm = e.target.value.trim().toLowerCase();
        const cards = document.querySelectorAll('.page-card');
        cards.forEach(card => {
            const title = card.textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

     // Get the footer and the close button
     const footer = document.querySelector('.footer');
     const closeButton = document.querySelector('.close-btn');

     // Add an event listener to the close button
     closeButton.addEventListener('click', () => {
         footer.classList.add('closed'); // Add the 'closed' class to start animation
     });
    
    // Initial load of page cards
    loadPageCards();
});

// Get the search input and content container elements
const searchInput = document.querySelector('.search-container input');
const contentContainer = document.getElementById('contentContainer');

// Add an event listener to the search input
searchInput.addEventListener('input', function (e) {
    const searchTerm = e.target.value.trim();
    if (searchTerm !== '') {
        // Filter the content based on the search term
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            const pageContent = page.innerHTML;
            if (pageContent.includes(searchTerm)) {
                page.style.display = 'block';
            } else {
                page.style.display = 'none';
            }
        });
    } else {
        // Show all pages when the search input is empty
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.style.display = 'block';
        });
    }
});

function loadPage(page) {
    const filePath = `pages/${page}.html`;
    fetch(`http://localhost:8080/${filePath}`)
        .then(response => response.text())
        .then(html => {
            contentContainer.innerHTML = html;
            // Add the page class to the loaded content
            const pageElement = contentContainer.querySelector('.container');
            pageElement.classList.add('page');
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}

