import { assignment } from "./assignment";
import { Lecture } from "./Material";
export interface Course{
   
  title:string,
  description:string,
  authorName:string,
  authorId:string,
  price:number,
  hours:number,
  category:string,
  Material:Lecture[],
    imageUrl:string,
    assignments: assignment[],
    learningObjectives: string[]

}