import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { Navigate, useNavigate} from "react-router-dom";

function Wallet(props) {
  return (
    <svg className="ml-3" xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 32 32" {...props}>
      <path fill="currentColor" d="M22 17h2v2h-2z"></path>
      <path fill="currentColor" d="M28 8H4V5h22V3H4a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2ZM4 26V10h24v3h-8a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h8v3Zm24-11v6h-8v-6Z"></path>
    </svg>
  )
}

const Login = () => {
  const { connectWallet, currentAccount, getVerifierName } = useContext(TransactionContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (currentAccount != "") {
      getVerifierName(currentAccount.toLowerCase()).then((name) => {
        if (name !== "") 
          navigate('/admin')
        else 
          navigate('/home')
      });
    }
  }, [currentAccount]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="card p-10 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-3 text-[#f9fafb]">
          <span className="text-[#60a5fa]">ID</span>on
        </h1>
        <p className="text-xl italic mb-8 text-[#d1d5db]">
          "Own Who You Are!"
        </p>
        
        <button 
          onClick={connectWallet} 
          className="btn btn-primary w-full py-3 flex items-center justify-center"
        >
          Connect Wallet <Wallet />
        </button>
        
        <div className="mt-8 text-sm text-[#9ca3af]">
        A decentralized identity platform that puts you in control of your digital self.
        </div>
      </div>
      <div className="mt-8 text-sm text-[#9ca3af]">
        <h1 className="text-4xl font-bold mb-3 text-[#f9fafb]">
          <span>By:</span>
        </h1>
        <h1 className="text-4xl font-bold mb-3 text-[#f9fafb]">
          <span className="text-[#60a5fa]">Abhishek</span>Shirol
        </h1>
        <h1 className="text-4xl font-bold mb-3 text-[#f9fafb]">
          <span className="text-[#60a5fa]">Omkar</span>Hiremath
        </h1>
        <h1 className="text-4xl font-bold mb-3 text-[#f9fafb]">
          <span className="text-[#60a5fa]">Sanket</span>Muttur
        </h1>
        <h1 className="text-4xl font-bold mb-3 text-[#f9fafb]">
          <span className="text-[#60a5fa]">Vikas</span>Dutta
        </h1>
      </div>
    </div>
  )
};

export default Login;
