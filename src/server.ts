import express ,{Application} from 'express'
import { APPRouter, APPServerProps } from './interfaces/server'

export class APPServer {
    
    private app :  Application
    
    constructor(private config : APPServerProps) {
        
        this.app = express()
    
        
    }

    setup() {
        
        this.config.apps.forEach(router => router.setup(this.app))
    }
    run() {
        this.app.listen(this.config.port)
    }
}