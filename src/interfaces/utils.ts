

export interface OneWayEncrypter {
    
    encrypt(data : string) : string
    isValid( data : string , encryptData : string) : boolean
}