export function fromDatabasePost(row) {
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    title: row.title,
    excerpt: row.excerpt,
    readTime: row.read_time,
    cover: row.cover_url,
    coverAlt: row.cover_alt,
    introduction: row.introduction,
    paragraphs: Array.isArray(row.paragraphs) ? row.paragraphs : [],
    closingThought: row.closing_thought,
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    published: row.published,
    isFeatured: row.is_featured,
  };
}

export function toDatabasePost(post) {
  return {
    slug: post.slug.trim(),
    category: post.category.trim(),
    title: post.title.trim(),
    excerpt: post.excerpt.trim(),
    read_time: post.readTime.trim(),
    cover_url: post.cover.trim(),
    cover_alt: post.coverAlt.trim(),
    introduction: post.introduction.trim(),
    paragraphs: post.paragraphs,
    closing_thought: post.closingThought.trim(),
    gallery: post.gallery,
    published: Boolean(post.published),
    is_featured: Boolean(post.isFeatured),
  };
}
