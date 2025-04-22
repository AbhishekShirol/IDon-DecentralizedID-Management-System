import { useContext, useEffect, useState } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import { useNavigate } from 'react-router-dom'
import Nav from '../components/nav'

const Home = () => {
	const { currentAccount, loadUserList, userVReqList, isAdmin } = useContext(TransactionContext)
	const navigate = useNavigate()

  useEffect(() => {
    loadUserList();
  },[])

  useEffect(() => {
    if (isAdmin !== undefined) {
      if(isAdmin)
        navigate('/admin')
    };
  }, [isAdmin]);

  useEffect(() => {
    if (currentAccount != undefined && isAdmin != undefined) {
      if(isAdmin)
        navigate('/admin')
      else 
        navigate('/home')
    };
  }, [currentAccount]);

  // console.log("userVReqList:", userVReqList);

	return (
		<div className='w-full min-h-screen bg-gradient-to-b from-[#15171a] to-[#343538]'>
      <Nav />

			<div className='flex flex-col items-center w-full pt-24 px-4'>
				<h1 className='text-3xl font-bold mb-8 text-[#f9fafb]'>My Request Status</h1>

				<div className='card w-full max-w-3xl overflow-hidden'>
          <div className='bg-[#1f2937] py-4 px-6'>
            <h2 className='text-xl font-semibold text-[#f9fafb]'>Verification Requests</h2>
          </div>
          
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-[#282c32] text-left'>
                <tr>
                  <th className='py-4 px-6 text-sm font-medium text-[#d1d5db]'>ID</th>
                  <th className='py-4 px-6 text-sm font-medium text-[#d1d5db]'>Verifier</th>
                  <th className='py-4 px-6 text-sm font-medium text-[#d1d5db]'>Status</th>
                </tr>
              </thead>

              <tbody>
                {userVReqList.length > 0 ? (
                  userVReqList.map(({ verifier, status }, index) => (
                    <tr key={index} className='border-b border-[#4b5563]'>
                      <td className='py-4 px-6 text-sm text-[#f9fafb]'>{index}</td>
                      <td className='py-4 px-6 text-sm text-[#f9fafb]'>{verifier ? verifier : 'UIDAI'}</td>
                      <td className='py-4 px-6 text-sm'>
                        {status == 0 && <span className='px-2 py-1 bg-yellow-900/30 text-yellow-300 rounded'>PROCESSING</span>}
                        {status == 1 && <span className='px-2 py-1 bg-green-900/30 text-green-300 rounded'>ACCEPTED</span>}
                        {status == -1 && <span className='px-2 py-1 bg-red-900/30 text-red-300 rounded'>REJECTED</span>}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className='py-8 text-center text-[#9ca3af]'>No verification requests found</td>
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

export default Home
