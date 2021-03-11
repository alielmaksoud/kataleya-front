import React from 'react'
import Sidebar from './Components/Sidebar/sidebar.js'
import items from './Components/Sidebar/SidebarData.js'
import Navbar from './Components/Navbar/Navbar.js'
import useVisible from './Service/useVisible'
import Protection from './loginPages/Protection'
import NewAdmin from './Pages/Admins/NewAdmin.js';
import ManageAdmin from './Pages/Admins/ManageAdmin';
import ManageUser from './Pages/Users/ManageUser';
import ManageItems from './Pages/Items/ManageItems1';
import NewItem from './Pages/Items/NewItem';

import Testimonials from "./Pages/Testimonials/Testimonials";
import Orders from "./Pages/Orders/Orders";
import ManageMessages from "./Pages/Messages/ManageMessages";
import ManageCategory from './Pages/Categories/ManageCategory';
import NewCategory from './Pages/Categories/NewCategory';
import ManageMessage from './Pages/Messages/ManageMessage';


import { 
  BrowserRouter as
   Router,
  Route,
   Switch }
from 'react-router-dom';


function Dashboard() {
  const { ref, ref2, isVisible, setIsVisible } = useVisible(false);
  
    
    const CheckSidebar = () => {
        setIsVisible(!isVisible);
    };



  return (
    <>
    <Router>

      <Navbar items={items} CheckSidebar={CheckSidebar}  isVisible={isVisible} forwardedRef={ref2}/>
      <Sidebar items={items}  CheckSidebar={CheckSidebar} forwardedRef={ref}
                isVisible={isVisible}/>
      <Switch>
      <Protection>
        <Route path='/admin/NewAdmin'>
            <NewAdmin />
        </Route>
        <Route path='/admin/ManageAdmin'>
            <ManageAdmin />
        </Route>
        <Route path='/admin/ManageUser'>
            <ManageUser />
        </Route>
        <Route path='/admin/Manageitems'>
            <ManageItems />
        </Route>
        <Route path='/admin/Newitem'>
            <NewItem />
        </Route>

        <Route path='/admin/ManageOrders'>
            <Orders />
        </Route>
        <Route path='/admin/ManageTestimonials'>
            <Testimonials/>
        </Route>
        <Route path='/admin/ManageMessages'>
            <ManageMessages/>
            </Route>
        <Route path='/admin/NewCategory'>
            <NewCategory />
        </Route>
        <Route path='/admin/ManageCategory'>
            <ManageCategory />
        </Route>
        <Route path='/admin/ManageMessage'>
            <ManageMessage />
        </Route>
         </Protection>
      </Switch>
    </Router>
  
    </>
  )
}

export default Dashboard;

