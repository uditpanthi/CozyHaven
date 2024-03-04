import React, { useEffect, useState } from 'react';
import './payment.css';
import chipImage from './image/chip.png';
import visaImage from './image/visa.png';
import { useParams } from 'react-router-dom';
import { CursorAnimation } from '../CursorAnimation/CursorAnimation';
import Button from '../Button/Button';

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0); // State to store the totalPrice
    const { reservationId } = useParams();

    const fetchReservationDetails = () => {
        fetch(`http://localhost:5108/api/Reservation/GetById?id=${reservationId}`)
            .then(response => response.json())
            .then(data => {
                setTotalPrice(data.totalPrice); // Set totalPrice from the fetched reservation data
            })
            .catch(error => console.error('Error fetching reservation details:', error));
    };

    useEffect(() => {
        CursorAnimation();
        fetchReservationDetails(); // Fetch reservation details when component mounts
    }, []);

    const handlePayment = (method) => {
        setPaymentMethod(method);
        const data = {
            paymentID: 0,
            reservationID: reservationId,
            amount: totalPrice, // Use dynamic totalPrice
            paymentStatus: 1,
            paymentDate: new Date().toISOString(),
            paymentMethod: method
        };

        fetch('http://localhost:5108/api/Payment/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                console.log('Response:', response);
                return response.text();
            })
            .then(data => {
                console.log('Response Text:', data);
                setPaymentSuccess(true);
            })
            .catch(error => console.error('Error:', error));
    };

    const handleBackToHome = () => {
        window.location.href = `/`;
    };

    useEffect(() => {
        CursorAnimation();
        const cardNumberInput = document.querySelector('.card-number-input');
        const cardHolderInput = document.querySelector('.card-holder-input');
        const monthInput = document.querySelector('.month-input');
        const yearInput = document.querySelector('.year-input');
        const cvvInput = document.querySelector('.cvv-input');

        if (cardNumberInput) {
            cardNumberInput.oninput = () => {
                const cardNumberBox = document.querySelector('.card-number-box');
                const formattedValue = cardNumberInput.value.replace(/[\s-]/g, '');
                const formattedNumber = formattedValue.replace(/(.{4})/g, '$1 ').trim();
                cardNumberBox.innerText = formattedNumber;
                if (formattedValue.length > 16) {
                    cardNumberInput.value = formattedValue.slice(0, 16);
                }
            };
        }

        if (cardHolderInput) {
            cardHolderInput.oninput = () => {
                const cardHolderName = document.querySelector('.card-holder-name');
                cardHolderName.innerText = cardHolderInput.value;
            };
        }

        if (monthInput && yearInput) {
            monthInput.oninput = () => {
                const expMonth = document.querySelector('.exp-month');
                const expYear = document.querySelector('.exp-year');
                if (expMonth && expYear) {
                    expMonth.innerText = monthInput.value;
                    expYear.innerText = yearInput.value.slice(-2);
                }
            };

            yearInput.oninput = () => {
                const expYear = document.querySelector('.exp-year');
                if (expYear) {
                    expYear.innerText = yearInput.value.slice(-2);
                }
            };
        }

        if (cvvInput) {
            cvvInput.onmouseenter = () => {
                const front = document.querySelector('.front');
                const back = document.querySelector('.back');
                if (front && back) {
                    front.style.transform = 'perspective(1000px) rotateY(-180deg)';
                    back.style.transform = 'perspective(1000px) rotateY(0deg)';
                }
            };

            cvvInput.onmouseleave = () => {
                const front = document.querySelector('.front');
                const back = document.querySelector('.back');
                if (front && back) {
                    front.style.transform = 'perspective(1000px) rotateY(0deg)';
                    back.style.transform = 'perspective(1000px) rotateY(180deg)';
                }
            };

            cvvInput.oninput = () => {
                const cvvBox = document.querySelector('.cvv-box');
                cvvInput.value = cvvInput.value.replace(/\D/g, '');
                cvvBox.innerText = cvvInput.value;
                if (cvvInput.value.length > 4) {
                    cvvInput.value = cvvInput.value.slice(0, 4);
                }
            };
        }
    }, [reservationId]);

    return (
        <div className="container">
            <div id='cursor-blur'></div>
            <div className='split-box'>
            <div className="card-container">
                <div className="front">
                    <div className="image">
                        <img src={chipImage} alt="Chip" />
                        <img src={visaImage} alt="Visa" />
                    </div>
                    <div className="card-number-box">################</div>
                    <div className="flexbox">
                        <div className="box">
                            <span>card holder</span>
                            <div className="card-holder-name">full name</div>
                        </div>
                        <div className="box">
                            <span>expiry</span>
                            <div className="expiration">
                                <span className="exp-month">mm</span>
                                <span>/</span>
                                <span className="exp-year">yy</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="back">
                    <div className="stripe"></div>
                    <div className="box">
                        <span>cvv</span>
                        <div className="cvv-box"></div>
                        <img src={visaImage} alt="Visa" />
                    </div>
                </div>
            </div>
            <form action="">
                <div className="inputBox">
                    <span>card number</span>
                    <input type="number" maxLength="16" className="card-number-input" />
                </div>
                <div className="inputBox">
                    <span>card holder</span>
                    <input type="text" className="card-holder-input" />
                </div>
                <div className="flexbox">
                    <div className="inputBox">
                        <span>expiration mm</span>
                        <select name="" id="" className="month-input" defaultValue="month">
                            <option value="month" disabled>month</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                        <select name="" id="" className="year-input" defaultValue="year">
                            <option value="year" disabled>year</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                        </select>
                    </div>
                    <div className="inputBox">
                        <span>cvv</span>
                        <input type="text" maxLength="4" className="cvv-input" />
                    </div>
                </div>
                <button type="button" onClick={() => handlePayment('Pay on arrival')} className="submit-btn">Pay on arrival</button>
                <button type="button" onClick={() => handlePayment('Debit/Credit Card')} className="submit-btn">Pay Now</button>
            </form>
            </div>
            {paymentSuccess && (
                <div className="popup">
                    <p>Payment successful!</p>
                    <Button onClick={handleBackToHome}>Back to Home</Button>
                </div>
            )}
        </div>
    );
};

export default Payment;