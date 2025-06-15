export const validarNome = (nome: string)=> {
    if (nome.trim().length < 3) {
        return "Nome muito curto."
    }
    return ""
}

export const validarEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "E-mail inválido."
    }
    return ""
}  

export const validarSenha = (senha: string) => {
    const minLength = /^(?=.{7,})/
    const hasUpperCase = /[A-Z]/
    const hasLowerCase = /[a-z]/
    const hasNumber = /\d/
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/ 

    if (!minLength.test(senha)) {
        return "A senha deve ter pelo menos 7 caracteres."
    }/*
    if (!hasUpperCase.test(senha)) {
        return "A senha deve conter pelo menos uma letra maiúscula."
    }
    if (!hasLowerCase.test(senha)) {
        return "A senha deve conter pelo menos uma letra minúscula."
    }
    if (!hasNumber.test(senha)) {
        return "A senha deve conter pelo menos um número."
    }
    if (!hasSpecialChar.test(senha)) {
        return "A senha deve conter pelo menos um caractere especial."
    } */
    return ""
}

export const validarAnalise = (fraudePorcentagem: number, legitimidadePorcentagem: number, classe: string): boolean => {

  if (    fraudePorcentagem == null || 
    legitimidadePorcentagem == null || 
    classe == null || 
    classe.trim() === "") {
    return false
  }
  return true
}