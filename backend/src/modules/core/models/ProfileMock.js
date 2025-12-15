// In-memory storage for profiles
let profiles = [];

class ProfileMock {
    constructor(data) {
        this._id = data._id || `profile_${Date.now()}`;
        this.user = data.user;
        this.fullName = data.fullName;
        this.phoneNumber = data.phoneNumber;
        this.photoUrl = data.photoUrl;
        this.address = data.address;
        this.completionStatus = data.completionStatus || 0;
    }

    static async findOne(query) {
        return profiles.find(p => p.user === query.user);
    }

    static async create(data) {
        const profile = new ProfileMock(data);
        profiles.push(profile);
        return profile;
    }

    async save() {
        const index = profiles.findIndex(p => p._id === this._id);
        if (index !== -1) {
            profiles[index] = this;
        } else {
            profiles.push(this);
        }
        return this;
    }
}

module.exports = ProfileMock;
