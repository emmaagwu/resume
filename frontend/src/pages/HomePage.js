// src/pages/HomePage.js
import React from 'react';
import Hero from '../components/Hero';
import JobListing from '../components/JobListing';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <JobListing />
    </div>
  );
}
