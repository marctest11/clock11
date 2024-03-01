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
            <div className="grid justify-start">
              <div className="grid grid-cols-3 justify-evenly">
                <>
                  <Text
                    key="1"
                    className="text text-base font-semibold sm:text-base md:text-lg lg:text-lg xl:text-lg ml-2 mb-1 "
                  >
                    ชื่อ-สกุล :
                  </Text>
                  <Text
                    key="data1"
                    className="col-span-2 text text-base font-base sm:text-base md:text-lg lg:text-lg xl:text-lg ml-0 mb-1 "
                  >
                    คุณนฤสรณ์ วัฒนพิพัฒน์
                  </Text>
                </>
              </div>

              <div className="grid grid-cols-2 justify-evenly">
                <Text
                  key="2"
                  className="grid grid-col-span-1 text text-base font-semibold sm:text-base md:text-lg lg:text-lg xl:text-lg ml-3 mt-1 "
                >
                  เวลาเข้า :
                </Text>
                <Text
                  key="data2"
                  className="grid grid-col-span-1 text text-base font-semibold sm:text-base md:text-lg lg:text-lg xl:text-lg pl-2 pt-1"
                >
                  08:27
                </Text>
              </div>
              <div className="grid grid-cols-2 justify-evenly">
                <Text
                  key="3"
                  className="grid grid-col-span-1 text text-base font-semibold sm:text-base md:text-lg lg:text-lg xl:text-lg ml-1 mt-1 "
                >
                  เวลาออก :
                </Text>
                <Text
                  key="data3"
                  className="grid grid-col-span-1 text text-base font-semibold sm:text-base md:text-lg lg:text-lg xl:text-lg ml-2 mt-1"
                >
                  17:30
                </Text>
              </div>
              <div className="grid grid-cols-2 justify-evenly">
                <Text
                  key="4"
                  className="grid grid-col-span-1 text text-base font-semibold sm:text-base md:text-lg lg:text-lg xl:text-lg ml-0 mt-1 "
                >
                  เวลาสาย(วันนี้) :
                </Text>
                <Text
                  key="data4"
                  className="grid grid-col-span-1 text text-base font-semibold sm:text-base md:text-lg lg:text-lg xl:text-lg ml-2 mt-1"
                >
                  00:30
                </Text>
              </div>
              <div className="grid grid-cols-2 justify-evenly">
                <Text
                  key="5"
                  className="grid grid-col-span-1 text text-base font-semibold sm:text-base md:text-lg lg:text-lg xl:text-lg ml-0 mt-1 "
                >
                  สายสะสม(ครั้ง) :
                </Text>
                <Text
                  key="data5"
                  className="grid grid-col-span-1 text text-base font-semibold sm:text-base md:text-lg lg:text-lg xl:text-lg ml-2 mt-1"
                >
                  1
                </Text>
              </div>
              <div className="grid grid-cols-2 justify-evenly">
                <Text
                  key="6"
                  className="grid grid-col-span-1 text text-sm font-semibold sm:text-base md:text-lg lg:text-lg xl:text-lg ml-0 mt-1"
                >
                  สายสะสม(เวลารวม) :
                </Text>

                <Text
                  key="data6"
                  className="grid grid-col-span-1 text text-base font-semibold sm:text-base md:text-lg lg:text-lg xl:text-lg ml-2 mt-1"
                >
                  02:30
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
