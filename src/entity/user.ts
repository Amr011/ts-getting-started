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
import { userRole } from './userRole'

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

   @OneToMany(() => userRole, (ur) => ur.role)
   roleConnection: Promise<userRole[]>

   // O:M between Product/User Entities
   @OneToMany(() => product, (product) => product.user, {
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
   })
   product: product[]

   @Column({ type: 'boolean', default: false })
   verified: boolean

   @CreateDateColumn({ type: 'timestamp' })
   createdAt: Date

   @UpdateDateColumn({ type: 'timestamp' })
   updatedAt: Date
}
