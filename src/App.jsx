import "./App.css";
import { ethers, Wallet } from "ethers";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import Collection from "./components/Collection";
import { useLocation } from "react-router-dom";

Modal.setAppElement("body");
const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "350px",
    height: "480px",
    transform: "translate(-50%, -50%)",
    borderRadius: "12px",
  },
};

const PRIVATE_KEY =
  "24f51c8c4e2cd7dd75d134c8da75074782646f2b641c97be1cc46f0605293d5e";
const contractAddress = "0x951a364159B1B019A69Ab250089d4772573cE770";
const abi = [
  "function mint(address recipient) public",
  "function balanceOf(address owner) external view returns (uint256 balance)",
];
// const recipient = "0x947FFEdee7d08685Df07B87821843F8Fb51eC738";

function App() {
  const [modalIsOpen, setIsOpen] = useState(true);
  const [load, setLoad] = useState(false);
  const [profile, setProfile] = useState(false);
  const [wallet, setWallet] = useState();
  const [isOwn, setIsOwn] = useState({ own: false });
  const search = useLocation().search;
  const query2 = new URLSearchParams(search);

  const createWallet = () => {
    const tmpWallet = ethers.Wallet.createRandom();
    setWallet(tmpWallet);
    // console.log("privateKey:" + wallet.privateKey);
    // console.log("address:" + wallet.address);
    localStorage.setItem("private_key", wallet.privateKey);
    setIsOpen(false);
  };

  const doConfirm = async () => {
    const userAddress = query2.get("userAddress");
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rinkeby.infura.io/v3/9aa81ad4818244ba9cd55eeb6b032fe8"
    );
    const signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tmpIsOwn = await contract.balanceOf(userAddress);

    if (tmpIsOwn.toString() != "0") {
      console.log("true");
      const tmpOnwList = [
        {
          own: true,
        },
      ];
      setIsOwn(tmpOnwList);
    } else {
      console.log("false");
      const tmpOnwList = [
        {
          own: false,
        },
      ];
      setIsOwn(tmpOnwList);
    }
  };

  const doMint = () => {
    setLoad(true);
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rinkeby.infura.io/v3/9aa81ad4818244ba9cd55eeb6b032fe8"
    );
    const signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const mintNFT = async () => {
      let nftTxn = await contract.mint(wallet.address);
      await nftTxn.wait();
      console.log(
        `NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`
      );
      setLoad(false);
      // window.location = "https://tofunft.com/user/" + wallet.address;
      window.location = "https://testnets.opensea.io/" + wallet.address;
    };
    mintNFT();
  };

  //???????????????????????????
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  //??????????????????????????????
  const openLoad = () => {
    setLoad(true);
  };

  const closeLoad = () => {
    setLoad(false);
  };

  //??????????????????????????????
  const openProfile = () => {
    setProfile(true);
  };

  const closeProfile = () => {
    setProfile(false);
  };

  useEffect(() => {
    if (localStorage.getItem("private_key")) {
      const tmpWallet = new ethers.Wallet(localStorage.getItem("private_key"));
      setWallet(tmpWallet);
      // console.log("privateKey:" + tmpWallet.privateKey);
      // console.log("address:" + tmpWallet.address);
      setIsOpen(false);
      console.log(tmpWallet.address);
      doConfirm("0x947FFEdee7d08685Df07B87821843F8Fb51eC738");
    }
  }, []);

  return (
    <div className="App theme-bg min-h-screen theme-text-color">
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div className="text-center py-4 font-bold text-xl">
          ?????????NFT????????????
        </div>
        <div className="px-8">
          ????????????????????????????????????????????????????????????????????????????????????T3?????????NFT????????????????????????????????????
        </div>
        <div className=" mt-10">
          <a className="flex justify-center cursor-pointer">
            <div
              className="border rounded-full px-10 py-3 bg-green-500 text-white font-bold"
              onClick={createWallet}
            >
              ???????????????
            </div>
          </a>
          <a className="flex justify-center mt-4 cursor-pointer">
            <div className="border-2 rounded-full px-10 py-3 border-green-500 bg-white text-green-500 font-bold">
              ???????????????
            </div>
          </a>
        </div>
      </Modal>
      <Modal isOpen={load} onRequestClose={closeLoad} style={customStyles}>
        <div>
          <div className="font-bold text-center pt-4 text-theme-100 text-2xl">
            ?????????...
          </div>
          <div className="flex justify-center mt-20">
            <div className="animate-spin h-24 w-24 border-4 border-red-600 rounded-full border-t-transparent"></div>
          </div>
          <div className="pt-6"></div>
        </div>
      </Modal>
      <Modal
        isOpen={profile}
        onRequestClose={closeProfile}
        style={customStyles}
      >
        <div>
          <div className="font-bold text-center pt-4 text-theme-100 text-xl">
            ????????????
          </div>
          <div className="text-center mt-6">
            <div className="font-bold text-sm mb-2">???????????????????????????</div>
            <div className="break-words text-sm text-left">
              {wallet?.address}
            </div>
          </div>
          <div className="text-center mt-6">
            <div className="font-bold text-sm mb-2">?????????</div>
            <div className="break-words text-sm text-left">
              {wallet?.privateKey}
            </div>
          </div>
          <div className="text-center mt-6">
            <div className="font-bold text-sm mb-2">?????????</div>
            <div className="break-words text-sm text-left">
              {wallet?.publicKey}
            </div>
          </div>
          <div className="text-center mt-10 theme-text-sub-color font-bold">
            ????????????????????????????????????????????????
          </div>
        </div>
      </Modal>
      <div className="">
        <div className="flex justify-between py-6 font-bold text-left px-10 bg-white">
          <div>???????????????????????????</div>
          <div
            className="theme-text-sub-color cursor-pointer"
            onClick={openProfile}
          >
            ?????????????????????
          </div>
        </div>
        {/* <dir>{query2.get("userAddress")}</dir> */}
        <Collection ownList={isOwn} />
      </div>
    </div>
  );
}
export default App;
