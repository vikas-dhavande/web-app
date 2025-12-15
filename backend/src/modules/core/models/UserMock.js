const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_FILE = path.join(__dirname, '../../../../data/users.json');

// Ensure data directory exists
const dataDir = path.dirname(DB_FILE);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Simple ID Generator
const generateId = () => Math.random().toString(36).substr(2, 9);

class UserMock {
    constructor(data) {
        this._id = data._id || generateId();
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.role = data.role || 'User';
        this.createdAt = data.createdAt || new Date();
    }

    static _readDb() {
        if (!fs.existsSync(DB_FILE)) return [];
        const data = fs.readFileSync(DB_FILE, 'utf-8');
        return data ? JSON.parse(data) : [];
    }

    static _writeDb(users) {
        fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
    }

    static async findOne(query) {
        const users = this._readDb();
        const user = users.find(u => u.email === query.email);
        return user ? new UserMock(user) : null;
    }

    static async create(userData) {
        const users = this._readDb();

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const newUser = new UserMock({
            ...userData,
            password: hashedPassword
        });

        users.push(newUser);
        this._writeDb(users);
        return newUser;
    }

    static async findById(id) {
        const users = this._readDb();
        const user = users.find(u => u._id === id);
        return user ? new UserMock(user) : null;
    }

    static async findByIdAndUpdate(id, update) {
        let users = this._readDb();
        const index = users.findIndex(u => u._id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...update };
            this._writeDb(users);
            return new UserMock(users[index]);
        }
        return null;
    }

    async save() {
        let users = UserMock._readDb();
        const index = users.findIndex(u => u._id === this._id);
        if (index !== -1) {
            // Update existing
            // Convert instance back to plain object if needed, or just specific fields
            users[index] = { ...users[index], ...this };
            // Note: 'this' might have extra internal properties or methods, 
            // but JSON.stringify usually handles basic props found in constructor.
            // Better to be explicit but for mock this is okay.
        } else {
            users.push(this);
        }
        UserMock._writeDb(users);
        return this;
    }

    async matchPassword(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    }
}

module.exports = UserMock;
