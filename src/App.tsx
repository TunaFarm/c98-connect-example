import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { AccountData } from '@cosmjs/amino'
import { Undefinable } from './types/utils'
import { OfflineSigner } from '@cosmjs/launchpad'
import {} from '@keplr-wallet/provider'

const App = () => {
  const chainId = 'serenity-testnet-001'

  const [account, setAccount] = useState<Undefinable<AccountData>>(undefined)
  const [signer, setSigner] = useState<Undefinable<OfflineSigner>>(undefined)

  const [signature, setSignature] = useState<string>('')

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

    setSigner(offlineSigner)
    setAccount(accounts[0])
  }

  const signHelloWorld = async () => {
    if (!window.keplr) {
      alert('Coin98 or Keplr extension need to be installed')
      return
    }

    if (!signer) {
      alert('Signer not set')
      return
    }

    const currentAccount = account || (await signer.getAccounts())[0]

    const data = Buffer.from(JSON.stringify({ msg: 'Hello World' })).toString(
      'base64'
    )

    const response = await window.keplr.signArbitrary(
      chainId,
      currentAccount.address,
      data
    )

    setSignature(response.signature)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!account && <button onClick={connectWallet}>Connect Wallet</button>}
        {account && (
          <div>
            <h1>Welcome {account.address}</h1>
          </div>
        )}
        {account && !signature && (
          <button onClick={signHelloWorld}>Sign 'Hello World'</button>
        )}
        {signature && (
          <div>
            <h5>{signature}</h5>
          </div>
        )}
      </header>
    </div>
  )
}

export default App
