import { Cliente } from "../../../core/entities/Cliente"

export function mapClienteToOutput(cliente: Cliente) {
  const { senha, ...rest } = cliente
  return rest
}