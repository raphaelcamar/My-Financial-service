import { Wallet } from "@user/domain/entities"

export type WalletProtocol = {
  create: (wallet: Wallet.Data) => Promise<Wallet>
  getWallets: (userId: string) => Promise<Wallet[]>
  update: (wallet: Wallet.Data) => Promise<any>
}