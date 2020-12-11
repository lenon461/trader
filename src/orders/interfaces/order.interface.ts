import { Document } from 'mongoose';

export interface DOrder extends Document {
    readonly id: String;
    readonly memberId: String;
    readonly marketId: String;
    readonly price: Number;
    readonly amount: Number;
    readonly type: String;
    readonly status: String;
    readonly time: Number;
}
export interface IOrder  {
    readonly id: String;
    readonly memberId: String;
    readonly marketId: String;
    readonly price: Number;
    amount: number;
    readonly type: String;
    status: String;
    readonly time: number;
}