// OtpInput.jsx
import { useContext, useEffect, useRef, useState } from "react";

import React from 'react'
import { TodoContext } from "../context/TodoContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const length = 6;
  const [otp, setOtp] = useState(new Array(6).fill(""));
	const inputRefs = useRef([]);
  const {email,name,password} = useContext(TodoContext);
	const [message,setMessage] = useState('');

	const navigate = useNavigate();
  

	useEffect(() => {
		if(document.cookie){
      navigate('/');
    }
		if (inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
	}, []);

	const handleChange = async(index, e) => {
		const value = e.target.value;
		setMessage('');
		if (isNaN(value)) return;

		const newOtp = [...otp];
		newOtp[index] =
			value.substring(value.length - 1);
		setOtp(newOtp);


		if (value && index < length - 1 &&
			inputRefs.current[index + 1]) {
			inputRefs.current[index + 1].focus();
		}
	};

	const handleClick = (index) => {
		inputRefs.current[index].setSelectionRange(1, 1);

		if (index > 0 && !otp[index - 1]) {
			inputRefs.current[otp.indexOf("")].focus();
		}
	};

	const handleKeyDown = (index, e) => {
		if (
			e.key === "Backspace" &&
			!otp[index] &&
			index > 0 &&
			inputRefs.current[index - 1]
		) {
			inputRefs.current[index - 1].focus();
		}
	};

	const submitHandler = async(e)=>{
		e.preventDefault();
		const combinedOtp = otp.join("");
		if (combinedOtp.length === length){
      try {
        const res = await axios.post('https://todo-api-kax0.onrender.com/api/v1/auth/sign-up',{
          name:name,
          email:email,
          password:password,
          otp:combinedOtp
        });
        console.log(res);
        console.log(res.data);
				const data = res.data;
				if(res.data.success){
					document.cookie = `token=${data.token}; Path=/;`;
					navigate('/');
        	// window.location.reload();
				}
      } catch (error) {
				setMessage(error.response.data.message + ".  Please register again");
        console.log(error.response);
      }
      
    }
		else{
			setMessage('Please complete otp.')
		}
	}

	return (
		<div className="h-[80vh] flex flex-col justify-center items-center">
      <p className="text-white mb-8"> Otp sent on : <span className="text-blue-600 text-xl underline"> {email} </span> </p>
			<div>
      {otp.map((value, index) => {
				return (
          <input
						key={index}
						type="text"
						ref={(input) => (inputRefs.current[index] = input)}
						value={value}
						onChange={(e) => handleChange(index, e)}
						onClick={() => handleClick(index)}
						onKeyDown={(e) => handleKeyDown(index, e)}
						className="otpInput rounded"
					/>
				);
			})}
      </div>
			<p className="text-xl bg-green-600 mt-5 mb-1 cursor-pointer hover:bg-green-500 text-white px-4 py-[5px] rounded-md" onClick={submitHandler}> Verify </p>
			<p className="text-red-500"> <span className="text-2xl"> {message && '*'} </span> { message && message} </p>
		</div>
	);
}

export default Otp;