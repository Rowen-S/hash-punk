export default function toFixeds(amount: string | undefined, bits = 4) {
  if (amount) {
    return Number(amount).toFixed(bits).slice(0, -1)
  }
  return 0
}
