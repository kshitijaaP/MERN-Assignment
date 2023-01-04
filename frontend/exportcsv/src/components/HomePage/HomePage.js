import { useState } from "react"
import {NavLink} from "react-router-dom"
import Header from "../Header/Header"
import './HomePage.css'
export default function HomePage()


{ const [open, setOpen] = useState(false)
    return(
        <div className="HomeHeader">
           
            <div style={{backgroundColor:'black',height:'70px'}}>
                <ul className="navBarStyle">
                    <li style={{  float: 'left',listStyleType:'none',marginRight:'20px',textDecoration:'none',color:'whitesmoke'}}>
                    <NavLink  style={{  float: 'left',listStyleType:'none',marginRight:'20px',textDecoration:'none',color:'whitesmoke',fontWeight:'bold'}} to={"/"}>Dashboard</NavLink>
                        {/* <a onClick={() => setOpen(true)}>Click Me</a>{open && <MyComponent />} */}
                    </li>
                    <li style={{  float: 'left',listStyleType:'none' ,marginRight:'20px',textDecoration:'none'}}>
                        <NavLink  style={{  float: 'left',listStyleType:'none',marginRight:'20px',textDecoration:'none',color:'whitesmoke',fontWeight:'bold'}} to={"/exportcsv"}>Export CSV</NavLink>
                        </li>
                    <li style={{  float: 'left',listStyleType:'none'}}>
                        <NavLink  style={{  float: 'left',listStyleType:'none',marginRight:'20px',textDecoration:'none',color:'whitesmoke',fontWeight:'bold'}} to={"/importcsv"}>Import CSV</NavLink>
                   </li>
                </ul>
            </div>
          
        </div>
    )
}