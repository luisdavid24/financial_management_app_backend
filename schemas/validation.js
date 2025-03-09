class Validation {
  static username(userName) {
    if (typeof userName !== 'string') throw new Error('Username must be a string');
    if (userName.length < 3) throw new Error('Username must be at least 3 characters long');
  }

  static password(password) {
    if (typeof password !== 'string') throw new Error('Password must be a string');
    if (password.length < 6) throw new Error('Password must be at least 6 characters long');
  }

  static name(name) {
    if (typeof name !== 'string') throw new Error('Name must be a string');
    if (name.length < 3) throw new Error('Name must be at least 3 characters long');
  }
}


module.exports = Validation;
