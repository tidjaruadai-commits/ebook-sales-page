'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/checkout', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to initiate checkout.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container main-content">
      {/* Hero Section */}
      <section className={`${styles.hero} animate-fade-in-up`}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>New Release</span>
          <h1 className={styles.title}>
            Mastering <span className="gradient-text">Agentic AI</span>
          </h1>
          <p className={styles.subtitle}>
            Discover how to build, deploy, and scale autonomous AI agents. The ultimate guide for modern developers to stay ahead of the curve.
          </p>
          <button 
            className={styles.ctaButton} 
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get Instant Access'}
          </button>
        </div>
        <div className={styles.heroImageContainer}>
          {/* We will use a regular img tag or next/image for the ebook cover */}
          <img 
            src="/ebook-cover.png" 
            alt="Mastering Agentic AI Ebook Cover" 
            className={styles.ebookMockup}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="glass-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>What You'll Learn</h2>
        <div className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🤖</div>
            <h3 className={styles.featureTitle}>Core Fundamentals</h3>
            <p className={styles.featureDesc}>Understand the architecture of LLM-based autonomous agents and how they reason.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡️</div>
            <h3 className={styles.featureTitle}>Tool Integration</h3>
            <p className={styles.featureDesc}>Learn how to equip your AI with external tools, APIs, and databases for real-world impact.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🛡️</div>
            <h3 className={styles.featureTitle}>Safety & Scaling</h3>
            <p className={styles.featureDesc}>Best practices for deploying secure, reliable, and scalable agentic systems to production.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={`glass-card animate-fade-in-up ${styles.pricing}`} style={{ animationDelay: '0.4s' }}>
        <h2>Simple, Transparent Pricing</h2>
        <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>One-time payment for lifetime access.</p>
        
        <div className={styles.priceTag}>
          <span className={styles.currency}>$</span>29
        </div>
        
        <ul className={styles.pricingList}>
          <li>Complete PDF Ebook (200+ Pages)</li>
          <li>Source Code Examples</li>
          <li>Free Lifetime Updates</li>
          <li>Access to Private Discord Community</li>
        </ul>

        <button 
          className={styles.ctaButton} 
          style={{ width: '100%', padding: '1.25rem' }}
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Buy Now - $29'}
        </button>
      </section>
    </main>
  );
}
