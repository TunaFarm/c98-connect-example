import {
  CosmWasmClient,
  SigningCosmWasmClient
} from '@cosmjs/cosmwasm-stargate'
import { OfflineSigner } from '@cosmjs/proto-signing'

export const rpcEndpoint = 'https://rpc.serenity.aura.network'
export const lcdEndpoint = 'https://lcd.serenity.aura.network'

export const getAuraWasmClient = async (): Promise<CosmWasmClient> => {
  const client = await CosmWasmClient.connect(rpcEndpoint)
  return client
}

export const getSigningAuraWasmClient = async (
  signer: OfflineSigner
): Promise<SigningCosmWasmClient> => {
  const signingClient = await SigningCosmWasmClient.connectWithSigner(
    rpcEndpoint,
    signer
  )
  return signingClient
}
