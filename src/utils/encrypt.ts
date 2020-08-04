import { OneWayEncrypter } from "../interfaces/utils";
import {hashSync , compareSync} from 'bcrypt'

export class PasswordEncrypt implements OneWayEncrypter {
    
    
    encrypt(pass : string) : string {
    
        return hashSync(pass , 10)
    }

    isValid( pass : string ,encryptPass : string , ) : boolean {

        return compareSync(pass , encryptPass)
    }
}