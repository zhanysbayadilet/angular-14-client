import {FileHandle} from "./file-handle.model";

export class User{
  id?: number
  email: string
  password: string
  username: string
  roles: any
  userImages: FileHandle[];
}
