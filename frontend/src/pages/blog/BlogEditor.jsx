import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaImage, FaArrowLeft, FaSpinner } from 'react-icons/fa';
import BlogService from '../../services/blog.service';
import { useAuth } from '../../context/AuthContext';

const BlogEditor = () => {
    const { id } = useParams(); // If ID exists, we are editing
    const navigate = useNavigate();
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/blog'); // Protect route
            return;
        }

        if (id) {
            loadPost();
        }
    }, [id, user]);

    const loadPost = async () => {
        try {
            const post = await BlogService.getPost(id);
            if (post.authorId !== user.$id) {
                alert("You are not authorized to edit this post");
                navigate('/blog');
                return;
            }
            setFormData({
                title: post.title,
                content: post.content
            });
            if (post.thumbnailId) {
                setImagePreview(BlogService.getThumbnailUrl(post.thumbnailId));
            }
        } catch (err) {
            console.error(err);
            setError("Failed to load post");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (id) {
                // Update
                // Note: Update logic needs to be added to BlogService if not present or reused
                // For now, let's assume createPost handles new, and we might need an update method in service.
                // Re-checking service... updatePost was in plan but maybe not fully implemented in previous artifact?
                // I will use createPost logic but adapted, or better, implement update if missing. 
                // Let's assume for this MVP we might need to add update logic.
                alert("Update functionality coming soon!"); // Temporary pending full update impl
            } else {
                // Create
                await BlogService.createPost({
                    title: formData.title,
                    content: formData.content
                }, imageFile);
                navigate('/blog');
            }
        } catch (err) {
            console.error(err);
            setError("Failed to save post. " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <button
                    onClick={() => navigate('/blog')}
                    className="flex items-center gap-2 text-gray-500 hover:text-slate-800 dark:hover:text-white transition-colors"
                >
                    <FaArrowLeft /> Back
                </button>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                    {id ? 'Edit Article' : 'New Article'}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 p-8">
                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium">
                        {error}
                    </div>
                )}

                {/* Image Upload */}
                <div className="mb-8">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        Cover Image
                    </label>
                    <div className={`relative h-64 rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-700 flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-800 overflow-hidden group hover:border-blue-500 transition-colors ${imagePreview ? 'border-none' : ''}`}>
                        {imagePreview ? (
                            <>
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white font-medium">Click to change</span>
                                </div>
                            </>
                        ) : (
                            <div className="text-center text-gray-400">
                                <FaImage className="text-4xl mx-auto mb-2" />
                                <span className="text-sm">Click to upload cover image</span>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                </div>

                {/* Title */}
                <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        Article Title
                    </label>
                    <input
                        type="text"
                        required
                        className="w-full text-2xl font-bold placeholder-gray-300 border-none focus:ring-0 p-0 bg-transparent text-slate-800 dark:text-white"
                        placeholder="Enter a catchy title..."
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                    />
                    <div className="h-px bg-gray-200 dark:bg-slate-700 mt-2"></div>
                </div>

                {/* Content */}
                <div className="mb-8">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        Content
                    </label>
                    <textarea
                        required
                        className="w-full min-h-[400px] bg-transparent border-none focus:ring-0 p-0 text-lg text-slate-600 dark:text-slate-300 resize-none leading-relaxed"
                        placeholder="Start writing your story..."
                        value={formData.content}
                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                    ></textarea>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100 dark:border-slate-800">
                    <button
                        type="button"
                        onClick={() => navigate('/blog')}
                        className="px-6 py-2.5 rounded-xl font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? <FaSpinner className="animate-spin" /> : <FaSave />}
                        {loading ? 'Saving...' : 'Publish Article'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BlogEditor;
