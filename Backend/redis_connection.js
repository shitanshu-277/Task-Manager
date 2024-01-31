const redis = require("redis");
const RedisStore = require("connect-redis").default;
const redisClient = redis.createClient();

redisClient.connect().catch(console.error);

redisClient.on("ready", () => { 
     	console.log("Connected!"); 
     }); 
let redisStore = new RedisStore({
    client: redisClient,
});

module.exports={redisStore,redisClient};