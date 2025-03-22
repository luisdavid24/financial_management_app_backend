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
  static description(Description) {
    if (typeof Description !== 'string') throw new Error('Description must be a string');
  }
  static amount(amount) {
    if (!isNumber(amount)) throw new Error('Amount must be a Number');
  }

  static id(id){
    if (!esUUID(id)) throw new Error('Id must be a UUID');
  }
  static boolean(element){
    if(typeof element !== "boolean") throw new Error(element+' must be a boolean');
  }

}
function esUUID(uuid) {
  if (typeof uuid !== "string") return false;

  const partes = uuid.split("-");

  if (partes.length !== 5) return false;
  const [p1, p2, p3, p4, p5] = partes;

  if (
      p1.length !== 8 || p2.length !== 4 || p3.length !== 4 ||
      p4.length !== 4 || p5.length !== 12
  ) {
      return false;
  }

  const esHexadecimal = (str) => [...str].every(char =>
      (char >= "0" && char <= "9") || (char >= "a" && char <= "f") || (char >= "A" && char <= "F")
  );

  return (
      esHexadecimal(p1) &&
      esHexadecimal(p2) &&
      esHexadecimal(p3) &&
      esHexadecimal(p4) &&
      esHexadecimal(p5)
  );
}
function isNumber(valor) {
  return typeof valor === "number" && Number.isFinite(valor);
}



module.exports = Validation;
