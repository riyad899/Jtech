# Open Graph Images - Requirements for jTech

## Image Specifications
- **Recommended Size**: 1200 x 630 pixels
- **Aspect Ratio**: 1.91:1
- **Format**: JPG or PNG
- **Max File Size**: < 8MB for optimal loading

## Required Images List

### 1. General/Default Images
- `og-image.jpg` - Main fallback image (generic jTech branding)
- `twitter-image.jpg` - Twitter card fallback (1200x600px)

### 2. Page-Specific Open Graph Images

#### Homepage
- `og-home.jpg` - Homepage hero image with tech theme
- `twitter-home.jpg` - Twitter version

#### About Page
- `og-about.jpg` - Team/office photo or company values visual
- `twitter-about.jpg` - Twitter version

#### Services Page
- `og-services.jpg` - Services overview graphic
- `twitter-services.jpg` - Twitter version

#### Products Page
- `og-products.jpg` - Product catalog/showcase image
- `twitter-products.jpg` - Twitter version

#### Contact Page
- `og-contact.jpg` - Contact/support themed image
- `twitter-contact.jpg` - Twitter version

#### Portfolio Page
- `og-portfolio.jpg` - Project showcase collage
- `twitter-portfolio.jpg` - Twitter version

#### Careers Page
- `og-careers.jpg` - Team/hiring themed image
- `twitter-careers.jpg` - Twitter version

#### Blog Page
- `og-blog.jpg` - Blog/content themed image
- `twitter-blog.jpg` - Twitter version

#### Privacy Page
- `og-privacy.jpg` - Security/privacy themed image
- `twitter-privacy.jpg` - Twitter version

#### Track Order Page
- `og-track-order.jpg` - Order tracking themed image
- `twitter-track-order.jpg` - Twitter version

### 3. Other Images
- `logo.png` - Company logo (structured data)
- `apple-touch-icon.png` (180x180px) - iOS home screen icon
- `favicon-32x32.png` - Browser favicon
- `favicon-16x16.png` - Browser favicon

## Image Location
All images should be placed in the `/public` directory of your project so they can be accessed at:
`https://jtechvision.com/[image-name].jpg`

## Design Tips
1. **Include Text Overlay**: Add page title or key message
2. **Brand Consistency**: Use jTech colors (#0C2F4F)
3. **High Contrast**: Ensure text is readable on background
4. **Professional**: Use high-quality images
5. **Test**: Verify appearance on Facebook, Twitter, LinkedIn

## Dynamic Images
- **Product Images**: Already uses product.image from database
- **Service Images**: Already uses service.image from database

## Testing Your OG Images
1. Facebook Debugger: https://developers.facebook.com/tools/debug/
2. Twitter Card Validator: https://cards-dev.twitter.com/validator
3. LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

## Priority Order (if creating gradually)
1. og-image.jpg (main fallback)
2. og-home.jpg
3. og-services.jpg
4. og-products.jpg
5. og-about.jpg
6. og-contact.jpg
7. Others as needed
