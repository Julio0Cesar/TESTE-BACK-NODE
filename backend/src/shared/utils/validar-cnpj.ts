import { cnpj } from 'cpf-cnpj-validator'

export function validarCNPJ(value: string): boolean {
  if (!/^\d{14}$/.test(value)) return false
  return cnpj.isValid(value)
}
