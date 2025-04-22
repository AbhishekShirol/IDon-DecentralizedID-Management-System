import React, { useContext, useEffect, useState } from 'react';
import { RxCrossCircled } from 'react-icons/rx';
import { TiTick } from 'react-icons/ti';
import { useParams } from 'react-router';
import { TransactionContext } from '../context/TransactionContext';
import { Link, useNavigate } from "react-router-dom";
import Nav from '../components/nav';

function ReqDetails() {
    const navigate = useNavigate();

    let {index} = useParams();
    index--;
    const [vreq, setVreq] = useState(null);
    const { verifierVReqList, loadVerifierList, verify, currentAccount, checkIfWalletIsConnect } = useContext(TransactionContext);
    
    useEffect(() => {
        checkIfWalletIsConnect();
        if (index >= verifierVReqList.length)
            loadVerifierList();
        else
            setVreq(verifierVReqList[index]);
    }, []);

    useEffect(() => {
        if (index < verifierVReqList.length)
            setVreq(verifierVReqList[index]);
    }, [verifierVReqList]);

    return (
        <div className='w-full min-h-screen bg-gradient-to-b from-[#15171a] to-[#343538]'>
            <Nav />
            <div className='flex flex-col items-center justify-center w-full pt-24 px-4'>
                {vreq !== null && (
                    <div className='card w-full max-w-lg p-8'>
                        <h1 className='text-2xl font-bold mb-6 text-[#f9fafb] text-center'>Verification Request</h1>
                        
                        <div className='bg-[#1f2937] p-4 rounded-lg mb-6'>
                            <h3 className='text-lg font-medium text-[#d1d5db] mb-2'>Request from:</h3>
                            <p className='text-[#f9fafb] font-mono break-all'>{vreq.user}</p>
                        </div>

                        <div className='mb-8'>
                            <h3 className='text-lg font-medium text-[#d1d5db] mb-4 border-b border-[#4b5563] pb-2'>Requested Information</h3>
                            <div className='space-y-3 text-[#f9fafb]'>
                                {vreq.name !== "" && <div className='flex justify-between'><span>Name:</span> <span>{vreq.name}</span></div>}
                                {vreq.dob !== "" && <div className='flex justify-between'><span>Date of Birth:</span> <span>{vreq.dob}</span></div>}
                                {vreq.college !== "" && <div className='flex justify-between'><span>College:</span> <span>{vreq.college}</span></div>}
                                {vreq.email !== "" && <div className='flex justify-between'><span>Email:</span> <span>{vreq.email}</span></div>}
                                {vreq.isCollegeStudent !== 0 && <div className='flex justify-between'><span>Is College Student:</span> <span>{vreq.isCollegeStudent === 1 ? "Yes" : "No"}</span></div>}
                                {vreq.isOver18 !== 0 && <div className='flex justify-between'><span>Is Over 18:</span> <span>{vreq.isOver18 === 1 ? "Yes" : "No"}</span></div>}
                                {vreq.mobile !== 0 && <div className='flex justify-between'><span>Mobile:</span> <span>{vreq.mobile}</span></div>}
                                {vreq.sex !== "" && <div className='flex justify-between'><span>Sex:</span> <span>{vreq.sex}</span></div>}
                            </div>
                            
                            <div className='mt-6'>
                                <Link 
                                    to={`https://ecmaniacs-hack36.infura-ipfs.io/ipfs/${vreq.cid}`} 
                                    target="_blank"
                                    className='btn bg-[#282c32] text-[#d1d5db] border border-[#4b5563] hover:bg-[#323842] hover:border-[#60a5fa] transition-all w-full flex items-center justify-center'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                    </svg>
                                    View Document
                                </Link>
                            </div>
                        </div>

                        <div className='flex space-x-4'>
                            <button 
                                className='flex-1 btn bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 flex items-center justify-center' 
                                onClick={async () => {
                                    await verify(currentAccount, index, false);
                                    navigate('/admin');
                                }}
                            >
                                <RxCrossCircled className='mr-2 text-lg' />
                                Reject
                            </button>
                            <button 
                                className='flex-1 btn bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30 flex items-center justify-center' 
                                onClick={async () => {
                                    await verify(currentAccount, index, true);
                                    navigate('/admin');
                                }}
                            >
                                <TiTick className='mr-2 text-lg' /> 
                                Approve
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReqDetails;