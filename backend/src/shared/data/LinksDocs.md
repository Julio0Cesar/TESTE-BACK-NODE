# 📊 Documentação dos Dados Auxiliares

Este projeto utiliza dados auxiliares de **NCM (Nomenclatura Comum do Mercosul)** e **CFOP (Código Fiscal de Operações e Prestações)** para validações e cálculos fiscais.

## 🔗 Fontes Oficiais

* **Tabela NCM (vigente)**
  [➡️ Acessar](https://portalunico.siscomex.gov.br/classif/#/nomenclatura/tabela?perfil=publico)

* **Tabela CFOP (vigente)**
  [➡️ Acessar](https://www.gov.br/siscomex/pt-br/informacoes/tratamento-administrativos/tratamento-administrativo-de-exportacao-1/cfop.xlsx)

## 🛠️ Processamento dos Dados

Os dados foram coletados diretamente dos links oficiais e tratados com scripts em **Python** para:

* Limpeza de dados irrelevantes
* Padronização de formatos
* Conversão para JSON utilizado na API
