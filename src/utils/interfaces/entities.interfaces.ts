export interface IUser {
    id: string;
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    dateJoined: string

    role: UserRole

    save(): Promise<IUser>
}

export interface ITeam {
    name: string,
    alias: string

    save(): Promise<ITeam>
}

export interface IFixture {

    awayTeam: ITeam
    homeTeam: ITeam

    homeTeamId: string
    awayTeamId: string
}


enum UserRole {
    GUEST,
    ADMIN
}