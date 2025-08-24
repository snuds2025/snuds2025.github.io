# Course Materials Website - TiDs102

A modern, responsive course materials website designed for professors to share lecture materials, homework assignments, and past exam questions with students.

## Features

### 📚 **Syllabus Section**
- Course overview and information
- Instructor details and contact information
- Weekly course schedule with downloadable materials
- Markdown support for rich content

### 📝 **Lecture Notes**
- Organized by lecture date
- Multiple file format support (PDF, DOCX, etc.)
- Clear download buttons with file type indicators
- Responsive card layout

### 📋 **Homework**
- Assignment due dates clearly displayed
- Download links for assignments and template files
- Organized by homework number and due date

### 📄 **Past Exam Questions**
- Previous year's exams with solutions
- Practice questions for exam preparation
- Easy-to-find download links

### 🎨 **Design Features**
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Left Navigation**: Fixed sidebar navigation for easy access to all sections
- **Interactive Elements**: Hover effects, smooth transitions, and loading animations
- **Accessibility**: Keyboard navigation support and screen reader friendly

## File Structure

```
course-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Setup Instructions

### 1. Basic Setup
1. Download or clone this repository
2. Open `index.html` in a web browser
3. The website is ready to use!

### 2. GitHub Pages Deployment
To deploy this website on GitHub Pages:

1. Create a new GitHub repository
2. Upload all files to the repository
3. Go to Settings > Pages
4. Select "Deploy from a branch"
5. Choose the main branch and save
6. Your site will be available at `https://[username].github.io/[repository-name]`

### 3. Custom Domain (Optional)
To use a custom domain like `http://TiDs102.github.io`:

1. In your GitHub repository settings, go to Pages
2. Under "Custom domain", enter your domain
3. Save the settings
4. Add a CNAME file to your repository with your domain name

## Customization Guide

### Updating Content

#### Syllabus Section
Edit the syllabus content in `index.html`:
```html
<div class="syllabus-item">
    <h3>Course Information</h3>
    <ul>
        <li><strong>Course Code:</strong> TiDs102</li>
        <li><strong>Instructor:</strong> Professor [Your Name]</li>
        <li><strong>Office Hours:</strong> [Your Schedule]</li>
        <li><strong>Email:</strong> [your-email@university.edu]</li>
    </ul>
</div>
```

#### Adding Lecture Materials
Add new lecture cards in the Lecture Notes section:
```html
<div class="material-card">
    <div class="material-header">
        <h3>Lecture [Number] - [Title]</h3>
        <span class="date">[Date]</span>
    </div>
    <div class="material-content">
        <p>[Description]</p>
        <div class="download-buttons">
            <a href="[file-url]" class="btn btn-primary">
                <i class="fas fa-download"></i> Download Slides (PDF)
            </a>
        </div>
    </div>
</div>
```

#### Adding Homework
Add new homework cards in the Homework section:
```html
<div class="material-card">
    <div class="material-header">
        <h3>Homework [Number]</h3>
        <span class="date">Due: [Due Date]</span>
    </div>
    <div class="material-content">
        <p>[Description]</p>
        <div class="download-buttons">
            <a href="[file-url]" class="btn btn-primary">
                <i class="fas fa-download"></i> Download Assignment (PDF)
            </a>
        </div>
    </div>
</div>
```

### Styling Customization

#### Colors
Update the color scheme in `styles.css`:
```css
/* Primary colors */
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --text-color: #2c3e50;
    --background-color: #f8f9fa;
}
```

#### Fonts
Change the font family in `styles.css`:
```css
body {
    font-family: 'Your Preferred Font', sans-serif;
}
```

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icons
- **Google Fonts**: Typography (optional)

## Features for Professors

### Easy Content Management
- Simple HTML structure for easy updates
- Clear organization by section
- Flexible file linking system

### Student-Friendly Design
- Intuitive navigation
- Clear download buttons
- Mobile-responsive design
- Fast loading times

### Analytics Ready
- Built-in download tracking
- Easy integration with Google Analytics
- Custom event tracking capabilities

## Contributing

Feel free to fork this project and customize it for your needs. If you have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please contact the course instructor or create an issue in the repository.

---

**Note**: This website is designed to be easily customizable and maintainable. All content can be updated by editing the HTML file, and the design can be modified through the CSS file.
