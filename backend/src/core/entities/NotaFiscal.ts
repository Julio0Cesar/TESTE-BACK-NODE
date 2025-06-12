import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm"
import { Cliente } from "./Cliente"
import { NotaFiscalItem } from "./NotaFiscalItem"

@Entity()
export class NotaFiscal {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @ManyToOne(() => Cliente, { eager: true })
  cliente!: Cliente

  @OneToMany(() => NotaFiscalItem, item => item.notaFiscal, { cascade: true })
  itens!: NotaFiscalItem[]

  @Column("decimal", { precision: 12, scale: 2, default: 0 })
  valorTotal!: number

  @Column("decimal", { precision: 12, scale: 2, default: 0 })
  icmsTotal!: number

  @Column("decimal", { precision: 12, scale: 2, default: 0 })
  ipiTotal!: number

  @Column("text", { nullable: true })
  xml!: string // base64 do XML
}
