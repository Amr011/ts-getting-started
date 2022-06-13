import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   BaseEntity,
   CreateDateColumn,
   UpdateDateColumn,
   JoinTable,
   ManyToMany,
   OneToMany,
} from 'typeorm'
import { product } from './product'
import { role } from './role'

@Entity()
export class user extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ type: 'varchar', length: 256, nullable: false })
   firstname: string

   @Column({ type: 'varchar', length: 256, nullable: false })
   lastname: string

   @Column({ type: 'varchar', length: 256, nullable: false })
   email: string

   @Column({ type: 'varchar', length: 256, nullable: false })
   password: string

   @ManyToMany(() => role, { cascade: true })
   @JoinTable()
   role: role[]

   @OneToMany(() => product, (product) => product.user, {
      onDelete: 'CASCADE',
   })
   product: product[]

   @Column({ type: 'boolean', default: false })
   verified: boolean

   @CreateDateColumn({ type: 'timestamp' })
   createdAt: Date

   @UpdateDateColumn({ type: 'timestamp' })
   updatedAt: Date
}
