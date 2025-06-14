export interface NotaFiscalProdutoDTO {
  productId: string
  quantity: number
}

export interface NotaFiscalDTO {
  clientId: string
  products: NotaFiscalProdutoDTO[]
}
