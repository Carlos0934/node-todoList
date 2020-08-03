import dotenv from 'dotenv'



function main() {
    dotenv.config()
    console.log(process.env.PORT)
}

main()