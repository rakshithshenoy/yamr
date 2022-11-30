import Navbar from "./Navbar";
function Layout(props) {
  return (
    <div>
      <Navbar />
      <div className="mt-32"></div>
      {props.children}
      <footer class="p-4 bg-background  shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span class="text-sm text-[#fff] sm:text-center dark:text-gray-400">
          © Big Data 2022{" "}
          <a href="https://" class="hover:underline">
            DivyaNoelRakshith™
          </a>
          . All Rights Reserved.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm text-[#fff] dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
           <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">
              Support
            </a>
          </li>
          {/*
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">
              Licensing
            </a>
          </li> */}
          <li>
            <a href="https://github.com/Projects-EC-2022/BD2_429_446_447" class="hover:underline">
              Github
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Layout;
