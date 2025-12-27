import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPen, FaSearch, FaTimes, FaFire, FaClock } from 'react-icons/fa';
import BlogService from '../../services/blog.service';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();
    const { theme } = useTheme();

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        setLoading(true);
        try {
            const fetchedPosts = await BlogService.getPosts();
            setPosts(fetchedPosts);
        } catch (error) {
            console.error("Failed to load posts", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Implement client-side or server-side search
        console.log("Searching for:", searchTerm);
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-12">
            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                        <span className="bg-blue-600 text-white p-2 rounded-lg text-xl"><FaFire /></span>
                        Health Insights
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Discover the latest in medical technology and healthcare.</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <form onSubmit={handleSearch} className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            >
                                <FaTimes />
                            </button>
                        )}
                    </form>

                    {user && (
                        <button
                            onClick={() => navigate('/blog/create')}
                            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-600/20 font-semibold whitespace-nowrap"
                        >
                            <FaPen className="text-sm" /> Compose
                        </button>
                    )}
                </div>
            </div>

            {/* Content Area */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="animate-pulse bg-white dark:bg-slate-800 rounded-2xl h-96 shadow-sm border border-gray-100 dark:border-slate-700"></div>
                    ))}
                </div>
            ) : filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map(post => (
                        <Link
                            to={`/blog/${post.$id}`}
                            key={post.$id}
                            className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
                        >
                            {/* Thumbnail */}
                            <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-slate-900">
                                {post.thumbnailId ? (
                                    <img
                                        src={BlogService.getThumbnailUrl(post.thumbnailId)}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-slate-600">
                                        <FaFire className="text-6xl opacity-20" />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm border border-white/20">
                                    {new Date(post.publishedAt).toLocaleDateString()}
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                        {post.authorName?.charAt(0) || 'U'}
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium truncate">
                                        {post.authorName || 'Anonymous'}
                                    </span>
                                </div>

                                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h2>

                                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-grow">
                                    {post.content.replace(/[#*`]/g, '')}
                                </p>

                                <div className="pt-4 border-t border-gray-50 dark:border-slate-700 flex items-center justify-between text-sm">
                                    <span className="text-blue-600 font-semibold group-hover:underline">Read Article</span>
                                    <span className="text-gray-400 flex items-center gap-1">
                                        <FaClock className="text-xs" /> 5 min read
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-gray-200 dark:border-slate-700">
                    <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaSearch className="text-3xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">No articles found</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
                        We couldn't find any posts matching "{searchTerm}". Try checking your spelling or use different keywords.
                    </p>
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="bg-gray-100 dark:bg-slate-700 text-slate-700 dark:text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                        >
                            Clear Search
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default BlogList;
