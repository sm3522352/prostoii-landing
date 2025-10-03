"use client";

import { useEffect } from "react";

import { goal } from "@/lib/metrics";

type GoalOnViewProps = {
  name: string;
};

export default function GoalOnView({ name }: GoalOnViewProps) {
  useEffect(() => {
    goal(name);
  }, [name]);

  return null;
}
