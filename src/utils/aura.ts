import {
  CosmWasmClient,
  SigningCosmWasmClient
} from '@cosmjs/cosmwasm-stargate'
import { OfflineSigner } from '@cosmjs/proto-signing'

export const AURA_RPC_ENDPOINTS = 'https://rpc.serenity.aura.network'
export const AURA_LCD_ENDPOINTS = 'https://lcd.serenity.aura.network'
export const COSMOS_RPC_ENDPOINTS = 'https://rpc-osmosis.blockapsis.com'

export const getAuraWasmClient = async (): Promise<CosmWasmClient> => {
  const client = await CosmWasmClient.connect(AURA_RPC_ENDPOINTS)
  return client
}

export const getSigningAuraWasmClient = async (
  signer: OfflineSigner
): Promise<SigningCosmWasmClient> => {
  const signingClient = await SigningCosmWasmClient.connectWithSigner(
    AURA_RPC_ENDPOINTS,
    signer
  )
  return signingClient
}
