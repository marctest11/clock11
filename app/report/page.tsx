"use client";
import React, { useEffect, useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Result, Typography, Divider, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";

const { Paragraph, Text, Title } = Typography;

type ErrorDataType = {
  e000er?: string;
  cerror?: string;
  errcode: string;
  errmesg: string;
};

type SuccessDataType = {
  se000er: string;
  name: string;
  inTime: string;
  outTime: string;
  late: string;
  lateTime: string;
  lateall: string;
  dept: string;
  kgb: string;
  km: string;
  rem: string;
};

export default function Report() {
  const [errorData, setErrorData] = useState<{
    e000er?: string;
    cerror?: string;
    errcode: string;
    errmesg: string;
  } | null>(null);

  const [successData, setSuccessData] = useState<{
    se000er: string;
    name: string;
    inTime: string;
    outTime: string;
    late: string;
    lateTime: string;
    lateall: string;
    dept: string;
    kgb: string;
    km: string;
    rem: string;
  } | null>(null);
  const [datano, setDatano] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  const ErroDate = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/login");

      if (!res.ok) {
        console.error(`Fetch failed with status: ${res.status}`);
        setLoading(false);
        return;
      }

      const data = await res.text();
      const Datatrim = data.trim();

      console.log("dataRe:", data);
      console.log("dataTrim:", Datatrim);

      if (Datatrim === null || Datatrim.trim() === "") {
        console.log("Data is null or empty");
        setLoading(false);

        setTimeout(() => {
          router.push("/");
        }, 5000);

        return;
      }

      let jsonData;
      let jsonSuccess;

      // split ก่อน น่าจะแยกง่ายกว่า
      if (Datatrim.startsWith("CERROR")) {
        // Case 1: CERROR
        const [cerror, errcode, errmesg] = Datatrim.split(";");
        jsonData = { cerror, errcode, errmesg };
        console.log("ChkErID:", jsonData);
      } else if (Datatrim.startsWith("E0002R") && Datatrim.includes("CERROR")) {
        // Case 2: E0002R
        const [e000er, cerror, errcode, errmesg] = Datatrim.split(";");
        jsonData = { e000er, cerror, errcode, errmesg };
        console.log("ChkClock:", jsonData);
      } else if (
        Datatrim.startsWith("E0002R") !== Datatrim.includes("CERROR")
      ) {
        // Case 3: Success E0002R
        const [
          se000er,
          name,
          inTime,
          outTime,
          late,
          lateTime,
          lateall,
          dept,
          kgb,
          km,
          rem,
        ] = Datatrim.split(";");
        jsonSuccess = {
          se000er,
          name,
          inTime,
          outTime,
          late,
          lateTime,
          lateall,
          dept,
          kgb,
          km,
          rem,
        };
        console.log("success:", jsonSuccess);
        setSuccessData(jsonSuccess);
        setLoading(false);
        //CASE 4 DATA NULL
      } else {
        console.error("Unknow response format :", Datatrim);
        setLoading(false);
        return;
      }
      if (jsonData !== undefined) {
        setErrorData(jsonData);
        setLoading(false);
        console.log("in", jsonData);
      } else {
        console.error("jsondata undefine");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error feteching Data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    ErroDate();
  }, []);

  const hanldeback = () => {
    router.push("/");
  };

  const errbackhm = async () => {
    setLoading(true);
    const delayerr = (hour: number) =>
      new Promise((resolve) => setTimeout(resolve, hour * 60 * 60 * 1000));
    await delayerr(2);

    console.log("errbackhm");

    router.push("/");
    setLoading(false);
  };

  useEffect(() => {
    errbackhm();
    console.log("errbackhm");
  }, [setErrorData]);

  const succbackhm = async () => {
    setLoading(true);
    const delay = (hour: number) =>
      new Promise((resolve) => setTimeout(resolve, hour * 60 * 60 * 1000));
    await delay(1);
    router.push("/");
    setLoading(false);
  };

  useEffect(() => {
    succbackhm();
  }, [setSuccessData]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          {errorData ? (
            <ErrorResult errorData={errorData} onLogin={hanldeback} />
          ) : successData ? (
            <SuccessResult successData={successData} onLogin={hanldeback} />
          ) : (
            <div>
              <Result
                status="warning"
                title="Session Timeout !!!"
                subTitle={
                  <Text className="text-sm">
                    กำลังพาท่านกลับสู่หน้าแรก.....
                  </Text>
                }
                extra={
                  <Button
                    type="primary"
                    danger
                    key="console"
                    onClick={hanldeback}
                  >
                    Login
                  </Button>
                }
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

//Error Result
const ErrorResult = ({
  errorData,
  onLogin,
}: {
  errorData: ErrorDataType;
  onLogin: () => void;
}) => (
  <Result
    status="error"
    title={errorData.errmesg}
    subTitle={`${errorData.cerror || errorData.e000er} ${errorData.errcode}`}
    extra={[
      <Button type="primary" danger key="console" onClick={onLogin}>
        Login
      </Button>,
    ]}
  />
);

//Success Result
const SuccessResult = ({
  successData,
  onLogin,
}: {
  successData: SuccessDataType;
  onLogin: () => void;
}) => (
  <Result
    status="success"
    title={successData?.outTime ? "คุณลงเวลาออกสำเร็จ" : "คุณลงเวลาเข้าสำเร็จ"}
    subTitle={<Divider />}
    extra={[
      <div
        key="responsive"
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1"
      >
        <div className="grid justify-evenly">
          <div className="grid grid-cols-3 justify-evenly">
            {successData.name && (
              <>
                <Text
                  key="1"
                  className="text text-right text-base font-semibold ml-2 mb-1 sm:text-base md:text-lg lg:text-lg xl:text-lg "
                >
                  ชื่อ-สกุล :
                </Text>
                <Text
                  key="data1"
                  className="col-span-2 text text-base font-medium mb-1  sm:text-base md:text-lg lg:text-lg xl:text-lg"
                >
                  {successData.name}
                </Text>
              </>
            )}
          </div>
          <div className="grid grid-cols-3 justify-evenly">
            {successData.inTime && (
              <>
                <Text
                  key="2"
                  className="text text-right text-base font-semibold  ml-3 mt-3 sm:text-base md:text-lg lg:text-lg xl:text-lg"
                >
                  เวลาเข้า :
                </Text>
                <Text
                  key="data2"
                  className="col-span-2 text text-base font-medium  ml-2 mt-3 sm:text-base md:text-lg lg:text-lg xl:text-lg"
                >
                  {successData.inTime} นาที
                </Text>
              </>
            )}
          </div>
          <div className="grid grid-cols-3 justify-evenly">
            {successData.outTime && (
              <>
                <Text
                  key="3"
                  className="text text-right text-base font-semibold ml-1 mt-3 sm:text-base md:text-lg lg:text-lg xl:text-lg"
                >
                  เวลาออก :
                </Text>
                <Text
                  key="data3"
                  className="col-span-2 text text-base font-medium ml-2 mt-3 sm:text-base md:text-lg lg:text-lg xl:text-lg "
                >
                  {successData.outTime} นาที
                </Text>
              </>
            )}
          </div>
          <div className="grid grid-cols-3 justify-evenly">
            {successData.late && (
              <>
                <Text
                  key="4"
                  className="col-span-1 text text-right text-base font-semibold ml-1 mt-3 sm:text-base md:text-lg lg:text-lg xl:text-lg"
                >
                  สาย :
                </Text>
                <Text
                  key="data4"
                  className="grid grid-col-span-1 text text-base font-semibold sm:text-base md:text-lg lg:text-lg xl:text-lg ml-2 mt-1"
                >
                  {successData.late} นาที
                </Text>
              </>
            )}
          </div>
          <div className="grid grid-cols-3 justify-evenly">
            {successData.lateTime && (
              <>
                <Text
                  key="5"
                  className="col-span-1 text text-right text-base font-semibold  mt-3 sm:text-base md:text-lg lg:text-lg xl:text-lg "
                >
                  สายสะสม :
                </Text>
                <Text
                  key="data5"
                  className="col-span-2 text text-base font-medium ml-2 mt-3 sm:text-base md:text-lg lg:text-lg xl:text-lg "
                >
                  {successData.lateTime} ครั้ง
                </Text>
              </>
            )}
          </div>
          <div className="grid grid-cols-3 justify-evenly">
            {successData.lateall && (
              <>
                <Text
                  key="6"
                  className="col-span-1 text text-base text-right font-semibold  mt-3 sm:text-base md:text-lg lg:text-lg xl:text-lg"
                >
                  สายรวม :
                </Text>
                <Text
                  key="data6"
                  className="grid grid-col-span-1 text text-base font-semibold sm:text-base md:text-lg lg:text-lg xl:text-lg ml-2 mt-1"
                >
                  {successData.lateall} นาที
                </Text>
              </>
            )}
          </div>
        </div>
      </div>,
      <div className="mb-4" key="space"></div>,
      <Button type="primary" danger key="console" onClick={onLogin}>
        Login
      </Button>,
    ]}
  />
);
