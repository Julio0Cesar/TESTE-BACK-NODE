import { registrarNovaNotaFiscal, listarNotaFiscalPorCliente, detalharNotaFiscalPorId } from "../../../modules/nota-fiscal/nota-fiscal.service"
import { validarClienteNaoEncontrado } from "../../../modules/cliente/cliente.service"
import { validarProdutoNaoEncontrado } from "../../../modules/produto/produto.service"
import { calcularNotaFiscal } from "../../../shared/utils/calcular-nota-fiscal"
import { gerarXmlNotaFiscal } from "../../../shared/utils/gerar-xml"
import { salvarNotaFiscal, buscarNotasFiscaisPorCliente, buscarNotasFiscaisPorId } from "../../../modules/nota-fiscal/nota-fiscal.repository"
import { HttpError } from "../../../core/error/HttpError"

jest.mock("../cliente/cliente.service")
jest.mock("../produto/produto.service")
jest.mock("../../shared/utils/calcular-nota-fiscal")
jest.mock("../../shared/utils/gerar-xml")
jest.mock("./nota-fiscal.repository")

describe("notaFiscal.service", () => {
  const clienteFake = { id: "c1", nome: "Cliente 1" }
  const produtoFake = { id: "p1", nome: "Produto 1", preco: 100 }
  const produtosNotaFake = [produtoFake]
  const resultadoCalculoFake = {
    valorTotal: 100,
    icmsTotal: 10,
    ipiTotal: 5,
    itens: [{ productId: "p1", quantidade: 1, precoUnitario: 100 }]
  }
  const notaFiscalSalvaFake = {
    id: "nf1",
    cliente: clienteFake,
    ...resultadoCalculoFake,
    xml: "<xml>...</xml>"
  }
const dataFake = {
  clientId: "c1",
  products: [{ productId: "p1", quantity: 1 }] 
}

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("deve registrar nova nota fiscal corretamente", async () => {
    (validarClienteNaoEncontrado as jest.Mock).mockResolvedValue(clienteFake)
    (validarProdutoNaoEncontrado as jest.Mock).mockResolvedValue(produtoFake)
    (calcularNotaFiscal as jest.Mock).mockReturnValue(resultadoCalculoFake)
    (gerarXmlNotaFiscal as jest.Mock).mockReturnValue("<xml>...</xml>")
    (salvarNotaFiscal as jest.Mock).mockResolvedValue(notaFiscalSalvaFake)

    const resultado = await registrarNovaNotaFiscal(dataFake)

    expect(validarClienteNaoEncontrado).toHaveBeenCalledWith(dataFake.clientId)
    expect(validarProdutoNaoEncontrado).toHaveBeenCalledWith("p1")
    expect(calcularNotaFiscal).toHaveBeenCalledWith(produtosNotaFake, dataFake.products)
    expect(gerarXmlNotaFiscal).toHaveBeenCalled()
    expect(salvarNotaFiscal).toHaveBeenCalledWith(expect.objectContaining({
      cliente: clienteFake,
      valorTotal: resultadoCalculoFake.valorTotal,
      xml: "<xml>...</xml>"
    }))
    expect(resultado).toBe(notaFiscalSalvaFake)
  })

  it("listarNotaFiscalPorCliente deve lançar HttpError se não encontrar", async () => {
    (buscarNotasFiscaisPorCliente as jest.Mock).mockResolvedValue([])

    await expect(listarNotaFiscalPorCliente("qualquerId")).rejects.toThrow(HttpError)
    await expect(listarNotaFiscalPorCliente("qualquerId")).rejects.toThrow("Nota fiscal não encontrada")
  })

  it("detalharNotaFiscalPorId deve lançar HttpError se não encontrar", async () => {
    (buscarNotasFiscaisPorId as jest.Mock).mockResolvedValue(null)

    await expect(detalharNotaFiscalPorId("idNF", "idCliente")).rejects.toThrow(HttpError)
    await expect(detalharNotaFiscalPorId("idNF", "idCliente")).rejects.toThrow("Nota fiscal não encontrada")
  })
})
