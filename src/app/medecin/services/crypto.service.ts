import { Injectable } from '@angular/core';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  algorithm: string = 'aes-256-cbc';

  constructor() { }

  encrypt_key(userpassword: string){
    const iv = crypto.randomBytes(16);
    const key = crypto.randomBytes(32).toString('hex');
    let cipher = crypto.createCipheriv(this.algorithm, Buffer.from(userpassword, 'utf-8').subarray(0,32), iv);
    // added subarray() for strings with accents whereby the corresponding bufferArray were >32bytes
    let encrypted = cipher.update(key);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex') };
}

  async decrypt_key(ciphertext: any, userpassword: string, userhash: string){
    const temp = await this.verifyHashedData(userpassword, userhash);
    if(temp===true){
        let iv = Buffer.from(ciphertext.iv, 'hex');
        let encryptedText = Buffer.from(ciphertext.encryptedData, 'hex');

        let decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(userpassword, 'utf-8').subarray(0,32), iv);

        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    }
    else return false;
}

  async encrypt_data(data: string, autokeyhash: string, userpassword: string, userhash: string){
    const temp = await this.verifyHashedData(userpassword, userhash);
    if(temp===true){
        const key = this.decrypt_key(autokeyhash, userpassword, userhash)
        const iv = crypto.randomBytes(16);
        let cipher = crypto.createCipheriv(this.algorithm, Buffer.from(key, 'hex'), iv);
        let encrypted = cipher.update(data);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return { iv: iv.toString('hex'),
        encryptedData: encrypted.toString('hex') };
    }
    else return false;

}


  async decrypt_data(ciphertext: any, stored_secretekey: string, userpassword: string, userhash: string){

    const temp = await this.verifyHashedData(userpassword, userhash);
    if (temp===true){
        const key = this.decrypt_key(stored_secretekey, userpassword, userhash);
        let iv = Buffer.from(ciphertext.iv, 'hex');
        let encryptedText = Buffer.from(ciphertext.encryptedData, 'hex');

        let decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(key, 'hex'), iv);

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
    }catch (error) {
      throw error;
    }
  }

}
