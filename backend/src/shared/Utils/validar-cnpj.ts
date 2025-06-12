import { cnpj } from 'cpf-cnpj-validator'

export function validarCNPJ(value: string): boolean {
  return cnpj.isValid(value)
}
