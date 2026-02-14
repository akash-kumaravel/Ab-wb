import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

// ============================================
// BLOG PAGE
// ============================================

const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Latest Innovations in Textile Machinery 2026',
      excerpt: 'Discover the cutting-edge technologies transforming the textile industry.',
      date: 'February 14, 2026',
      author: 'John Smith',
      category: 'Innovation',
      image: '/assets/shutterstock_1069102985-1920w.jpeg'
    },
    {
      id: 2,
      title: 'Sustainability in Textile Production',
      excerpt: 'How modern machinery is making textile production more eco-friendly.',
      date: 'February 10, 2026',
      author: 'Sarah Johnson',
      category: 'Sustainability',
      image: '/assets/shutterstock_1069102985-1920w.jpeg'
    },
    {
      id: 3,
      title: 'Maximizing Production Efficiency',
      excerpt: 'Best practices for optimizing your textile machinery performance.',
      date: 'February 5, 2026',
      author: 'Mike Chen',
      category: 'Tips',
      image: '/assets/shutterstock_1069102985-1920w.jpeg'
    },
    {
      id: 4,
      title: 'Industry 4.0: Smart Textile Machines',
      excerpt: 'AI and IoT integration in textile manufacturing equipment.',
      date: 'January 28, 2026',
      author: 'Emma Williams',
      category: 'Technology',
      image: '/assets/shutterstock_1069102985-1920w.jpeg'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* PAGE HEADER */}
      <section className="bg-gradient-to-b from-blue-600/20 to-transparent py-20 px-4">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4">Blog</h1>
          <p className="text-gray-400 text-lg">
            Latest insights and news from the textile machinery industry
          </p>
        </div>
      </section>

      {/* BLOG POSTS */}
      <section className="max-w-[1400px] mx-auto px-4 py-20">
        {/* FEATURED POST */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-900 border border-gray-800 rounded-sm overflow-hidden group hover:border-blue-500 transition-colors">
            <div className="relative overflow-hidden h-64 lg:h-auto">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className="inline-block w-fit px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-bold rounded-sm mb-4">
                {blogPosts[0].category}
              </span>
              <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                {blogPosts[0].title}
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {blogPosts[0].date}
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} />
                  {blogPosts[0].author}
                </div>
              </div>
              <button className="w-fit flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-sm transition-colors">
                Read Article
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* BLOG GRID */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-8">Latest Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map(post => (
              <div
                key={post.id}
                className="bg-gray-900 border border-gray-800 rounded-sm overflow-hidden group hover:border-blue-500 transition-colors"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-2 py-1 bg-blue-600/20 text-blue-400 text-xs font-bold rounded-sm mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex gap-4">
                      <span>{post.date}</span>
                      <span>by {post.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
