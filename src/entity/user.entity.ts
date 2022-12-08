import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import { ApplicationEntity } from "./application.entity";
import { Order } from './order.entity';

@Entity()
export class User extends ApplicationEntity {
    @Column()
    name!: string

    @Column({ nullable: true})
    phone?: string

    @Column()
    password!: string

    @Column()
    userTelegramId!: string

    @OneToMany(() => Order, orders => orders.user)
    orders!: Order[]
}