// The interval for fetching the exchange rates
// no less than 5 seconds
export const INTERVAL_FOR_FETCHING_RATES_SEC = 5

// For avoiding overflow, a mixmum amount of fetched data is in place
// to restrict the memory usage
export const MAX_CACHED_RATES = 50