import { createContext, useContext, useEffect, useState } from "react";
import { getToken, removeToken, setToken } from "../utils/tokenStorage";
import { autenticarTokenUsuario } from "../services/clients/autenticarTokenClienteService";

interface AuthContextType {
  user: any
  storeToken: (token: string) => void
  clearToken: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(getToken())

  useEffect(() => {
    autenticarTokenUsuario().then((isValid) => {
      if (!isValid) {
        clearToken()
      } else {
        return
      }
    }).catch(() => {
      clearToken()
    })
  }, [])
  
  const storeToken = (token: string) => {
    setToken(token)
    setUser(token)
  }

  const clearToken = () => {
    removeToken()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, storeToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }