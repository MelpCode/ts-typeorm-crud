import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable:false
    })
    post:string;

    @Column({
        nullable:true,
        default:0
    })
    likes:number;

    @Column({
        nullable:true,
        default:0
    })
    dislikes:number;
}