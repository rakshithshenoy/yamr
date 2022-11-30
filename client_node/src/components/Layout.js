import Navbar from "./Navbar"
function Layout(props) {
  return (<div>
    <Navbar/>
    <div className="mt-16"></div>
    {props.children}
  </div>  );
}

export default Layout;