import React, { useState } from 'react';
import './farmer-subscriptions.css';
import Sidebar from '../components/Sidebar';

const Subscription = () => {
    const [isYearly, setIsYearly] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const togglePricing = () => {
        setIsYearly(!isYearly);
    };

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const plans = [
        {
            name: 'Basic',
            monthlyPrice: '$9.99',
            yearlyPrice: '$95.88',
            features: [
                'Basic Listing',
                'Limited Analytics'

            ]
        },
        {
            name: 'Standard',
            monthlyPrice: '$14.99',
            yearlyPrice: '$143.88',
            features: [
                'Listing Boost',
                'Enhance Analytics',
                'Markketing Assitance'

            ],
            isPopular: true
        },
        {
            name: 'Premium',
            monthlyPrice: '$19.99',
            yearlyPrice: '$191.88',
            features: [
                'Priority Listing',
                'Advanced AI Insights',
                'Support Priority',
            ]
        }
    ];

    return (
        <div className="app-container">
            <Sidebar isCollapsed={sidebarCollapsed} />

            <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
                <header className="page-header">
                    <button className="sidebar-toggle" onClick={toggleSidebar}>
                        ☰
                    </button>
                    <h1>Farm2Table Subscription</h1>
                </header>

                <div className="subscription-container">
                    <div className="page-section">
                        <h2 className="section-title">Farmer Subscription Plans</h2>
                        <div className="section-divider"></div>
                    </div>

                    <div className="pricing-header">
                        <h1 className="title">Choose Your Plan</h1>
                        <p className="subtitle">Select the perfect plan for your farming needs</p>

                        <div className="pricing-toggle">
                            <span className="toggle-label">Monthly</span>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={isYearly}
                                    onChange={togglePricing}
                                />
                                <span className="slider round"></span>
                            </label>
                            <span className="toggle-label">Yearly <span className="discount">(Save 20%)</span></span>
                        </div>
                    </div>

                    <div className="pricing-grid">
                        {plans.map((plan, index) => (
                            <div key={index} className={`pricing-card ${plan.isPopular ? 'featured' : ''}`}>
                                {plan.isPopular && <div className="popular-tag">Most Popular</div>}
                                <h2>{plan.name}</h2>
                                <div className="price">
                                    <span className={`monthly-price ${isYearly ? 'hidden' : ''}`}>
                                        {plan.monthlyPrice}<span className="period">/month</span>
                                    </span>
                                    <span className={`yearly-price ${!isYearly ? 'hidden' : ''}`}>
                                        {plan.yearlyPrice}<span className="period">/year</span>
                                    </span>
                                </div>
                                <ul className="features">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex}>{feature}</li>
                                    ))}
                                </ul>
                                <button className="subscribe-btn">Subscribe Now</button>
                            </div>
                        ))}
                    </div>

                    <div className="no-subscription">
                        <button className="skip-subscription-btn">Continue without Subscription</button>
                        <p className="skip-note">You can always subscribe later</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscription;