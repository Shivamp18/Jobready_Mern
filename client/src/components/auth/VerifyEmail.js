import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../utils/api/api';
import Spinner from '../common/Spinner';

const VerifyEmail = () => {
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const { token } = useParams();

  useEffect(() => {
    const verifyEmailToken = async () => {
      try {
        console.log('Verifying email token:', token);
        await api.get(`/api/auth/verify-email/${token}`);
        console.log('Email verified successfully');
        setVerified(true);
        console.log('Verified:', verified);
        setVerifying(false);
      } catch (err) {
        console.log('Error verifying email:', err);
        setError(err.response?.data?.message || 'Email verification failed');
        setVerifying(false);
      }
    };

    verifyEmailToken();
  }, [token]);

  if (verifying) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Verifying Your Email</h2>
          <Spinner />
          <p className="mt-4 text-gray-600">Please wait while we verify your email address...</p>
        </div>
      </div>
    );
  }

  if (error) {
   
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Verification Failed</h2>
          <p className="mb-4 text-gray-700">{error}</p>
          <p className="mb-4 text-gray-600">
            The verification link may have expired or is invalid.
          </p>
          <Link
            to="/login"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-600">Email Verified!</h2>
        <p className="mb-4 text-gray-700">
          Your email has been successfully verified. You can now log in to your account.
        </p>
        <Link
          to="/login"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;
