global.SALT_KEY = '9a1b3589-0084-46c3-a211-bf863ceaa7a7' 
 
var systemHour  = { 
    "hour": 00, 
    "minute": 00 
} 
 
module.exports = { 
    //link do heroku
    connectionDBHeroku: "mongodb://2vdb:wilker225414@ds131902.mlab.com:31902/2v-database",
    connectionDB: "mongodb://localhost:27017/2vdb", 
    sendGridKey: "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", 
    email: "2VService@email.com", 
    systemHour: systemHour 
} 