import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Produto } from "./Produto"
import { NotaFiscal } from "./NotaFiscal"

@Entity()
export class NotaFiscalItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @ManyToOne(() => NotaFiscal, nota => nota.itens)
  notaFiscal!: NotaFiscal

  @ManyToOne(() => Produto, { eager: true })
  produto!: Produto

  @Column("int")
  quantidade!: number

  @Column("decimal", { precision: 10, scale: 2 })
  precoUnitario!: number

  @Column("decimal", { precision: 10, scale: 2 })
  icms!: number

  @Column("decimal", { precision: 10, scale: 2 })
  ipi!: number

  @Column("decimal", { precision: 10, scale: 2 })
  total!: number
}
