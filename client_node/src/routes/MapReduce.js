import { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

function MapReduce() {
  const [isLoading, setIsLoading] = useState(false);
  const [mapper, setMapper] = useState();
  const [reducer, setReducer] = useState();
  const [name, setName] = useState();

  const [mapRedName, setMapRedName] = useState("");

  const [mapData, setMapData] = useState([]);
  const [mapData1, setMapData1] = useState([]);
  const [mapData2, setMapData2] = useState([]);
  const [mapData3, setMapData3] = useState([]);
  const [receivedMapResult, setReceivedMapResult] = useState(false);

  const [shuffleData, setShuffleData] = useState([]);
  const [shuffleData1, setShuffleData1] = useState([]);
  const [shuffleData2, setShuffleData2] = useState([]);
  const [shuffleData3, setShuffleData3] = useState([]);
  const [receivedShuffleResult, setReceivedShuffleResult] = useState(false);

  const [reduceData, setReduceData] = useState([]);
  const [reduceData1, setReduceData1] = useState([]);
  const [reduceData2, setReduceData2] = useState([]);
  const [reduceData3, setReduceData3] = useState([]);
  const [receivedReduceResult, setReceivedReduceResult] = useState(false);

  const handleMapperChange = (event) => {
    setMapper(event.target.files[0]);
  };
  const handleReducerChange = (event) => {
    setReducer(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    try {
      if (!mapper || !reducer || !name || name.slice(-4) != ".txt") return;
      setMapRedName("");
      setReceivedMapResult(false);
      setReceivedShuffleResult(false);
      setReceivedReduceResult(false);

      const url = `http://localhost:2000/uploadfiles/${name}`;
      const formData = new FormData();
      formData.append("mapper", mapper, mapper.name);
      formData.append("reducer", reducer, reducer.name);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const response = await axios.post(url, formData, config);
      if (response) {
        console.log(response.data);
        setMapRedName(name);
        setMapper();
        setReducer();
        setName("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout>
      <div className="min-h-[100vh]">
        <h3 className=" text-2xl font-bold text-background ml-12 py-4">
          Write your mapper or reducer to our Distributed File System
        </h3>
        <div className="flex">
          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file-1"
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
                  <span class="font-semibold">Click to upload mapper</span> or
                  drag and drop
                </p>
                <p class="text-xs text-webgreen dark:text-gray-400">
                  .js FILES ONLY (MAX. 5MB)
                </p>
              </div>
              <input
                id="dropzone-file-1"
                type="file"
                class="hidden"
                name="mapper"
                onChange={handleMapperChange}
              />
            </label>
          </div>

          <div></div>

          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file-2"
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
                  <span class="font-semibold">Click to upload reducer</span> or
                  drag and drop
                </p>
                <p class="text-xs text-webgreen dark:text-gray-400">
                  .js FILES ONLY (MAX. 5MB)
                </p>
              </div>
              <input
                id="dropzone-file-2"
                type="file"
                class="hidden"
                name="reducer"
                onChange={handleReducerChange}
              />
            </label>
          </div>
        </div>

        <div className="flex justify-around">
          {mapper && (
            <div className="flex  items-center mt-4 mx-12">
              <p className="text-background text-lg font-bold">
                Uploaded Mapper:
                <span className="font-semibold"> {mapper.name}</span>
              </p>
            </div>
          )}
          {reducer && (
            <div className="flex  items-center mt-4 mx-12">
              <p className="text-background text-lg font-bold">
                Uploaded Reducer:
                <span className="font-semibold"> {reducer.name}</span>
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center mt-8 justify-center ">
          <label className="text-background font-bold text-xl ">
            Enter the name of the file{" "}
          </label>

          <input
            type="text"
            className="border-2 border-webgreen   ml-4 "
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
          <button
            type="button"
            class="ml-8 text-white bg-[#2A9D8F] hover:px-4 hover:py-2 hover:bg-[#fff] hover:text-[#2A9D8F] hover:border-2 hover:border-webgreen  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 "
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        </div>

        {mapRedName ? (
          <div>
            <h3 className=" text-2xl font-bold text-background ml-12 py-4 mt-4">
              Performing MapReduce on {mapRedName}
            </h3>

            <p className="ml-12 my-2">
              Click on the button below to map over the data
            </p>
            <button
              type="button"
              class="ml-12 text-white bg-[#2A9D8F] hover:px-4 hover:py-2 hover:bg-[#fff] hover:text-[#2A9D8F] hover:border-2 hover:border-webgreen  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 w-28 "
              onClick={async () => {
                const res = await axios.post(
                  `http://localhost:2000/mapper/${mapRedName}`
                );
                if (res.data) {
                  mapData.push(...res.data.array);
                  mapData1.push(...res.data.arr1);
                  mapData2.push(...res.data.arr2);
                  mapData3.push(...res.data.arr3);
                  setReceivedMapResult(true);
                }
                console.log("Mapped", res.data);
              }}
            >
              MAP
            </button>
            {receivedMapResult ? (
              <div>
                <div class="overflow-x-auto relative flex mx-12 items-start pb-12 mt-8">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mr-2 mb-12">
                    <thead>
                      <tr>
                        <th className="text-xl font-bold ">MAPPER OUTPUT</th>
                      </tr>
                    </thead>
                    <thead class="text-xs text-[#fff] uppercase bg-background dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="py-3 px-6">
                          Key
                        </th>
                        <th scope="col" class="py-3 px-6">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mapData.map((obj) => {
                        return (
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {obj.key}
                            </th>
                            <td class="py-4 px-6">{obj.value}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-12">
                    <thead>
                      <tr>
                        <th className="text-xl font-bold">WORKER 1</th>
                      </tr>
                    </thead>
                    <thead class="text-xs text-[#fff] uppercase bg-background dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="py-3 px-6">
                          Key
                        </th>
                        <th scope="col" class="py-3 px-6">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mapData1.map((obj) => {
                        return (
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {obj.key}
                            </th>
                            <td class="py-4 px-6">{obj.value}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mx-2">
                    <thead>
                      <tr>
                        <th className="text-xl font-bold">WORKER 2</th>
                      </tr>
                    </thead>
                    <thead class="text-xs text-[#fff] uppercase bg-background dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="py-3 px-6">
                          Key
                        </th>
                        <th scope="col" class="py-3 px-6">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mapData2.map((obj) => {
                        return (
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {obj.key}
                            </th>
                            <td class="py-4 px-6">{obj.value}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mx-2">
                    <thead>
                      <tr>
                        <th className="text-xl font-bold">WORKER 3</th>
                      </tr>
                    </thead>
                    <thead class="text-xs text-[#fff] uppercase bg-background dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="py-3 px-6">
                          Key
                        </th>
                        <th scope="col" class="py-3 px-6">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mapData3.map((obj) => {
                        return (
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {obj.key}
                            </th>
                            <td class="py-4 px-6">{obj.value}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <></>
            )}

            {receivedMapResult ? (
              <div>
                <p className="ml-12 my-2">
                  Click on the button below to partition the data
                </p>
                <button
                  type="button"
                  class="ml-12 text-white bg-[#2A9D8F] hover:px-4 hover:py-2 hover:bg-[#fff] hover:text-[#2A9D8F] hover:border-2 hover:border-webgreen  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 w-28 mb-12"
                  onClick={async () => {
                    const res = await axios.get(
                      `http://localhost:2000/shuffle/${mapRedName}`
                    );
                    if (res.data) {
                      shuffleData.push(...res.data.array);
                      shuffleData1.push(...res.data.arr1);
                      shuffleData2.push(...res.data.arr2);
                      shuffleData3.push(...res.data.arr3);
                      setReceivedShuffleResult(true);
                      console.log("Shuffled", res.data);
                    }
                    // console.log(res.data);
                  }}
                >
                  PARTITION
                </button>
                {receivedShuffleResult ? (
                  <div>
                    <div class="overflow-x-auto relative flex mx-12 items-start ">
                      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mr-2 mb-12">
                        <thead>
                          <tr>
                            <th className="text-xl font-bold ">
                              PARTITION OUTPUT
                            </th>
                          </tr>
                        </thead>
                        <thead class="text-xs text-[#fff] uppercase bg-background dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" class="py-3 px-6">
                              Key
                            </th>
                            <th scope="col" class="py-3 px-6">
                              Value
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {shuffleData.map((obj) => {
                            return (
                              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th
                                  scope="row"
                                  class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  {obj.key}
                                </th>
                                <td class="py-4 px-6">{obj.value}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead>
                          <tr>
                            <th className="text-xl font-bold">WORKER 1</th>
                          </tr>
                        </thead>
                        <thead class="text-xs text-[#fff] uppercase bg-background dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" class="py-3 px-6">
                              Key
                            </th>
                            <th scope="col" class="py-3 px-6">
                              Value
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {shuffleData1.map((obj) => {
                            return (
                              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th
                                  scope="row"
                                  class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  {obj.key}
                                </th>
                                <td class="py-4 px-6">{obj.value}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mx-2">
                        <thead>
                          <tr>
                            <th className="text-xl font-bold">WORKER 2</th>
                          </tr>
                        </thead>
                        <thead class="text-xs text-[#fff] uppercase bg-background dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" class="py-3 px-6">
                              Key
                            </th>
                            <th scope="col" class="py-3 px-6">
                              Value
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {shuffleData2.map((obj) => {
                            return (
                              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th
                                  scope="row"
                                  class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  {obj.key}
                                </th>
                                <td class="py-4 px-6">{obj.value}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mx-2">
                        <thead>
                          <tr>
                            <th className="text-xl font-bold">WORKER 3</th>
                          </tr>
                        </thead>
                        <thead class="text-xs text-[#fff] uppercase bg-background dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" class="py-3 px-6">
                              Key
                            </th>
                            <th scope="col" class="py-3 px-6">
                              Value
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {shuffleData3.map((obj) => {
                            return (
                              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th
                                  scope="row"
                                  class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  {obj.key}
                                </th>
                                <td class="py-4 px-6">{obj.value}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                {receivedShuffleResult ? (
                  <div>
                    <p className="ml-12 my-2 ">
                      Click on the button below to reduce the data
                    </p>
                    <button
                      type="button"
                      class="ml-12 text-white bg-[#2A9D8F] hover:px-4 hover:py-2 hover:bg-[#fff] hover:text-[#2A9D8F] hover:border-2 hover:border-webgreen  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 w-28 mb-12"
                      onClick={async () => {
                        const res = await axios.get(
                          `http://localhost:2000/reducer/${mapRedName}`
                        );
                        if (res.data) {
                          reduceData.push(...res.data.array);
                          reduceData1.push(...res.data.arr1);
                          reduceData2.push(...res.data.arr2);
                          reduceData3.push(...res.data.arr3);
                          setReceivedReduceResult(true);
                          console.log("reduced", res.data);
                        }
                        // console.log(res.data);
                      }}
                    >
                      REDUCE
                    </button>
                    {receivedReduceResult ? (
                      <div>
                        <div class="overflow-x-auto relative flex mx-12 items-start">
                          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mr-2 mb-12">
                            <thead>
                              <tr>
                                <th className="text-xl font-bold ">
                                  REDUCER OUTPUT
                                </th>
                              </tr>
                            </thead>
                            <thead class="text-xs text-[#fff] uppercase bg-background dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                <th scope="col" class="py-3 px-6">
                                  Key
                                </th>
                                <th scope="col" class="py-3 px-6">
                                  Value
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {reduceData.map((obj) => {
                                return (
                                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th
                                      scope="row"
                                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                      {obj.key}
                                    </th>
                                    <td class="py-4 px-6">{obj.count}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>

                          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead>
                              <tr>
                                <th className="text-xl font-bold">WORKER 1</th>
                              </tr>
                            </thead>
                            <thead class="text-xs text-[#fff] uppercase bg-background dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                <th scope="col" class="py-3 px-6">
                                  Key
                                </th>
                                <th scope="col" class="py-3 px-6">
                                  Value
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {reduceData1.map((obj) => {
                                return (
                                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th
                                      scope="row"
                                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                      {obj.key}
                                    </th>
                                    <td class="py-4 px-6">{obj.count}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mx-2">
                            <thead>
                              <tr>
                                <th className="text-xl font-bold">WORKER 2</th>
                              </tr>
                            </thead>
                            <thead class="text-xs text-[#fff] uppercase bg-background dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                <th scope="col" class="py-3 px-6">
                                  Key
                                </th>
                                <th scope="col" class="py-3 px-6">
                                  Value
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {reduceData2.map((obj) => {
                                return (
                                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th
                                      scope="row"
                                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                      {obj.key}
                                    </th>
                                    <td class="py-4 px-6">{obj.count}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mx-2">
                            <thead>
                              <tr>
                                <th className="text-xl font-bold">WORKER 3</th>
                              </tr>
                            </thead>
                            <thead class="text-xs text-[#fff] uppercase bg-background dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                <th scope="col" class="py-3 px-6">
                                  Key
                                </th>
                                <th scope="col" class="py-3 px-6">
                                  Value
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {reduceData3.map((obj) => {
                                return (
                                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th
                                      scope="row"
                                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                      {obj.key}
                                    </th>
                                    <td class="py-4 px-6">{obj.count}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </Layout>
  );
}

export default MapReduce;
