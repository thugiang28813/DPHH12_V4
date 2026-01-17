import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import { register } from "register-service-worker";

// Đăng ký Service Worker để App chạy Offline
register(`/${import.meta.env.MODE === "production" ? "sw.js" : "dev-sw.js"}`, {
  ready() {
    console.log("App đã sẵn sàng chạy Offline.");
  },
  registered() {
    console.log("Service worker đã được đăng ký.");
  },
  cached() {
    console.log("Nội dung đã được lưu vào bộ nhớ đệm để dùng Offline.");
  },
  updatefound() {
    console.log("Đang tải nội dung mới...");
  },
  updated() {
    console.log("Đã có nội dung mới! Vui lòng làm mới trang.");
    // Tự động hiện thông báo đơn giản của trình duyệt
    alert(
      "Thầy/Cô vừa cập nhật bài học mới. App sẽ tự động làm mới để cập nhật!"
    );
    window.location.reload();
  },
  offline() {
    console.log("Không có kết nối mạng. App đang chạy ở chế độ Offline.");
  },
  error(error) {
    console.error("Lỗi khi đăng ký service worker:", error);
  },
});
