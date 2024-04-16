document.addEventListener("DOMContentLoaded", function () {
  const timer = document.getElementById("timer");
  const start = document.getElementById("start");
  const stop = document.getElementById("stop");
  const notificationbtn = this.getElementById("notification");

  let start_time;
  let isRunning = false;

  function count_up() {
    if (isRunning) {
      const d = new Date(Date.now() - start_time);
      const m = d.getMinutes();
      const s = d.getSeconds();
      const ms = d.getMilliseconds();

      timer.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(
        2,
        "0"
      )}:${String(ms).padStart(3, "0")}`;

      if (m >= 30) {
        stopTimer();
        showPopupNotification();
      }
    }
  }

  start.addEventListener("click", () => {
    isRunning = true;
    start_time = Date.now();
    setInterval(count_up, 100);
    start.disabled = true;
  });

  stop.addEventListener("click", () => {
    stopTimer();
    start.disabled = false;
  });

  notificationbtn.addEventListener("click", () => {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        var notification = new Notification("許可を求める", {
          body: "通知の許可をする",
        });
        setTimeout(function () {
          notification.close();
        }, 30000);
      }
    });
  });

  function showPopupNotification() {
    if (Notification.permission === "granted") {
      new Notification("30分経過しました。");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (Notification.permission === "granted") {
          new Notification("30分経過しました。");
        }
      });
    }
  }

  function stopTimer() {
    isRunning = false;
  }
});
