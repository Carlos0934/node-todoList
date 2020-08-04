import express ,{Application} from 'express'
import { APPRouter, APPServerProps } from './interfaces/server'

export class APPServer {
    
    private app :  Application
    
    constructor(private config : APPServerProps) {
        
        this.app = express()

    }

    setup() {
        this.config.middlewares.forEach(middleware => this.app.use(middleware.path || '' , middleware.handler))
        this.config.apps.forEach(router => router.setup(this.app))
    }
    run() {
        this.setup()
        this.app.listen(this.config.port)
    }
}