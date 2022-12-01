import {Category} from "./category";
import {User} from "./user";

export class Tournament{
  id: number
  name: string
  description: string
  start_date: any
  end_date: any
  prize_fund: string
  tournament_img: string
  category: Category
  organizer: User
  users: User[]
}
