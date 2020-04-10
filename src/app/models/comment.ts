import {Article} from "./article";
import {User} from "./user";

export class Comment {
    constructor(
        public id: number,
        public article: Article,
        public user: User,
        public content: string,
        public releaseTime: string,
        public likeNum: number,
    ) { }
}
