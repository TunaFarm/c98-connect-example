export const MINUTE_TO_SECOND = 60
export const SECOND_TO_MS = 1000

export const getUnixTs = (): number => {
  return new Date().getTime() / 1000
}

export const getTs = (): number => {
  return new Date().getTime()
}

export const sleep = async (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
