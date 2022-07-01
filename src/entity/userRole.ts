import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   BaseEntity,
   CreateDateColumn,
   UpdateDateColumn,
   ManyToOne,
   JoinColumn,
   PrimaryColumn,
} from 'typeorm'
import { role } from './role'
import { user } from './user'

@Entity()
export class userRole extends BaseEntity {
   @PrimaryColumn()
   userId: number
   @PrimaryColumn()
   roleId: number

   @ManyToOne(() => user, (user) => user.roleConnection, { primary: true })
   @JoinColumn({ name: 'userId' })
   user: Promise<user>

   @ManyToOne(() => role, (role) => role.userConnection, {
      primary: true,
   })
   @JoinColumn({ name: 'roleId' })
   role: Promise<role>

   @CreateDateColumn({ type: 'timestamp' })
   createdAt: Date

   @UpdateDateColumn({ type: 'timestamp' })
   updatedAt: Date
}
