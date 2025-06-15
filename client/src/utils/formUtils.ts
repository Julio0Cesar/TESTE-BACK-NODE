//atualizar o estado interno do formulário
export const criarHandleChange = (setState: React.Dispatch<React.SetStateAction<any>>) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setState((prevData: any) => ({
            ...prevData,
            [name]: value,
        }))
    }
}
