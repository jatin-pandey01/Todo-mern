// OtpInput.jsx
import { useContext, useEffect, useRef, useState } from "react";

import React from 'react'
import { TodoContext } from "../context/TodoContext";

const Otp = () => {
  const length = 6;
  const [otp, setOtp] = useState(new Array(6).fill(""));
	const inputRefs = useRef([]);
  const {email} = useContext(TodoContext);

	useEffect(() => {
		if (inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
	}, []);

	const handleChange = (index, e) => {
		const value = e.target.value;
		if (isNaN(value)) return;

		const newOtp = [...otp];
		newOtp[index] =
			value.substring(value.length - 1);
		setOtp(newOtp);

		const combinedOtp = newOtp.join("");
		if (combinedOtp.length === length){
      console.log(combinedOtp);
    }

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

	return (
		<div className="h-[80vh] flex flex-col justify-center items-center">
      <p className="text-white mb-8"> Otp sent on : <span className="text-blue-600 text-xl"> {email} </span> </p>
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
		</div>
	);
}

export default Otp;