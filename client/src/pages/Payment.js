import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ShieldCheck, CreditCard, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { checkAuth } = useAuth(); // Refresh user data after payment

  useEffect(() => {
    // Load Razorpay script dynamically
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    };
    loadScript();
  }, []);

  const handlePayment = async () => {
    if (!window.Razorpay) {
      toast.error('Razorpay SDK failed to load. Are you online?');
      return;
    }
    
    // Fallback error if the environment variable is not set
    const keyId = process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_TPYIf6DZvOeAfu';
    if (!keyId) {
      toast.error('Razorpay Key ID is not configured in the environment.');
      return;
    }

    setLoading(true);

    try {
      // 1. Create order on the backend
      const { data: order } = await axios.post('/api/payment/create-order');

      // 2. Initialize Razorpay options
      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Quadra Home Tuitions',
        description: 'One-time Registration Fee',
        image: 'https://images.unsplash.com/photo-1523240798132-9c4c3c2c0c8c?auto=format&fit=crop&w=150&q=80',
        order_id: order.id,
        handler: async function (response) {
          try {
            // 3. Verify payment on the backend
            await axios.post('/api/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            
            toast.success('Payment successful! Registration complete.');
            
            // Refresh user state so hasPaidRegistrationFee becomes true
            await checkAuth();
            
            // Redirect to dashboard
            navigate('/dashboard');
          } catch (err) {
            console.error('Verification error:', err);
            toast.error('Payment verification failed.');
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        notes: {
          address: 'Quadra Home Tuitions Registration'
        },
        theme: {
          color: '#3b82f6' // Tailwind blue-500
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      
      paymentObject.on('payment.failed', function (response){
        toast.error(`Payment failed: ${response.error.description}`);
      });
      
    } catch (error) {
      console.error('Error starting payment:', error);
      toast.error(error.response?.data?.message || 'Failed to initialize payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-primary-600 p-6 text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-1">Complete Registration</h2>
          <p className="text-primary-100 text-sm">One-time registration fee</p>
        </div>
        
        <div className="p-8">
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100">
            <div>
              <p className="text-gray-500 text-sm font-medium">Registration Fee</p>
              <h3 className="text-3xl font-bold text-gray-800">₹500</h3>
            </div>
            <div className="text-primary-600 bg-primary-50 p-3 rounded-lg">
              <CreditCard className="h-6 w-6" />
            </div>
          </div>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-center text-gray-600 text-sm">
              <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Access to Dashboard
            </li>
            <li className="flex items-center text-gray-600 text-sm">
              <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Connect with Tutors
            </li>
            <li className="flex items-center text-gray-600 text-sm">
              <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Lifetime account validity
            </li>
          </ul>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full btn-primary py-4 flex items-center justify-center text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Pay ₹500 with UPI / Card'
            )}
          </button>
          
          <div className="mt-6 flex items-center justify-center text-xs text-gray-400">
            <Lock className="h-3 w-3 mr-1" />
            Secured by Razorpay
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
