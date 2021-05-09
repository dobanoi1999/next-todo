import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from "next/link";
const initial = {
  username: "",
  password: "",
  email: "",
};
const register = () => {
  const router = useRouter();
  const [data, setData] = useState(initial);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

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
      .post("api/auth/register", data)
      .then((res) => {
        alert(res.data.msg);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("username", res.data.data.username);
        setData(initial);
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
        <h3 className="mt-8 text-center text-2xl">Register</h3>
        <input
          className="mt-8 bg-gray-700 p-2 rounded text-gray-100"
          type="text"
          name="username"
          value={data.username}
          onChange={handleOnChange}
          placeholder="User Name"
          required
        />
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
          {loading ? "Loading" : "Register"}
        </button>

        <p className="mt-8">
          Already have an account?
          <Link className="text-red-400 underline" href="/login">
            <a className="text-red-400 underline">Login Now</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default register;
