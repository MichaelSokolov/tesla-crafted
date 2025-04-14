// Get references to DOM elements
const articleSelect = document.getElementById("articleSelect");
const articleForm = document.getElementById("articleForm");
const newArticleBtn = document.getElementById("newArticleBtn");
const previewBtn = document.getElementById("previewBtn");
const previewDiv = document.getElementById("preview");
const previewContent = document.getElementById("previewContent");

// Load existing articles from app.js
let articles = [];
fetch("app.js")
  .then((response) => response.text())
  .then((text) => {
    // Extract articles array from app.js
    const match = text.match(/const articles = (\[[\s\S]*?\]);/);
    if (match) {
      // Safely evaluate the articles array
      articles = eval(match[1]);
      populateArticleSelect();
    }
  })
  .catch((error) => console.error("Error loading articles:", error));

// Populate the article select dropdown
function populateArticleSelect() {
  articleSelect.innerHTML = '<option value="">Select Existing Article</option>';
  articles.forEach((article) => {
    const option = document.createElement("option");
    option.value = article.id;
    option.textContent = `${article.id}: ${article.title}`;
    articleSelect.appendChild(option);
  });
}

// Load article data into form
function loadArticleData(article) {
  document.getElementById("articleId").value = article.id;
  document.getElementById("articleTitle").value = article.title;
  document.getElementById("articleExcerpt").value = article.excerpt;
  document.getElementById("articleCategory").value = article.category;
  document.getElementById("articleDate").value = article.date;
  document.getElementById("articleReadTime").value = article.readTime;
  document.getElementById("articleAuthor").value = article.author;
  document.getElementById("articleAuthorImage").value = article.authorImage;
  document.getElementById("articleImage").value = article.image;
  document.getElementById("articleTags").value = article.tags.join(", ");
  document.getElementById("articleRating").value = article.rating;
  document.getElementById("articleContent").value = article.content;
}

// Clear form data
function clearForm() {
  articleForm.reset();
  document.getElementById("articleId").value =
    articles.length > 0 ? Math.max(...articles.map((a) => a.id)) + 1 : 1;
}

// Event Listeners
articleSelect.addEventListener("change", (e) => {
  if (e.target.value) {
    const article = articles.find((a) => a.id === parseInt(e.target.value));
    if (article) {
      loadArticleData(article);
    }
  }
});

newArticleBtn.addEventListener("click", () => {
  clearForm();
});

previewBtn.addEventListener("click", () => {
  previewContent.innerHTML = document.getElementById("articleContent").value;
  previewDiv.style.display = "block";
});

// Handle form submission
articleForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {
    id: parseInt(document.getElementById("articleId").value),
    title: document.getElementById("articleTitle").value,
    excerpt: document.getElementById("articleExcerpt").value,
    category: document.getElementById("articleCategory").value,
    date: document.getElementById("articleDate").value,
    readTime: document.getElementById("articleReadTime").value,
    author: document.getElementById("articleAuthor").value,
    authorImage: document.getElementById("articleAuthorImage").value,
    image: document.getElementById("articleImage").value,
    tags: document
      .getElementById("articleTags")
      .value.split(",")
      .map((tag) => tag.trim()),
    rating: parseFloat(document.getElementById("articleRating").value),
    content: document.getElementById("articleContent").value,
    url: null, // Default to null for now
  };

  // Find existing article index
  const existingIndex = articles.findIndex((a) => a.id === formData.id);

  if (existingIndex !== -1) {
    // Update existing article
    articles[existingIndex] = formData;
  } else {
    // Add new article
    articles.push(formData);
  }

  // Generate the new articles array content
  const articlesContent =
    "const articles = " + JSON.stringify(articles, null, 2) + ";";

  // Create a download link for the updated app.js
  const blob = new Blob([articlesContent], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "articles.js";
  a.click();
  URL.revokeObjectURL(url);

  alert(
    "Article saved! Please replace the articles array in app.js with the downloaded content."
  );
});

// Set current date as default for new articles
document.getElementById("articleDate").value = new Date().toLocaleDateString(
  "en-US",
  {
    month: "long",
    day: "numeric",
    year: "numeric",
  }
);
