import {PasswordEncrypt} from '../utils/encrypt'

describe(' Test PasswordEncrypter ' , () => {

    const encrypter = new PasswordEncrypt()
   
    test('Test pass is encrypt and valid', ()=>{
        const pass = '123456'
        expect(encrypter.encrypt(pass)).not.toBe(pass)
        expect(encrypter.encrypt(pass).length).toBeGreaterThan(20)
        expect(encrypter.isValid( pass , encrypter.encrypt(pass))).toBe(true)
        expect(encrypter.isValid( pass + 'dt' , encrypter.encrypt(pass))).toBe(false)

    })
    
})