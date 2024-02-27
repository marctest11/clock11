"use client";
import React, { useEffect, useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Result, Typography, Divider } from "antd";
import { useRouter } from "next/navigation";

const { Paragraph, Text, Title } = Typography;

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

  const router = useRouter();

  const ErroDate = async () => {
    try {
      const res = await fetch("/api/login");
      const data = await res.text();

      const Datatrim = data.trim();
      console.log("dataRe:", data);
      console.log("dataTrim:", Datatrim);

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
      } else {
        console.error("Unknow response format :", Datatrim);
        return;
      }
      if (jsonData !== undefined) {
        setErrorData(jsonData);
        console.log("in", jsonData);
      } else {
        console.error("jsondata undefine");
      }
    } catch (error) {
      console.error("Error feteching Data:", error);
    }
  };

  useEffect(() => {
    ErroDate();
  }, []);

  const hanldeback = () => {
    router.push("/");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
      {errorData ? (
        <Result
          status="error"
          title={errorData.errmesg}
          subTitle={`${errorData.cerror || errorData.e000er} ${
            errorData.errcode
          }`}
          extra={[
            <Button type="primary" danger key="console" onClick={hanldeback}>
              Login
            </Button>,
          ]}
        />
      ) : successData ? (
        <Result
          status="success"
          title={
            successData?.outTime ? "คุณลงเวลาออกสำเร็จ" : "คุณลงเวลาเข้าสำเร็จ"
          }
          subTitle={<Divider />}
          extra={[
            <div
              key="responsive"
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 "
            >
              <div className="grid justify-end pr-4">
                {successData.name && (
                  <Text
                    key="1"
                    className="text text-base font-semibold sm:text-base md:text-lg lg:text-lg xl:text-lg pl-2"
                  >
                    ชื่อ-สกุล :
                  </Text>
                )}
                {successData.inTime && (
                  <Text
                    key="2"
                    className="text text-base font-semibold sm:text-base md:text-lg lg:text-lg xl:text-lg pl-2 pt-2"
                  >
                    เวลาเข้า :
                  </Text>
                )}
                {successData.outTime && (
                  <Text
                    key="3"
                    className="text text-base font-semibold sm:text-base md:text-lg lg:text-lg xl:text-lg pl-2 pt-2"
                  >
                    เวลาออก :
                  </Text>
                )}
                {successData.late && (
                  <Text
                    key="4"
                    className="text text-base font-semibold sm:text-base md:text-lg lg:text-lg xl:text-lg pl-2 pt-2"
                  >
                    เวลาสาย(วันนี้) :
                  </Text>
                )}
                {successData.lateTime && (
                  <Text
                    key="5"
                    className="text text-base font-semibold sm:text-base md:text-lg lg:text-lg xl:text-lg pl-2 pt-2"
                  >
                    สายสะสม(ครั้ง) :
                  </Text>
                )}
                {successData.lateall && (
                  <Text
                    key="6"
                    className="text text-base font-semibold sm:text-base md:text-lg lg:text-lg xl:text-lg pl-2 pt-2"
                  >
                    สายสะสม(เวลารวม) :
                  </Text>
                )}
              </div>
              <div className="grid justify-start">
                {successData.name && (
                  <Text
                    key="data1"
                    className="text text-base  font-base sm:text-base md:text-lg lg:text-lg xl:text-lg pl-2 pl-2"
                  >
                    {successData.name}
                  </Text>
                )}

                {successData.inTime && (
                  <Text
                    key="data2"
                    className="text text-base font-semibold sm:text-base md:text-lg lg:text-lg xl:text-lg pl-2 pt-2"
                  >
                    {successData.inTime}
                  </Text>
                )}
                {successData.outTime && (
                  <Text
                    key="data3"
                    className="text text-base font-semibold sm:text-base md:text-lg lg:text-lg xl:text-lg pl-2 pt-2"
                  >
                    {successData.outTime}
                  </Text>
                )}
                {successData.late && (
                  <Text
                    key="data4"
                    className="text text-base font-semibold sm:text-base md:text-lg lg:text-lg xl:text-lg pl-2 pt-2"
                  >
                    {successData.late}
                  </Text>
                )}
                {successData.lateTime && (
                  <Text
                    key="data5"
                    className="text text-base font-semibold sm:text-base md:text-lg lg:text-lg xl:text-lg pl-2 pt-2"
                  >
                    {successData.lateTime}
                  </Text>
                )}
                {successData.lateall && (
                  <Text
                    key="data6"
                    className="text text-base font-semibold sm:text-base md:text-lg lg:text-lg xl:text-lg pl-2 pt-2"
                  >
                    {successData.lateall}
                  </Text>
                )}
              </div>
            </div>,
            <div className="mb-4" key="space"></div>,
            <Button type="primary" danger key="console" onClick={hanldeback}>
              Login
            </Button>,
          ]}
        />
      ) : (
        // Handle loading state or display nothing while fetching data
        <div>
          Loading...
          <Button type="primary" danger key="console" onClick={hanldeback}>
            Login
          </Button>
        </div>
      )}
    </div>
  );
}
