import { choicesQuestions } from "./choiceQuestion";
import { writtenQuestion } from "./writtenQuestion";

export interface assignment{
    _id:string,
    title:string,
    description:string,
    dueDate:Date,
    choicesQuestions: choicesQuestions[],
    writtenQuestions: writtenQuestion[]
}