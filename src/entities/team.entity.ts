import {
    Column, Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany,
  } from 'typeorm';
import Fixture from './fixture.entity';
  
  
  @Entity()
  export default class Team extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
      id!: string;
  
    @Column({
      type: 'varchar',
      nullable: false
    })
      name!: string;
  
    @Column({
      type: 'varchar',
      nullable: false
    })
      alias!: string;
    
    @OneToMany(() => Fixture, fixture => fixture.homeTeam)
      public homeFixtures!: Fixture[];

    @OneToMany(() => Fixture, fixture => fixture.awayTeam)
      public awayFixtures!: Fixture[];
  
    @Column({
      type: 'datetime',
      default: () => 'CURRENT_TIMESTAMP',
    })
      createdAt!: string;
  
  }
  