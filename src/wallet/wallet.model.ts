import { v4 as uuidv4 } from 'uuid';

export class Wallet {
  public id: string;
  public balance: number;

  constructor(balance: number) {
    this.id = uuidv4();
    this.balance = balance;
  }
}
