import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'

const VerifyEmail = () => {
  const { axios, navigate, setShowUserLogin } = useAppContext();
  const { state } = useLocation();
  const [email, setEmail] = useState(state?.email || '');
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const { data } = await axios.post('/api/user/verify-email', { email, otp });

      if (data.success) {
        toast.success(data.message);
        setShowUserLogin(true);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16">
      <form onSubmit={onSubmitHandler} className="w-full max-w-md p-8 rounded-lg shadow-xl border border-accent-mauve/20 bg-bg-ivory text-sm text-gray-600">
        <p className="text-3xl font-medium text-center mb-2">
          Verify <span className="text-primary">Your Email</span>
        </p>
        <p className="text-center text-gray-500 mb-8">
          Enter the 6-digit code sent to your email.
        </p>

        <label className="block mb-4">
          <span>Email</span>
          <input
            className="border border-accent-mauve/30 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label className="block mb-6">
          <span>Verification code</span>
          <input
            className="border border-accent-mauve/30 rounded w-full p-2 mt-1 outline-primary tracking-[0.35em]"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            value={otp}
            onChange={(event) => setOtp(event.target.value.replace(/\D/g, ''))}
            required
          />
        </label>

        <button disabled={isSubmitting} className="bg-primary hover:bg-primary-dull disabled:opacity-60 transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {isSubmitting ? 'Verifying...' : 'Verify Email'}
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;
