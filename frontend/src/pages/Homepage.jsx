import { Story } from "../cpms/Story.jsx";
import { Sidenav } from "../cpms/Sidenav.jsx";

export function Homepage() {

  const loggedinUser = usersCollection.find({ _id: loggedinUser._id })
  const following = loggedinUser.following.map((user) => user._id)
  const feed = storiesCollection.find({ "by._id": { $in: following } }).sort({ _id: -1 })
  const myPosts = storiesCollection.find({ "by._id": loggedinUser._id }).sort({ _id: -1 })

  return (
    <div>
      <h1>Home page</h1>
      <Sidenav />
      <Story />
    </div>
  );
}
