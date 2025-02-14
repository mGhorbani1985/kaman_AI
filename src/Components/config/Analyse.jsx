import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import InitObject from "../../Utils/globalvariables";
import { BiChevronsLeft, BiSave } from "react-icons/bi";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import TopInfoBar from "Common/TopInfoBar";

function AnalyseData({ children }) {
  const location = useLocation();
  const [segments, setSegments] = useState(11);
  const [outlayer, setOutlayer] = useState(0);
  const [recency1, setRecency1] = useState(20);
  const [recency2, setRecency2] = useState(40);
  const [recency3, setRecency3] = useState(60);
  const [recency4, setRecency4] = useState(80);
  const [frequency1, setFrequency1] = useState(20);
  const [frequency2, setFrequency2] = useState(40);
  const [frequency3, setFrequency3] = useState(60);
  const [frequency4, setFrequency4] = useState(80);
  const [monetary1, setMonetary1] = useState(20);
  const [monetary2, setMonetary2] = useState(40);
  const [monetary3, setMonetary3] = useState(60);
  const [monetary4, setMonetary4] = useState(80);

  useEffect(() => {
    let formData = new FormData();
    let api_address = InitObject.baseurl + "api/get_config/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        setSegments(response.data.results.segment);
        setOutlayer(response.data.results.outlayer);
        setRecency1(response.data.results.recency1);
        setRecency2(response.data.results.recency2);
        setRecency3(response.data.results.recency3);
        setRecency4(response.data.results.recency4);
        setFrequency1(response.data.results.frequency1);
        setFrequency2(response.data.results.frequency2);
        setFrequency3(response.data.results.frequency3);
        setFrequency4(response.data.results.frequency4);
        setMonetary1(response.data.results.monetary1);
        setMonetary2(response.data.results.monetary2);
        setMonetary3(response.data.results.monetary3);
        setMonetary4(response.data.results.monetary4);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSegments = (e) => {
    setSegments(e.target.value);
  };

  const handleOutlayer = (e) => {
    if (outlayer === 0) {
      setOutlayer(1);
    } else {
      setOutlayer(0);
    }
    console.log(recency1);
  };

  const handleUpdateData = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("segments", segments);
    formData.append("outlayer", outlayer);
    formData.append("recency1", recency1);
    formData.append("recency2", recency2);
    formData.append("recency3", recency3);
    formData.append("recency4", recency4);
    formData.append("frequency1", frequency1);
    formData.append("frequency2", frequency2);
    formData.append("frequency3", frequency3);
    formData.append("frequency4", frequency4);
    formData.append("monetary1", monetary1);
    formData.append("monetary2", monetary2);
    formData.append("monetary3", monetary3);
    formData.append("monetary4", monetary4);
    let api_address = InitObject.baseurl + "api/update_config/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: " Token " + location.state.userinfo.key,
        },
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
        toast.success("تغییرات با موفقیت ثبت گردید");
      })
      .catch((error) => {
        console.log(error);
        toast.error("خطایی در ثبت تغییرات رخ داده است");
      });
  };

  return (
    <>
    <TopInfoBar />
      {/* outlayer section */}
      <div className="mb-4 rounded-md bg-white p-3 text-navy-500 dark:bg-navy-700 dark:text-white">
        <p>
          با انتخاب این گزینه مشتریانی که رفتار خرید آن‌ها، با میانگین رفتار
          خرید سایر مشتریان تفاوت دارد، از محاسبات تحلیل RFM خارج شده و در
          انتها، به عنوان دو دسته مجزا، به کل مشتریان در دسته‌بندی افزوده خواهند
          شد.
        </p>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="outlayer"
            name="segment"
            value="1"
            onChange={handleOutlayer}
          />
          <label htmlFor="outlayer" className="mr-2 cursor-pointer">
            حذف داده پرت
          </label>
        </div>
      </div>

      <div className="mb-4 rounded-md bg-white p-3 text-navy-500 dark:bg-navy-700 dark:text-white">
        <p>
          در این قسمت می‌توانید انتخاب کنید که پس از محاسبه متد مشتریان شما به
          چند دسته تقسیم‌بندی شوند.
        </p>
        <div className="flex flex-col items-center md:flex-row">
          <div className="flex items-center">
            <input
              type="radio"
              name="segment"
              id="elevenGroups"
              value="11"
              onClick={handleSegments}
            />
            <label htmlFor="elevenGroups" className="mx-2 cursor-pointer">
              یازده دسته
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="segment"
              id="threeGroups"
              value="3"
              onClick={handleSegments}
            />
            <label htmlFor="threeGroups" className="mx-2 cursor-pointer">
              سه دسته
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="segment"
              id="sixGroups"
              value="6"
              onClick={handleSegments}
            />
            <label htmlFor="sixGroups" className="mx-2 cursor-pointer">
              شش دسته
            </label>
          </div>
        </div>
      </div>
      {/* newShopIndex Section */}
      <div className="mb-4 rounded-md bg-white p-3 text-navy-500 dark:bg-navy-700 dark:text-white">
        <p>
          در این قسمت می‌توانید بازه تقسیم‌بندی “شاخص تازگی خرید” مشتریان را به
          دلخواه خود و متناسب با نیاز، تغییر دهید.
        </p>
        <div className="my-12 flex flex-col md:flex-row md:items-center md:justify-center">
          <div className="mb-4 flex items-center justify-center md:mb-0">
            <input
              size="10"
              type="number"
              name="quantity"
              min="1"
              max="100"
              value="0"
              disabled
              className="inputStyles"
            />
            <label>
              <BiChevronsLeft />
            </label>
          </div>
          <div className="mb-4 flex items-center justify-center md:mb-0">
            <input
              size="10"
              type="number"
              name="quantity"
              min="1"
              max="100"
              value={recency1}
              onChange={(e) => setRecency1(e.target.value)}
              className="inputStyles"
            />
            <label>
              <BiChevronsLeft />
            </label>
          </div>
          <div className="mb-4 flex items-center justify-center md:mb-0">
            <input
              size="10"
              type="number"
              name="quantity"
              min="1"
              max="100"
              value={recency2}
              onChange={(e) => setRecency2(e.target.value)}
              className="inputStyles"
            />
            <label>
              <BiChevronsLeft />
            </label>
          </div>
          <div className="mb-4 flex items-center justify-center md:mb-0">
            <input
              size="10"
              type="number"
              name="quantity"
              min="1"
              max="100"
              value={recency3}
              onChange={(e) => setRecency3(e.target.value)}
              className="inputStyles"
            />
            <label>
              <BiChevronsLeft />
            </label>
          </div>
          <div className="mb-4 flex items-center justify-center md:mb-0">
            <input
              size="10"
              type="number"
              name="quantity"
              min="1"
              max="100"
              value={recency4}
              onChange={(e) => setRecency4(e.target.value)}
              className="inputStyles"
            />{" "}
            <label>
              <BiChevronsLeft />
            </label>
          </div>
          <div className="mb-4 flex items-center justify-center md:mb-0">
            <input
              size="10"
              type="number"
              name="quantity"
              min="1"
              max="100"
              value="100"
              disabled
              className="inputStyles"
            />
          </div>
        </div>
      </div>
      {/* quantityShopIndex Section */}
      <div className="mb-4 rounded-md bg-white p-3 text-navy-500 dark:bg-navy-700 dark:text-white">
        <p>
          {" "}
          در این قسمت می‌توانید بازه تقسیم‌بندی “شاخص تعداد خرید” مشتریان را به
          دلخواه خود و متناسب با نیاز، تغییر دهید.
        </p>
        <div className="my-12 flex flex-col md:flex-row md:items-center md:justify-center">
          <div className="mb-4 flex items-center justify-center md:mb-0">
            <input
              size="10"
              type="number"
              name="quantity"
              min="1"
              max="100"
              value="0"
              disabled
              className="inputStyles"
            />
            <label>
              <BiChevronsLeft />
            </label>
          </div>
          <div className="mb-4 flex items-center justify-center md:mb-0">
            <input
              size="10"
              type="number"
              name="quantity"
              min="1"
              max="100"
              value={frequency1}
              onChange={(e) => setFrequency1(e.target.value)}
              className="inputStyles"
            />
            <label>
              <BiChevronsLeft />
            </label>
          </div>
          <div className="mb-4 flex items-center justify-center md:mb-0">
            {" "}
            <input
              size="10"
              type="number"
              name="quantity"
              min="1"
              max="100"
              value={frequency2}
              onChange={(e) => setFrequency2(e.target.value)}
              className="inputStyles"
            />
            <label>
              <BiChevronsLeft />
            </label>
          </div>
          <div className="mb-4 flex items-center justify-center md:mb-0">
            {" "}
            <input
              size="10"
              type="number"
              name="quantity"
              min="1"
              max="100"
              value={frequency3}
              onChange={(e) => setFrequency3(e.target.value)}
              className="inputStyles"
            />
            <label>
              <BiChevronsLeft />
            </label>
          </div>
          <div className="mb-4 flex items-center justify-center md:mb-0">
            {" "}
            <input
              size="10"
              type="number"
              name="quantity"
              min="1"
              max="100"
              value={frequency4}
              onChange={(e) => setFrequency4(e.target.value)}
              className="inputStyles"
            />
            <label>
              <BiChevronsLeft />
            </label>
          </div>
          <div className="mb-4 flex items-center justify-center md:mb-0">
            <input
              size="10"
              type="number"
              name="quantity"
              min="1"
              max="100"
              value="100"
              disabled
              className="inputStyles"
            />
          </div>
        </div>
      </div>
      {/* priceShopIndex Section */}
      <div className="mb-4 rounded-md bg-white p-3 text-navy-500 dark:bg-navy-700 dark:text-white">
        <p>
          در این قسمت می‌توانید بازه تقسیم‌بندی “شاخص مبلغ خرید” مشتریان را به
          دلخواه خود و متناسب با نیاز، تغییر دهید.
        </p>
        <div className="my-12 flex flex-col md:flex-row md:items-center md:justify-center">
          <div className="mb-4 flex items-center justify-center md:mb-0">
            <input
              size="10"
              type="number"
              name="quantity"
              min="1"
              max="100"
              value="0"
              disabled
              className="inputStyles"
            />
            <label>
              <BiChevronsLeft />
            </label>
          </div>
          <div className="mb-4 flex items-center justify-center md:mb-0">
            <input
              size="10"
              type="number"
              name="quantity"
              min="1"
              max="100"
              value={monetary1}
              onChange={(e) => setMonetary1(e.target.value)}
              className="inputStyles"
            />
            <label>
              <BiChevronsLeft />
            </label>
          </div>
          <div className="mb-4 flex items-center justify-center md:mb-0">
            <input
              size="10"
              type="number"
              name="quantity"
              min="1"
              max="100"
              value={monetary2}
              onChange={(e) => setMonetary2(e.target.value)}
              className="inputStyles"
            />
            <label>
              <BiChevronsLeft />
            </label>
          </div>
          <div className="mb-4 flex items-center justify-center md:mb-0">
            <input
              size="10"
              type="number"
              name="quantity"
              min="1"
              max="100"
              value={monetary3}
              onChange={(e) => setMonetary3(e.target.value)}
              className="inputStyles"
            />
            <label>
              <BiChevronsLeft />
            </label>
          </div>
          <div className="mb-4 flex items-center justify-center md:mb-0">
            <input
              size="10"
              type="number"
              name="quantity"
              min="1"
              max="100"
              value={monetary4}
              onChange={(e) => setMonetary4(e.target.value)}
              className="inputStyles"
            />
            <label>
              <BiChevronsLeft />
            </label>
          </div>
          <div className="mb-4 flex items-center justify-center md:mb-0">
            <input
              size="10"
              type="number"
              name="quantity"
              min="1"
              max="100"
              value="100"
              disabled
              className="inputStyles"
            />
          </div>
        </div>
      <div className="flex w-full items-center justify-end gap-4">
        {children}
        <Button
          className="btns flex items-center justify-center"
          onClick={handleUpdateData}
        >
          <BiSave className="ml-2 text-2xl" />
          ذخیره تغییرات
        </Button>
      </div>
      </div>
    </>
  );
}

export default AnalyseData;
