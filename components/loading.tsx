"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "antd";

export default function Load() {
  const [loading, setLoading] = useState(true);

  const loadsim = async () => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => clearTimeout(delay);
  };

  useEffect(() => {
    loadsim();
  }, []);

  return (
    <div>
      {loading ? (
        <Skeleton active />
      ) : (
        // Your JSX code for the non-loading state goes here
        // For example, you can render another component or HTML elements
        <div>
          <p>Content loaded successfully</p>
        </div>
      )}
    </div>
  );
}
