import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { Navigate, useNavigate} from "react-router-dom";
import Nav from "../components/nav";

const Verifier = () => { 
	const { currentAccount, isAdmin, verifierVReqList, loadVerifierList } = useContext(TransactionContext);
	const navigate = useNavigate();

	useEffect(() => {
		loadVerifierList();
	}, []);

  useEffect(() => {
    if (currentAccount != "") {
		  if(isAdmin)
        navigate('/admin')
      else 
        navigate('/home')
    };
  }, [currentAccount]);

  return (
    <div className='w-full min-h-screen bg-gradient-to-b from-[#15171a] to-[#343538]'>
      <Nav />
      <div className='flex flex-col items-center w-full pt-24 px-4'>
        <h1 className="text-3xl font-bold mb-8 text-[#f9fafb]">Verification Panel</h1>
        
        <div className='card w-full max-w-3xl overflow-hidden'>
          <div className='bg-[#1f2937] py-4 px-6'>
            <h2 className='text-xl font-semibold text-[#f9fafb]'>Pending Verifications</h2>
          </div>
          
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-[#282c32] text-left'>
                <tr>
                  <th className='py-4 px-6 text-sm font-medium text-[#d1d5db]'>ID</th>
                  <th className='py-4 px-6 text-sm font-medium text-[#d1d5db]'>Address</th>
                  <th className='py-4 px-6 text-sm font-medium text-[#d1d5db]'>Status</th>
                  <th className='py-4 px-6 text-sm font-medium text-[#d1d5db]'>Action</th>
                </tr>
              </thead>
              
              <tbody>
                {verifierVReqList.length > 0 ? (
                  verifierVReqList.map(({user, status}, index) => (
                    <tr key={index} className='border-b border-[#4b5563]'>
                      <td className='py-4 px-6 text-sm text-[#f9fafb]'>{index+1}</td>
                      <td className='py-4 px-6 text-sm text-[#f9fafb] font-mono'>{user.substring(0, 6)}...{user.substring(user.length - 4)}</td>
                      <td className='py-4 px-6 text-sm'>
                        {status === 0 && <span className='px-2 py-1 bg-yellow-900/30 text-yellow-300 rounded'>PROCESSING</span>}
                        {status === 1 && <span className='px-2 py-1 bg-green-900/30 text-green-300 rounded'>ACCEPTED</span>}
                        {status === -1 && <span className='px-2 py-1 bg-red-900/30 text-red-300 rounded'>REJECTED</span>}
                      </td>
                      <td className='py-4 px-6 text-sm'>
                        {status === 0 && (
                          <button
                            onClick={() => navigate(`/admin/${index+1}`)}
                            className='btn btn-primary text-sm'
                          >
                            View Details
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className='py-8 text-center text-[#9ca3af]'>No verification requests found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Verifier;