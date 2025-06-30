const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// In-memory storage (replace with database in production)
let users = [];
let nextUserId = 1;

class User {
  constructor(data) {
    this.id = nextUserId++;
    this.email = data.email;
    this.username = data.username;
    this.password = data.password;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Hash password before saving
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  // Compare password
  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  // Generate JWT token
  generateToken() {
    return jwt.sign(
      { id: this.id, email: this.email, username: this.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
  }

  // Static methods
  static async create(userData) {
    const user = new User(userData);
    await user.hashPassword();
    users.push(user);
    return user;
  }

  static async findByEmail(email) {
    return users.find(user => user.email === email);
  }

  static async findById(id) {
    return users.find(user => user.id === parseInt(id));
  }

  static async updateById(id, updateData) {
    const userIndex = users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) return null;

    users[userIndex] = { ...users[userIndex], ...updateData, updatedAt: new Date() };
    return users[userIndex];
  }

  static async deleteById(id) {
    const userIndex = users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) return false;

    users.splice(userIndex, 1);
    return true;
  }

  static reset() {
    users = [];
    nextUserId = 1;
  }

  // Get user without password
  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

module.exports = { User }; 