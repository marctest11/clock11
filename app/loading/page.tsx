"use client";

import React, { useEffect, useState } from "react";
import { Col, Card, Skeleton, Typography, Spin } from "antd";
const { Title } = Typography;
import { useRouter } from "next/navigation";

export default function Loading() {
  const router = useRouter();
  const [spinning, setSpinning] = React.useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const loadsim = async () => {
    setSpinning(true);
    const delay = (ms: number | undefined) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    await delay(2000);
    router.push("/report");
    setSpinning(false);
  };
  useEffect(() => {
    loadsim();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
      {loading ? (
        <Spin spinning={spinning} fullscreen /> // Render loading state while data is being fetched
      ) : (
        <div className="flex justify-center">
          <Col xs={24} sm={24} md={24} lg={24} xl={12} className="mb-2">
            <Card bordered={true} className="drop-shadow-md">
              <Title level={2} className="text-center">
                กรุณารอสักครู่...
              </Title>
            </Card>
          </Col>
        </div>
      )}
    </div>
  );
}
