import React from "react";
import { Alert } from "antd";
import "./ErrorIndicator.css";
import Pedro from "./pedro-racoon.gif";

const ErrorIndicator = () => {
  return (
    <>
      <Alert
        message=" Упс! Что-то пошло не так! "
        description="Мы уже вызвали фиксиков! "
        type="error"
      />
      <Alert message="Ну а пока Pedro, Pedro, Pedro..." type="warning" />
      <img className="raccoon" src={Pedro} alt="raccoon" />
    </>
  );
};
export default ErrorIndicator;
