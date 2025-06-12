import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ length: 100 })
  nome!: string

  @Column({ length: 100, unique: true })
  email!: string

  @Column({ length: 14, unique: true })
  cnpj!: string

  @Column({ select: false })
  senha!: string

}