import { OfflineSigner } from '@cosmjs/launchpad'
import { getTs } from './time'

export const signMessage = (signer: OfflineSigner, message: string) => {
  const nonce = getTs()

  console.log(Object.keys((signer as any)['keplr']))
}
