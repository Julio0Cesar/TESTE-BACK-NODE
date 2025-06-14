import { HttpError } from "../../../core/error/HttpError"
import * as produtoService from "../../../modules/produto/produto.service"
import * as produtoRepo from "../../../modules/produto/produto.repository"
import { Produto } from "../../../core/entities/Produto"

jest.mock("./produto.repository")

describe("produto.service", () => {
  const produtoFake: Produto  = {
    id: "1",
    nome: "Produto Teste",
    cfop: "5102",
    ncm: "12345678",
    preco: 25.40,
    industrializado: true
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("registrarNovoProduto", () => {
    it("deve salvar o produto quando não existir duplicado", async () => {
      (produtoRepo.buscarProdutoPorCfopOuNcm as jest.Mock).mockResolvedValue(null)
      (produtoRepo.salvarProduto as jest.Mock).mockResolvedValue(produtoFake)

      const resultado = await produtoService.registrarNovoProduto(produtoFake)

      expect(produtoRepo.buscarProdutoPorCfopOuNcm).toHaveBeenCalledWith(produtoFake.nome, produtoFake.cfop, produtoFake.ncm)
      expect(produtoRepo.salvarProduto).toHaveBeenCalledWith(produtoFake)
      expect(resultado).toBe(produtoFake)
    })

    it("deve lançar HttpError se produto já existir", async () => {
      (produtoRepo.buscarProdutoPorCfopOuNcm as jest.Mock).mockResolvedValue(produtoFake)

      await expect(produtoService.registrarNovoProduto(produtoFake))
        .rejects
        .toThrow(HttpError)

      expect(produtoRepo.salvarProduto).not.toHaveBeenCalled()
    })
  })

    describe("listarProdutos", () => {
    it("deve retornar produtos quando existirem", async () => {
        const produtos: Produto [] = [produtoFake]

        // Força o mock com o tipo correto
        const buscarProdutosMock = produtoRepo.buscarProdutos as jest.MockedFunction<typeof produtoRepo.buscarProdutos>
        buscarProdutosMock.mockResolvedValue(produtos)

        const resultado = await produtoService.listarProdutos()

        expect(produtoRepo.buscarProdutos).toHaveBeenCalled()
        expect(resultado).toBe(produtos)
    })

    it("deve lançar HttpError quando não houver produtos", async () => {
    const buscarProdutosMock = produtoRepo.buscarProdutos as jest.MockedFunction<typeof produtoRepo.buscarProdutos>
    buscarProdutosMock.mockResolvedValue([])  // array vazio, nunca null

    await expect(produtoService.listarProdutos()).rejects.toThrow(HttpError)
    })

    })

  describe("validarProdutoRegistrados", () => {
    it("não deve lançar erro se produto não existir", async () => {
      (produtoRepo.buscarProdutoPorCfopOuNcm as jest.Mock).mockResolvedValue(null)

      await expect(produtoService.validarProdutoRegistrados("nome", "cfop", "ncm")).resolves.toBeUndefined()
    })

    it("deve lançar HttpError se produto já existir", async () => {
      (produtoRepo.buscarProdutoPorCfopOuNcm as jest.Mock).mockResolvedValue(produtoFake)

      await expect(produtoService.validarProdutoRegistrados("nome", "cfop", "ncm")).rejects.toThrow(HttpError)
    })
  })

  describe("validarProdutoNaoEncontrado", () => {
    it("deve retornar o produto se existir", async () => {
      (produtoRepo.buscarProdutoPorId as jest.Mock).mockResolvedValue(produtoFake)

      const resultado = await produtoService.validarProdutoNaoEncontrado("id")

      expect(resultado).toBe(produtoFake)
    })

    it("deve lançar HttpError se produto não existir", async () => {
      (produtoRepo.buscarProdutoPorId as jest.Mock).mockResolvedValue(null)

      await expect(produtoService.validarProdutoNaoEncontrado("id")).rejects.toThrow(HttpError)
    })
  })
})
