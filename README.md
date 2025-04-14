# Tesla Crafted - Blog About Tesla Accessories

A clean, modern blog website focused on Tesla car accessories and products.

## Project Overview

Tesla Crafted is a simple blog website built with HTML, CSS, and JavaScript. It features:

- A responsive design that works well on all devices
- A clean and modern UI inspired by the Tesla aesthetic
- Category filtering for articles
- Dynamic content loading
- Animated transitions
- Detailed article pages

## File Structure

- `index.html` - The homepage with article previews
- `article.html` - Template for individual articles
- `about.html` - About page with information about the blog
- `styles.css` - All styling for the website
- `app.js` - JavaScript functionality for dynamic content
- `images/` - Directory containing image assets

## How to Use

1. Clone or download this repository
2. Open `index.html` in your web browser to view the website
3. Click on article cards to read full articles
4. Use the category buttons to filter articles
5. Navigate through the site using the header links

## Customization

### Adding New Articles

To add new articles, edit the `app.js` file and add a new article object to the `articles` array following the existing pattern:

```javascript
{
    id: [unique_id],
    title: "Article Title",
    excerpt: "Short description of the article",
    content: `Full HTML content of the article`,
    category: "Category Name",
    date: "Publication Date",
    readTime: "Read time",
    author: "Author Name",
    authorImage: "images/author-image.jpg",
    image: "images/article-image.jpg",
    tags: ["Tag1", "Tag2", "Tag3"]
}
```

### Customizing Colors

The main color scheme can be modified in the `styles.css` file. The primary Tesla red color used is `#e82127`.

### Adding Images

Add new images to the `images/` directory and reference them in your HTML or JavaScript.

## Hosting Recommendations

This site is designed to be lightweight and easy to deploy on any hosting platform. Here are some free/low-cost options:

- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting
- Amazon S3 Static Website Hosting

## Future Improvements

Potential enhancements for future versions:

- Add a comment system
- Implement user accounts and favorites
- Add a newsletter subscription system
- Create an admin panel for content management
- Implement a search function

## Credits

- Font Awesome for icons
- Google Fonts for typography
- Design inspiration from various blog platforms

## License

This project is available for personal and commercial use.

---

Created by [Your Name] in 2024
