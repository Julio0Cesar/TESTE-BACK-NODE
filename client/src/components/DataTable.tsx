import { DataGrid, type GridColDef, type GridRowSelectionModel } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import { useEffect, useState } from 'react'
import { obterProdutos } from '../services/products/listarProdutosService'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'nome', headerName: 'Nome', width: 150 },
  { field: 'preco', headerName: 'Preço', type: 'number', width: 150 },
  { field: 'industrializado', headerName: 'Industrializado', type: 'boolean', width: 150 }
]

const paginationModel = { page: 0, pageSize: 10 }

export default function DataTable({ setSelecionados }: { setSelecionados: (produtos: any[]) => void }) {
  const [rows, setRows] = useState<any[]>([])
  const [selectionModel, setSelectionModel] = useState<number[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const produto = await obterProdutos()
      setRows(produto)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const selecionados = rows.filter(row => selectionModel.includes(row.id))
    setSelecionados(selecionados)
  }, [selectionModel, rows, setSelecionados])

  return (
    <Paper sx={{ height: 650, width: '50%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
  rowSelection={selectionModel}
  onRowSelectionChange={(newSelection) => setSelectionModel(newSelection)}
        sx={{ border: 0 }}
      />
    </Paper>
  )
}
