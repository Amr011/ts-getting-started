import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   BaseEntity,
   CreateDateColumn,
   UpdateDateColumn,
   OneToMany,
} from 'typeorm'
import { user } from './user'
import { userRole } from './userRole'

@Entity()
export class role extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ type: 'varchar', length: 256, nullable: false })
   title: string

   @OneToMany(() => userRole, (ur) => ur.user, {
      onDelete: 'CASCADE',
   })
   userConnection: Promise<user[]>

   @CreateDateColumn({ type: 'timestamp' })
   createdAt: Date

   @UpdateDateColumn({ type: 'timestamp' })
   updatedAt: Date
}
