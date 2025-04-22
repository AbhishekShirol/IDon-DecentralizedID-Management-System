import { useContext } from "react"
import { useLocation } from "react-router"
import { TransactionContext } from "../context/TransactionContext"

export default function Nav() {
	const {currentAccount, isAdmin} = useContext(TransactionContext)
	const {pathname} = useLocation()

	return (
		<div className='w-full bg-[rgba(31,41,55,0.95)] backdrop-blur-md border-b border-[rgba(255,255,255,0.1)] px-8 py-4 fixed top-0 left-0 z-10'>
			<div className='flex justify-between items-center max-w-7xl mx-auto'>
				<h1 className='text-3xl font-bold text-[#f9fafb] tracking-wide'>
					<span className='text-[#60a5fa]'>ID</span>on
				</h1>
				
				{pathname !== '/admin' && ( 
					<div className='flex space-x-4'>
						<a
							href='/home/addDocument'
							className='btn btn-primary flex items-center'
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
								<path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
							</svg>
							Add Verification
						</a>
						<a
							href='/home'
							className='btn bg-[#282c32] text-[#d1d5db] border border-[#4b5563] hover:bg-[#323842] hover:border-[#60a5fa] transition-all'
						>
							My Requests
						</a>
					</div>
				)}
			</div>
		</div>
	)
}
