export interface NotaFiscalProdutoDTO {
  produtoId: string
  quantidade: number
}

export interface NotaFiscalDTO {
  clienteId: string
  produtos: NotaFiscalProdutoDTO[]
}
