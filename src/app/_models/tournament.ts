import {Category} from "./category";

export class Tournament{
  id: number
  name: string
  description: string
  start_date: any
  end_date: any
  prize_fund: string
  tournament_img: string
  category_id: Category
}
