import React, { useState, useEffect } from 'react';
import authService from '../services/auth.service';

/**
 * Appwrite Authentication Examples Component
 * Demonstrates user signup, login, logout, and user data retrieval
 */
const AppwriteAuthDemo = () => {
    const [user, setUser] = useState(null);
    const [userPrefs, setUserPrefs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    // Check if user is logged in on component mount
    useEffect(() => {
        checkCurrentUser();
    }, []);

    /**
     * Check current user and load preferences
     */
    const checkCurrentUser = async () => {
        try {
            setLoading(true);
            const currentUser = await authService.getCurrentUser();

            if (currentUser) {
                setUser(currentUser);
                const prefs = await authService.getUserPreferences();
                setUserPrefs(prefs);
            }
        } catch (err) {
            console.error('Error checking user:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handle User Signup
     */
    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        const formData = new FormData(e.target);

        try {
            setLoading(true);
            await authService.signup({
                email: formData.get('email'),
                password: formData.get('password'),
                name: formData.get('name'),
                role: formData.get('role') || 'patient',
            });

            setMessage('✅ Signup successful! You are now logged in.');
            await checkCurrentUser();
            e.target.reset();
        } catch (err) {
            setError(`❌ Signup failed: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handle User Login
     */
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        const formData = new FormData(e.target);

        try {
            setLoading(true);
            await authService.login({
                email: formData.get('email'),
                password: formData.get('password'),
            });

            setMessage('✅ Login successful!');
            await checkCurrentUser();
            e.target.reset();
        } catch (err) {
            setError(`❌ Login failed: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handle User Logout
     */
    const handleLogout = async () => {
        try {
            setLoading(true);
            await authService.logout();
            setUser(null);
            setUserPrefs(null);
            setMessage('✅ Logged out successfully!');
        } catch (err) {
            setError(`❌ Logout failed: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Send Email Verification
     */
    const handleSendVerification = async () => {
        try {
            setLoading(true);
            await authService.sendEmailVerification();
            setMessage('✅ Verification email sent! Please check your inbox.');
        } catch (err) {
            setError(`❌ Failed to send verification: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Send Password Recovery Email
     */
    const handlePasswordRecovery = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            setLoading(true);
            await authService.sendPasswordRecovery(formData.get('recoveryEmail'));
            setMessage('✅ Password recovery email sent! Please check your inbox.');
            e.target.reset();
        } catch (err) {
            setError(`❌ Failed to send recovery email: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Loading state
    if (loading && !user && !error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-2">🔐 Appwrite Authentication Demo</h1>
            <p className="text-gray-600 mb-8">
                Complete examples of user authentication using Appwrite
            </p>

            {/* Messages */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                </div>
            )}
            {message && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                    {message}
                </div>
            )}

            {/* Current User Display */}
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    👤 Current User
                </h2>
                {user ? (
                    <div className="space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Name</p>
                                <p className="font-semibold">{user.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Email</p>
                                <p className="font-semibold">{user.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">User ID</p>
                                <p className="font-mono text-sm">{user.$id}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Email Verified</p>
                                <p className="font-semibold">
                                    {user.emailVerification ? (
                                        <span className="text-green-600">✓ Verified</span>
                                    ) : (
                                        <span className="text-orange-600">✗ Not Verified</span>
                                    )}
                                </p>
                            </div>
                            {userPrefs?.role && (
                                <div>
                                    <p className="text-sm text-gray-600">Role</p>
                                    <p className="font-semibold capitalize">{userPrefs.role}</p>
                                </div>
                            )}
                            <div>
                                <p className="text-sm text-gray-600">Account Created</p>
                                <p className="font-semibold">
                                    {new Date(user.$createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={handleLogout}
                                disabled={loading}
                                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:bg-gray-400"
                            >
                                Logout
                            </button>
                            {!user.emailVerification && (
                                <button
                                    onClick={handleSendVerification}
                                    disabled={loading}
                                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                                >
                                    Verify Email
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-600">Not logged in. Please sign up or log in below.</p>
                )}
            </div>

            {/* Authentication Forms - Only show when not logged in */}
            {!user && (
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Signup Form */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                            📝 Sign Up
                        </h2>
                        <form onSubmit={handleSignup} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password * (min 8 characters)
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    required
                                    minLength="8"
                                    pattern=".{8,}"
                                    title="Password must be at least 8 characters"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Role *
                                </label>
                                <select
                                    name="role"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="patient">Patient</option>
                                    <option value="doctor">Doctor</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all disabled:bg-gray-400"
                            >
                                {loading ? 'Signing up...' : 'Sign Up'}
                            </button>
                        </form>
                    </div>

                    {/* Login Form */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                            🔓 Login
                        </h2>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password *
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all disabled:bg-gray-400"
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>

                        {/* Password Recovery */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-semibold mb-3">Forgot Password?</h3>
                            <form onSubmit={handlePasswordRecovery} className="space-y-3">
                                <input
                                    type="email"
                                    name="recoveryEmail"
                                    placeholder="Enter your email"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400"
                                >
                                    Send Recovery Email
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Usage Instructions */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h2 className="text-2xl font-semibold mb-4">📚 Usage Instructions</h2>
                <div className="space-y-4 text-gray-700">
                    <div>
                        <h3 className="font-semibold text-lg mb-2">1. Import the Auth Service</h3>
                        <code className="block bg-gray-800 text-green-400 p-3 rounded font-mono text-sm">
                            import authService from '../services/auth.service';
                        </code>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">2. Use in Your Components</h3>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li><code className="bg-gray-200 px-2 py-1 rounded">authService.signup()</code> - Register new user</li>
                            <li><code className="bg-gray-200 px-2 py-1 rounded">authService.login()</code> - Login existing user</li>
                            <li><code className="bg-gray-200 px-2 py-1 rounded">authService.getCurrentUser()</code> - Get logged in user</li>
                            <li><code className="bg-gray-200 px-2 py-1 rounded">authService.logout()</code> - Logout user</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">3. Configure Appwrite Console</h3>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Add <code className="bg-gray-200 px-2 py-1 rounded">http://localhost:5173</code> to Platforms</li>
                            <li>Enable email/password authentication</li>
                            <li>Configure email templates (optional)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppwriteAuthDemo;
