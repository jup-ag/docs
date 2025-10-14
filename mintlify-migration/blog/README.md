# Jupiter Cloud Blog System

This directory contains the blog system for Jupiter Cloud documentation. The blog is built into Mintlify and provides a comprehensive platform for sharing technical insights, announcements, and updates.

## Features

✅ **Category System**: Two main categories - "Building With Jupiter" and "Inside Jupiter"
✅ **Tag-based Filtering**: Filter articles by multiple tags
✅ **Search Functionality**: Search through article titles, descriptions, and content
✅ **Pinned Articles**: Feature important articles at the top
✅ **Responsive Design**: Mobile-friendly layout
✅ **SEO Optimization**: Proper meta tags for social sharing
✅ **Author Attribution**: Display author information
✅ **Read Time Estimation**: Show estimated reading time

## Directory Structure

```
blog/
├── index.mdx              # Blog home page
├── template.mdx           # Template for new blog posts
├── jupiter-cloud.mdx      # Sample blog post
├── ultra-v3.mdx          # Sample blog post
└── README.md             # This file
```

## Creating a New Blog Post

1. **Copy the template**: Use `template.mdx` as a starting point
2. **Update metadata**: Fill in all the frontmatter fields
3. **Add to navigation**: Update `docs.json` to include the new post
4. **Add to data**: Update `BlogData.jsx` with the new post information
5. **Create image**: Add a blog post image to `/static/img/blog/`

### Frontmatter Fields

```yaml
---
title: "Blog Post Title"                    # Required: Main title
description: "Brief description"            # Required: Short description
category: "Building With Jupiter"           # Required: Category (see categories below)
tags: ["tag1", "tag2"]                     # Required: Array of tags
date: "2024-10-10"                         # Required: Publication date (YYYY-MM-DD)
image: "/img/blog/post-image.png"          # Required: Featured image path
author: "Author Name"                       # Required: Author name
seo:                                       # Optional: SEO optimization
  title: "SEO Title"                       # Optional: SEO-optimized title
  description: "SEO description"           # Optional: SEO description
  image: "/img/blog/post-image.png"        # Optional: Social sharing image
---
```

## Categories

### Building With Jupiter
For content focused on helping developers build with Jupiter's tools and APIs:
- API tutorials and guides
- SDK documentation
- Integration examples
- Developer tools and resources
- Best practices

### Inside Jupiter
For content about Jupiter's internal technology and developments:
- Technical deep dives
- Architecture explanations
- Product announcements
- Engineering insights
- Performance improvements

## URL Structure

All blog posts follow the pattern: `/blog/[slug]`

Examples:
- `/blog/jupiter-cloud`
- `/blog/ultra-v3`

## Adding a New Blog Post

### Step 1: Create the MDX file
```bash
cp blog/template.mdx blog/your-post-slug.mdx
```

### Step 2: Update the frontmatter
Edit the metadata at the top of your new file.

### Step 3: Write your content
Use standard Markdown syntax for your blog post content.

### Step 4: Add to navigation
Update `docs.json` to include your new post:

```json
{
  "group": "Articles",
  "pages": [
    "blog/jupiter-cloud",
    "blog/ultra-v3",
    "blog/your-post-slug"  // Add this line
  ]
}
```

### Step 5: Update blog data
Add your post to `snippets/BlogData.jsx`:

```javascript
export const blogPosts = [
  // ... existing posts
  {
    id: 'your-post-slug',
    title: 'Your Post Title',
    description: 'Your post description',
    category: 'Building With Jupiter',
    tags: ['tag1', 'tag2'],
    date: '2024-10-10',
    image: '/img/blog/your-image.png',
    slug: 'your-post-slug',
    isPinned: false,
    author: 'Your Name',
    excerpt: 'Brief excerpt of your post...',
    readTime: '5 min read'
  }
];
```

### Step 6: Add an image
Create or add an image to `/static/img/blog/your-image.png`

## Pinning Articles

To pin an article to the top of the blog:
1. Set `isPinned: true` in `BlogData.jsx`
2. Only one article should be pinned at a time

## SEO Best Practices

1. **Title**: Keep under 60 characters
2. **Description**: Keep under 160 characters
3. **Image**: Use 1200x630px for optimal social sharing
4. **Tags**: Use relevant, searchable keywords
5. **Content**: Write engaging, valuable content

## Image Guidelines

- **Size**: Recommended 800x400px minimum
- **Format**: PNG, JPG, or SVG
- **Location**: `/static/img/blog/`
- **Naming**: Use kebab-case matching your post slug

## Maintenance

### Adding New Categories
1. Update `categories` array in `BlogData.jsx`
2. Add corresponding icon and color functions
3. Update this README

### Adding New Tags
Tags are automatically extracted from blog posts. No manual maintenance required.

## Technical Implementation

The blog system uses:
- **Mintlify**: Documentation platform
- **React**: For interactive components
- **Tailwind CSS**: For styling
- **MDX**: For blog post content

Key files:
- `blog/index.mdx`: Blog home page
- `snippets/BlogHome.jsx`: Main blog component
- `snippets/BlogData.jsx`: Blog data configuration
- `docs.json`: Navigation configuration
