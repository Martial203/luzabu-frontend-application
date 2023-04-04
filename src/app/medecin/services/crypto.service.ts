import { Injectable } from '@angular/core';
declare function cryptage(password: string, saltRounds: number): any;
declare function verifyHashedData(entered_pass: string, hashed: string): any;
declare function encrypt_key(userPassword: string): any;
declare function decrypt_key(cipherText: string, userPassword: string, userHash: string): any;
declare function encrypt_data(data: string, autoKeyHash: string, userpassword: string, userhash: string): any;
declare function decrypt_data(cipherText: string, storedSecretKey: string, userPassword: string, userHash: string): any;

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  constructor(){
    cryptage("azerafeaf225f5eafe5a2", 10);
  }

  cryptageTs(password: string, saltRounds: number): any{
    return cryptage(password, saltRounds);
  }

  verifyHashedDataTs(entered_pass: string, hashed: string): any{
    return verifyHashedData(entered_pass, hashed);
  }

  encrypt_keyTs(userPassword: string): any{
    return encrypt_key(userPassword);
  }

  decrypt_keyTs(cipherText: string, userPassword: string, userHash: string): any{
    decrypt_key(cipherText, userPassword, userHash);
  }

  encrypt_dataTs(data: string, autoKeyHash: string, userpassword: string, userhash: string): any{
    encrypt_data(data, autoKeyHash, userpassword, userhash);
  }

  decrypt_dataTs(cipherText: string, storedSecretKey: string, userPassword: string, userHash: string): any{
    decrypt_data(cipherText, storedSecretKey, userPassword, userHash);
  }

}
