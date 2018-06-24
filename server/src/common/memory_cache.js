let cachedData = new Map();

class MemoryCache {
  static initialize() {
    _clearCache();
  }

  static async getCachedData(moduleName, promiseFn) {
    const cache = cachedData.has(moduleName) ? cachedData.get(moduleName) : await promiseFn();
    cachedData.set(moduleName, cache);
    return cachedData.get(moduleName);
  }
}

const _clearCache = () => {
  const { MEMORY_CACHE_HOURS = 3 } = process.env;
  setInterval(() => {
    cachedData = new Map();
  }, MEMORY_CACHE_HOURS * 3600000);
};

module.exports = MemoryCache;
