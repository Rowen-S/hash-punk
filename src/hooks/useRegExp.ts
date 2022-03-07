export default function useRegExp(value: string | undefined, regex: string | undefined) {
  if (regex && value) {
    const reg = new RegExp(regex)
    if (!reg.test(value) && value) {
      return false
    }
  }
  return true
}
