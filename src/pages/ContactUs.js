import React, { useState } from "react";
import SplashImage from "../components/SplashImage";
import Navbar from "../components/Navbar";
import useFetch from "../hooks/useFetch";
import Footer from "../components/Footer";
import { gql, useMutation } from "@apollo/client";

const SEND_EMAIL = gql`
    mutation SendEmail($email: String!, $message: String!) {
        sendEmail(input: { email: $email, message: $ message }) {
            success
            message
        }
    }
`

export default function ContactUs() {
    const { loading, error, data } = useFetch('http://localhost:1337/api/about-us-page?populate=aboutus_text,splash_image')

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [sendEmail] = useMutation(SEND_EMAIL)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await sendEmail({ variables: { email, message } });
            if (!data.sendEmail.success) {
                console.log("Failed to send email")
                alert("An error occurred")
            }
        } catch (err) {
            console.error(err)
            alert("Error occurred")
        }
    }

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
                image={`http://localhost:1337${data.data.attributes.splash_image.data.attributes.url}`}
                main_text="Contact Us"
                sub_text=""
            />
            <div className="bg-neutral-900 w-full h-full py-5 text-white text-center">
                <strong className=""><h1 className="text-4xl mt-6">Get in touch</h1></strong>
                <form onSubmit={handleSubmit}>
                    <label>
                        Your Email:
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Message:
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required                      
                        />
                    </label>
                    <button type="submit">Send</button>
                </form>
            </div>
            <Footer />
        </div>
    )
}