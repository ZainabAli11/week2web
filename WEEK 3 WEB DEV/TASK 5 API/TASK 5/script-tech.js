const API_KEY = '1ee570e08cbeb20be6571ff94b804c35';
const API_URL = `https://gnews.io/api/v4/top-headlines?topic=technology&lang=en&country=us&max=15&apikey=${API_KEY}`;

window.addEventListener('DOMContentLoaded', async () => {
  const trendsList = document.getElementById('trends');
  trendsList.innerHTML = 'Loading technology trends...';

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch');

    const data = await response.json();

    // Filter out unwanted article
    const filteredArticles = data.articles.filter(article => 
      article.title !== 'My Traditional In-Laws Say We’re Not Carrying on the “Family Legacy.” But We Have Daughters.'
    );

    // Take first 9 articles
    let articles = filteredArticles.slice(0, 9);

    // Replace 2nd and 7th if possible
    if (filteredArticles[9]) {
      articles[1] = filteredArticles[9];
    }
    if (filteredArticles[10]) {
      articles[6] = filteredArticles[10];
    }

    // Clear and render
    trendsList.innerHTML = '';

    articles.forEach(article => {
      const li = document.createElement('li');

      // Format date
      let publishedDate = 'Unknown';
      if (article.publishedAt) {
        const date = new Date(article.publishedAt);
        publishedDate = `Published: ${date.toLocaleString()}`;
      }

      li.innerHTML = `
        ${article.image ? `<img src="${article.image}" alt="Tech Image">` : ''}
        <div class="card-content">
          <a href="${article.url}" target="_blank">${article.title}</a>
          <small>${publishedDate}</small>
          <p class="description">${article.description || 'No description available.'}</p>
        </div>
      `;

      trendsList.appendChild(li);
    });

  } catch (err) {
    console.error(err);
    trendsList.innerHTML = '<p>Failed to load technology trends. Please try again later.</p>';
  }
});
