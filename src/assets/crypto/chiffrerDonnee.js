const crypto = require('crypto');
const { verifyHashedData } = require("../services/cryptage");

const algorithm = 'aes-256-cbc';
 
// pad user password to 32chars before entering in bd
// e.g passwd = "123"; passwd.padEnd(32, "_é-_è&éè")
// inputText.normalize('NFC');


// const generatePassword = (
//     length = 32,
//     wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
//   ) => { return Array.from(crypto.randomFillSync(new Uint32Array(length)))
//     .map((x) => wishlist[x % wishlist.length])
//     .join('') }


/**
 * 
 * @param {*} userpassword : String
 * @returns Object
 */
const encrypt_key = (userpassword) => {
    entered_pass = userpassword
    if (entered_pass.length<32){
    entered_pass = entered_pass.padEnd(32, "~!")
    }
    if(entered_pass.length>32){
    entered_pass = entered_pass.slice(0, 32)
    }
    entered_pass = entered_pass.normalize('NFC');

    const iv = crypto.randomBytes(16);
    const key = crypto.randomBytes(32).toString('hex');
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(entered_pass, 'utf-8').subarray(0,32), iv); 
    // added subarray() for strings with accents whereby the corresponding bufferArray were >32bytes
    let encrypted = cipher.update(key);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex') };
}

const decrypt_key = async (ciphertext, userpassword, userhash) => {
    temp = await verifyHashedData(userpassword, userhash);
    if(temp===true){
        entered_pass = userpassword
        if (entered_pass.length<32){
        entered_pass = entered_pass.padEnd(32, "~!")
        }
        if(entered_pass.length>32){
        entered_pass = entered_pass.slice(0, 32)
        }
        entered_pass = entered_pass.normalize('NFC');

        let iv = Buffer.from(ciphertext.iv, 'hex');
        let encryptedText = Buffer.from(ciphertext.encryptedData, 'hex');
    
        let decipher = crypto.createDecipheriv(algorithm, Buffer.from(entered_pass, 'utf-8').subarray(0,32), iv);
    
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
    
        return decrypted.toString();
    }
    else return false;
}

const encrypt_data = async (data, autokeyhash, userpassword, userhash) => {
    temp = await verifyHashedData(userpassword, userhash);
    if(temp===true){
        entered_pass = userpassword
        if (entered_pass.length<32){
        entered_pass = entered_pass.padEnd(32, "~!")
        }
        if(entered_pass.length>32){
        entered_pass = entered_pass.slice(0, 32)
        }
        entered_pass = entered_pass.normalize('NFC');

        key = await decrypt_key(autokeyhash, entered_pass, userhash)
        const iv = crypto.randomBytes(16);
        let cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
        let encrypted = cipher.update(data);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return { iv: iv.toString('hex'),
        encryptedData: encrypted.toString('hex') };
    }
    else return false;
}


const decrypt_data = async(ciphertext, stored_secretekey, userpassword, userhash) => {
    
    temp = await verifyHashedData(userpassword, userhash);
    if (temp===true){
        entered_pass = userpassword
        if (entered_pass.length<32){
        entered_pass = entered_pass.padEnd(32, "~!")
        }
        if(entered_pass.length>32){
        entered_pass = entered_pass.slice(0, 32)
        }
        entered_pass = entered_pass.normalize('NFC');

        key = await decrypt_key(stored_secretekey, userpassword, userhash)
        let iv = Buffer.from(ciphertext.iv, 'hex');
        let encryptedText = Buffer.from(ciphertext.encryptedData, 'hex');
    
        let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);password
    
        return decrypted.toString();
    }
    else return false;
}

module.exports = { encrypt_data, decrypt_data, encrypt_key, decrypt_key };

/*
 * Example of Use Case :
 * userpass =  "12345678", test_data = "paludisme"
 * NB : This functions only deal with Strings to encrypt other data types(numeric,dates, etc),
 *      first cast them to String
 * 1) Store userhash = cryptage(userpass) in db
 * 2) Store encryptedkey = encrypt_key(userpass) in db
 * 3) To decrypt key: decryptedkey = await decrypt_key(encryptedkey, userpass, userhash)
 * 4) To encrypt test_data: encrypted_test_data = await encrypt_data(test_data, decryptedkey, userpass, userhash)
 * 5) Store encrypted_test_data in db
 * 6) To decrypt test_data: decrypted_test_data = await decrypt_data(encrypted_test_data, encryptedkey, userpass, userhash)
 */