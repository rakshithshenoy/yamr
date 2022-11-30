import pic from "../YAMR-1.png";
function Navbar() {
  return (
    <nav class=" bg-[#264653] px-2 sm:px-4 py-4 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div class="container flex items-center  justify-between mx-auto">
        <button
          type="button"
          class="text-white my-2 bg-[#2A9D8F] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read/ write
        </button>
        <a href="https://flowbite.com/" class="flex items-center">
          <img src={pic} class="h-24" alt="yamr Logo" />
        </a>

        <button
          type="button"
          class="text-white bg-[#2A9D8F] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Map-reduce
        </button>

      </div>
    </nav>
  );
}

export default Navbar;
