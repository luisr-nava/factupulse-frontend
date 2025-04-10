"use client";
import { Spin } from "antd";

export default function CustomSpinner({
  size = "large",
}: {
  size?: "small" | "default" | "large";
}) {
  return <Spin size={size} className="custom-spin" fullscreen/>;
}

