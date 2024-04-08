import React, { useState } from 'react';
import axios from 'axios';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BackgroundImg from '../images/Desktop - 3.png';
import AccessSuccess from '../images/Access Success.png';
import Lock from '../images/lock.png';


function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://localhost:7176/api/Auth/reset-password', { password, confirmPassword });
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setShowModal(true);
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      setSuccessMessage('');
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="reset-password-container flex flex-col md:flex-row items-center">
      <div className="background-image hidden md:block">
        <img width="940" height="1024" viewBox="0 0 940 1024" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
         src={BackgroundImg} alt='Background'/>
      </div>
      <div className="reset-password-form flex flex-col items-center p-8 gap-8 bg-white rounded-xl">
        <div className="frame-49 flex flex-col items-center gap-4">
          <h1 className="eat-good-naija-text text-blue-600 text-3xl font-semibold">Eat Good Naija</h1>
          <h2 className="reset-your-password-text text-black text-2xl font-semibold">Reset your password</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-1 w-full">
            <h3 className="password-text text-blue-600 text-sm font-normal">Password</h3>
            <div className="password-input py-2 px-6 flex items-center mb-5 bg-gray-200 rounded-lg">
              <img src={Lock} alt="lock icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={handleInputChange}
                placeholder="********"
                required
                className="flex-1 border-none outline-none bg-transparent"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            </div>
            <h3 className="password-text text-blue-600 text-sm font-normal">Confirm Password</h3>
            <div className="password-input py-2 px-6 flex items-center mb-5 bg-gray-200 rounded-lg">
              <img src={Lock} alt="lock icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleInputChange}
                placeholder="********"
                required
                className="flex-1 border-none outline-none bg-transparent"
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEye : faEyeSlash}
                className="cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="reset-button flex items-center justify-center w-full bg-blue-600 rounded-xl text-white font-medium text-sm py-2.5 px-6 hover:bg-blue-700"
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
      {/* Password Updated Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-full sm:w-2/3 md:w-2/5 lg:w-2/5 xl:w-2/5">
            <div className="w-full h-auto p-8 rounded-lg bg-white shadow-md flex flex-col justify-center items-center">
              <div className="text-center mb-6 w-auto h-auto">
                <img className="w-auto h-24" viewBox="0 0 151 109" fill="none" xmlns="http://www.w3.org/2000/svg" 
                src={AccessSuccess} alt='PasswordUpdated'
                /> 
              </div>
              <h2 className="text-2xl font-semibold text-blue-500 mb-6 px-4 py-2 rounded-lg">Password Updated Successfully!</h2>
              <button onClick={closeModal} className="w-full h-10 px-6 rounded-2xl bg-blue-500 text-white text-base font-semibold flex items-center justify-center">
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
