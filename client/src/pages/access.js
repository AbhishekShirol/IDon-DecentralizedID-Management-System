import { useContext, useEffect, useState } from 'react'
import { TiTick } from 'react-icons/ti'
import { RxCrossCircled } from 'react-icons/rx'
import { useSearchParams } from 'react-router-dom'
import { TransactionContext } from "../context/TransactionContext";
import Nav from '../components/nav';

export default function Access() {
	const [orgName, setOrgName] = useState('');
	const { checkIfWalletIsConnect, giveAccess, currentAccount, getVerifierName } = useContext(TransactionContext);

	useEffect(() => {
		checkIfWalletIsConnect();

		getVerifierName(query.org.toLowerCase()).then((name) => {
			setOrgName(name);
		}).catch(err => console.log(err));
	}, []);

	const [searchParams, setSearchParams] = useSearchParams();
	const [query, setQuery] = useState({
		org: searchParams.get("org"),
		callback: searchParams.get("callback"),
		name: searchParams.get("name")==='1',
        sex: searchParams.get("sex")==='1',
        dob: searchParams.get("dob")==='1',
        mobile: searchParams.get("mobile")==='1',
        email: searchParams.get("email")==='1',
        college: searchParams.get("college")==='1',
        isOver18: searchParams.get("isOver18")==='1',
        isCollegeStudent: searchParams.get("isCollegeStudent")==='1'
	})

	const accept = async e => {
		e.preventDefault();
		
		await giveAccess(
			query.org,
			query.callback,
			query.name,
			query.sex,
			query.dob,
			query.mobile,
			query.email,
			query.college,
			query.isOver18,
			query.isCollegeStudent
		);
		
		const url = new URL(query.callback);
		url.searchParams.set("status", "200");
		url.searchParams.set("user", currentAccount);
		window.location.replace(url.href);
	};

	const reject = e => {
		e.preventDefault();

		const url = new URL(query.callback);
		url.searchParams.set("status", "401");
		window.location.replace(url.href);
	};

	return (
		<div className='w-full min-h-screen bg-gradient-to-b from-[#15171a] to-[#343538]'>
            <Nav />
			<div className='flex flex-col items-center justify-center w-full pt-24 px-4'>
				<div className='card w-full max-w-md p-8'>
					<div className='text-center mb-6'>
						<h1 className='text-2xl font-bold text-[#f9fafb]'>Data Access Request</h1>
						<p className='text-[#9ca3af] mt-2'>A third-party application is requesting access to your verified information</p>
					</div>
					
					<div className='bg-[#1f2937] p-4 rounded-lg mb-6'>
						<h3 className='text-lg font-medium text-[#d1d5db] mb-2'>Request from:</h3>
						<p className='text-[#f9fafb] font-medium'>{orgName || "Unknown Organization"}</p>
					</div>

					<div className='mb-8'>
						<h3 className='text-lg font-medium text-[#d1d5db] mb-4 border-b border-[#4b5563] pb-2'>Requested Information</h3>
						<div className='grid grid-cols-2 gap-3'>
							{query.name && <div className='bg-[#282c32] p-3 rounded-lg text-[#f9fafb]'>Name</div>}
							{query.sex && <div className='bg-[#282c32] p-3 rounded-lg text-[#f9fafb]'>Sex</div>}
							{query.dob && <div className='bg-[#282c32] p-3 rounded-lg text-[#f9fafb]'>Date of Birth</div>}
							{query.mobile && <div className='bg-[#282c32] p-3 rounded-lg text-[#f9fafb]'>Mobile</div>}
							{query.email && <div className='bg-[#282c32] p-3 rounded-lg text-[#f9fafb]'>Email</div>}
							{query.college && <div className='bg-[#282c32] p-3 rounded-lg text-[#f9fafb]'>College</div>}
							{query.isOver18 && <div className='bg-[#282c32] p-3 rounded-lg text-[#f9fafb]'>Age Verification (18+)</div>}
							{query.isCollegeStudent && <div className='bg-[#282c32] p-3 rounded-lg text-[#f9fafb]'>Student Status</div>}
						</div>
					</div>

					<div className='flex space-x-4'>
						<button className='flex-1 btn bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 flex items-center justify-center' onClick={reject}>
							<RxCrossCircled className='mr-2 text-lg' />
							Deny Access
						</button>
						<button className='flex-1 btn btn-primary flex items-center justify-center' onClick={accept}>
							<TiTick className='mr-2 text-lg' /> 
							Allow Access
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
