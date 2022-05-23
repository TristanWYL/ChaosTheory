// The interval for fetching the exchange rates
// no less than 5 seconds
// For easily observing the UI update due to data fetching,
// this number could be set smaller
export const INTERVAL_FOR_FETCHING_RATES_SEC = 60

// For avoiding overflow, a mixmum amount of fetched data is in place
// to restrict the memory usage
export const MAX_CACHED_RATES = 50
