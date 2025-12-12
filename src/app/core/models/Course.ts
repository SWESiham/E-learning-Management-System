import { assignment } from "./assignment";
import { Lecture } from "./Material";
import { resource } from "./Resource";
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
  Resources:resource[],
    imageUrl:string,
    learningObjectives: string[],

}