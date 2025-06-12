import { Produto } from "../../core/entities/Produto";
import { AppDataSource } from "../../ormconfig";

export async function buscarProdutoPorCfopOuNcm(nome: string, cfop: string, ncm: string){
    return AppDataSource.getRepository(Produto).findOneBy({ nome, ncm, cfop })
}

export async function buscarProdutoPorId(id: string): Promise<Produto | null>{
    return AppDataSource.getRepository(Produto).findOneBy({ id })
}

export async function salvarProduto(data: Partial<Produto>){
    const repo = AppDataSource.getRepository(Produto)
    const novoProduto = repo.create(data)
    return await repo.save(novoProduto)
}

export async function buscarProdutos() {
    const produtoRepo = AppDataSource.getRepository(Produto)
    return await produtoRepo.find()
}

