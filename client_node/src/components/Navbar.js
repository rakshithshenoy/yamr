import pic from "../YAMR-1.png";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  return (
    <nav class=" bg-[#264653] px-2 sm:px-4 py-4 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div class="container flex items-center  justify-between mx-auto">
        <button
          type="button"
          class="text-white my-2 bg-[#2A9D8F] hover:bg-[#fff] hover:text-[#2A9D8F] focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 "
          onClick={() => {
            navigate("/");
          }}
        >
          Read/ write
        </button>
        <a href="/" class="flex items-center">
          <img src={pic} class="h-24" alt="yamr Logo" />
        </a>

        <button
          type="button"
          class="text-white bg-[#2A9D8F] hover:bg-[#fff] hover:text-[#2A9D8F]  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 "
          onClick={() => {
            navigate("/mapreduce");
          }}
        >
          Map-reduce
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
