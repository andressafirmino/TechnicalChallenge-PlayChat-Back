import { createClient } from "redis";

const redis = createClient({
    url: process.env.REDIS_URL
});

(async () => {
    console.log("Connecting redis...")
    await redis.connect()
})()

export default redis;

