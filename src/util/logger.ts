import * as fs from "fs"

const logger = (color, ...args) => {
    let result;
    result = args.map(ele => JSON.stringify(ele)).join(" ")
    
    write(result)
}

const write = (message) => {
    fs.appendFileSync("logs/1019.txt", JSON.stringify(message)+ "\n")
}
export default logger 