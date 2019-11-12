export interface IPayment {
  recipient: string;
  accountNumber: string;
  reference?: string;
  amount: number;
}
