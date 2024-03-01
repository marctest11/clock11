"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Col, Tooltip, Card, Button, Form, Input, Skeleton } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import Webcam from "react-webcam";

export default function Home() {
  const webcamRef = useRef<any>(null);
  const [capturedImage, setCapturedImage] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [imgb64, setImgb64] = useState<any>(null);
  const [showWebcam, setShowWebcam] = useState<boolean>(false);
  const router = useRouter();
  const closeWebcam = () => {
    setShowWebcam(false);
    setCapturedImage(null);
  };

  const [form] = Form.useForm();

  const capture = useCallback(() => {
    const imgSrc = webcamRef.current.getScreenshot();

    if (imgSrc) {
      const base64Data = imgSrc.replace(/^data:image\/[a-z]+;base64,/, "");

      console.log("camera:", imgSrc);
      setCapturedImage(imgSrc);
      console.log("B64:", base64Data);
      setImgb64(base64Data);
    }
  }, [webcamRef]);

  const handleclear = async () => {
    form.resetFields();
  };

  const enction = (apikeyR: string | undefined) => {
    const crypto = require("crypto");

    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

    let enc = cipher.update(apikeyR, "utf-8", "hex");
    enc += cipher.final("hex");

    console.log("Encrypted Data:", enc);
    console.log("Initialization Vector (IV):", iv.toString("hex"));
    console.log("Encryption Key:", key.toString("hex"));

    return { enc, iv, key };
  };

  const handleOk = async () => {
    try {
      setLoading(true);
      const Dataform = form.getFieldsValue();
      const apikeyR = process.env.NEXT_PUBLIC_API_KEY;
      const hea = process.env.NEXT_PUBLIC_HEA;
      const cod = process.env.NEXT_PUBLIC_COD;
      const fot = process.env.NEXT_PUBLIC_FOT;

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          //const latitude = 13.8957764;
          //const longitude = 100.671762;

          const { enc, iv, key } = enction(apikeyR);

          const Datapush = {
            head: hea,
            code: cod,
            Data: Dataform,
            lati: latitude,
            long: longitude,
            footer: fot,
            ak: enc,
            iv: iv,
            key: key,
            //b64: imgb64,
          };

          console.log("DataP:", Datapush);

          const response = await axios.post("/api/login", Datapush);

          if (response.status === 200) {
            console.log(
              "PostOK:",
              response.data,
              response.status,
              response.statusText
            );
          } else {
            console.error("ErrorStatus", response.status);
          }

          const timewait = async () => {
            const delay = (ms: number | undefined) =>
              new Promise((resolve) => setTimeout(resolve, ms));
            await delay(500);

            router.push("/loading");
            setLoading(false);
          };
          timewait();
        });
      } else {
        setLoading(false);
        console.error("Geolocation is not supported by this browser.");
      }

      //setLoading(false);
      //router.push("/report");
    } catch (error) {
      setLoading(false);
      console.error("Error catch login:", error);
    }
  };

  const loadsim = async () => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    await delay(1000);
    setLoading(false);
  };
  useEffect(() => {
    loadsim();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
      {loading ? (
        <Skeleton active /> // Render loading state while data is being fetched
      ) : (
        <div className="flex justify-center">
          <Col xs={24} sm={24} md={24} lg={24} xl={12} className="mb-2">
            <Card bordered={true} className="drop-shadow-md">
              <Form
                form={form}
                layout="vertical"
                style={{ maxWidth: "100%" }}
                initialValues={{ status: false }}
                autoComplete="off"
                labelCol={{ span: 4 }}
              >
                <Form.Item
                  label="Username :"
                  name="user"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input name="user" />
                </Form.Item>
                <Form.Item
                  label="Password :"
                  name="pass"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password name="pass" />
                </Form.Item>

                <Form.Item label="PhotoShoot!! :">
                  {!showWebcam ? (
                    <div className="flex justify-items-center">
                      <Button
                        block
                        size="large"
                        icon={<CameraOutlined />}
                        onClick={() => setShowWebcam(true)}
                      ></Button>
                    </div>
                  ) : (
                    <div>
                      <Card bordered={true} className="drop-shadow-md">
                        {capturedImage ? (
                          <div className="relative w-full max-w-[500px] h-auto">
                            <Image
                              src={capturedImage}
                              alt="Captured"
                              layout="responsive"
                              width={500}
                              height={300}
                            />
                          </div>
                        ) : (
                          <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={500}
                            height={300}
                            className="flex justify-center"
                          />
                        )}
                        <div className=" flex justify-center">
                          <Button
                            shape="round"
                            icon={<CheckOutlined />}
                            className="ml-2"
                            onClick={capture}
                          >
                            Shoots!!
                          </Button>

                          <Button
                            type="primary"
                            danger
                            icon={<CloseOutlined />}
                            shape="round"
                            className="ml-2"
                            onClick={closeWebcam}
                          >
                            Close Webcam
                          </Button>
                        </div>
                      </Card>
                    </div>
                  )}
                </Form.Item>

                <Form.Item>
                  <div className=" flex justify-center">
                    <Button
                      shape="round"
                      icon={<CheckOutlined />}
                      className="ml-2"
                      onClick={handleOk}
                    >
                      Save
                    </Button>
                    <Tooltip title="Clear">
                      <Button
                        type="primary"
                        danger
                        icon={<CloseOutlined />}
                        shape="circle"
                        className="ml-2"
                        onClick={handleclear}
                      ></Button>
                    </Tooltip>
                  </div>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </div>
      )}
    </div>
  );
}
