import { DataGrid, type GridColDef } from '@mui/x-data-grid'
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

export default function DataTable() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [rows, setRows] = useState<any[]>([])

  const fetchData = async () => {
    setLoading(true)

    try {
      const produto = await obterProdutos()
      setRows(produto)
      setError("")
    } catch (error: any) {
      setError((error as Error).message)
    }finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Paper sx={{ height: 650, width: '50%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20]}
        checkboxSelection
        sx={{ border: 0, }}
      />
    </Paper>
  )
}
