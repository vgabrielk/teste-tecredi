import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getList } from './todosActions'
import { getList as getUsers } from '../Users/userActions'
import { Button, Card, CardBody, Col, Container, Input, InputGroup, InputGroupText, Row, Toast, ToastBody, ToastHeader } from 'reactstrap'
import Select from 'react-select'
import { FaTrash } from 'react-icons/fa'
import { GoTasklist } from 'react-icons/go'
import { MdDone, MdError } from 'react-icons/md'
import { BsPencilFill } from 'react-icons/bs'
import './style.css'

const Todos = () => {

    const [toastSuccess, setToastSuccess] = useState(false)
    const [toastError, setToastError] = useState(false)

    const todos = useSelector(state => state.todos.todos)
    const todo = useSelector(state => state.todos.todo)
    const users = useSelector(state => state.users.users)



    const [title, setTitle] = useState("")
    const [userTaskId, setUserTaskId] = useState("")
    const [filterInput, setFilterInput] = useState("")
    const [bgSuccess, setBgSuccess] = useState(null)


    const dispatch = useDispatch()

    const [filter, setFilter] = useState(1)
    const optionstask = [
        {
            value: 1,
            label: 'ALL TASKS'
        },
        {
            value: 2,
            label: 'ONLY COMPLETE'
        },
        {
            value: 3,
            label: 'ONLY INCOMPLETE'
        }
    ]

    const fetchData = async () => {
        dispatch(getList(
            () => { },
            (error) => { console.log(error) }
        ))
    }

    const fetchUsers = async () => {
        dispatch(getUsers(
            () => { },
            (err) => console.log(err)
        ))
    }

    const switchData = async () => {
        !todo ? setTitle("") : setTitle(todo.title)
        !todo ? setUserTaskId("") : setUserTaskId(todo.userId)
    }

    const createTask = async () => {
        const data = {
            id: todos.length + 1,
            userId: userTaskId,
            title: title,
            completed: false
        }
        if (title.length > 0 && userTaskId) {
            const allData = [...todos, data]
            setTitle("")
            setUserTaskId(null)
            dispatch({
                type: 'TODOS_FETCH',
                payload: allData
            })
            setToastSuccess(true)
            setTimeout(() => {
                setToastSuccess(false)
            }, 2500)
            setTitle("")
            setUserTaskId(null)
        }
        else {
            setToastError(true)
            setTimeout(() => {
                setToastError(false)
            }, 2500)
        }
    }

    const updateTask = () => {
        if (title.length > 0 && userTaskId) {
            todo.title = title,
                todo.userId = userTaskId
            setToastSuccess(true)
            setTimeout(() => {
                setToastSuccess(false)
            }, 2500)
            setTitle("")
            setUserTaskId(null)
        }
        else {
            setToastError(true)
            setTimeout(() => {
                setToastError(false)
            }, 2500)
        }
    }

    const removeTask = async (todo) => {
        if (!confirm("do you really want to delete??")) {
            return false;
        }
        const removed = todos.filter((t) => t.id != todo.id);
        setToastSuccess(true)
        setTimeout(() => {
            setToastSuccess(false)
        }, 2500)
        dispatch({
            type: 'TODOS_FETCH',
            payload: removed
        })
    }

    useEffect(() => { fetchData() }, [])
    useEffect(() => { fetchUsers() }, [])
    useEffect(() => { switchData() }, [todo])

    const filteredTrue = todos.filter(todo => (todo.completed) == true);
    const filteredFalse = todos.filter(todo => (todo.completed) == false);

    return (
        <>
            {toastSuccess ? (
                <Toast className='bg-success position-fixed' style={{ right: '1rem', zIndex: '100', top: '1rem' }} >
                    <ToastHeader>
                        <MdDone className='text-success' size={40} />
                    </ToastHeader>
                    <ToastBody className='text-light fs-800'>
                        Sucesso!
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
                        Ops! Algo errado aconteceu
                    </ToastBody>
                </Toast>
            ) :
                null
            }
            <Card className='main-card'>
                <Container>
                    <CardBody>
                        <Row>
                            <Col sm="4" className='mb-1'>
                                <InputGroup >
                                    <InputGroupText>
                                        <GoTasklist />
                                    </InputGroupText>
                                    <Input
                                        onChange={(e) => {
                                            setTitle(e.target.value)
                                        }}
                                        value={title}
                                        placeholder="Register a new task"
                                    />
                                </InputGroup>
                            </Col>
                            <Col sm="4" className='mb-1'>
                                <Select
                                    placeholder="Select user"
                                    options={users.map(user => ({
                                        value: user.id,
                                        label: user.name
                                    }))}
                                    onChange={(e) => {
                                        setUserTaskId(e)
                                    }}
                                    value={userTaskId}
                                />
                            </Col>
                            <Col className='d-flex justify-content-end' sm="4">
                                <Button
                                    onClick={() => {
                                        !todo ? createTask() : updateTask()
                                    }}
                                >Submit</Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Container>
            </Card>
            <Card>
                <Container>
                    <CardBody>
                        <Row className='d-flex align-items-center justify-content-between'>
                            <Col sm='4' className='mb-1'>
                                {filter === 1 ? (
                                    <Input
                                        type='text'
                                        placeholder='Filter per name of task'
                                        onChange={(e) => {
                                            setFilterInput(e.target.value)
                                        }}
                                        value={filterInput}
                                    />
                                ) : null}
                            </Col>
                            <Col sm='8'>
                                <Select
                                    isClearable
                                    placeholder="Filter completed tasks or no"
                                    options={optionstask}
                                    onChange={(e) => setFilter(e.value)}
                                    value={optionstask.label}
                                />
                            </Col>

                        </Row>
                        <Row>
                            {filter === 1 ? todos.filter((val) => {
                                if (filterInput === "") {
                                    return val;
                                }

                                return val.title.toLowerCase().includes(filterInput.toLowerCase())
                            }).map(todo => (
                                <Col key={todo.id} sm="4" className='p-2'>
                                    <div>
                                        <Card className={todo.completed ? 'bg-success text-light' : 'bg-dark text-light'}
                                            onDoubleClick={() => {
                                                setBgSuccess(true)
                                            }} >
                                            <CardBody className='card-relative'  >
                                                <p className='pr-5'>{todo.title}</p>
                                                <div className='d-flex justify-content-between'>
                                                    <Button className="bg-transparent border-0 p-1"
                                                        onClick={() => {
                                                            removeTask(todo)
                                                        }}
                                                    >
                                                        <FaTrash size={20} className='text-light' />
                                                    </Button>
                                                    <Button className='bg-transparent border-0 p-1'
                                                        onClick={() => {
                                                            dispatch({
                                                                type: 'TODO_FETCH',
                                                                payload: todo
                                                            })
                                                            window.scrollTo({ top: 0, behavior: 'smooth' });

                                                        }}
                                                    >
                                                        <BsPencilFill />
                                                    </Button>
                                                </div>

                                            </CardBody>
                                        </Card>
                                    </div>
                                </Col>
                            )) : null}
                        </Row>
                        <Row>
                            {filter === 2 ? filteredTrue.map(todo => (
                                <Col key={todo.id} sm="4" className='p-2'>
                                    <Card className='bg-success text-light' >
                                        <CardBody className='card-relative'  >
                                            <p className='pr-5'>{todo.title}</p>
                                            <div className='d-flex justify-content-between'>
                                                    <Button className="bg-transparent border-0 p-1"
                                                        onClick={() => {
                                                            removeTask(todo)
                                                        }}
                                                    >
                                                        <FaTrash size={20} className='text-light' />
                                                    </Button>
                                                    <Button className='bg-transparent border-0 p-1'
                                                        onClick={() => {
                                                            dispatch({
                                                                type: 'TODO_FETCH',
                                                                payload: todo
                                                            })
                                                            window.scrollTo({ top: 0, behavior: 'smooth' });

                                                        }}
                                                    >
                                                        <BsPencilFill />
                                                    </Button>
                                                </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )) : null}
                        </Row>

                        <Row>
                            {filter === 3 ? filteredFalse.map(todo => (
                                <Col sm="4" className='p-2'>
                                    <Card className='bg-dark text-light' >
                                        <CardBody className='card-relative'  >
                                            <p className='pr-5'>{todo.title}</p>
                                            <div className='d-flex justify-content-between'>
                                                    <Button className="bg-transparent border-0 p-1"
                                                        onClick={() => {
                                                            removeTask(todo)
                                                        }}
                                                    >
                                                        <FaTrash size={20} className='text-light' />
                                                    </Button>
                                                    <Button className='bg-transparent border-0 p-1'
                                                        onClick={() => {
                                                            dispatch({
                                                                type: 'TODO_FETCH',
                                                                payload: todo
                                                            })
                                                            window.scrollTo({ top: 0, behavior: 'smooth' });

                                                        }}
                                                    >
                                                        <BsPencilFill />
                                                    </Button>
                                                </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )) : null}
                        </Row>


                    </CardBody>
                </Container>
            </Card>
        </>
    )
}

export default Todos