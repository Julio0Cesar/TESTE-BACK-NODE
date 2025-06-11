import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Produto {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  nome!: string

  @Column({ length: 20 })
  ncm!: string

  @Column({ length: 10 })
  cfop!: string

  @Column("decimal", { precision: 10, scale: 2 })
  precoUnitario!: number

  @Column({ default: false })
  industrializado!: boolean

  @Column("int")
  estoque!: number

  @Column("text", { nullable: true })
  descricao?: string
}
