import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Wish {
    name: string;
    message: string;
}
export interface Reply {
    id: bigint;
    message: string;
    timestamp: bigint;
}
export interface backendInterface {
    addWish(name: string, message: string): Promise<void>;
    getAllReplies(): Promise<Array<Reply>>;
    getAllWishes(): Promise<Array<Wish>>;
    getBirthdayDate(): Promise<string>;
    getWish(name: string): Promise<Wish>;
    saveReply(message: string): Promise<bigint>;
    setBirthdayDate(newDate: string): Promise<void>;
}
