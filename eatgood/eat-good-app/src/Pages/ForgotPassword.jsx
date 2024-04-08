import React, { useState } from 'react';
import axios from 'axios';
import BackgroundImg from '../images/Desktop - 3.png';
import Mails from '../images/New Messages.png';
import SMSIcon from '../images/sms.png';


function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // State variable for modal visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://localhost:7176/api/Auth/forgot-password', { email });
      setSuccessMessage(response.data.message); // Assuming the API returns a success message
      setErrorMessage('');
      setShowModal(true); // Show modal on success
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      setSuccessMessage('');
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const closeModal = () => {
    setShowModal(false);
    setEmail('');
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
          <h3 className="info-text text-gray-500 text-sm text-wr  font-normal">Enter your email below and we’ll send you instructions on how to reset your password.</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-1 w-full">
            <h3 className="email-text text-blue-600 text-sm font-normal">Email</h3>
            <div className="email-input py-2 px-6 flex items-center mb-7 bg-gray-200 rounded-lg">
            <img src={SMSIcon} alt="lock icon" />
              <input type="email" value={email} onChange={handleInputChange} placeholder="**************@gmail.com" required className="flex-1 border-none outline-none bg-transparent" />
              <button type="submit" disabled={loading} className="email-toggle-icon flex items-center justify-center w-full bg-blue-600 rounded-xl text-white font-medium text-sm py-2.5 px-6 hover:bg-blue-700" id="togglePassword">
                {loading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </form>
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <h3 className="Link-text mt-5 text-center text-gray-500 text-sm font-normal">Go back to <a href="SIGN-UP URL" className="font-bold text-blue-600 underline">Sign in</a></h3>
        </div>
      </div>
      {/* Email Sent Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-full sm:w-2/3 md:w-2/5 lg:w-2/5 xl:w-2/5">
            <div className="w-full h-auto p-8 rounded-lg bg-white shadow-md flex flex-col justify-center items-center">
              <div className="text-center mb-6 w-auto h-auto">
                <img className="w-auto h-24" viewBox="0 0 151 109" fill="none" xmlns="http://www.w3.org/2000/svg" 
                src={Mails} alt='PasswordUpdated'
                />  
              </div>
              <h2 className="text-2xl font-semibold text-blue-500 mb-6 px-4 py-2 rounded-lg">Email Sent Successfully!</h2>
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

export default ForgotPassword;
