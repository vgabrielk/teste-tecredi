
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getList } from './userActions'
import './style.css'
import { Button, Card, CardBody, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupText, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table, Toast, ToastBody, ToastHeader, UncontrolledButtonDropdown } from 'reactstrap'
import { RiUserSearchFill } from 'react-icons/ri'
import InputMask from 'react-input-mask'
import { MdDone, MdError } from 'react-icons/md'


const Users = () => {

	const [modal, setModal] = useState(false)
	const [search, setSearch] = useState("")
	const [toastSuccess, setToastSuccess] = useState(false)
	const [toastError, setToastError] = useState(false)
	const [username, setUserName] = useState("")
	const [name, setName] = useState("")
	const [phone_number, setPhoneNumber] = useState("")
	const [email, setEmail] = useState("")
	const [website, setWebsite] = useState("")
	const [company, setCompany] = useState("")
	const [street_add, setStreet] = useState("")

	const [errorsForm, setErrorsForm] = useState(false)

	const users = useSelector(state => state.users.users)
	const user = useSelector(state => state.users.user)
	const dispatch = useDispatch()

	const fetchData = async (e) => {
		e.preventDefault()
		dispatch(getList(
			() => {
			},
			(error) => {
				console.log(error)
			}
		))
	}
	const switchData = async () => {
		!user ? setName("") : setName(user.name)
		!user ? setUserName("") : setUserName(user.username)
		!user ? setPhoneNumber("") : setPhoneNumber(user.phone)
		!user ? setEmail("") : setEmail(user.email)
		!user ? setWebsite("") : setWebsite(user.website)
		!user ? setStreet("") : setStreet(user.address.street)
		!user ? setCompany("") : setCompany(user.company.name)
	}
	const modalUsers = () => setModal(!modal)

	const createUser = () => {
		const data = {
			id: users.length + 1,
			name: name,
			username: username,
			phone: phone_number,
			email: email,
			website: website || "...",
			address: {
				street: street_add
			},
			company: {
				name: company || "..."
			},
		}
		if (name === "" || username === "" || phone_number === "" || email === "" || street_add === "") {
			setToastError(true)
			setTimeout(() => {
				setToastError(false)
			}, 2500)
			setErrorsForm(true)
		}
		else {
			const allData = [...users, data]
			modalUsers()
			dispatch({
				type: 'USERS_FETCH',
				payload: allData
			})
			setToastSuccess(true)
			setTimeout(() => {
				setToastSuccess(false)
			}, 2500)


		}
	}

	const updateUser = () => {
		if (name === "" || username === "" || phone_number === "" || email === "" || street_add === "") {
			setErrorsForm(true)
		}
		else {
			user.phone = phone_number,
				user.company.name = company
			user.address.street = street_add,
				user.name = name,
				user.username = username,
				user.email = email,
				user.website = website
			setToastSuccess(true)
			setTimeout(() => {
				setToastSuccess(false)
			}, 2500)
			modalUsers()
		}
	}
	const removeUser = (user) => {
		if (!confirm("do you really want to delete??")) {
			return false;
		}
		const removed = users.filter((u) => u.id != user.id);
		setToastSuccess(true)
		setTimeout(() => { setToastSuccess(false) }, 2500)
		dispatch({
			type: 'USERS_FETCH',
			payload: removed
		})

	}

	useEffect(() => {
		fetchData()

	}, [])
	useEffect(() => {
		switchData()
	}, [user])

	return (
		<>
			{toastSuccess ? (
				<Toast className='bg-success position-fixed' style={{ right: '1rem', zIndex: '100', top: '1rem' }} >
					<ToastHeader>
						<MdDone className='text-success' size={40} />
					</ToastHeader>
					<ToastBody className='text-light fs-800'>
						Success!
					</ToastBody>
				</Toast>
			) :
				null
			}
			{toastError ? (
				<Toast className='bg-danger position-fixed' style={{ right: '1rem', zIndex: '100', top: '1rem' }} >
					<ToastHeader>
						<MdError className='text-danger' size={40} />
					</ToastHeader>
					<ToastBody className='text-light fs-800'>
						An error has occurred!
					</ToastBody>
				</Toast>
			) :
				null
			}
			<Card className='main-card'>
				<CardBody>
					<Container>
						<div>
							<Button
								onClick={() => {
									dispatch({
										type: 'USER_FETCH',
										payload: null
									})
									modalUsers()
									switchData()
								}}
								color='primary'>Register a new user
							</Button>
						</div>
						<Modal isOpen={modal} toogle={modalUsers} >
							<ModalHeader>
								{!user ? "Register user" : "Edit user"}
								<p style={{ fontSize: '.8rem' }}>Required input*</p>
							</ModalHeader>
							<ModalBody>
								<Row>
									<Col sm="6">
										<Label>Name*</Label>
										<Input
											type='text'
											placeholder='Type your name'
											onChange={(e) => { setName(e.target.value) }}
											value={name}
										/>
										{name === "" && errorsForm === true ? <p className='text-danger' style={{ fontSize: '.7rem' }}>Name is required</p> : null}
									</Col>
									<Col sm="6">
										<Label>User Name*</Label>
										<Input
											type='text'
											placeholder='Type your user name'
											onChange={(e) => { setUserName(e.target.value) }}
											value={username}
										/>
										{username === "" && errorsForm === true ? <p className='text-danger' style={{ fontSize: '.7rem' }}>Username is required</p> : null}
									</Col>
									<Col sm="4">
										<Label>Email*</Label>
										<Input
											type='text'
											placeholder='Type your email'
											onChange={(e) => { setEmail(e.target.value) }}
											value={email}
										/>
										{email === "" && errorsForm === true ? <p className='text-danger' style={{ fontSize: '.7rem' }}>Email is required</p> : null}
									</Col>
									<Col sm="8">
										<Label>Street name*</Label>
										<Input
											type='text'
											placeholder='Type your street name'
											onChange={(e) => { setStreet(e.target.value) }}
											value={street_add}
										/>
										{street_add === "" && errorsForm === true ? <p className='text-danger' style={{ fontSize: '.7rem' }}>Name is required</p> : null}
									</Col>
									<Col sm="12">
										<Label>Phone*</Label>
										<InputMask
											onChange={(e) => { setPhoneNumber(e.target.value) }}
											value={phone_number}
											mask='(99) 99999 9999'
											className='form-control'
											type='text'
											placeholder='Type your phone number'
										/>
										{phone_number === "" && errorsForm === true ? <p className='text-danger' style={{ fontSize: '.7rem' }}>Phone is required</p> : null}
									</Col>
									<Col sm="6">
										<Label>Website</Label>
										<Input
											onChange={(e) => { setWebsite(e.target.value) }}
											value={website}
											type='text'
											placeholder='Type a url'
										/>
									</Col>
									<Col sm="6">
										<Label>Company</Label>
										<Input
											onChange={(e) => { setCompany(e.target.value) }}
											value={company}
											type='text'
											placeholder='Type name of company'
										/>
									</Col>
								</Row>
							</ModalBody>
							<ModalFooter>
								<Button color='primary'
									onClick={() => {
										!user ? createUser() : updateUser()
									}}
								>
									{!user ? "Register user" : "Update user"}
								</Button>
								<Button
									onClick={() => {
										modalUsers()
										setErrorsForm(false)
										{ !user ? null : switchData() }
									}}
									color='secondary'>Cancel</Button>
							</ModalFooter>
						</Modal>
						<div className='my-3'>
							<InputGroup>
								<InputGroupText>
									<RiUserSearchFill className='text-dark' size={30} />
								</InputGroupText>
								<Input placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
							</InputGroup>

						</div>
							<p>Scroll to view the table...</p>
						<div className='table-responsive'>
							<Table className='table-md table-bordered text-center'>
								<thead className='text-primary' >
									<tr>
										<th>ID</th>
										<th>Name</th>
										<th>UserName</th>
										<th>Email</th>
										<th>Address</th>
										<th>Phone</th>
										<th>Website</th>
										<th>Company</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{users.filter((val) => {
										if (search === "") {
											return val;
										}
										return (
											val.name.toLowerCase().includes(search.toLowerCase()) ||
											val.email.toLowerCase().includes(search.toLowerCase()) ||
											val.username.toLowerCase().includes(search.toLowerCase()) ||
											val.company.name.toLowerCase().includes(search.toLowerCase())
										)

									}).map(user => (
										<tr key={user.id} className='text-nowrap'>
											<td>{user.id}</td>
											<td>{user.name}</td>
											<td>{user.username}</td>
											<td>{user.email}</td>
											<td>{user.address.street}</td>
											<td>{user.phone}</td>
											<td>{user.website}</td>
											<td>{user.company.name}</td>
											<td>
												<UncontrolledButtonDropdown>
													<DropdownToggle caret size="sm">Settings</DropdownToggle>
													<DropdownMenu>
														<DropdownItem
															className='w-100'
															onClick={() => {
																dispatch({
																	type: 'USER_FETCH',
																	payload: user
																})
																switchData()
																modalUsers()
															}}
														>
															Edit
														</DropdownItem>
														<DropdownItem
															className='w-100'
															onClick={() => {
																removeUser(user)
																fetchData()
															}}
														>
															Delete
														</DropdownItem>
													</DropdownMenu>
												</UncontrolledButtonDropdown>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</div>
					</Container>
				</CardBody>
			</Card>
		</>
	)
}

export default Users