import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DBService from '../../services/db.service';
import UserListTable from './UserListTable';
import PostCard from './PostCard';
import {
    FaUser, FaMapMarkerAlt, FaLink, FaEnvelope,
    FaGraduationCap, FaFacebookF, FaTwitter,
    FaInstagram, FaYoutube, FaPlus, FaPlusCircle,
    FaRegImage, FaRegNewspaper
} from 'react-icons/fa';

const BasicProfile = () => {
    const { userId } = useParams();
    const { user: currentAuthUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [allUsers, setAllUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [postSaving, setPostSaving] = useState(false);
    const [postFormData, setPostFormData] = useState({
        title: '',
        content: '',
        community: 's/medical',
        imageUrl: ''
    });
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        bio: '',
        education: '',
        location: '',
        website: '',
        avatarUrl: '',
        coverUrl: '',
        postsCount: 0,
        followersCount: 0,
        followingCount: 0
    });

    const targetUserId = userId || currentAuthUser?.$id;
    const isOwner = targetUserId === currentAuthUser?.$id;

    const fetchPosts = async () => {
        try {
            const userPosts = await DBService.getPosts(targetUserId);
            setPosts(userPosts);
        } catch (error) {
            console.error("Failed to fetch posts", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (targetUserId) {
                setLoading(true);
                try {
                    // Fetch profile of the user being viewed
                    const profileData = await DBService.getProfile(targetUserId);
                    setFormData({
                        fullName: profileData.fullName || profileData.name || '',
                        email: profileData.email || '',
                        phone: profileData.phoneNumber || '',
                        address: typeof profileData.address === 'string' ? profileData.address : '',
                        bio: profileData.bio || 'Hello, I am a user of MedPortal. I love making healthy choices and staying updated with medical trends.',
                        education: profileData.education || 'High School / University Name',
                        location: profileData.location || 'City, Country',
                        website: profileData.website || 'www.example.com',
                        avatarUrl: profileData.avatarUrl || '',
                        coverUrl: profileData.coverUrl || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1200',
                        postsCount: profileData.postsCount || 0,
                        followersCount: profileData.followersCount || 0,
                        followingCount: profileData.followingCount || 0
                    });

                    // Fetch all users for followers/friends list demo
                    const usersList = await DBService.getUsers();
                    setAllUsers(usersList.filter(u => u.$id !== targetUserId));

                    // Fetch posts for this user
                    await fetchPosts();
                } catch (error) {
                    console.error("Failed to load profile", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [targetUserId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePostChange = (e) => {
        setPostFormData({ ...postFormData, [e.target.name]: e.target.value });
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        if (!postFormData.title.trim()) return;

        setPostSaving(true);
        try {
            await DBService.createPost({
                userId: currentAuthUser.$id,
                name: formData.fullName,
                username: formData.fullName.toLowerCase().replace(/\s/g, ''),
                title: postFormData.title,
                content: postFormData.content,
                community: postFormData.community,
                imageUrl: postFormData.imageUrl,
                upvotes: 0,
                commentsCount: 0
            });
            setPostFormData({ title: '', content: '', community: 's/medical', imageUrl: '' });
            await fetchPosts();
            alert('Post created successfully!');
        } catch (error) {
            console.error("Post creation failed", error);
            alert('Failed to create post.');
        } finally {
            setPostSaving(false);
        }
    };

    const handleSave = async () => {
        if (!isOwner) return;
        setSaving(true);
        try {
            await DBService.updateProfile(targetUserId, {
                fullName: formData.fullName,
                phoneNumber: formData.phone,
                address: formData.address,
                bio: formData.bio,
                education: formData.education,
                location: formData.location,
                website: formData.website,
                avatarUrl: formData.avatarUrl,
                coverUrl: formData.coverUrl
            });
            alert('Profile updated successfully!');
        } catch (error) {
            console.error("Profile update failed", error);
            alert('Failed to update profile.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center p-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* 1. Cover & Profile Header Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
                {/* Cover Image */}
                <div className="h-48 md:h-64 relative overflow-hidden">
                    <img
                        src={formData.coverUrl}
                        alt="Profile Cover"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Profile Meta Info */}
                <div className="px-6 pb-6 relative">
                    <div className="flex flex-col md:flex-row items-end md:items-center justify-between -mt-12 md:-mt-16 mb-6 gap-6">
                        {/* Stats - Left */}
                        <div className="flex gap-8 order-3 md:order-1 w-full md:w-auto justify-center md:justify-start">
                            <div className="text-center">
                                <p className="text-xl font-bold text-slate-800 dark:text-white">{formData.postsCount.toLocaleString()}</p>
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Posts</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xl font-bold text-slate-800 dark:text-white">{formData.followersCount.toLocaleString()}</p>
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Followers</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xl font-bold text-slate-800 dark:text-white">{formData.followingCount.toLocaleString()}</p>
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Following</p>
                            </div>
                        </div>

                        {/* Avatar & Name - Center */}
                        <div className="flex flex-col items-center order-1 md:order-2">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-slate-800 bg-white shadow-lg overflow-hidden mb-3">
                                {formData.avatarUrl ? (
                                    <img src={formData.avatarUrl} alt={formData.fullName} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-blue-600 bg-blue-50">
                                        {formData.fullName.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{formData.fullName}</h2>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">@{formData.fullName.toLowerCase().replace(/\s/g, '') || 'user'}</p>
                        </div>

                        {/* Social & Actions - Right */}
                        <div className="flex flex-col items-center md:items-end gap-3 order-2 md:order-3">
                            <div className="flex gap-2">
                                <button className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-md active:scale-95"><FaFacebookF /></button>
                                <button className="p-2 text-white bg-sky-400 rounded-full hover:bg-sky-500 transition-all shadow-md active:scale-95"><FaTwitter /></button>
                                <button className="p-2 text-white bg-pink-500 rounded-full hover:bg-pink-600 transition-all shadow-md active:scale-95"><FaInstagram /></button>
                                <button className="p-2 text-white bg-red-600 rounded-full hover:bg-red-700 transition-all shadow-md active:scale-95"><FaYoutube /></button>
                            </div>
                            {isOwner ? (
                                <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold shadow-md hover:bg-indigo-700 transition-all active:scale-95">
                                    <FaPlus className="text-sm" /> Add to Story
                                </button>
                            ) : (
                                <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-md hover:bg-blue-700 transition-all active:scale-95">
                                    Follow
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center justify-center md:justify-start gap-8 border-t border-gray-100 dark:border-slate-700 pt-6">
                        {['profile', 'followers', 'friends', 'gallery'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`text-sm font-bold uppercase tracking-widest pb-2 transition-all relative ${activeTab === tab ? 'text-blue-600' : 'text-gray-400 hover:text-slate-600 dark:hover:text-slate-200'
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></div>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. Tab Content */}
            {activeTab === 'profile' ? (
                /* Profile Content Grid */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Introduction */}
                    <div className="lg:col-span-12 xl:col-span-4 space-y-8">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Introduction</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                                {formData.bio}
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <span className="w-10 h-10 flex items-center justify-center bg-blue-50 dark:bg-slate-700 text-blue-600 rounded-lg"><FaGraduationCap /></span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Education</p>
                                        <p className="text-sm text-slate-800 dark:text-white font-semibold truncate">{formData.education}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="w-10 h-10 flex items-center justify-center bg-indigo-50 dark:bg-slate-700 text-indigo-600 rounded-lg"><FaEnvelope /></span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Email</p>
                                        <p className="text-sm text-slate-800 dark:text-white font-semibold truncate">{formData.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="w-10 h-10 flex items-center justify-center bg-sky-50 dark:bg-slate-700 text-sky-600 rounded-lg"><FaLink /></span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Website</p>
                                        <p className="text-sm text-slate-800 dark:text-white font-semibold truncate">{formData.website}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="w-10 h-10 flex items-center justify-center bg-emerald-50 dark:bg-slate-700 text-emerald-600 rounded-lg"><FaMapMarkerAlt /></span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Location</p>
                                        <p className="text-sm text-slate-800 dark:text-white font-semibold truncate">{formData.location}</p>
                                    </div>
                                </div>
                            </div>

                            {isOwner && (
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="w-full mt-8 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-blue-600 hover:text-white text-slate-800 dark:text-white rounded-xl font-bold transition-all disabled:opacity-50"
                                >
                                    {saving ? 'Saving...' : 'Update Introduction'}
                                </button>
                            )}
                        </div>

                        {isOwner && (
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Quick Settings</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Display Name</label>
                                        <input
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                                        />
                                    </div>
                                    <button
                                        onClick={handleSave}
                                        className="text-xs text-blue-600 font-bold underline"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Feed */}
                    <div className="lg:col-span-12 xl:col-span-8 space-y-8">
                        {isOwner && (
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 animate-fadeIn">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-50">
                                        <img src={formData.avatarUrl || 'https://i.pravatar.cc/150'} alt="User" />
                                    </div>
                                    <input
                                        type="text"
                                        name="title"
                                        value={postFormData.title}
                                        onChange={handlePostChange}
                                        placeholder="Give your post a title..."
                                        className="flex-1 bg-slate-50 dark:bg-slate-900 border-none rounded-full px-5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none font-bold"
                                    />
                                </div>
                                <textarea
                                    name="content"
                                    value={postFormData.content}
                                    onChange={handlePostChange}
                                    placeholder="What's on your mind? (Optional)"
                                    className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none min-h-[120px] resize-none mb-4"
                                ></textarea>

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors text-xs font-bold bg-slate-50 dark:bg-slate-900/50 px-4 py-2 rounded-full">
                                            <FaRegImage className="text-lg" /> Media
                                        </button>
                                        <button className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors text-xs font-bold bg-slate-50 dark:bg-slate-900/50 px-4 py-2 rounded-full">
                                            <FaRegNewspaper className="text-lg" /> Article
                                        </button>
                                        <select
                                            name="community"
                                            value={postFormData.community}
                                            onChange={handlePostChange}
                                            className="bg-slate-50 dark:bg-slate-900/50 border-none rounded-full px-4 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="s/medical">s/medical</option>
                                            <option value="s/health">s/health</option>
                                            <option value="s/figma">s/figma</option>
                                        </select>
                                    </div>
                                    <button
                                        onClick={handlePostSubmit}
                                        disabled={postSaving || !postFormData.title.trim()}
                                        className="w-full md:w-auto px-10 py-2.5 bg-blue-600 text-white rounded-full font-bold shadow-md hover:bg-blue-700 transition-all disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        {postSaving ? 'Posting...' : 'Post'}
                                        {!postSaving && <FaPlusCircle />}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Social Feed List */}
                        <div className="space-y-6">
                            {posts.map(post => (
                                <PostCard key={post.$id} post={post} />
                            ))}
                            {posts.length === 0 && (
                                <div className="p-20 text-center bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-gray-200 dark:border-slate-700">
                                    <p className="text-gray-400 font-medium italic">No posts yet. Start the conversation!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                /* Followers / Friends Table View */
                <UserListTable
                    users={allUsers}
                    title={activeTab}
                />
            )}
        </div>
    );
};

export default BasicProfile;
