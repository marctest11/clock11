"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Col, Row, Card, Button, Form, Input, Skeleton } from "antd";
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
  const apikeyR = "0d1d06b7-d854-43ce-8f69-c87eab423b1a";
  //const apikeyT = "d631bb34-48b4-45f1-a8a6-7193ea3dd8a0";

  const hea = "S11E";
  const fot = "EN00";
  const cod = "E0000";

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

  const handleOk = async () => {
    try {
      setLoading(true);
      const Dataform = form.getFieldsValue();

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          //const latitude = 13.8957764;
          //const longitude = 100.671762;

          const Datapush = {
            head: hea,
            code: cod,
            Data: Dataform,
            lati: latitude,
            long: longitude,
            footer: fot,
            ak: apikeyR,
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
        });
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
      setLoading(false);
      router.push("/report");
    } catch (error) {
      console.error("Error catch login:", error);
    }
  };
  const loadsim = async () => {
    const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));
    await delay();
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

                    <Button
                      type="primary"
                      danger
                      icon={<CloseOutlined />}
                      shape="circle"
                      className="ml-2"
                    ></Button>
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
