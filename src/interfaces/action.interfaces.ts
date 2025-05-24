import { User } from "./";

export interface ActionStateType {
  errors: string[];
  success: string;
  user?: User;
}

