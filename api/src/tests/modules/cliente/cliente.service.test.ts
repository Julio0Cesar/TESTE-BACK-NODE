import { registrarNovoCliente } from "../../../modules/cliente/cliente.service"
import * as repo from "../../../modules/cliente/cliente.repository"
import * as hashUtil from "../../../shared/utils/gerar-hash"
import { HttpError } from "../../../core/error/HttpError"
import { Cliente } from "../../../core/entities/Cliente"

jest.mock("./cliente.repository")
jest.mock("../../shared/utils/gerar-hash")

describe("registrarNovoCliente", () => {
    const clienteFake: Cliente = {
    id: "1",
    nome: "Teste Cliente",
    email: "teste@teste.com",
    cnpj: "12345678000199",
    senha: "123456",
    }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("deve salvar cliente com senha hasheada se não existir cliente com email ou cnpj", async () => {
    // Simula que não tem cliente existente
    (repo.buscarClientePorEmailOuCnpj as jest.Mock).mockResolvedValue(null)
    (hashUtil.gerarHashSenha as jest.Mock).mockResolvedValue("hash_da_senha")
    (repo.salvarCliente as jest.Mock).mockResolvedValue({ ...clienteFake, senha: "hash_da_senha" })

    const resultado = await registrarNovoCliente(clienteFake)

    expect(repo.buscarClientePorEmailOuCnpj).toHaveBeenCalledWith(clienteFake.email, clienteFake.cnpj)
    expect(hashUtil.gerarHashSenha).toHaveBeenCalledWith(clienteFake.senha)
    expect(repo.salvarCliente).toHaveBeenCalledWith({ ...clienteFake, senha: "hash_da_senha" })
    expect(resultado.senha).toBe("hash_da_senha")
  })

  it("deve lançar erro se cliente já existir", async () => {
    (repo.buscarClientePorEmailOuCnpj as jest.Mock).mockResolvedValue({ id: "qualquer-id" })

    await expect(registrarNovoCliente(clienteFake)).rejects.toThrow(HttpError)
    await expect(registrarNovoCliente(clienteFake)).rejects.toThrow("Cliente já registrado")

    expect(repo.salvarCliente).not.toHaveBeenCalled()
  })
})
