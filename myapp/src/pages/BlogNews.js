import React from 'react';

function BlogNews() {
  // Sample blog posts (replace with data from an API or CMS)
  const blogPosts = [
    { id: 1, title: 'Pet Care Tips', content: 'Tips for taking care of your pets...' },
    { id: 2, title: 'Latest News', content: 'News about the app...' },
  ];

  return (
    <div className="container mt-5">
      <h2>Blog & News</h2>
      {blogPosts.map(post => (
        <div key={post.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.content}</p>
            <a href={`/blog/${post.id}`} className="btn btn-primary">Read More</a> {/* Update the link */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogNews;