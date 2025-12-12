import { assignment } from "./assignment";
import { Lecture } from "./Material";
export interface Course{
  id:string,
  isArchieved:boolean,
  title:string,
  description:string,
  authorName:string,
  authorId:string,
  price:number,
  hours:number,
  category:string,
  Material:Lecture[],
    imageUrl:string,
    learningObjectives: string[],

}