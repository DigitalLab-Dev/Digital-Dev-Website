# Lab-task2 Express Application

This is the Express-based version of the Lab-task2 Naqvix digital marketing platform website.

## Project Structure

```
Lab-task2-express/
├── app.js                          # Main Express application
├── package.json                    # Dependencies and scripts
├── public/
│   ├── images/                     # Place all images here
│   ├── javascripts/
│   │   └── script.js              # Client-side JavaScript (hamburger menu)
│   └── stylesheets/
│       └── style.css              # All CSS styles
├── views/
│   └── index.ejs                  # Main page template (EJS)
└── README.md                      # This file
```

## Installation

1. Navigate to the Lab-task2-express directory:
   ```bash
   cd "Assignments/Lab-task2-express"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Add Images

Copy all image files from the original Lab-task2 folder to the `public/images/` directory:
- whiteLogo.webp
- menu.png
- syedaliturab.png
- about.webp
- why-section-image-1.png
- why-section-image-2.webp
- why-section-image-3.webp
- callToaction.webp
- facebook.png
- instagram.png
- Linkedin.svg
- twitter.png

## Running the Application

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The application will start on `http://localhost:3000`

## Features

- Same layout and styling as the original Lab-task2
- Hamburger menu functionality for mobile devices
- Responsive design with mobile media queries
- EJS templating for dynamic content rendering
- Static file serving (CSS, JavaScript, images)

## Browser Compatibility

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **EJS** - Template engine
- **CSS3** - Styling with responsive media queries
