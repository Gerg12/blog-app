const fetchPageContent = (id) => {
  return fetch(`https://js1.10up.com/wp-json/wp/v2/pages/${id}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error('Error fetching page content:', error);
    });
};

export default fetchPageContent;