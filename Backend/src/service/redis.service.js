
import { connectRedis } from "~/utils/helper.js"
const acquireLock = async (productId, quantity, cartId) => {
  const key = `key2024${productId}`
  const expireTime = 3000 + Math.random() * 1000 // set <> 3000 random time 
  const retryTime = 10
  for (let i = 0; i < retryTime; i++) {
    const result = await redisClient.setNX(key, `${expireTime}`)
    if (result) {
      // update quantity in product inventory
      const reservationUpdate = await inventoryRepo.reservationInventory({ productId, quantity, cartId })
      if (reservationUpdate.modifiedCount) {
        await redisClient.pExpire(key, expireTime)
        return key
      }
      return null

    } else {
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
  }
}
const setKey = async (name, id, value, ttl) => {
  const redisClient = await connectRedis()
  const keyName = name + id

  const result = await redisClient.set(keyName, value, {
    EX: ttl, // expire trong 30 s,
    NX: true
  })
  await redisClient.disconnect();
  return result
}
const getKey = async (keyName) => {
  const redisClient = await connectRedis()
  const result = await redisClient.get(keyName)

  await redisClient.disconnect();
  return result
}
const releaseLock = async (keylock) => {
  const redisClient = await connectRedis()
  // const delKey = promisify(redisClient.del).bind(redisClient)
  const result = await redisClient.del(keylock)
  console.log("da xoa cache")
  await redisClient.disconnect();
  return result
}
const incrRateLimit = async (key) => {
  const redisClient = await connectRedis()
  const result = await redisClient.incr(key)
  await redisClient.disconnect();
  return result
}
const expireLock = async (key, ttl) => {
  const redisClient = await connectRedis()
  const result = await redisClient.expire(key, ttl)
  await redisClient.disconnect();
  return result
}
const scanKey = async (cursor, pattern) => {
  const redisClient = await connectRedis()
  const result = await redisClient.scan(cursor, 'MATCH', pattern)
  await redisClient.disconnect();
  return result
}
const createHash = async (hashKey, hashData) => {
  const redisClient = await connectRedis(); // Kết nối Redis

  // Lưu dữ liệu vào Redis dưới dạng hash
  const result = await redisClient.hSet(hashKey, Object.entries(hashData).flat());
  await redisClient.expire(hashKey, 60 * 60);
  await redisClient.disconnect();
  return result; // Trả về kết quả của việc lưu trữ
};
const incryHash = async (hashKey, hashDataCount) => {
  const redisClient = await connectRedis(); // Kết nối Redis

  // Lưu dữ liệu vào Redis dưới dạng hash
  const result = await redisClient.hIncrBy(hashKey, "cart_quantity_pages", hashDataCount);
  await redisClient.disconnect();
  return result; // Trả về kết quả của việc lưu trữ
};
const getHash = async (hashKey, field) => {
  const redisClient = await connectRedis(); // Kết nối Redis

  // Lưu dữ liệu vào Redis dưới dạng hash
  // const result = await redisClient.hGetAll(hashKey);
  const result = await redisClient.hGet(hashKey, field);
  await redisClient.disconnect();
  return result; // Trả về kết quả của việc lưu trữ
};
export const redisService = {
  acquireLock,
  releaseLock,
  incrRateLimit,
  expireLock,
  setKey, getKey,
  scanKey,
  createHash,
  incryHash,
  getHash
}