import {Category} from "./category";

export class Tournament{
  id: number
  name: string
  description: string
  start_date: Date
  end_date: Date
  prize_fund: string
  tournament_img: string
  category: Category
}
