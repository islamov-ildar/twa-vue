import { Entity, Column, ManyToOne } from "typeorm"
import { ApplicationEntity } from "./application.entity";
import { User } from './user.entity';

@Entity()
export class Order extends ApplicationEntity {
    @Column()
    product!: string

    @Column()
    quantity!: number

    @Column()
    contactPhone!: string

    @Column()
    deliveryAddress!: string

    @Column({ default: 'processing'})
    status!: string

    @Column()
    userId!: number

    @ManyToOne(() => User, user => user.orders)
    user!: User
}