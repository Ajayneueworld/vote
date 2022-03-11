import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'bootstrap/dist/css/bootstrap.css';
import { useState,useEffect,useRef } from 'react';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from 'walletlink';
import Web3 from "web3"
let web3

const Cards1 = () => {

  let [vote, updateVote] = useState(0)
  const [disable, setDisable] = useState(false);

  async function sign(num){
    let account = await web3.eth.getAccounts()
    console.log(account)
    let msg = `Hii, You are voting for the # 00${num} NFT` 
    let signature = await web3.eth.personal.sign(msg,account[0])
    web3.eth.personal.ecRecover(msg,signature).then(console.log)
    setDisable(true)
    updateVote(vote+1)
  }
    
  return (
    <div className="card" style={{width: "18rem"}}>
        <Image src="/0.JPG" alt="Vercel Logo" width={250} height={250} />
            <div className="card-body">
                <h5 className="card-title">NFT # 001</h5>
                    <p className="card-text">This is the first NFT from my colletction</p>
                    <p>Total votes : {vote}</p>
                    <button disabled={disable} className="btn btn-primary" onClick={() => sign(1)}>Vote</button>
              </div>
    </div>
  )
}

const Cards2 = () => {

  let [votes, updateVote] = useState(0);
  const [disable, setDisable] = useState(false);

  async function sign(num){
    let account = await web3.eth.getAccounts()
    console.log(account)
    let msg = `Hii, You are voting for the # 00${num} NFT` 
    let signature = await web3.eth.personal.sign(msg,account[0])
    web3.eth.personal.ecRecover(msg,signature).then(console.log)
    setDisable(true)
    updateVote(votes+1)
  }
  return (
    <div className="card" style={{width: "18rem;"}}>
        <Image src="/1.JPG" alt="Vercel Logo" width={250} height={250} />
            <div className="card-body">
                <h5 className="card-title">NFT # 002</h5>
                    <p className="card-text">This is the second NFT from my colletction</p>
                    <p>Total votes : {votes}</p>
                    <button disabled={disable} className="btn btn-primary" onClick={() => sign(2)}>Vote</button>
            </div>
    </div>
  )
}

const Cards3 = () => {

  let [votes, updateVote] = useState(0);
  const [disable, setDisable] = useState(false);

  async function sign(num){
    let account = await web3.eth.getAccounts()
    console.log(account)
    let msg = `Hii, You are voting for the # 00${num} NFT` 
    let signature = await web3.eth.personal.sign(msg,account[0])
    web3.eth.personal.ecRecover(msg,signature).then(console.log)
    setDisable(true)
    updateVote(votes+1)
  }
  return (
    <div className="card" style={{width: "18rem"}}>
        <Image src="/2.JPG" alt="Vercel Logo" width={250} height={250} />
            <div className="card-body">
                <h5 className="card-title">NFT # 003</h5>
                    <p className="card-text">This is the third NFT from my colletction</p>
                    <p>Total votes : {votes}</p>
                          <button disabled={disable} className="btn btn-primary" onClick={() => sign(3)}>Vote</button>
            </div>
    </div>
  )
}



const connectWallet = () => {

  const providerOptions = {
    walletlink: {
      package: WalletLink, // Required
      options: {
        appName: "NightWing", // Required
        infuraId: "a2d512999ccc4e8fa4c183b6d1d6ad9a", // Required unless you provide a JSON RPC url; see `rpc` below
        chainId: 137, // Optional. It defaults to 1 if not provided
        appLogoUrl: 'https://ibb.co/7KnTqT5', // Optional. Application logo image URL. favicon is used if unspecified
        darkMode: true // Optional. Use dark theme, defaults to false
      }
    },

    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "a2d512999ccc4e8fa4c183b6d1d6ad9a" , 
        rpc: {
        137 : "https://polygon-mainnet.infura.io/v3/a2d512999ccc4e8fa4c183b6d1d6ad9a"
          },
      }
    },

  };
  let account
  const web3Modal = new Web3Modal({
    getInjectedProvider : true,
    cacheProvider: false,
    theme: "dark",    // optional
    providerOptions // required
  });
  const getProvider = async () => {
        await web3Modal.clearCachedProvider()
        let provider = await web3Modal.connect();
  
       web3 = new Web3(provider)
      
      }
      getProvider()
      console.log("The web3 is : ",web3)

    return(
      <div>
        <p>The current account is : {account}</p>
      </div>
    )
}

const Getaccount = () =>{

  let account;
  async function get(){
    return await web3.eth.getAccounts()
  } 
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button className = "btn btn-primary" onClick={connectWallet}>connect wallet</button>
          <br/>
          <div className="container">
              <div className="row">
                  <div className="col-sm">
                      <Cards1/>
                  </div>
                  <div className="col-sm">
                      <Cards2/>
                  </div>
                  <div className="col-sm">
                      <Cards3/>
                  </div>
              </div>
          </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
