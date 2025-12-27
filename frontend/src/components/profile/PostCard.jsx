import React from 'react';
import {
    FaArrowUp, FaArrowDown, FaCommentAlt,
    FaShare, FaAward, FaEllipsisH, FaPlus
} from 'react-icons/fa';

const PostCard = ({ post }) => {
    // Format upvotes: 8.2k etc.
    const formatCount = (count) => {
        if (count >= 1000) return (count / 1000).toFixed(1) + 'k';
        return count;
    };

    const timeAgo = (dateString) => {
        const date = new Date(dateString);
        const diff = Math.floor((new Date() - date) / 1000);
        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all group">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-50">
                        <img
                            src={`https://i.pravatar.cc/150?u=${post.userId}`}
                            alt={post.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                        <span className="text-xs font-bold text-slate-800 dark:text-white hover:underline cursor-pointer">
                            {post.community || `s/${post.username || 'user'}`}
                        </span>
                        <span className="hidden md:block text-gray-400 text-[10px]">•</span>
                        <span className="text-[10px] text-gray-400 font-medium">
                            {timeAgo(post.$createdAt)}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1 px-4 py-1.5 bg-blue-600 text-white rounded-full text-xs font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-sm">
                        Follow <FaPlus className="text-[10px]" />
                    </button>
                    <button className="text-gray-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
                        <FaEllipsisH />
                    </button>
                </div>
            </div>

            {/* Content Body */}
            <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white mb-2 leading-tight hover:text-blue-600 cursor-pointer transition-colors">
                        {post.title}
                    </h3>
                    {post.content && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                            {post.content}
                        </p>
                    )}
                    {post.imageUrl && (
                        <div className="mt-4 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-gray-100 dark:border-slate-700 md:hidden">
                            <img src={post.imageUrl} alt="Post Attachment" className="w-full h-full object-cover max-h-64" />
                        </div>
                    )}
                </div>
                {post.imageUrl && (
                    <div className="hidden md:block w-48 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-gray-100 dark:border-slate-700">
                        <img src={post.imageUrl} alt="Post Attachment" className="w-full h-full object-cover" />
                    </div>
                )}
            </div>

            {/* Footer / Actions */}
            <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                <div className="flex items-center bg-slate-50 dark:bg-slate-900/50 rounded-full px-1 py-1">
                    <button className="p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/30 rounded-full transition-all">
                        <FaArrowUp />
                    </button>
                    <span className="px-1 text-xs font-bold text-slate-800 dark:text-white">
                        {formatCount(post.upvotes)}
                    </span>
                    <button className="p-2 text-gray-500 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-full transition-all">
                        <FaArrowDown />
                    </button>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900/50 text-gray-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-all text-xs font-bold">
                    <FaCommentAlt className="text-sm" />
                    <span>{post.commentsCount}</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900/50 text-gray-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-all text-xs font-bold">
                    <FaShare className="text-sm" />
                    <span>Share</span>
                </button>

                <button className="p-2.5 bg-slate-50 dark:bg-slate-900/50 text-gray-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-all">
                    <FaAward className="text-sm" />
                </button>
            </div>
        </div>
    );
};

export default PostCard;
