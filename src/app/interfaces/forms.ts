export interface Human {
    id: number,
    human: number,
    firstName: string,
    lastName: string,
    secondName: string,
    peculiarity: string,
    description: string,
    img: string[],
    time: string,
    found: number
}

export interface editUserForm {
    [key: string]: any;
    userNick: string,
    editFirstName: string,
    editSecondName: string,
    editLastName: string,
    editPhone: string,
    editEmail: string,
    socialLinks: {
        inst: '',
        tg: '',
        vk: '',
    },

    editDescription: string,
    files: File[],
}

export interface teamForm {
    [key: string]: any;
    name: string,
    description: string,
    members: any[] | null,
    socialLinks: { tg: string, vk: string, inst: string },
    nick: string,
    files: File[],

}
export interface Users {
    avatar: string,
    firstName: string,
    lastName: string,
    secondName: string,
    description: string,
    email: string,
    socialLinks: any

}

