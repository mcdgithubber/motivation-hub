function saveQuote(quote) {
  const saved = getSavedQuotes();
  saved.push(quote);
  localStorage.setItem('savedQuotes', JSON.stringify(saved));
}

function getSavedQuotes() {
  return JSON.parse(localStorage.getItem('savedQuotes')) || [];
}

function deleteQuote(index) {
  const saved = getSavedQuotes();
  saved.splice(index, 1);
  localStorage.setItem('savedQuotes', JSON.stringify(saved));
}
