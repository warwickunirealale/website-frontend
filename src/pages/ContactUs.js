import React, { useState } from "react";
import SplashImage from "../components/SplashImage";
import Navbar from "../components/Navbar";
import useFetch from "../hooks/useFetch";
import Footer from "../components/Footer";
import { gql, useMutation } from "@apollo/client";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

const SEND_EMAIL = gql`
mutation SendEmail($email: String!, $name: String!, $message: String!, $recaptcha: String!) {
  sendEmail(input: { email: $email, name: $name, message: $message, recaptcha: $recaptcha }) {
    success
    message
  }
}
`;


export default function ContactUs() {
    const { loading, error, data } = useFetch('https://warwickunirealale.containers.uwcs.co.uk/api/about-us-page?populate=aboutus_text,splash_image')

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const [sendEmail, { loading: sendingEmail }] = useMutation(SEND_EMAIL);
    const [submitStatus, setSubmitStatus] = useState(null); // dsada
    const [recaptchaResponse, setRecaptchaResponse] = useState(null)
    const recaptchaRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus(null);
    
        if (!email || !name || !message || !recaptchaResponse) {
            console.error("Please fill all fields and complete the reCAPTCHA");
            setSubmitStatus('error');
            return;
        }
        
        try {
            const { data } = await sendEmail({ 
                variables: { 
                    email, 
                    name, 
                    message, 
                    recaptcha: recaptchaResponse 
                } 
            });
            console.log('Response from server:', data);
            if (data.sendEmail.success) {
                setSubmitStatus("success");
                setEmail("");
                setName("");
                setMessage("");
                setRecaptchaResponse(null);
                recaptchaRef.current.reset(); // Reset reCAPTCHA after successful submission
            } else {
                setSubmitStatus('error');
                console.log("Failed to send email:", data.sendEmail.message);
            }
        } catch (err) {
            setSubmitStatus('error');
            console.error("Error sending email:", err);
        }
    }
    const handleRecaptchaChange = (value) => {
        setRecaptchaResponse(value);
    };

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error</p>
    }

    return (
        <div>
            <Navbar />
            <SplashImage
                image={`https://warwickunirealale.containers.uwcs.co.uk${data.data.attributes.splash_image.data.attributes.url}`}
                main_text="Contact Us"
                sub_text=""
            />
            <div className="bg-neutral-900 w-full h-full py-5 text-white text-center">
                <strong className=""><h1 className="text-4xl my-6">Get in touch</h1></strong>
                {submitStatus === 'success' && (
                    <strong className="text-xl text-green-400">We have received your email.</strong>
                )}
                {submitStatus === 'error' && (
                    <strong className="text-xl text-red-500">An error occurred, please try again.</strong>
                )}
                <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-6 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <label className="block text-left">
                            Your Email:
                            <input
                                type="email"
                                id="email"
                                className="block w-full p-2 mt-1 bg-white text-black border border-neutral-700 rounded"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label className="block text-left">
                            Name:
                            <input 
                                type="text"
                                id="name"
                                className="block w-full p-2 mt-1 bg-white text-black border border-neutral-700 rounded"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <label className="block text-left">
                        Message:
                        <textarea
                            id="message"
                            value={message}
                            className="block w-full p-2 mt-1 bg-white border text-black border-neutral-700 rounded"
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </label>
                    <div className="flex justify-end items-center pt-4 space-x-4">
                        <ReCAPTCHA 
                            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY_PROD}
                            onChange={handleRecaptchaChange}
                            ref={recaptchaRef}
                            className=""
                        />
                        <button type="submit" disabled={sendingEmail} className="px-6 py-2 bg-green-600 hover:bg-green-700 transition duration-300 text-white rounded">Send</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}