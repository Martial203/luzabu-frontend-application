import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  encrypt_key(userpassword: string){
    const iv = crypto.randomBytes(16);
    const key = crypto.randomBytes(32).toString('hex');
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(userpassword, 'utf-8').subarray(0,32), iv);
    // added subarray() for strings with accents whereby the corresponding bufferArray were >32bytes
    let encrypted = cipher.update(key);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex') };
}

  async decrypt_key(ciphertext: string, userpassword: string, userhash: string){
    const temp = await this.verifyHashedData(userpassword, userhash);
    if(temp===true){
        let iv = Buffer.from(ciphertext.iv, 'hex');
        let encryptedText = Buffer.from(ciphertext.encryptedData, 'hex');

        let decipher = crypto.createDecipheriv(algorithm, Buffer.from(userpassword, 'utf-8').subarray(0,32), iv);

        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    }
    else return false;
}

encrypt_data(data: string, autokeyhash: string, userpassword: string, userhash: string){
    const temp = await verifyHashedData(userpassword, userhash);
    if(temp===true){
        const key = decrypt_key(autokeyhash, userpassword)
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
        key = decrypt_key(stored_secretekey, userpassword)
        let iv = Buffer.from(ciphertext.iv, 'hex');
        let encryptedText = Buffer.from(ciphertext.encryptedData, 'hex');

        let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);

        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    }
    else return false;
}

  async cryptage(data: string, saltRounds: number = 10){
  try {
    if (data.length<32){
      data = data.padStart(32, "~!")
    }
    if(data.length>32){
      data = data.slice(0, 32)
    }
    data = data.normalize('NFC')
    const crypté = await bcrypt.hash(data, saltRounds);
    return crypté;
  } catch (error) {
    throw error;
  }
}

//vérifier le mot de passe avec le hash en bd
  async verifyHashedData(unhashed: string, hashed: string){
  try {
    if (unhashed.length<32){
      unhashed = unhashed.padStart(32, "~!")
    }
    if(unhashed.length>32){
      unhashed = unhashed.slice(0, 32)
    }
    unhashed = unhashed.normalize('NFC')
    const match = await bcrypt.compare(unhashed, hashed);
    return match;
  } catch (error) {
    throw error;
  }
}

}
