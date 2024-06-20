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
    confirmPassword: string,
    newPassword: string
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

export interface LoginForm {
    login: boolean,
    regestration: boolean
    forgotPassword: boolean
}

export interface UserData {
    id: number,
    firstName: string
    lastName: string
    secondName: string
    nick: string
    email: string
    description: string
    avatar: string | any
    roles: string
    phone: string
    socialLinks: string
    confirmEmail: boolean
    public: boolean

}

export interface TokensAuth {
    refreshToken: string | boolean
      accessToken: string | boolean
}