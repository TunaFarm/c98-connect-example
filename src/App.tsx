import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { AccountData } from '@cosmjs/amino'
import { Undefinable } from './types/utils'
import { OfflineDirectSigner, OfflineSigner } from '@cosmjs/proto-signing'
import { lcdEndpoint, rpcEndpoint } from './utils'
import {
  HttpEndpoint,
  SigningStargateClient,
  StargateClient
} from '@cosmjs/stargate'

const App = () => {
  const chainId = 'serenity-testnet-001'

  const [account, setAccount] = useState<Undefinable<AccountData>>(undefined)
  const [signer, setSigner] =
    useState<Undefinable<OfflineSigner & OfflineDirectSigner>>(undefined)

  const [walletAddr, setWalletAddr] = useState<string>('')

  const connectWallet = async () => {
    if (!window.keplr) {
      alert('Coin98 or Keplr extension need to be installed')
      return
    }

    await window.keplr.enable(chainId)

    const offlineSigner = window.keplr.getOfflineSigner(chainId)
    const accounts = await offlineSigner.getAccounts()

    if (accounts.length < 1) {
      alert('No Aura wallet detected')
    }

    console.log(offlineSigner)
    console.log(accounts)

    setSigner(offlineSigner)
    setAccount(accounts[0])
  }

  const sendToken = async () => {
    if (!signer) {
      alert('Cannot sign message without a signer')
      return
    }

    if (!account) {
      alert('Cannot sign message without an account')
      return
    }

    if (!walletAddr || !walletAddr.trim()) {
      alert('Cannot send tokens to unknown address')
      return
    }

    let client: Undefinable<SigningStargateClient> = undefined
    const httpEndpoint: HttpEndpoint = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      url: rpcEndpoint
    }

    try {
      client = await SigningStargateClient.connectWithSigner(
        httpEndpoint,
        signer
      )
      console.log(client)
      return
    } catch (error) {
      console.log(error)
    }

    if (!client) {
      alert('Cannot connect to RPC endpoint. Please try again later')
      return
    }

    const amountFinal = {
      denom: 'uaura',
      amount: '1000'
    }

    const fee = {
      amount: [
        {
          denom: 'uaura',
          amount: '1000'
        }
      ],
      gas: '200000'
    }

    const result = await client.sendTokens(
      account?.address as string,
      walletAddr,
      [amountFinal],
      fee,
      ''
    )

    if (result.code !== undefined && result.code !== 0) {
      alert('Failed to send tx')
    } else {
      alert('Succeed to send tx:' + result.transactionHash)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!account && <button onClick={connectWallet}>Connect Wallet</button>}
        {account && (
          <div>
            <h1>Welcome {account.address}</h1>
            <button onClick={sendToken}>Send 1 AURA to: </button>
            <input
              onChange={(e) => setWalletAddr(e.target.value)}
              value={walletAddr}
              placeholder="Wallet Address here"
            />
          </div>
        )}
      </header>
    </div>
  )
}

export default App
