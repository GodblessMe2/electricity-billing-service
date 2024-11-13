import { v4 as uuidv4 } from 'uuid';

export class Bill {
  public id: string;
  public amount: number;
  public status: string;

  constructor(amount: number) {
    this.id = uuidv4();
    this.amount = amount;
    this.status = 'Pending';
  }
}
