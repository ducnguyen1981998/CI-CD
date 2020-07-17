// import config from 'config';
import { authHeader } from "../_helpers";

export const userService = {
  login,
  logout,
  register,
  forgetPassword,
  forgetPassword1,
  changePassword
};

// Đăng nhập
function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ TenDangNhap: username, MatKhau: password })
  };

  return fetch(`http://localhost:3000/api/auth/signin`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user.response) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        throw new Error(user.msg);
      }
      return user;
    });
}
// Đăng xuất
function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}
// Đăng kí
function register(user) {
  const userDetail = {
    TenDangNhap: user.username,
    MatKhau: user.password,
    Email: "myaccount8@gmail.com",
    SoDienThoai: "0123456789",
    TenKhachHang: "Nguyen Cong Phuong",
    GioiTinh: "Nam",
    SoCMND: "212810150",
    NgaySinh: "2020/2/2",
    DiaChi: "Quang Ngai",
    ChiNhanhMo: "abc"
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDetail)
  };

  return fetch(`http://localhost:3000/api/auth/signup`, requestOptions).then(
    handleResponse
  );
}

// Quên tài khoản --- Gởi username + email
function forgetPassword({ email, username }) {
  const payload = {
    TenDangNhap: username,
    Email: email
  };

  // console.log("Forget password: ", payload.TenDangNhap, payload.Email);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  };

  return fetch(
    `http://localhost:3000/api/forgot-password/get-code`,
    requestOptions
  )
    .then(handleResponse)
    .then(user => {
      console.log(user);
      // login successful if there's a jwt token in the response
      if (!user.err) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", requestOptions.body);
      } else {
        throw new Error(user.err);
      }
      return user;
    });
}

function forgetPassword1(codeotp) {
  const userStorage = JSON.parse(localStorage.getItem("user"));
  const payload = {
    TenDangNhap: userStorage.TenDangNhap + "",
    Email: userStorage.Email + "",
    OTPCode: codeotp
  };
  localStorage.setItem("user", JSON.stringify(payload));
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  };

  return fetch(
    `http://localhost:3000/api/forgot-password/check-code`,
    requestOptions
  )
    .then(handleResponse)
    .then(user => {
      // console.log(user);

      // if (!user.err) {
      //   localStorage.setItem("user", JSON.stringify(user));
      // } else {
      //   throw new Error(user.err);
      // }
      return user;
    });
}

function changePassword(password) {
  console.log("HERE: ChangePassword");
  const userStorage = JSON.parse(localStorage.getItem("user"));
  const payload = {
    TenDangNhap: userStorage.TenDangNhap + "",
    Email: userStorage.Email + "",
    OTPCode: userStorage.OTPCode,
    MatKhau: password
  };
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  };

  return fetch(
    `http://localhost:3000/api/forgot-password/verify-code-and-recovery-password`,
    requestOptions
  )
    .then(handleResponse)
    .then(user => {
      // console.log(user);

      // if (!user.err) {
      //   localStorage.setItem("user", JSON.stringify(user));
      // } else {
      //   throw new Error(user.err);
      // }
      return user;
    });
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    // console.log(data);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
