"use client";
import React from "react";
import { Layout, theme } from "antd";

export default function BgMain({ children }) {
  const { Content } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  //123

  return (
    <Layout>
      <Content style={{ margin: "10px 16px 0" }}>
        <div
          style={{
            padding: 24,
            minHeight: 887,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >

          {children}
        </div>
      </Content>
    </Layout>
  );
}
