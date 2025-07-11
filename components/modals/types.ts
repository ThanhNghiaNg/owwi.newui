export type TransactionFormData = {
  id?: string;
  amount: string;
  type: string;
  category: string;
  partner: string;
  date: string;
  description: string;
  isDone: boolean;
}

export type PartnerFormData = {
  name: string;
  type: string;
  description?: string;
}