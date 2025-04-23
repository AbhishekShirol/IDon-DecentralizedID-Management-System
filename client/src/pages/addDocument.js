import React, { useContext, useEffect, useState } from "react";
import { create  } from "ipfs-http-client";
import { TransactionContext } from "../context/TransactionContext";
import Web3 from 'web3';
import { ethers } from "ethers";
import Nav from "../components/nav";
import { projectId,projectSecretKey } from "../utils/constants";

const AddDocument = () => {
	const initialState = {
		name: '',
		dob: '',
		mobile: 0,
		sex: '',
		college: '',
		email: '',
		verifier: '',
		cid: '',
	}
	const [formData, setFormData] = useState(initialState)
	const [application, setApplication] = useState('Select')
	const [document, setDocument] = useState('Select')
	const [isHash, setIsHash] = useState(0)

	const [fields, setFields] = useState([])
	const [selectedField, setSelectedField] = useState()
	const { submitDocument, getVerifierAddress } = useContext(TransactionContext)
	
	const authorization =
		'Basic ' + window.btoa(projectId + ':' + projectSecretKey)

	const ipfs = create({
		url: 'https://ipfs.infura.io:5001/api/v0',
		headers: {
			authorization,
		},
	})
	
	useEffect(() => {
		if (isHash == 1) {
			const { name, dob, mobile, sex, college, email, verifier, cid } = formData
			submitDocument(verifier,cid,name,sex,dob,parseInt(mobile),email,college);
		}
	}, [isHash])

const getHash = (cid, name) => {
	try {
		getVerifierAddress(name).then(address => {
			setFormData({ ...formData, cid, verifier: address });
			setIsHash(1);
		});
	} catch (error) {
		console.log(error)
	}
}

const handleSubmit = async (e) => {
	e.preventDefault()
	
	const form = e.target
	
	if (!form || form.length === 0) {
		return alert('No files selected')
	}
	const doc = form[2].files[0]
	const result = await ipfs.add(doc)
	getHash(result.path, formData.verifier);
}

	
	const documentMap = {
		Select: [],
		'Student Status': ['College ID', 'College Result Transcript'],
		'Identity Proof': [
			'Aadhar Card',
			'Pan Card',
			'Driving License',
			'Passport',
		],
		'Educational Certificates': [
			'10th Mark sheet',
			'12th Mark sheet',
			'College Result Transcript',
		],
	}

	const verifierMap = {
		Select: [],
		'College ID': ['PES'],
		'Aadhar Card': ['UIDAI'],
		'Pan Card': ['UIDAI'],
		'Driving License': ['RTO'],
		'Passport': ['UIDAI'],
		'10th Mark sheet': ['PES'],
		'12th Mark sheet': ['PES'],
		'College Result Transcript': ['PES'],
	}
	const handleChange = (e) => {
		setFormData((prev) => {
			return { ...prev, [e.target.name]: e.target.value }
		})
	}

	function Field(name, type) {
		if (type === 'dob') {
			return (
				<div className='w-[40%] my-3'>
					<label className="block text-[#d1d5db] mb-2">{name}</label>
					<input
						className='appearance-none block w-full bg-[#282c32] text-[#f9fafb] border border-[#4b5563] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[#323842] focus:border-[#60a5fa] transition-all'
						type='date'
						name={type}
						onChange={handleChange}
					/>
				</div>
			)
		}

		if (type === 'sex') {
			return (
				<div className='w-[40%] my-3'>
					<label className="block text-[#d1d5db] mb-2">{name}</label>
					<select
						className='block appearance-none w-full bg-[#282c32] text-[#f9fafb] border border-[#4b5563] py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-[#323842] focus:border-[#60a5fa] transition-all'
						name='sex'
						onChange={handleChange}
					>
						<option defaultChecked hidden>
							Select
						</option>
						<option value='Male'>Male</option>
						<option value='Female'>Female</option>
						<option value='Other'>Other</option>
					</select>
				</div>
			)
		}

		return (
			<div className='w-[40%] my-3'>
				<label className="block text-[#d1d5db] mb-2">{name}</label>
				<input
					className='appearance-none block w-full bg-[#282c32] text-[#f9fafb] border border-[#4b5563] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[#323842] focus:border-[#60a5fa] transition-all'
					type='text'
					placeholder={name}
					name={type}
					onChange={handleChange}
				/>
			</div>
		)
	}

	console.log(formData)

	return (
		<div className='w-full min-h-screen bg-gradient-to-b from-[#15171a] to-[#343538] text-[#f9fafb]'>
			<Nav />

			<div className='flex flex-col items-center w-full pb-20 pt-24'>
				<h1 className='text-3xl font-bold mb-8'>Add Verification Request</h1>

				<div className='card w-full max-w-3xl p-8 bg-[rgba(37,40,43,0.95)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] rounded-lg shadow-lg'>
					<form
						className='flex flex-col items-center w-full'
						onSubmit={handleSubmit}
					>
						<div className='w-[90%] my-3'>
							<label className="block text-[#d1d5db] mb-2">Application</label>
							<select
								className='block appearance-none w-full bg-[#282c32] text-[#f9fafb] border border-[#4b5563] py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-[#323842] focus:border-[#60a5fa] transition-all'
								placeholder='application'
								onChange={(e) => setApplication(e.target.value)}
							>
								<option>Select</option>
								<option>Student Status</option>
								<option>Identity Proof</option>
								<option>Educational Certificates</option>
							</select>
						</div>

						<div className='w-[90%] my-3'>
							<label className="block text-[#d1d5db] mb-2">Type of Document</label>
							<select
								className='block appearance-none w-full bg-[#282c32] text-[#f9fafb] border border-[#4b5563] py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-[#323842] focus:border-[#60a5fa] transition-all'
								placeholder='type of document'
								onChange={(e) => setDocument(e.target.value)}
							>
								<option>Select</option>
								{documentMap[application].map((val) => (
									<option>{val}</option>
								))}
							</select>
						</div>
						<div className='w-[90%] my-3'>
							<label className="block text-[#d1d5db] mb-2">Document</label>
							<div className="relative">
								<input
									className='appearance-none block w-full bg-[#282c32] text-[#f9fafb] border border-[#4b5563] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[#323842] focus:border-[#60a5fa] transition-all file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#60a5fa] file:text-[#1f2937] file:font-medium hover:file:bg-[#3b82f6]'
									id='grid-first-name'
									type='file'
									placeholder='Jane'
									name='doc'
								/>
							</div>
						</div>
						<div className='w-[90%] my-3'>
							<label className="block text-[#d1d5db] mb-2">Verifier</label>
							<select
								className='block appearance-none w-full bg-[#282c32] text-[#f9fafb] border border-[#4b5563] py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-[#323842] focus:border-[#60a5fa] transition-all'
								placeholder='type of document'
								name="verifier"
								onChange={(e)=>{
									setFormData((prev)=>{
										return {...prev,verifier:e.target.value}
									})
								}}
							>
								<option>Select</option>
								{verifierMap[document].map((val) => (
									<option value={val}>{val}</option>
								))}
							</select>
						</div>

						{fields}

						{/* ADD FIELDS */}
						<div className='w-[90%] my-3'>
							<label className="block text-[#d1d5db] mb-2">Add Fields</label>
							<div className='flex w-full gap-4'>
								<select
									className='block appearance-none w-1/2 bg-[#282c32] text-[#f9fafb] border border-[#4b5563] py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-[#323842] focus:border-[#60a5fa] transition-all'
									placeholder='type of document'
									onChange={(e) => {
										setSelectedField(e.target.value)
									}}
								>
									<option>Select</option>
									<option>Name</option>
									<option>Date of Birth</option>
									<option>Gender</option>
									<option>Mobile</option>
									<option>Email</option>
									<option>College Name</option>
								</select>
								<button
									onClick={(e) => {
										e.preventDefault()
										console.log(selectedField)
										if (selectedField === 'Name')
											setFields([
												...fields,
												Field(selectedField, 'name', handleChange),
											])
										else if (selectedField === 'Date of Birth')
											setFields([
												...fields,
												Field(selectedField, 'dob', handleChange),
											])
										else if (selectedField === 'Gender')
											setFields([
												...fields,
												Field(selectedField, 'sex', handleChange),
											])
										else if (selectedField === 'Mobile')
											setFields([
												...fields,
												Field(selectedField, 'mobile', handleChange),
											])
										else if (selectedField === 'Email')
											setFields([
												...fields,
												Field(selectedField, 'email', handleChange),
											])
										else if (selectedField === 'College Name')
											setFields([
												...fields,
												Field(selectedField, 'college', handleChange),
											])
									}}
									className='w-1/2 py-3 px-4 bg-[#60a5fa] text-[#1f2937] rounded font-medium hover:bg-[#3b82f6] transition-all flex items-center justify-center gap-2'
								>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
									</svg>
									Add Field
								</button>
							</div>
						</div>

						<div className='w-[90%] my-5'>
							<button
								type='submit'
								className='w-full py-3 px-4 bg-[#60a5fa] text-[#1f2937] rounded font-medium hover:bg-[#3b82f6] transition-all flex items-center justify-center gap-2'
							>
								Submit Request
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='20'
									height='20'
									viewBox='0 0 24 24'
								>
									<path
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										d='M6 12.4h12M12.6 7l5.4 5.4l-5.4 5.4'
									/>
								</svg>
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default AddDocument
