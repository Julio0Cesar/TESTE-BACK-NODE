import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

// uso de string para não dar problemas com zeros a esquerda
@Entity()
export class Produto {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  nome!: string

  @Column({ length: 8 })
  ncm!: string

  @Column({ length: 4 })
  cfop!: string

  @Column("decimal", { precision: 10, scale: 2 })
  preco!: number
  
  @Column({ default: false })
  industrializado!: boolean
}
