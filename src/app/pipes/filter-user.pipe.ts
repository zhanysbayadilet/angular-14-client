import { Pipe, PipeTransform } from '@angular/core';
import {User} from "../_models/user";

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {

  transform(users: User[], search: string): User[] {
    return users.filter(u => u.username.toLowerCase().includes(search.toLowerCase()));
  }

}
