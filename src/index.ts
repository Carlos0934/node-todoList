import dotenv from 'dotenv'
import { APPServer } from './server'



function main() {
    dotenv.config()
    const app = new APPServer({
        port : process.env.PORT || 3000,
        apps : [],
        middlewares : [],
    })

    app.run()
}

main()