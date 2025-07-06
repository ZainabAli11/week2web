const UNSPLASH_KEY = 'cWN22xHKkhY_uv3HzYjG3ElKGCy95YbcUc_w640lud4';
const RSS_URL = 'https://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml';
const MAX_ITEMS = 10;

const usedImageUrls = new Set();  // track already used image URLs

function getKeyword(title = '') {
  const t = title.toLowerCase();
  if (t.includes('texas') && t.includes('flood')) return 'texas flood';
  if (t.includes('hurricane')) return 'hurricane disaster';
  if (t.includes('trump')) return 'donald trump';
  if (t.includes('biden')) return 'joe biden';
  if (t.includes('elon musk') || t.includes('tesla')) return 'elon musk';
  if (t.includes('white sox') || t.includes('baseball')) return 'baseball';
  if (t.includes('fire')) return 'wildfire';
  return title.split(' ').slice(0, 2).join(' ');
}

async function fetchUniqueUnsplashImage(title) {
  const keyword = getKeyword(title);
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&per_page=5&client_id=${UNSPLASH_KEY}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();

    // Pick first unused image
    for (const result of data.results) {
      const imgUrl = result.urls?.regular;
      if (imgUrl && !usedImageUrls.has(imgUrl)) {
        usedImageUrls.add(imgUrl);
        return imgUrl;
      }
    }

    return null;
  } catch {
    return null;
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  const feedUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;
  const newsList = document.getElementById('newsList');
  newsList.textContent = 'Loading…';

  try {
    const res = await fetch(feedUrl);
    if (!res.ok) throw new Error('Failed to load RSS feed.');
    const data = await res.json();
    const articles = data.items.slice(1, MAX_ITEMS + 1);
    newsList.innerHTML = '';

    const imgPromises = articles.map(article => fetchUniqueUnsplashImage(article.title));
    const imgUrls = await Promise.all(imgPromises);

    articles.forEach((article, idx) => {
      const img = imgUrls[idx];
      const rawDesc = (article.description || '').replace(/<[^>]+>/g, '').trim();
      const desc = rawDesc.length > 300 ? rawDesc.slice(0, 300) + '…' : rawDesc;

      const li = document.createElement('li');
      li.innerHTML = `
        ${img ? `<img src="${img}" alt="News image">` : ''}
        <div class="card-content">
          <a href="${article.link}" target="_blank" rel="noopener noreferrer">${article.title}</a>
          <small>Published: ${new Date(article.pubDate).toLocaleString()}</small>
          <p class="description">${desc}</p>
        </div>
      `;
      newsList.appendChild(li);
    });

  } catch (err) {
    console.error(err);
    newsList.innerHTML = `<li>Error loading news. Please try again later.</li>`;
  }
});
