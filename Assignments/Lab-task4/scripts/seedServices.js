const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Service = require('../models/Service');

// Sample services data
const servicesData = [
    // Website Development
    { name: 'E-Commerce Website', description: 'Full-featured e-commerce platform with payment integration', category: 'Website Development', price: 2500, rating: 4.8, outcomes: ['Responsive Design', 'Payment Gateway', 'Inventory Management', 'Admin Panel'] },
    { name: 'Corporate Website', description: 'Professional corporate website with CMS', category: 'Website Development', price: 1800, rating: 4.6, outcomes: ['SEO Optimized', 'Fast Loading', 'Mobile Friendly', 'Blog Integration'] },
    { name: 'Portfolio Website', description: 'Creative portfolio for designers and artists', category: 'Website Development', price: 1200, rating: 4.5, outcomes: ['Gallery Display', 'Contact Form', 'Social Media Integration', 'Analytics'] },
    { name: 'SaaS Application', description: 'Complete software as a service platform', category: 'Website Development', price: 5000, rating: 4.9, outcomes: ['User Authentication', 'Database Design', 'API Development', 'Dashboard'] },

    // Mobile App
    { name: 'iOS App Development', description: 'Native iOS application development', category: 'Mobile App', price: 3500, rating: 4.7, outcomes: ['App Store Deployment', 'Push Notifications', 'Offline Mode', 'Location Services'] },
    { name: 'Android App Development', description: 'Native Android application development', category: 'Mobile App', price: 3500, rating: 4.7, outcomes: ['Play Store Submission', 'Firebase Integration', 'Real-time Sync', 'Crash Reports'] },
    { name: 'Cross-Platform App', description: 'React Native cross-platform application', category: 'Mobile App', price: 2800, rating: 4.6, outcomes: ['iOS & Android', 'Code Reusability', 'Fast Development', 'Native Performance'] },
    { name: 'Mobile Banking App', description: 'Secure banking application with encryption', category: 'Mobile App', price: 4500, rating: 4.9, outcomes: ['Security Compliance', 'Biometric Auth', 'Transaction History', 'Bill Payments'] },

    // Digital Marketing
    { name: 'SEO Optimization', description: 'Search engine optimization to increase visibility', category: 'Digital Marketing', price: 800, rating: 4.4, outcomes: ['Keyword Research', 'On-page Optimization', 'Link Building', 'Monthly Reports'] },
    { name: 'Social Media Campaign', description: 'Comprehensive social media marketing campaign', category: 'Digital Marketing', price: 1500, rating: 4.6, outcomes: ['Content Strategy', 'Ad Campaign', 'Community Management', 'Analytics'] },
    { name: 'Email Marketing Setup', description: 'Email marketing automation and campaigns', category: 'Digital Marketing', price: 600, rating: 4.3, outcomes: ['List Segmentation', 'Template Design', 'Automation Workflow', 'A/B Testing'] },
    { name: 'PPC Advertising', description: 'Google Ads and Facebook Ads management', category: 'Digital Marketing', price: 2000, rating: 4.7, outcomes: ['Campaign Setup', 'Keyword Bidding', 'Landing Pages', 'ROI Tracking'] },

    // Branding
    { name: 'Logo Design', description: 'Professional logo design for your brand', category: 'Branding', price: 500, rating: 4.5, outcomes: ['Multiple Concepts', 'Vector Files', 'Brand Guidelines', 'Revisions'] },
    { name: 'Brand Identity Package', description: 'Complete brand identity system', category: 'Branding', price: 1500, rating: 4.7, outcomes: ['Logo Design', 'Color Palette', 'Typography', 'Brand Guidelines'] },
    { name: 'Rebranding Service', description: 'Rebrand your company with modern identity', category: 'Branding', price: 2000, rating: 4.6, outcomes: ['Market Research', 'New Logo', 'Visual System', 'Launch Campaign'] },

    // UI/UX Design
    { name: 'UX Audit', description: 'Comprehensive UX analysis and recommendations', category: 'UI/UX Design', price: 1200, rating: 4.5, outcomes: ['User Testing', 'Heatmap Analysis', 'Recommendations', 'Prototype'] },
    { name: 'UI Design System', description: 'Complete UI design system for product', category: 'UI/UX Design', price: 2200, rating: 4.7, outcomes: ['Component Library', 'Design Tokens', 'Documentation', 'Interactive Prototype'] },
    { name: 'Mobile App UI Design', description: 'Beautiful UI design for mobile applications', category: 'UI/UX Design', price: 1800, rating: 4.6, outcomes: ['Wireframes', 'High Fidelity Design', 'Animations', 'Developer Handoff'] },

    // E-commerce
    { name: 'Shopify Store Setup', description: 'Complete Shopify store setup and configuration', category: 'E-commerce', price: 1500, rating: 4.6, outcomes: ['Theme Customization', 'Product Upload', 'Payment Integration', 'SEO Setup'] },
    { name: 'WooCommerce Store', description: 'WordPress WooCommerce store creation', category: 'E-commerce', price: 1200, rating: 4.5, outcomes: ['Plugin Setup', 'Product Management', 'Payment Gateway', 'Inventory System'] },
    { name: 'B2B Portal Development', description: 'Business-to-business e-commerce portal', category: 'E-commerce', price: 3500, rating: 4.8, outcomes: ['User Roles', 'Bulk Orders', 'Custom Pricing', 'API Integration'] },

    // Cloud Solutions
    { name: 'Cloud Migration', description: 'Migrate your infrastructure to cloud', category: 'Cloud Solutions', price: 2500, rating: 4.7, outcomes: ['AWS Migration', 'Data Transfer', 'Zero Downtime', 'Training'] },
    { name: 'AWS Setup & Optimization', description: 'AWS infrastructure setup and cost optimization', category: 'Cloud Solutions', price: 1800, rating: 4.6, outcomes: ['Instance Configuration', 'Auto Scaling', 'Backup Strategy', 'Cost Analysis'] },
    { name: 'CI/CD Pipeline Setup', description: 'Continuous integration and deployment pipeline', category: 'Cloud Solutions', price: 1500, rating: 4.5, outcomes: ['GitHub Integration', 'Automated Testing', 'Deployment', 'Monitoring'] },

    // AI Solutions
    { name: 'Chatbot Development', description: 'AI-powered chatbot for customer support', category: 'AI Solutions', price: 2000, rating: 4.6, outcomes: ['Natural Language Processing', 'Training Data', 'Integration', 'Analytics'] },
    { name: 'Machine Learning Model', description: 'Custom ML model for your business problem', category: 'AI Solutions', price: 3500, rating: 4.8, outcomes: ['Data Analysis', 'Model Training', 'Validation', 'Deployment'] },
    { name: 'Image Recognition API', description: 'Custom image recognition and classification', category: 'AI Solutions', price: 2500, rating: 4.7, outcomes: ['Computer Vision', 'API Development', 'Mobile Integration', 'Documentation'] }
];

// Function to seed database
async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Clear existing services
        await Service.deleteMany({});
        console.log('Cleared existing services');

        // Insert sample data
        const result = await Service.insertMany(servicesData);
        console.log(`✓ Successfully seeded ${result.length} services`);

        // Get statistics
        const categories = await Service.distinct('category');
        console.log(`\nCategories: ${categories.join(', ')}`);
        
        const priceStats = await Service.aggregate([
            { $group: { _id: null, minPrice: { $min: '$price' }, maxPrice: { $max: '$price' } } }
        ]);
        console.log(`Price Range: $${priceStats[0].minPrice} - $${priceStats[0].maxPrice}`);

        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
}

// Run seed
seedDatabase();
