import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface GetTransactionAndBalance {
  transactions: Transaction[];
  balance: Balance;
}

interface CreateTransactionsDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): GetTransactionAndBalance {
    const balance = this.getBalance();

    const transactionsAndBalance = {
      transactions: this.transactions,
      balance,
    };

    return transactionsAndBalance;
  }

  public getBalance(): Balance {
    let balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
    if (this.transactions.length < 0) {
      return balance;
    }

    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((acc, curr) => {
        return acc + curr.value;
      }, 0);

    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((acc, curr) => {
        return acc + curr.value;
      }, 0);

    const total = income - outcome;

    balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionsDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
