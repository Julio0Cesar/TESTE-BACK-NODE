import ncmData from "../data/ncm.json"

const validNcms = new Set(ncmData.map((code: string) => code.replace(/\./g, "")))

export function validarNCM(ncm: string): boolean {
  if (!/^\d{1,8}$/.test(ncm)) return false
  return validNcms.has(ncm)
}
