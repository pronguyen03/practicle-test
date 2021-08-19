export interface IQuestion {
  name: string;
  no: number;
  description?: string;
  options?: { no: number, optionValue: any, isCorrect: boolean }[];
  solution?: string;
  variables?: { [key: string]: any }
}

export interface IRatio {
  left: number;
  right: number;
}

export const QUESTIONS: IQuestion[] = [
    { no: 1, name: 'Question 1' },
    { name: 'Question 2', no: 2 },
    { name: 'Question 3', no: 3 },
];
