import { ILoginRequest } from "./login.interface";

export interface IRegisterRequest extends ILoginRequest {
    fullName: string;
    roles: string;
}