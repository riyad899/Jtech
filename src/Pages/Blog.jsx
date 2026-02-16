import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Tag,
  Share2,
  Search,
  TrendingUp,
  MessageCircle,
  Heart
} from 'lucide-react';
import SEO from '../utils/SEO';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Web Development: Trends to Watch in 2024',
      excerpt: 'Explore the latest trends shaping the web development landscape, from AI integration to progressive web apps.',
      author: 'John Smith',
      date: 'March 15, 2024',
      readTime: '5 min read',
      category: 'Web Development',
      image: '/api/placeholder/400/250',
      tags: ['React', 'Next.js', 'AI', 'PWA']
    },
    {
      id: 2,
      title: 'Building Scalable Mobile Apps: Best Practices',
      excerpt: 'Learn how to create mobile applications that can grow with your business and handle millions of users.',
      author: 'Sarah Johnson',
      date: 'March 12, 2024',
      readTime: '7 min read',
      category: 'Mobile Development',
      image: '/api/placeholder/400/250',
      tags: ['React Native', 'Flutter', 'Scalability', 'Performance']
    },
    {
      id: 3,
      title: 'IoT Revolution: Smart Devices Transforming Industries',
      excerpt: 'Discover how Internet of Things devices are revolutionizing manufacturing, healthcare, and smart cities.',
      author: 'Mike Chen',
      date: 'March 10, 2024',
      readTime: '6 min read',
      category: 'IoT',
      image: '/api/placeholder/400/250',
      tags: ['IoT', 'Smart Cities', 'Industry 4.0', 'Sensors']
    },
    {
      id: 4,
      title: 'Cloud Computing: Choosing the Right Platform for Your Business',
      excerpt: 'Compare AWS, Google Cloud, and Azure to find the perfect cloud solution for your specific needs.',
      author: 'Emily Davis',
      date: 'March 8, 2024',
      readTime: '8 min read',
      category: 'Cloud Computing',
      image: '/api/placeholder/400/250',
      tags: ['AWS', 'Google Cloud', 'Azure', 'Cloud Migration']
    },
    {
      id: 5,
      title: 'UI/UX Design Principles for Modern Applications',
      excerpt: 'Master the fundamental design principles that create exceptional user experiences in digital products.',
      author: 'Alex Rodriguez',
      date: 'March 5, 2024',
      readTime: '4 min read',
      category: 'Design',
      image: '/api/placeholder/400/250',
      tags: ['UI/UX', 'Design Systems', 'User Research', 'Prototyping']
    },
    {
      id: 6,
      title: 'Cybersecurity in 2024: Protecting Your Digital Assets',
      excerpt: 'Stay ahead of cyber threats with the latest security practices and technologies.',
      author: 'David Wilson',
      date: 'March 2, 2024',
      readTime: '9 min read',
      category: 'Security',
      image: '/api/placeholder/400/250',
      tags: ['Cybersecurity', 'Data Protection', 'Encryption', 'Zero Trust']
    }
  ];

  const categories = ['All', 'Web Development', 'Mobile Development', 'IoT', 'Cloud Computing', 'Design', 'Security'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO
        title="Tech Blog - Latest Technology Insights & Trends | jTech"
        description="Stay updated with the latest technology trends, tutorials, and insights from jTech. Read articles on web development, mobile apps, IoT, cloud computing, and more."
        keywords="tech blog, technology articles, web development blog, mobile app tutorials, IoT insights, cloud computing, technology trends, jTech blog"
        url="https://jtechvision.com/blog"
        ogImage="https://jtechvision.com/og-blog.jpg"
        twitterImage="https://jtechvision.com/twitter-blog.jpg"
      />
      <div className="pt-32 pb-20 bg-gradient-to-br from-brand-light via-brand-light to-slate-50 min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-[#0C2F4F]/10 border border-[#0C2F4F]/20 rounded-full text-[#0C2F4F] text-sm font-medium tracking-wide font-serif backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Tech Blog
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-light mb-6">
            <span className="bg-gradient-to-r from-[#0C2F4F] via-[#0C2F4F] to-[#0C2F4F] bg-clip-text text-transparent">
              Insights & Updates
            </span>
          </h1>
          <p className="text-xl text-[#0C2F4F] max-w-3xl mx-auto leading-relaxed font-light">
            Stay informed with the latest trends, tips, and insights from the world of technology.
            Our experts share knowledge to help you stay ahead.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="mt-12 bg-brand-light/80 backdrop-blur-xl p-6 rounded-3xl border border-[#0C2F4F]/20 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#0C2F4F]/50" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-[#0C2F4F]/20 rounded-xl focus:outline-none focus:border-[#0C2F4F]/50 bg-white/50 backdrop-blur-sm text-[#0C2F4F] placeholder-[#0C2F4F]/50 transition-all duration-300"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[#0C2F4F] text-white'
                      : 'bg-white/50 text-[#0C2F4F] hover:bg-[#0C2F4F]/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-brand-light/80 backdrop-blur-xl rounded-3xl border border-[#0C2F4F]/20 shadow-xl hover:shadow-[#0C2F4F]/20 transition-all duration-300 overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-[#0C2F4F]/20 to-[#0C2F4F]/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-[#0C2F4F] text-white rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 z-20">
                  <div className="flex space-x-2">
                    <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Heart className="w-4 h-4 text-white" />
                    </button>
                    <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Share2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0C2F4F] mb-3 group-hover:text-[#0C2F4F]/80 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-[#0C2F4F]/70 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-[#0C2F4F]/10 text-[#0C2F4F] rounded-lg text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-[#0C2F4F]/60">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <MessageCircle className="w-16 h-16 text-[#0C2F4F]/30 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#0C2F4F] mb-2">No Articles Found</h3>
            <p className="text-[#0C2F4F]/70">Try adjusting your search or filter criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
    </>
  );
};

export default Blog;