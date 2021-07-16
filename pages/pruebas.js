import { method } from "lodash";
import React, { useEffect, useState } from "react";

export default function pruebas() {
  const platform = {
    title: "Atari",
    url: "Computadoraaaaa",
    position: 1,
    published_at: "2021-06-20T20:26:34.898+00:00",
    createdAt: "2021-06-20T20:24:31.837+00:00",
    updatedAt: "2021-06-20T20:26:35.287+00:00",
    __v: 0,
  };
  useEffect(async () => {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(platform),
    };
    try {
      const response = await fetch("http://localhost:3000/api/games", params);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return <div>Hola mundo</div>;
}
