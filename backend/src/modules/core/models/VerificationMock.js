// In-memory storage for verifications
let verifications = [];

class VerificationMock {
    constructor(data) {
        this._id = data._id || `verify_${Date.now()}`;
        this.user = data.user;
        this.role = data.role;
        this.status = data.status || 'submitted';
        this.data = data.data;
        this.documents = data.documents || [];
    }

    static async find(query) {
        return verifications.filter(v => v.user === query.user);
    }

    static async findOne(query) {
        return verifications.find(v => v.user === query.user && v.role === query.role);
    }

    async save() {
        const index = verifications.findIndex(v => v._id === this._id);
        if (index !== -1) {
            verifications[index] = this;
        } else {
            verifications.push(this);
        }
        return this;
    }
}

module.exports = VerificationMock;
