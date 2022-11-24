import {Tournament} from "./tournament";

export class User{
  id: number
  email: string
  password: string
  username: string
  roles: any
  tournaments: Tournament[]
}
