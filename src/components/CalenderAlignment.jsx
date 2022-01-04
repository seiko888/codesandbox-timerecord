import React from "react";
import ApiCalendar from "react-google-calendar-api";

function CalenderAlignment() {
  const getEvents = async () => {
    return new Promise(async (resolve, reject) => {
      // 2.認証チェック
      if (ApiCalendar.sign) {
        // 3.イベントの取得
        ApiCalendar.listEvents({
          timeMin: new Date().toISOString(),
          timeMax: new Date().addDays(10).toISOString(),
          showDeleted: true,
          maxResults: 10,
          orderBy: "updated"
        }).then(({ result }) => {
          if (result.items) {
            console.log("Events From Calendar", result.items);
          } else {
            console.log("No Events");
          }

          resolve(result);
        });
      } else {
        // 2’.認証していなければOAuth認証
        ApiCalendar.handleAuthClick();

        resolve(null);
      }
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={getEvents}>カレンダー取得</button>
    </div>
  );
}

export default CalenderAlignment;
