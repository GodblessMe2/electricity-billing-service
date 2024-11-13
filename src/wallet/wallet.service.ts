/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Wallet } from './wallet.model';
import { CustomError } from '../utils/custom-error';

@Injectable()
export class WalletService {
  private wallets: Wallet[] = [];

  createWallet(): Wallet {
    const wallet = new Wallet(0);
    this.wallets.push(wallet);
    return wallet;
  }

  addFund(id: string, amount: number): Wallet | null {
    try {
      const wallet = this.wallets.find((el) => el.id === id);
      if (!wallet) {
        throw new CustomError(404, 'The wallet ID provided does not exist.');
      }
      wallet.balance += Number(amount);
      return wallet;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(500, 'Failed to add funds', error.message);
    }
  }

  getWalletById(id: string): Wallet | null {
    try {
      const wallet = this.wallets.find((w) => w.id === id);
      if (!wallet) {
        throw new CustomError(404, 'The wallet ID provided does not exist.');
      }
      return wallet;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(500, 'Failed to get wallet', error.message);
    }
  }
}
