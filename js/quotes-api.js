async function fetchRandomQuotes(count = 3) {
  const quotes = [];

  for (let i = 0; i < count; i++) {
    try {
      const res = await fetch('https://zenquotes.io/api/random');
      if (!res.ok) throw new Error('API error');
      const data = await res.json();

      quotes.push({
        content: data[0].q,
        author: data[0].a
      });

    } catch (err) {
      console.error('⚠️ Failed to fetch quote:', err);
      quotes.push({
        content: 'Stay strong. Your story isn’t over yet.',
        author: 'Unknown'
      });
    }
  }

  return quotes;
}
