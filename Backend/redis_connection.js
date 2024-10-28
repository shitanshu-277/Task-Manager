const redis = require("redis");
require('dotenv').config();
const RedisStore = require("connect-redis").default;
const redisClient = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

redisClient.connect().catch(console.error);

redisClient.on("ready", () => { 
     	console.log("Connected!"); 
     }); 
let redisStore = new RedisStore({
    client: redisClient,
});

module.exports={redisStore,redisClient};