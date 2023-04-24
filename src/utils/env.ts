export function isDevelopmentEnv(): boolean {
  return process.env.NODE_ENV === 'development'
}

export function isTestEnv(): boolean {
  return process.env.NODE_ENV === 'test'
}

export function isStagingEnv(): boolean {
  const boolStr = process.env.REACT_APP_STAGING
  if (boolStr) {
    return /true/i.test(boolStr)
  }
  return false
}

export function isProductionEnv(): boolean {
  return process.env.NODE_ENV === 'production' && !isStagingEnv()
}
