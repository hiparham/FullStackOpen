const dummy = (arrayOfBlogs) => 1;
const TotalLikes = (blogPosts) => {
  return blogPosts.length === 0
    ? 0
    : blogPosts.reduce((acc, curr) => (acc += curr.likes), 0);
};
const favoriteBlog = (blogPosts) => {
  const maxLikes = Math.max(...blogPosts.map((x) => x.likes));
  const itemFind = blogPosts.find((x) => x.likes === maxLikes);
  return itemFind;
};

const mostBlogs = (blogPosts) => {
  const authors = [...new Set(blogPosts.map((x) => x.author))];
  const allAuthors = Array.from({ length: authors.length }, (v, i) => {
    return blogPosts.filter((x) => x.author === authors[i]);
  });
  const allLength = Math.max(...allAuthors.map((x) => x.length));
  const mostAuth = allAuthors.find((x) => x.length === allLength)[0].author;
  return { author: mostAuth, blogs: allLength };
};

const mostLikes = (blogPosts) => {
  const all = blogPosts.reduce((acc, { author, likes }) => {
    acc[author] = (acc[author] || 0) + likes;
    return acc;
  }, {});
  const highest = Math.max(...Object.values(all));
  const findName = Object.entries(all).find((x) => x[1] === highest)[0];
  return { author: findName, likes: highest };
};

module.exports = { dummy, TotalLikes, favoriteBlog, mostBlogs, mostLikes };
