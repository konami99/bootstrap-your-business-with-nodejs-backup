import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({name: "todos"})
export default class Todo extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    text!: string;
}