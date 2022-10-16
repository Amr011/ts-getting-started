import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   BaseEntity,
   CreateDateColumn,
   UpdateDateColumn,
   PrimaryColumn,
   ManyToOne,
   JoinColumn,
} from 'typeorm'
import { user } from './user'
import { role } from './role'

@Entity()
export class userRole extends BaseEntity {
   @PrimaryColumn()
   roleId: number
   @PrimaryColumn()
   userId: number

   @ManyToOne(() => user, (user) => user.roleConnection, { primary: true })
   @JoinColumn({ name: 'userId' })
   user: user

   @ManyToOne(() => role, (role) => role.userConnection, { primary: true })
   @JoinColumn({ name: 'roleId' })
   role: role

   @CreateDateColumn({ type: 'timestamp' })
   createdAt: Date

   @UpdateDateColumn({ type: 'timestamp' })
   updatedAt: Date
}
