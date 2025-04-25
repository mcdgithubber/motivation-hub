document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      tabPanels.forEach(panel => panel.classList.remove('active'));
      document.getElementById(tab.dataset.tab).classList.add('active');

      if (tab.dataset.tab === 'saved') loadSavedQuotes();
      if (tab.dataset.tab === 'random') loadRandomQuotes();
    });
  });

  loadRandomQuotes();
});

async function loadRandomQuotes() {
  const container = document.getElementById('random-quotes');
  const loading = document.getElementById('random-loading');
  container.innerHTML = '';
  loading.style.display = 'block';

  const quotes = await fetchRandomQuotes();

  loading.style.display = 'none';
  quotes.forEach(q => {
    const card = document.createElement('div');
    card.className = 'quote-card';
    card.innerHTML = `
      <div class="quote-text">"${q.content}"</div>
      <div class="quote-author">— ${q.author}</div>
      <div class="button-row">
    <button class="save-btn">Save</button>
  </div>
    `;
    card.querySelector('.save-btn').addEventListener('click', () => {
      saveQuote(q);
      alert('Quote saved!');
    });
    container.appendChild(card);
  });
}

function loadSavedQuotes() {
  const container = document.getElementById('saved-quotes');
  const loading = document.getElementById('saved-loading');
  container.innerHTML = '';
  loading.style.display = 'block';

  const saved = getSavedQuotes();

  setTimeout(() => {
    loading.style.display = 'none';
    if (saved.length === 0) {
      container.innerHTML = '<p>No saved quotes yet.</p>';
      return;
    }

    saved.forEach((q, i) => {
      const card = document.createElement('div');
      card.className = 'quote-card';
      card.innerHTML = `
        <div class="quote-text">"${q.content}"</div>
        <div class="quote-author">— ${q.author}</div>
        <div class="button-row">
    <button class="delete-btn">Delete</button>
  </div>
      `;
      card.querySelector('.delete-btn').addEventListener('click', () => {
        deleteQuote(i);
        loadSavedQuotes();
      });
      container.appendChild(card);
    });
  }, 500);
}
