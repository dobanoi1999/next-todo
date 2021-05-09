import axios from "axios";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { logged } from "../recoil/logged";
import Link from "next/link";
const initial = {
  password: "",
  email: "",
};
const Login = () => {
  const router = useRouter();
  const [data, setData] = useState(initial);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogged, setIsLogged] = useRecoilState(logged);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleOnSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post("api/auth/login", data)
      .then((res) => {
        alert(res.data.msg);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("username", res.data.data.username);
        setIsLogged(true);
        router.push("/");
      })
      .catch((err) => {
        if (err?.response?.data?.msg) {
          setErr(err.response.data.msg);
        }
        console.log(err);
      });
    setLoading(false);
  };

  return (
    <div className="pt-8">
      <form
        className=" flex flex-col max-w-xl mx-auto p-3 rounded border-2 border-gray-900 shadow-xl"
        onSubmit={handleOnSubmit}
      >
        <h3 className="mt-8 text-center text-2xl">Login</h3>

        <input
          className="mt-8 bg-gray-700 p-2 rounded text-gray-100"
          type="email"
          name="email"
          value={data.email}
          onChange={handleOnChange}
          placeholder="Email"
          required
        />
        <input
          className="mt-8 bg-gray-700 p-2 rounded text-gray-100"
          type="password"
          name="password"
          value={data.password}
          onChange={handleOnChange}
          placeholder="Password"
          required
        />
        {err ? <span className="text-red-700">{err}</span> : ""}
        <button
          className="py-2 w-1/3 mt-8 mx-auto px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          type="submit"
        >
          {loading ? "Loading" : "Login"}
        </button>

        <p className="mt-8">
          Don't have an account?
          <Link className="text-red-400 underline" href="/register">
            <a className="text-red-400 underline">Register</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
