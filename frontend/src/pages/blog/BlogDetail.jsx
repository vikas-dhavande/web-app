import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUser, FaCalendar, FaHeart, FaTrash, FaEdit, FaChevronLeft } from 'react-icons/fa';
import BlogService from '../../services/blog.service';
import { useAuth } from '../../context/AuthContext';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadPost();
    }, [id]);

    const loadPost = async () => {
        setLoading(true);
        try {
            const fetchedPost = await BlogService.getPost(id);
            setPost(fetchedPost);
        } catch (err) {
            setError("Post not found");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await BlogService.deletePost(post.$id, post.thumbnailId);
                navigate('/blog');
            } catch (err) {
                alert("Failed to delete post");
            }
        }
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto animate-pulse p-6">
                <div className="h-96 bg-gray-200 dark:bg-slate-800 rounded-3xl mb-8"></div>
                <div className="h-10 bg-gray-200 dark:bg-slate-800 rounded-full w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-1/2 mb-12"></div>
                <div className="space-y-4">
                    <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-2/3"></div>
                </div>
            </div>
        );
    }

    if (!post || error) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Post not found</h2>
                <button
                    onClick={() => navigate('/blog')}
                    className="text-blue-600 hover:underline"
                >
                    Back to Blog
                </button>
            </div>
        );
    }

    const isAuthor = user && user.$id === post.authorId;

    return (
        <article className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
            {/* Hero Image */}
            <div className="relative h-[400px] md:h-[500px] w-full bg-slate-100 dark:bg-slate-800">
                {post.thumbnailId && (
                    <img
                        src={BlogService.getThumbnailUrl(post.thumbnailId)}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                )}
                <button
                    onClick={() => navigate('/blog')}
                    className="absolute top-6 left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-3 rounded-full shadow-lg text-slate-700 dark:text-white hover:scale-105 transition-transform"
                >
                    <FaChevronLeft />
                </button>
            </div>

            <div className="px-8 py-10 md:px-12 md:py-14">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-8 border-b border-gray-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 flex items-center justify-center font-bold">
                            <FaUser size={12} />
                        </div>
                        <span className="font-medium text-slate-800 dark:text-white">{post.authorName || 'Anonymous'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaCalendar />
                        <span>{new Date(post.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>

                    {/* Action Buttons */}
                    {isAuthor && (
                        <div className="ml-auto flex items-center gap-3">
                            <button
                                onClick={() => navigate(`/blog/${post.$id}/edit`)}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors font-medium"
                            >
                                <FaEdit size={14} /> Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors font-medium"
                            >
                                <FaTrash size={14} /> Delete
                            </button>
                        </div>
                    )}
                </div>

                {/* Content */}
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                    {post.title}
                </h1>

                <div className="prose prose-lg prose-blue dark:prose-invert max-w-none">
                    {post.content.split('\n').map((paragraph, idx) => (
                        paragraph.trim() ? <p key={idx} className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed">{paragraph}</p> : <br key={idx} />
                    ))}
                </div>

                {/* Footer / Interaction */}
                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                    <button className="flex items-center gap-3 text-slate-500 hover:text-red-500 transition-colors group">
                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-full group-hover:bg-red-50 dark:group-hover:bg-red-900/20 transition-colors">
                            <FaHeart className="text-xl group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="font-medium">{post.likesCount || 0} Likes</span>
                    </button>

                    <div className="flex gap-4">
                        {/* Share buttons using dummy links for now */}
                        <button className="text-slate-400 hover:text-blue-600 transition-colors">Share Article</button>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogDetail;
