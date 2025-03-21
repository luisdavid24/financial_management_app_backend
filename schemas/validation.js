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
  static amount(amount) {
    if (typeof amount !== 'Number') throw new Error('Amount must be a Number');
  }

  static id(id){
    if (typeof id !== 'string') throw new Error('Id must be a string');
  }
  static boolean(element){
    if(typeof element !== "boolean") throw new Error(element+' must be a boolean');
  }

}


module.exports = Validation;
