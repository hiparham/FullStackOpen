const {
  dummy,
  TotalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} = require("../utils/list_helper");
const { test, describe } = require("node:test");
const assert = require("node:assert");

describe("Dummy Test", () => {
  test("Verifying Dummy", () => {
    const blg = dummy([]);
    assert.strictEqual(blg, 1);
  });
});

describe("Likes Count Test", () => {
  test("A Long List", () => {
    const blogPosts = [
      { name: "Why Coffee Sucks", likes: 5 },
      { name: "Cats Are Overrated", likes: 8 },
      { name: "Pineapple Pizza Is A Scam", likes: 6 },
      { name: "Your Opinion Is Wrong", likes: 4 },
    ];
    const blg = TotalLikes(blogPosts);
    assert.strictEqual(blg, 23);
  });
  test("List With One Blog", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0,
      },
    ];
    const blg = TotalLikes(listWithOneBlog);
    assert.strictEqual(blg, 5);
  });
  test("A very long list", () => {
    const listWithOneBlog = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
      },
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0,
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0,
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0,
      },
    ];
    const blg = TotalLikes(listWithOneBlog);
    assert.strictEqual(blg, 36);
  });
});
//
describe("Finding Favorite Post", () => {
  test("Multiple", () => {
    const array = [
      { name: "Why Coffee Sucks", likes: 5 },
      { name: "Cats Are Overrated", likes: 8 },
      { name: "Pineapple Pizza Is A Scam", likes: 6 },
      { name: "Your Opinion Is Wrong", likes: 4 },
    ];
    const blog = favoriteBlog(array);
    assert.deepStrictEqual(blog, array[1]);
  });
  // Multiple Items With Conflict
  test("MultipleConflict", () => {
    const array = [
      { name: "Why Coffee Sucks", likes: 5 },
      { name: "Cats Are Overrated", likes: 8 },
      { name: "Dogs are way better", likes: 8 },
      { name: "Pineapple Pizza Is A Scam", likes: 6 },
      { name: "Your Opinion Is Wrong", likes: 4 },
    ];
    const blog = favoriteBlog(array);
    assert.deepStrictEqual(blog, array[1]);
  });
});
//
describe("Finding Most Blogs", () => {
  test("AliceWins", () => {
    const blogs = [
      { title: "The Beginning", author: "Alice" },
      { title: "Tech Innovations", author: "Bob" },
      { title: "JavaScript Tips", author: "Alice" },
      { title: "Node.js Deep Dive", author: "Charlie" },
      { title: "CSS Tricks", author: "Bob" },
      { title: "HTML Basics", author: "Alice" },
      { title: "React for Dummies", author: "Charlie" },
      { title: "Vue vs React", author: "Bob" },
      { title: "Backend Essentials", author: "Charlie" },
      { title: "Front-End Hacks", author: "Alice" },
    ];
    const findMost = mostBlogs(blogs);
    assert.deepStrictEqual({ author: "Alice", blogs: 4 }, findMost);
  });
});
//
describe("Finding The most liked author", () => {
  test("Emily", () => {
    const blogs = [
      { title: "How to Code Like a Pro", author: "John Doe", likes: 23 },
      {
        title: "JavaScript: The Good, The Bad, and The Ugly",
        author: "John Doe",
        likes: 12,
      },
      { title: "CSS Tricks You Need to Know", author: "Jane Smith", likes: 45 },
      { title: "Mastering HTML5", author: "Jane Smith", likes: 30 },
      { title: "Node.js for Beginners", author: "Alex Brown", likes: 18 },
      { title: "React Basics", author: "Alex Brown", likes: 28 },
      { title: "Debugging Like a Boss", author: "Emily White", likes: 35 },
      {
        title: "JavaScript Frameworks Battle",
        author: "Emily White",
        likes: 50,
      },
      { title: "Building APIs with Express", author: "John Doe", likes: 19 },
      { title: "TypeScript vs JavaScript", author: "Alex Brown", likes: 40 },
      {
        title: "Frontend vs Backend: The Great Debate",
        author: "Jane Smith",
        likes: 27,
      },
      { title: "CSS Flexbox Explained", author: "John Doe", likes: 22 },
      { title: "Advanced JavaScript", author: "Emily White", likes: 14 },
      {
        title: "How to Manage State in React",
        author: "Alex Brown",
        likes: 31,
      },
      { title: "GraphQL vs REST APIs", author: "Emily White", likes: 26 },
    ];
    const mostLiked = mostLikes(blogs);
    assert.deepStrictEqual(mostLiked, { author: "Emily White", likes: 125 });
  });
});
