import React, { useState } from 'react';
import './pricingplan.css';

export const plans = [
    {
        name: "Weekly Plan",
        link: 'https://buy.stripe.com/test_28og293dz8eY6Ig6oo',
        priceId: 'price_1QFwStCTWRQuQJSBwymfwD2Z',
        price: 59,
        duration: '/week',
        features: [
            "Basic Customization Options",
            "Access to 1 Theme",
            "Limited Content Controls",
            "Basic Analytics Dashboard",
            "Email Support"
        ]
    },
    {
        name: "Monthly Plan",
        link: 'https://buy.stripe.com/test_eVabLT9BXbra8Qo7st',
        priceId: 'price_1QFwWcCTWRQuQJSBQyok8zmf',
        price: 259,
        duration: '/month',
        features: [
            "Advanced Customization (Messages & Banners)",
            "Access to 5 Themes",
            "Enhanced Content Controls",
            "Admin Analytics Dashboard",
            "Priority Email Support"
        ]
    },
    {
        name: "Yearly Plan",
        link: 'https://buy.stripe.com/test_4gwaHP7tP52M2s0aEH',
        priceId: 'price_1QFwYUCTWRQuQJSBfcE02FFg',
        price: 2599,
        duration: '/year',
        features: [
            "Full Customization (Messages, Themes, and Banners)",
            "Access to All Themes",
            "Complete Content Controls",
            "Advanced Admin Dashboard with AI Insights",
            "24/7 Priority Support"
        ]
    }
];

const Pricing = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handleSubscribe = (event) => {
        event.preventDefault();
        if (selectedPlan) {
            window.location.href = selectedPlan.link; 
        }
    };

    const getCard = (plan) => {
        return selectedPlan?.priceId === plan.priceId ? 'plan-card selected' : 'plan-card';
    };

    return (
        <div className="form-area">
            <form onSubmit={handleSubscribe}>
                <div className="plan-cards">
                    {plans.map((plan) => (
                        <button
                            key={plan.priceId}
                            type="card-button"
                            className={getCard(plan)}
                            onClick={() => setSelectedPlan(plan)}
                        >
                            <h3>{plan.name}</h3>
                            <p className="price">₹{plan.price}{plan.duration}</p>
                            <ul className="features">
                                {plan.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </button>
                    ))}
                </div>
            </form>
        </div>
    );
};

export default Pricing;
