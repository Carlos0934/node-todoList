import {JWT} from '../utils/jwt'
import {User} from '../dtos/user'
import { JsonWebTokenError } from 'jsonwebtoken'
describe('Test JWT component' , () => {
    const testKey = 'test key'
    const user : User = {
        id : 1,
        email : '@gmail.com',
        username : 'test user',
        password : '0123456',
        

    }
    const jwt = new JWT<User>(testKey)
    test('JWT validate Token', ()=> {
        const jwt = new JWT<User>(testKey)
      
        expect(jwt.verify(jwt.sign(user)).email).toEqual(user.email )
       
        expect(jwt.verify(jwt.sign( Object.assign(user , {
            unexpectField : '2' 
        })))).not.toEqual(user)

        expect( jwt.sign(user).length).toBeGreaterThan(15)


    })

    test('Test validate token with different JWT' , () => {
      
        const diffJwt = new JWT('test key 2')
        expect(() => {
            jwt.verify(diffJwt.sign(user))
        }).toThrowError(JsonWebTokenError)

    })
})