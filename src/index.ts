import "reflect-metadata"
import app from "./app"
import { AppDataSource } from "./db"

async function main(){
    try {
    AppDataSource.initialize()
    
    app.listen(3001)
    console.log('server is listening on port', 3001)
    } catch (error) {
        console.error(error)
    }
    
}

main();