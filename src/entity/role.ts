import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   BaseEntity,
   CreateDateColumn,
   UpdateDateColumn,
   OneToMany,
} from 'typeorm'
import { userRole } from './userRole'

@Entity()
export class role extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ type: 'varchar', length: 256, nullable: false })
   title: string

   @OneToMany(() => userRole, (ru) => ru.user)
   userConnection: Promise<userRole[]>

   @CreateDateColumn({ type: 'timestamp' })
   createdAt: Date

   @UpdateDateColumn({ type: 'timestamp' })
   updatedAt: Date
}
