import { Posts } from "../cpms/posts";
import { Sidenav } from "../cpms/Sidenav";


export function Homepage(){
    return <div>
        <h1>Home page</h1>
        <Sidenav />
        <Posts />
    </div>
}