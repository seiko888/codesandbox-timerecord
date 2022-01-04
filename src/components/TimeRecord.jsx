import React, { useState } from "react";
import { useTime } from "react-timer-hook";

function TimeRecord() {
  const { seconds, minutes, hours, ampm } = useTime({ format: "24-hour" });
  //開始時間用
  const [disp, setDisp] = useState("");
  //終了時間用
  const [edisp, setEdisp] = useState("");
  //合計用
  const [tdisp, setTdisp] = useState("");
  //ボタンステータス
  const [start, setStart] = useState(false);
  //配列用
  const [count, setCount] = useState(0);
  const japanStandardTime = new Date().toLocaleString({
    timeZone: "Asia/Tokyo"
  });

  const clickStartButton = () => {
    // 現在時刻取得
    var timeData = new Date(japanStandardTime);
    console.log("start１", start);

    if (start) {
      //ストップボタン押下
      setEdisp(
        "終了：" +
          timeData.getHours() +
          ":" +
          timeData.getMinutes() +
          ":" +
          timeData.getSeconds()
      );
      localStorage.setItem("etime", timeData);
      setStart(!start);
    } else {
      //スタートボタン押下
      setDisp(
        "開始：" +
          timeData.getHours() +
          ":" +
          timeData.getMinutes() +
          ":" +
          timeData.getSeconds()
      );
      //ローカルストレージに記録

      localStorage.setItem("time", timeData);
      setStart(!start);
    }
    //フラグを反転
    // setStart((prevState) => !prevState);
    console.log("start２", start);
  };

  const clickTotalButton = () => {
    var ttime = localStorage.getItem("time");
    var etime = localStorage.getItem("etime");
    console.log(ttime);
    console.log(etime);
    // console.log(ttime.getTime());
    var date1 = new Date(ttime);
    console.log("date1", date1);
    var date2 = new Date(etime);
    var diff = date2.getTime() - date1.getTime();
    console.log(diff);

    var total = Math.round(diff / 1000 / 60);
    console.log(total);
    setTdisp("合計：" + total);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>react-timer-hook </h1>
      <p>Current Time</p>
      <div style={{ fontSize: "100px" }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        <span>{ampm}</span>
      </div>
      <button onClick={clickStartButton}>
        {start ? "ストップ" : "スタート"}
      </button>
      <button onClick={clickTotalButton}>トータルタイム</button>
      <p>{disp}</p>
      <p>{edisp}</p>
      <p>{tdisp}</p>
    </div>
  );
}

export default TimeRecord;
