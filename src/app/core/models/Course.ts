import { assignment } from "./assignment";
export interface Course{
    _id:string,
  title:string,
  description:string,
  author:string,
  price:number,
  hours:number,
  category:string,
  Material:string[],
    imageUrl:string,
    assignments: assignment[]

}