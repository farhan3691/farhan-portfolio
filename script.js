const GITHUB_USERNAME = 'farhan3691';

// 1. Theme Toggle Logic
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    if (!themeToggle) return; // Error preventer

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeIcon) themeIcon.innerText = savedTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        if (themeIcon) themeIcon.innerText = newTheme === 'dark' ? '☀️' : '🌙';
    });
}

// 2. Fetch GitHub Projects
async function fetchProjects() {
    const container = document.getElementById('work-container');
    if (!container) return;

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
        const repos = await response.json();
        container.innerHTML = '';
        repos.forEach(repo => {
            if (!repo.fork) {
                const imageUrl = `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`;
                container.innerHTML += `
                    <div class="project-card">
                        <img src="${imageUrl}" style="width:100%" alt="${repo.name}" onerror="this.src='https://via.placeholder.com/400x200'">
                        <div style="padding:20px">
                            <h3>${repo.name.replace(/-/g, ' ')}</h3>
                            <p style="color:var(--text-muted); font-size:14px; margin:10px 0;">${repo.description || 'Modern Web Project'}</p>
                            <a href="${repo.html_url}" target="_blank" style="color:var(--primary); font-weight:bold; text-decoration:none;">View Source  ↗</a>
                        </div>
                    </div>`;
            }
        });
    } catch (e) {
        container.innerHTML = '<p>Error loading projects.</p>';
    }
}

// 3. Mobile Sidebar & Cross Icon Logic
function initMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            console.log("Menu button clicked!"); // Check karne ke liye console mein dekhein
            menuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    } else {
        console.error("Menu elements not found! Check IDs in HTML.");
    }
}

// 4. SABSE ZAROORI: Saare functions ko start karna
document.addEventListener('DOMContentLoaded', () => {
    console.log("JS Loaded Successfully!");
    initTheme();
    fetchProjects();
    initMobileMenu(); // Ye line ab trigger karegi
});

//navbar ke liye
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});