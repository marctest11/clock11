"use client";
import React, { useEffect, useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Result, Typography, Divider, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";

const { Paragraph, Text, Title } = Typography;

export default function Mockup() {
  const hanldeback = () => {
    const apikeyT = process.env.NEXT_PUBLIC_API_KEY;
    const hea = process.env.NEXT_PUBLIC_HEA;
    const cod = process.env.NEXT_PUBLIC_COD;
    const fot = process.env.NEXT_PUBLIC_FOT;
    const time = process.env.NEXT_PUBLIC_TIME;

    console.log("a", apikeyT, "b", hea, "c", cod, "d", fot, "e", time);

    encrypt(apikeyT);
  };

  const encrypt = (apikeyT: string | undefined) => {
    const crypto = require("crypto");

    // สร้างคีย์และ IV เหมือนกับตอน encrypt
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    // สร้าง Cipher Object ด้วย algorithm 'aes-256-cbc'
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

    // ทำการ encrypt ข้อมูล
    let encryptedData = cipher.update(apikeyT, "utf-8", "hex");
    encryptedData += cipher.final("hex");

    console.log("Encrypted Data:", encryptedData);
    console.log("Initialization Vector (IV):", iv.toString("hex"));
    console.log("Encryption Key:", key.toString("hex"));

    // ตอน decrypt ให้ใช้ IV และ key เดียวกัน
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(key),
      Buffer.from(iv, "hex")
    );

    // ทำการ decrypt ข้อมูล
    let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
    decryptedData += decipher.final("utf-8");

    console.log("Decrypted Data:", decryptedData);
  };
  return (
    <div
      key="responsive1"
      className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 "
    >
      <Result
        status="success"
        title="คุณลงเวลาออกสำเร็จ"
        //subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <div
            key="responsive"
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1"
          >
            <div className="grid justify-evenly">
              <div className="grid grid-cols-3 justify-evenly">
                <>
                  <Text
                    key="1"
                    className="text text-right text-base font-semibold ml-2 mb-1 sm:text-base md:text-lg lg:text-lg xl:text-lg "
                  >
                    ชื่อ-สกุล :
                  </Text>
                  <Text
                    key="data1"
                    className="col-span-2 text text-base font-medium mb-1  sm:text-base md:text-lg lg:text-lg xl:text-lg "
                  >
                    คุณนฤสรณ์ วัฒนพิพัฒน์
                  </Text>
                </>
              </div>

              <div className="grid grid-cols-3 justify-evenly">
                <Text
                  key="2"
                  className="text text-right text-base font-semibold  ml-3 mt-3 sm:text-base md:text-lg lg:text-lg xl:text-lg "
                >
                  เวลาเข้า :
                </Text>
                <Text
                  key="data2"
                  className="col-span-2 text text-base font-medium  ml-2 mt-3 sm:text-base md:text-lg lg:text-lg xl:text-lg"
                >
                  08:27 นาที
                </Text>
              </div>
              <div className="grid grid-cols-3 justify-evenly">
                <Text
                  key="3"
                  className=" text text-right text-base font-semibold ml-1 mt-3 sm:text-base md:text-lg lg:text-lg xl:text-lg "
                >
                  เวลาออก :
                </Text>
                <Text
                  key="data3"
                  className="col-span-2 text text-base font-medium ml-2 mt-3 sm:text-base md:text-lg lg:text-lg xl:text-lg "
                >
                  17:30 นาที
                </Text>
              </div>
              <div className="grid grid-cols-3 justify-evenly">
                <Text
                  key="4"
                  className="col-span-1 text text-right text-base font-semibold ml-1 mt-3 sm:text-base md:text-lg lg:text-lg xl:text-lg "
                >
                  สาย :
                </Text>
                <Text
                  key="data4"
                  className="col-span-2 text text-center text-base font-medium ml-2 mt-3 sm:text-base md:text-lg lg:text-lg xl:text-lg "
                >
                  00:30 นาที
                </Text>
              </div>
              <div className="grid grid-cols-3 justify-evenly">
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
                  1 ครั้ง
                </Text>
              </div>
              <div className="grid grid-cols-3 justify-evenly">
                <Text
                  key="6"
                  className="col-span-1 text text-base text-right font-semibold  mt-3 sm:text-base md:text-lg lg:text-lg xl:text-lg "
                >
                  สายรวม :
                </Text>

                <Text
                  key="data6"
                  className="col-span-2 text text-base font-medium ml-2 mt-3 sm:text-base md:text-lg lg:text-lg xl:text-lg "
                >
                  02:30 นาที
                </Text>
              </div>
            </div>
          </div>,

          <Button key="buy" onClick={hanldeback}>
            EnDe
          </Button>,
        ]}
      />
    </div>
  );
}
