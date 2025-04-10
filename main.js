let search = document.querySelector('.search-box');
let searchInput = document.querySelector('.search-box input');

document.querySelector('#search-icon').onclick = () => {
	search.classList.toggle('active');
}

//Header 
let header = document.querySelector('header');

window.addEventListener('scroll' , () => {
	header.classList.toggle('shadow', window.scrollY > 0);
})

// Search functionality
searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        performSearch();
    }
});

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (!searchTerm) return;
    
    // Define searchable sections and keywords
    const searchableContent = [
        { keyword: 'car', target: '#cars' },
        { keyword: 'audi', target: '#cars' },
        { keyword: 'mercedes', target: '#cars' },
        { keyword: 'bmw', target: '#cars' },
        { keyword: 'volkswagen', target: '#cars' },
        { keyword: 'ford', target: '#cars' },
        { keyword: 'toyota', target: '#cars' },
        { keyword: 'service', target: '#parts' },
        { keyword: 'brake', target: '#parts' },
        { keyword: 'detail', target: '#parts' },
        { keyword: 'body', target: '#parts' },
        { keyword: 'light', target: '#parts' },
        { keyword: 'spa', target: '#parts' },
        { keyword: 'steering', target: '#parts' },
        { keyword: 'about', target: '#about' },
        { keyword: 'blog', target: '#blog' },
        { keyword: 'home', target: '#home' }
    ];
    
    // Check if search term matches any keywords
    let targetSection = null;
    
    for (let item of searchableContent) {
        if (searchTerm.includes(item.keyword)) {
            targetSection = item.target;
            break;
        }
    }
    
    // Navigate to section if found
    if (targetSection) {
        search.classList.remove('active');
        document.querySelector(targetSection).scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Highlight the section briefly
        const targetElement = document.querySelector(targetSection);
        targetElement.classList.add('highlight-section');
        
        setTimeout(() => {
            targetElement.classList.remove('highlight-section');
        }, 2000);
    } else {
        alert('No matching content found for: ' + searchTerm);
    }
    
    // Clear search input
    searchInput.value = '';
}