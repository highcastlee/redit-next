import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import BaseEntity from './Entity';
import Comment from "./Comment";
import Post from "./Post";
import { User } from "./User";

@Entity("votes")
export default class Vote extends BaseEntity {
    @Column()
    value!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "username", referencedColumnName: "username" })
    user!: User;

    @Column()
    username!: string;

    @Column({ nullable: true })
    postId!: number| null;

    @ManyToOne(() => Post)
    post!: Post;

    @Column({ nullable: true })
    commentId!: number | null;

    @ManyToOne(() => Comment)
    comment!: Comment;
}