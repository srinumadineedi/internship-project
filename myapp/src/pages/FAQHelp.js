import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link

function FAQHelp() {
    const [expandedItems, setExpandedItems] = useState([]);

    const faqData = [
        {
            id: 1,
            question: 'What is this website about?',
            answer: 'This is a pet-matching service designed to connect pet owners and breeders in order to find companions.',
            userFeedbackEnabled: true,
        },
        {
            id: 2,
            question: 'How do I register my pet?',
            answer: 'Go to the "Register" page and fill out the pet profile form.',
            userFeedbackEnabled: true,
        },
        {
            id: 3,
            question: 'Is there a fee for using the service?',
            answer: 'Basic usage of our site is free. Premium features may require a subscription.',
            userFeedbackEnabled: true,
        },
        {
            id: 4,
            question: 'What breeds of pets are supported?',
            answer: 'We support a wide variety of dog and cat breeds, as well as some other common pets like rabbits and birds. Check our registration form for a full list.',
            userFeedbackEnabled: true,
        },
        {
            id: 5,
            question: 'How does the matchmaking process work?',
            answer: 'Our system uses a sophisticated algorithm to match pets based on various factors, including breed, age, temperament, and location.',
            userFeedbackEnabled: true,
        },
        {
            id: 6,
            question: 'Can I contact other pet owners directly?',
            answer: 'Yes, once you have a match, you can use our messaging system to communicate with other pet owners.',
            userFeedbackEnabled: true,
        },
        {
            id: 7,
            question: 'How do I report inappropriate behavior?',
            answer: 'You can report any inappropriate behavior by clicking the "Report" button on the user\'s profile or message. Our team will investigate promptly.',
            userFeedbackEnabled: false,
        },
        {
            id: 8,
            question: 'Is my personal information secure?',
            answer: 'We take your privacy seriously. All personal information is securely stored and protected in accordance with our privacy policy.',
            userFeedbackEnabled: false,
        },
        {
            id: 9,
            question: 'What if I forget my password?',
            answer: 'You can easily reset your password by clicking the "Forgot Password" link on the login page and following the instructions.',
            userFeedbackEnabled: false,
        },
        {
            id: 10,
            question: 'How often is the database updated?',
            answer: 'Our database is updated daily to ensure that you have access to the latest pet profiles and information.',
            userFeedbackEnabled: false,
        },
    ];

    const toggleAccordion = (id) => {
        if (expandedItems.includes(id)) {
            setExpandedItems(expandedItems.filter((item) => item !== id));
        } else {
            setExpandedItems([...expandedItems, id]);
        }
    };

    return (
        <>
            <style>
                {`
                    .faq-container {
                        max-width: 800px;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #f9f9f9;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }

                    .faq-header {
                        text-align: center;
                        margin-bottom: 20px;
                    }

                    .faq-header h1 {
                        color: #333;
                        margin-bottom: 10px;
                    }

                    .faq-header p {
                        color: #666;
                    }

                    .faq-accordion {
                        margin-top: 20px;
                    }

                    .accordion-item {
                        border: 1px solid #ddd;
                        margin-bottom: 10px;
                        border-radius: 4px;
                        overflow: hidden;
                    }

                    .accordion-button {
                        background-color: #fff;
                        color: #333;
                        padding: 15px;
                        width: 100%;
                        text-align: left;
                        border: none;
                        cursor: pointer;
                        transition: background-color 0.3s ease;
                        border-radius: 4px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .accordion-button:hover {
                        background-color: #eee;
                    }

                    .accordion-button:focus {
                        outline: none;
                        box-shadow: none;
                    }

                    .accordion-icon {
                        margin-left: auto;
                        transition: transform 0.3s ease;
                    }

                    .accordion-button:not(.collapsed) .accordion-icon {
                        transform: rotate(180deg);
                    }

                    .accordion-collapse {
                        border-top: 1px solid #ddd;
                    }

                    .accordion-body {
                        padding: 15px;
                        color: #555;
                    }

                    .contact-link {
                      display: block;
                      margin-top: 20px;
                      text-align: center;
                    }
                  .user-feedback {
                    margin-top: 10px;
                    text-align: center;
                  }
                `}
            </style>

            <div className="faq-container">
                <header className="faq-header">
                    <h1>Frequently Asked Questions</h1>
                    <p>Here you can quickly find answers to the most common questions about our service.</p>
                </header>

                <div className="faq-accordion">
                    {faqData.map((faq) => (
                        <div className="accordion-item" key={faq.id}>
                            <button
                                className="accordion-button"
                                type="button"
                                onClick={() => toggleAccordion(faq.id)}
                                aria-expanded={expandedItems.includes(faq.id)}
                                aria-controls={"faq-" + faq.id}
                            >
                                {faq.question}
                                <span className="accordion-icon">▼</span> {/* Downward arrow Unicode */}
                            </button>
                            <div
                                id={"faq-" + faq.id}
                                className={`accordion-collapse collapse ${expandedItems.includes(faq.id) ? 'show' : ''}`}
                            >
                                <div className="accordion-body">
                                    {faq.answer}
                                     {faq.userFeedbackEnabled && (
                                        <div className="user-feedback">
                                            Was this helpful?
                                            <button className="btn btn-sm btn-success">Yes</button>
                                            <button className="btn btn-sm btn-danger">No</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="contact-link">
                    <Link to="/contact">Still have questions? Contact us</Link>
                </div>
            </div>
        </>
    );
}

export default FAQHelp;