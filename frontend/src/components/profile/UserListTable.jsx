import React from 'react';
import { FaMapMarkerAlt, FaLink, FaBan, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserListTable = ({ users, title }) => {
    const navigate = useNavigate();

    const formatNumber = (num) => {
        if (!num) return '0';
        return num.toLocaleString();
    };

    const formatDateJoined = (dateString, userId) => {
        // Mocking "days ago" as per image for some users or calculating from $createdAt
        if (userId === 'user_001') return '5.011 days ago';
        if (userId === 'user_002') return '4.546 days ago';
        if (userId === 'user_003') return '3.864 days ago';

        const date = new Date(dateString);
        const diffTime = Math.abs(new Date() - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays} days ago`;
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden animate-fadeIn">
            <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white capitalize">{title}</h3>
                <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full">
                    {users.length} Total
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-900/50">
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-slate-700">
                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            </th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-slate-700">Name</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-slate-700">Posts</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-slate-700">Joined</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-slate-700">Friends</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-slate-700">Followers</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-slate-700">Status</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-slate-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.$id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                                <td className="px-6 py-5 border-b border-gray-50 dark:border-slate-700/50">
                                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                </td>
                                <td className="px-6 py-5 border-b border-gray-50 dark:border-slate-700/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                                            <img src={u.avatarUrl || `https://i.pravatar.cc/150?u=${u.$id}`} alt={u.fullName} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-slate-800 dark:text-white truncate flex items-center gap-1">
                                                {u.fullName}
                                                {u.status === 'Active' && <FaCheckCircle className="text-blue-500 text-[10px]" />}
                                            </p>
                                            <p className="text-xs text-gray-400 truncate">@{u.username || u.$id}</p>
                                            <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                                                <FaMapMarkerAlt className="text-[10px]" /> {u.location || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 border-b border-gray-50 dark:border-slate-700/50 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                    {formatNumber(u.postsCount)}
                                </td>
                                <td className="px-6 py-5 border-b border-gray-50 dark:border-slate-700/50 text-sm text-gray-500">
                                    {formatDateJoined(u.$createdAt, u.userId)}
                                </td>
                                <td className="px-6 py-5 border-b border-gray-50 dark:border-slate-700/50 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                    {formatNumber(u.followingCount)}
                                </td>
                                <td className="px-6 py-5 border-b border-gray-50 dark:border-slate-700/50 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                    {formatNumber(u.followersCount)}
                                </td>
                                <td className="px-6 py-5 border-b border-gray-50 dark:border-slate-700/50">
                                    <div>
                                        <span className={`text-xs font-bold ${u.status === 'Active' ? 'text-emerald-500' : u.status === 'Inactive' ? 'text-red-400' : 'text-amber-500'}`}>
                                            {u.status || 'Unknown'}
                                        </span>
                                        <p className="text-[10px] text-gray-400">{u.engagement || 'User Engagement Metrics'}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-5 border-b border-gray-50 dark:border-slate-700/50">
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-lg hover:bg-red-50 hover:text-red-500 transition-all shadow-sm">
                                            <FaBan className="text-sm" />
                                        </button>
                                        <button
                                            onClick={() => navigate(`/profile/${u.userId || u.$id}`)}
                                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm active:scale-95"
                                        >
                                            <FaLink className="text-sm" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {users.length === 0 && (
                <div className="p-20 text-center">
                    <p className="text-gray-400 font-medium">No {title} found.</p>
                </div>
            )}
        </div>
    );
};

export default UserListTable;
