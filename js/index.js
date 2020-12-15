const connectWallet = document.querySelector('.unlock-wallet');
const inputReferral = document.querySelector('.form-input');

import { abi as ethanolTokenABI } from './abi/Ethanol.js';

const EthanolAddress = '0x63D0eEa1D7C0d1e89d7e665708d7e8997C0a9eD6';


let web3;
let EthanolToken;
let user;

// window.addEventListener('DOMContentLoaded', async () => {
//   await connectDAPP();
// })

const loadWeb3 = async () => {
    if(window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        // cancel autorefresh on network change
        window.ethereum.autoRefreshOnNetworkChange = false;

    } else if(window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        alert("Non-Ethereum browser detected. You should consider trying Metamask")
    }
}


const loadBlockchainData = async () => {
    let networkType;
    try {
        web3 = window.web3;

        networkType = await web3.eth.net.getNetworkType();

        if(networkType !== "main") {
            alert("Connect wallet to a main network");
            throw new Error();
        }

        EthanolToken = new web3.eth.Contract(ethanolTokenABI, EthanolAddress);
        const accounts = await web3.eth.getAccounts();
        user = accounts[0];
        
        inputReferral.innerHTML = `<input type="text" value="https://ethanoltoken.com/share/?ref=${user}" />`;
        
    } catch (error) {
        console.error({
            error
        })
    }
}


const connectDAPP = async () => {
    await loadWeb3();
    await loadBlockchainData(); 
}

connectWallet.addEventListener('click', async e => {
    e.preventDefault();
    await connectDAPP();
    connectWallet.classList.add('hide');
})