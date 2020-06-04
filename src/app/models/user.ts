export class User {
    constructor(
        public username: string,
        public password: string,
        public permission: string,
        public email: string,
        public lastName: string,
        public firstName: string,
        public address: string,
        public city: string,
        public street: string,
        public postalCode: string,
        public introduction: string,
        public photoPath: string,
        public photoFileName: string,
        public photoContentType: string
    ) { }
}
