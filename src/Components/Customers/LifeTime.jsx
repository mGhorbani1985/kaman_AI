import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import InitObject from "../../Utils/globalvariables";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Chart } from "react-chartjs-2";
import TopFilter from "Common/TopFilter";
import {  BiFilterAlt, BiTimeFive } from "react-icons/bi";
import DownloadBtn from "Common/DownloadBtn";
import FilterDrawer from "Common/FilterDrawer/FilterDrawer";
import DrawTable from "Common/DrawTable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DrawChart({ graph_data }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

  const data = {
    labels: graph_data.labels,
    datasets: [
      {
        label: "",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        borderColor: "rgb(0, 255, 0)",
        borderWidth: 1,
        data: graph_data.data,
      },
    ],
  };

  return (
    <>
      <div>
        <Chart type="bar" data={data} options={options} />
      </div>
    </>
  );
}


const LifeTime = () => {
  const location = useLocation();

  const [graph_data, setGraph_data] = useState({});
  const [table_data, setTable_data] = useState({ labels: [], data: [[]] });

  function get_graph_data(location, setGraph_data, setTable_data) {
    let formData = new FormData();
    let api_address = InitObject.baseurl + "api/life_time/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        setGraph_data(response.data.results[0]);
        setTable_data(response.data.results[1]);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleDownloadFile = (e, table_data) => {
    e.preventDefault();
    console.log(table_data["table_data"]);
    let formData = new FormData();
    formData.append("data", JSON.stringify(table_data["table_data"]));
    // formData.append("end_date1", end_time1.format());
    let api_address = InitObject.baseurl + "api/download_dict/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        console.log(response.data.results);
        if (response.data.results.link !== "") {
          var link = InitObject.baseurl + response.data.results.link;
          console.log(link);
          let a = document.createElement("a");
          a.href = link;
          a.download = link;
          a.click();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const temp_handle = (e) => {
    e.preventDefault();
    console.log(graph_data);
  };

  useEffect(() => {
    get_graph_data(location, setGraph_data, setTable_data);
  }, []);

  return (
    <>
      <TopFilter>
       <FilterDrawer />
      </TopFilter>
      <div className="mb-4 rounded-md bg-white p-4 dark:bg-navy-700 dark:text-white">
        <fieldset className="rounded-md border border-solid border-gray-300 p-3">
          <legend className="float-none w-auto px-2 text-sm">
            <p className="flex items-center text-lg font-bold">
              <BiTimeFive className="ml-2 text-3xl" /> طول عمر مشتریان
            </p>
          </legend>
          <div className="my-10 max-w-xs overflow-x-auto md:max-w-xl lg:max-w-full">
            <DrawChart graph_data={graph_data} />
          </div>
       <DownloadBtn onClick={(e) => handleDownloadFile(e, { table_data })}/>
          <div className="table1">
            <DrawTable graph_data={table_data} />
          </div>
        </fieldset>
      </div>
    </>
  );
};

export default LifeTime;
