import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   BaseEntity,
   CreateDateColumn,
   UpdateDateColumn,
} from 'typeorm'

@Entity()
export class role extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ type: 'varchar', length: 256, nullable: false })
   title: string

   @CreateDateColumn({ type: 'timestamp' })
   createdAt: Date

   @UpdateDateColumn({ type: 'timestamp' })
   updatedAt: Date
}
