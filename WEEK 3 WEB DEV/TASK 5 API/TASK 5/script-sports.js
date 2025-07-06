const API_KEY = '1ee570e08cbeb20be6571ff94b804c35';
const API_URL = `https://gnews.io/api/v4/top-headlines?topic=sports&lang=en&country=us&max=9&apikey=${API_KEY}`;

window.addEventListener('DOMContentLoaded', async () => {
  const sportsList = document.getElementById('sports');
  sportsList.innerHTML = 'Loading sports news...';

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('News fetch failed');

    const data = await response.json();
    sportsList.innerHTML = '';

    data.articles.forEach(article => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${article.image ? `<img src="${article.image}" alt="News Image">` : ''}
        <div class="card-content">
          <a href="${article.url}" target="_blank">${article.title}</a>
          <small>Published: ${new Date(article.publishedAt).toLocaleString()}</small>
          <p class="description">${article.description || 'No description available.'}</p>
        </div>
      `;
      sportsList.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    sportsList.innerHTML = '<p>Failed to load sports news. Please try again later.</p>';
  }
});
