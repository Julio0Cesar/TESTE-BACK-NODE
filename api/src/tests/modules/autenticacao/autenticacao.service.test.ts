import { registrarNovoLogin, validarLogin } from "../../../modules/autenticacao/autenticacao.service" // Ajusta o caminho
import { buscarClientePorEmail } from "../../../modules/cliente/cliente.repository"
import { gerarToken } from "../../../shared/utils/gerar-jwt"
import { compararSenha } from "../../../shared/utils/gerar-hash"
import { HttpError } from "../../../core/error/HttpError"
import { Cliente } from "../../../core/entities/Cliente"

jest.mock("../cliente/cliente.repository")
jest.mock("../../shared/utils/gerar-jwt")
jest.mock("../../shared/utils/gerar-hash")

describe("registrarNovoLogin", () => {
    const clienteFake: Cliente = {
    id: "1",
    nome: "Teste Cliente",
    email: "teste@teste.com",
    cnpj: "12345678000199",
    senha: "123456",
    }

  const authDTO = {
    email: "teste@teste.com",
    senha: "senha123"
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("deve retornar token e cliente se login for válido", async () => {
    ;(buscarClientePorEmail as jest.Mock).mockResolvedValue(clienteFake)
    ;(compararSenha as jest.Mock).mockResolvedValue(true)
    ;(gerarToken as jest.Mock).mockReturnValue("token123")

    const resultado = await registrarNovoLogin(authDTO)

    expect(buscarClientePorEmail).toHaveBeenCalledWith(authDTO.email)
    expect(compararSenha).toHaveBeenCalledWith(authDTO.senha, clienteFake.senha)
    expect(gerarToken).toHaveBeenCalledWith({ id: clienteFake.id, email: clienteFake.email })

    expect(resultado).toEqual({
      token: "token123",
      cliente: {
        id: clienteFake.id,
        nome: clienteFake.nome,
      },
    })
  })

  it("deve lançar HttpError se cliente não existir", async () => {
    ;(buscarClientePorEmail as jest.Mock).mockResolvedValue(null)

    await expect(registrarNovoLogin(authDTO)).rejects.toThrow(HttpError)
    await expect(registrarNovoLogin(authDTO)).rejects.toThrow("Cliente não existe")
  })

  it("deve lançar HttpError se senha for inválida", async () => {
    ;(buscarClientePorEmail as jest.Mock).mockResolvedValue(clienteFake)
    ;(compararSenha as jest.Mock).mockResolvedValue(false)

    await expect(registrarNovoLogin(authDTO)).rejects.toThrow(HttpError)
    await expect(registrarNovoLogin(authDTO)).rejects.toThrow("Senha inválida")
  })
})
