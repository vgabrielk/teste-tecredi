import { useEffect, useState } from 'react'
import './App.css'
import Users from './views/Users';
import Todos from './views/Todos';
import { Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import Logo from './assets/svg/tecredilogo.svg'
import Car from './assets/gif/car.gif'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  const [activeTab, setActiveTab] = useState('1')

  const toggle = async (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  }

  return (
    <>
      <Nav className='bg-dark nav' tabs>
          <NavItem  >
            <NavLink
              className={`${activeTab === '1' ? 'active bg-primary border-0 text-light' : null} `}
              onClick={() => { toggle('1'); }}
            >
              Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`${activeTab === '2' ? 'active bg-primary border-0 text-light' : null} `}
              onClick={() => { toggle('2'); }}
            >
              ToDo List
            </NavLink>
          </NavItem>
        <div>
          <img src={Logo} className="logo-tecredi" alt="" />
        </div>
        <div>
          <img src={Car} className="car-tecredi" alt="" width='80px' />
        </div>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Users />
        </TabPane>
        <TabPane tabId="2">
          <Todos />
        </TabPane>
      </TabContent>
    </>
  )
}

export default App
