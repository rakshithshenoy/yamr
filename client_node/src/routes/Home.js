import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";

const Home = () => {
  const [file, setFile] = useState();
  const [message, setMessage] = useState("");

  const [metadata, setMetadata] = useState({});

  const [readFile, setReadFile] = useState([]);
  const [readFile1, setReadFile1] = useState([]);
  const [readFile2, setReadFile2] = useState([]);
  const [readFile3, setReadFile3] = useState([]);

  // const readFile = [];

  const [fileBeingRead, setFileBeingRead] = useState(false);
  const [nameOfFileBeingRead, setNameOfFileBeingRead] = useState("");

  const handleSubmitWrite = async (e) => {
    try {
      const url = "http://localhost:2000/splitnormal";
      const formData = new FormData();
      formData.append("masterfile", file, file.name);
      // formData.append('fileName', file.name);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const response = await axios.post(url, formData, config);
      if (response) {
        // console.log(response.data);
        setMessage("File uploaded successfully!");
      }
    } catch (err) {
      setMessage(err.message);
    }
  };
  useEffect(() => {
    try {
      const getMetadata = async () => {
        const url = "http://localhost:2000/metadata";

        const response = await axios.get(url);

        if (response.data) {
          console.log(response.data.metadata);
          setMetadata(response.data.metadata);
        }
      };
      getMetadata();
    } catch (err) {
      setMessage(err.message);
    }
  }, [message]);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };
  return (
    <Layout>
      <div>
        <h3 className=" text-2xl font-bold text-background ml-20 py-4">
          Write a file to our Distributed File System
        </h3>

        <div class="flex items-center justify-center w-full">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-[90%] h-64 border-2 border-background border-dashed rounded-lg cursor-pointer bg-[#c8ecfa] dark:hover:bg-bray-800 hover:bg-[#c8ecfa] "
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                class="w-10 h-10 mb-3 text-webgreen"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p class="mb-2 text-sm text-webgreen ">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs text-webgreen dark:text-gray-400">
                .TXT FILES ONLY (MAX. 5MB)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              name="masterfile"
              onChange={handleChange}
            />
          </label>
        </div>
        {file && !message && (
          <div className="flex ml-24 items-center mt-4">
            <p className="text-background text-lg font-bold">
              Uploaded File:<span className="font-semibold"> {file.name}</span>
            </p>
            <button
              type="button"
              class="ml-8 text-white bg-[#2A9D8F] hover:px-4 hover:py-2 hover:bg-[#fff] hover:text-[#2A9D8F] hover:border-2 hover:border-webgreen  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 "
              onClick={handleSubmitWrite}
            >
              Submit
            </button>
          </div>
        )}

        {message && (
          <p className="text-background text-lg font-bold ml-24 mt-4">
            {message}
          </p>
        )}

        <h3 className=" text-2xl font-bold text-background ml-20 py-4 pt-20">
          Read files from our Distributed File System
        </h3>

        <div class="overflow-x-auto relative shadow-md sm:rounded-lg px-16 pb-12">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead class="text-xs text-white uppercase bg-[#264653]">
              <tr>
                <th scope="col" class="py-3 px-6">
                  File Name
                </th>
                <th scope="col" class="py-3 px-6">
                  File Type
                </th>
                <th scope="col" class="py-3 px-6">
                  File Size
                </th>
                <th scope="col" class="py-3 px-6">
                  No. of worker nodes
                </th>
                <th scope="col" class="py-3 px-6">
                  <span class="sr-only">Read</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {metadata.length ? (
                metadata?.map((obj) => {
                  return (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {obj.name}
                      </th>
                      <td class="py-4 px-6">{obj.mime}</td>
                      <td class="py-4 px-6">{obj.size} Bytes</td>
                      <td class="py-4 px-6">{obj.splits}</td>
                      <td class="py-4 px-6 text-right">
                        <button
                          type="button"
                          class=" text-white bg-[#2A9D8F] hover:bg-[#fff] hover:text-[#2A9D8F] hover:border-2 hover:border-webgreen  focus:outline-none  font-medium rounded-lg text-sm px-5 hover:px-4 hover:py-2 py-2.5 text-center mr-3 md:mr-0 block focus:ring-4 "
                          data-modal-toggle="popup-modal"
                          onClick={async () => {
                            const response = await axios.get(
                              `http://localhost:2000/read/${obj.name}`
                            );
                            if (response.data) {
                              readFile.push(...response.data.array);
                              readFile1.push(...response.data.arr1);
                              readFile2.push(...response.data.arr2);
                              readFile3.push(...response.data.arr3);
                            }

                            setTimeout(() => {
                              console.log("READ FILE", readFile);
                              setFileBeingRead(true);
                            }, 1000);
                          }}
                        >
                          Read
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
        {fileBeingRead ? (
          <div
            id="popup-modal"
            // tabindex="-1"
            class={`${
              fileBeingRead ? "" : "hidden"
            } overflow-y-auto overflow-x-hidden fixed top-52 right-0 left-0 z-50 p-4 md:inset-0 h-modal md:h-full w-full px-40`}
          >
            <div class="relative min-w-full max-w-md h-full md:h-auto mt-48 border-2 ">
              <div class="px-16 relative bg-white  shadow dark:bg-gray-700">
                <button
                  type="button"
                  class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-toggle="popup-modal"
                  onClick={() => {
                    setReadFile([]);
                    setReadFile1([]);
                    setReadFile2([]);
                    setReadFile3([]);
                    setFileBeingRead(false);
                  }}
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
                <div class="p-6 text-center flex justify-between">
                  <div className="mt-8 ">
                    <h3 class="p-4 mb-5 text-lg font-bold text-[#fff] dark:text-gray-400 bg-background">
                      File Content
                    </h3>
                    {readFile?.map((el) => {
                      return <p>{el}</p>;
                    })}
                  </div>
                  <div className="mt-8">
                    <h3 class="p-4 mb-5 text-lg font-bold text-[#fff] dark:text-gray-400 bg-background">
                      Worker Node 1
                    </h3>
                    {readFile1?.map((el) => {
                      return <p>{el}</p>;
                    })}
                  </div>
                  <div className="mt-8">
                    <h3 class="p-4 mb-5 text-lg font-bold text-[#fff] dark:text-gray-400 bg-background">
                      Worker Node 2
                    </h3>
                    {readFile2?.map((el) => {
                      return <p>{el}</p>;
                    })}
                  </div>
                  <div className="mt-8">
                    <h3 class="p-4 mb-5 text-lg font-bold text-[#fff] dark:text-gray-400 bg-background">
                      Worker Node 3
                    </h3>
                    {readFile3?.map((el) => {
                      return <p>{el}</p>;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}


      </div>


    </Layout>
  );
};

export default Home;
