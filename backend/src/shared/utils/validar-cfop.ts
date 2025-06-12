import cfopData from "../data/cfop.json"

const validCfops = new Set(cfopData.map((item: { codigo: number }) => item.codigo.toString()))

export function validarCFOP(cfop: string): boolean {
  if (!/^\d{4}$/.test(cfop)) return false
  return validCfops.has(cfop)
}
