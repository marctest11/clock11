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
      ) : ()}
    </div>
  );
}
