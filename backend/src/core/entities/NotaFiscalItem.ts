import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Produto } from "./Produto"
import { NotaFiscal } from "./NotaFiscal"

@Entity()
export class NotaFiscalItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @ManyToOne(() => NotaFiscal, nota => nota.itens, { nullable: false })
  notaFiscal!: NotaFiscal

  @ManyToOne(() => Produto, { eager: true, nullable: false })
  produto!: Produto

  @Column("int")
  quantidade!: number

  @Column("decimal", { precision: 12, scale: 2 })
  precoUnitario!: number

  @Column("decimal", { precision: 12, scale: 2 })
  icms!: number

  @Column("decimal", { precision: 12, scale: 2 })
  ipi!: number

  @Column("decimal", { precision: 12, scale: 2 })
  total!: number
}
