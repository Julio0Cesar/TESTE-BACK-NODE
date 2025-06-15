export function getErrorMessage(error: any): string {
  if (!error) return "Erro desconhecido"

  const data = error.response?.data

  if (typeof data === "string") return data

  if (typeof data === "object") {
    // Caso padrão do seu backend
    if (data.erro && data.detalhes) {
      return Array.isArray(data.detalhes) && data.detalhes.length > 0
        ? data.detalhes[0] // pega o primeiro detalhe
        : data.erro // se não tiver detalhes, retorna o erro principal
    }

    // Outras estruturas padrão
    if (data.message) return data.message

    if (data.errors && typeof data.errors === "object") {
      const mensagens = Object.values(data.errors as Record<string, string[]>)
        .flat()
        .filter(Boolean)

      if (mensagens.length > 0) return mensagens[0]
    }
  }

  if (error.message) return error.message

  return "Erro desconhecido"
}
