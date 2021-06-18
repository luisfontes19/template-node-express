import { IsEmail, IsString, MinLength } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import MainEntity from "./MainEntity";

@Entity()
export default class User extends MainEntity {

  @PrimaryGeneratedColumn() id?: number;

  @MinLength(2)
  @IsString()
  @Column() name?: string;

  @IsEmail()
  @Column() email?: string;

  @CreateDateColumn() createdAt?: Date
}
