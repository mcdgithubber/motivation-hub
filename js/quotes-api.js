const API_KEY = '65DFEShVKfZW4VRoSfh9jA==2MT5wVE3A3EOFNHf';

async function fetchRandomQuotes(count = 3) {
  const quotes = [];

  for (let i = 0; i < count; i++) {
    try {
      const res = await fetch('https://api.api-ninjas.com/v1/quotes', {
        method: 'GET',
        headers: {
          'X-Api-Key': API_KEY
        }
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();

      quotes.push({
        content: data[0].quote,
        author: data[0].author
      });

    } catch (err) {
      console.error('⚠️ Failed to fetch quote:', err);
      quotes.push({
        content: 'The only way out is through.',
        author: 'Unknown'
      });
    }
  }

  return quotes;
}
