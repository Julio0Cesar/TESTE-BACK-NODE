import { validarCNPJ } from "../../shared/utils/validar-cnpj"

describe("validarCNPJ", () => {
  it("deve retornar false para strings que não têm 14 dígitos", () => {
    expect(validarCNPJ("123")).toBe(false)
    expect(validarCNPJ("1234567890123")).toBe(false) // 13 dígitos
    expect(validarCNPJ("123456789012345")).toBe(false) // 15 dígitos
  })

  it("deve retornar false para CNPJs inválidos", () => {
    expect(validarCNPJ("00000000000000")).toBe(false) // CNPJ errado mas com 14 dígitos
    expect(validarCNPJ("11111111111111")).toBe(false)
    expect(validarCNPJ("12345678901234")).toBe(false) // número aleatório inválido
  })

  it("deve retornar true para CNPJs válidos", () => {
    expect(validarCNPJ("11444777000161")).toBe(true) // CNPJ real válido (exemplo)
    // Pode colocar outros CNPJs válidos aqui
  })
})
