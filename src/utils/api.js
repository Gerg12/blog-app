const fetchPageContent = (id) => {
  return fetch(`https://js1.10up.com/wp-json/wp/v2/pages/${id}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error('Error fetching page content:', error);
    });
};

const fetchPosts = async (id = '') => {
  try {
    const response = await fetch(`https://js1.10up.com/wp-json/wp/v2/posts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

const fetchAuthors = async (postsData) => {
  const authorIds = postsData.map((post) => post.author);
  const uniqueAuthorIds = [...new Set(authorIds)]; // Get unique author IDs
  const authorNamesObj = {};

  await Promise.all(
    uniqueAuthorIds.map(async (authorId) => {
      try {
        const response = await fetch(`https://js1.10up.com/wp-json/wp/v2/users/${authorId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch author');
        }
        const data = await response.json();
        authorNamesObj[authorId] = data?.name || '';
      } catch (error) {
        console.error('Error fetching author:', error);
      }
    })
  );

  return authorNamesObj;
};

export { fetchPageContent, fetchPosts, fetchAuthors };