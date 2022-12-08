import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm"

export abstract class ApplicationEntity<ID = number> {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id!: ID
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date
  }