import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Portfolio from '../Component/Portfolio';
import SEO from '../utils/SEO';

const PortfolioPage = () => {
  return (
    <>
      <SEO
        title="Our Portfolio - Successful Projects & Case Studies | jTech"
        description="Explore jTech's portfolio of successful technology projects. View our web development, mobile apps, cloud solutions, and digital transformation case studies. 500+ projects delivered."
        keywords="portfolio, case studies, web projects, mobile app projects, technology portfolio, successful projects, jTech work, project examples"
        url="https://jtechvision.com/portfolio"
        ogImage="https://jtechvision.com/og-portfolio.jpg"
        twitterImage="https://jtechvision.com/twitter-portfolio.jpg"
      />
      <div className="pt-32">
        <Portfolio />
      </div>
    </>
  );
};

export default PortfolioPage;