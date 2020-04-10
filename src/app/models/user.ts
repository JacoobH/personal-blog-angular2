export class User {
    constructor(
        public username: string,
        public password: string,
        public permission: string,
        public photoPath: string,
        public photoFileName: string,
        public photoContentType: string
    ) { }
}
