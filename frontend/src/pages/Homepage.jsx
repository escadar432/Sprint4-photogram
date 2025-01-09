import { Story } from "../cpms/Story.jsx";
import { Sidenav } from "../cpms/Sidenav.jsx";


export function Homepage(){
    return <div>
        <h1>Home page</h1>
        <Sidenav />
        <Story />
    </div>
}