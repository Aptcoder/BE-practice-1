import {
    Column, Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne,
  } from 'typeorm';
import Team from './team.entity';
  
export enum FixtureStatus {
    PENDING = "pending",
    COMPLETED = "completed"
}
  
@Entity()
export default class Fixture extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
      id!: string;
  
    @Column()
      homeTeamId!: string;
  
    @Column()
      awayTeamId!: string;

    @ManyToOne(() => Team, (team: Team) => team.homeFixtures)
      homeTeam!: Team
    
    @ManyToOne(() => Team, (team: Team) => team.awayFixtures)
      awayTeam!: Team

    @Column({
        type: 'enum',
        enum: FixtureStatus,
        default: FixtureStatus.PENDING
      })
      status!: FixtureStatus
  
    @Column({
      type: 'datetime',
      default: () => 'CURRENT_TIMESTAMP',
    })
      createdAt!: string;
  
  }
  