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
   ManyToOne,
   JoinColumn,
} from 'typeorm'
import { user } from './user'

@Entity()
export class product extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ type: 'varchar', length: 256, nullable: false })
   title: string

   @ManyToOne(() => user, (user) => user.product, {
      onDelete: 'CASCADE',
   })
   @JoinColumn({ name: 'userId' })
   user!: user

   @CreateDateColumn({ type: 'timestamp' })
   createdAt: Date

   @UpdateDateColumn({ type: 'timestamp' })
   updatedAt: Date
}
