import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ length: 100 })
  nome!: string

  @Column({ length: 100, unique: true })
  email!: string

  @Column()
  cnpj!: string
}
