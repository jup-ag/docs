# Jupiter Developers Blog System

This directory contains the blog system for Jupiter Developers. The blog is built into Mintlify and provides a comprehensive platform for sharing technical insights, announcements, and updates.

## Directory Structure

```
blog/
├── index.mdx              # Blog home page
├── template.mdx           # Template for new blog posts
├── ultra-v3.mdx          # Example blog post
└── README.md             # This file

static/
└── blog/
    └── ultra-v3/
        └── ultra-v3.png
```

## URL Structure

All blog posts follow the pattern: `/blog/[slug]`

Examples:
- `/blog/ultra-v3`
- `/blog/your-post-slug`

## Overview

1. **Create the MDX file**: Use existing blog posts as a starting point
2. **Update frontmatter**: Fill in all the frontmatter fields
3. **Write your content**: Use standard Markdown syntax for your blog post content.
4. **Add to navigation**: Update `docs.json` and `blog/index.mdx` to include the new post.
4. **Add an image**: Add a blog post image to `/static/blog/<blog-name>/<image>`

## Step By Step

### Step 1: Create the MDX file
Use existing blog posts as a starting point to create your new blog post at `blog/your-post-slug.mdx`

### Step 2: Update the frontmatter
Edit the metadata at the top of your new file.

### Step 3: Write your content
Use standard Markdown syntax for your blog post content.

### Step 4: Add to navigation
Update `docs.json` and `blog/index.mdx` to include your new post:

```json docs.json
{
  "tab": "Updates",
  "pages": [
    "updates/index",
    {
      "group": "Blog",
      "pages": [
        "blog/index",
        {
          "group": "Articles",
          "pages": [
            "blog/ultra-v3",
            "blog/your-post-slug"
          ]
        }
      ]
    }
  ]
}
```

Add your new post to the blog home page `blog/index.mdx`:

```json blog/index.mdx
<Card title="Your Post Title" href="/blog/your-post-slug" img="/static/blog/your-post-slug/your-post-slug.png">
		Your post description
</Card>
```

Add your new post as the pinned post on the blog home page `blog/index.mdx`:

```json blog/index.mdx
<Card title="Your Post Title" href="/blog/your-post-slug" img="/static/blog/your-post-slug/your-post-slug.png">
	Your post description

	<div className="flex items-center gap-2 mb-3">
		<span className="px-3 py-1 bg-gray-900 text-white text-xs font-medium rounded flex items-center gap-1">
			Your post category
		</span>
		<span className="text-sm text-gray-400">Your post date</span>
	</div>
</Card>
```

### Step 5: Add an image
Create or add an image to `/static/blog/<blog-name>/<image>`

## Image Guidelines

- **Size**: Recommended 800x400px minimum
- **Format**: PNG, JPG, or SVG
- **Location**: `/static/blog/<blog-name>/`
- **Naming**: Use kebab-case matching your post slug
