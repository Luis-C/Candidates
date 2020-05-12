import { Skill } from "./skill";

export class User {
  username: string;
  email: string;
  // firstName: string;
  // lastName: string;
  skills: Skill[] | undefined;
  jobSeeking: boolean;
  token?: string;
}
