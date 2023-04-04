const bcrypt = require("bcrypt");

//cryptage du mot de passe
const cryptage = async (password, saltRounds = 10) => {
  data = password
  try {
    if (data.length<32){
      data = data.padEnd(32, "~!")
    }
    if(data.length>32){
      data = data.slice(0, 32)
    }
    data = data.normalize('NFC')
    const crypte = await bcrypt.hash(data, saltRounds);
    return crypte;
  } catch (error) {
    throw error;
  }
}

//vérifier le mot de passe avec le hash en bd
const verifyHashedData = async (entered_pass, hashed) => {
  unhashed = entered_pass
  try {
    if (unhashed.length<32){
      unhashed = unhashed.padEnd(32, "~!")
    }
    if(unhashed.length>32){
      unhashed = unhashed.slice(0, 32)
    }
    unhashed = unhashed.normalize('NFC')
    const val = await bcrypt.compare(unhashed, hashed);
    return val;
  } catch (error) {
    throw error;
  }
}

module.exports = { cryptage, verifyHashedData };
