# Project Images

This directory contains screenshots and images for portfolio projects.

## Expected Images

### Cloud VM Resource Optimization
- `cloud-vm-optimization.png` - Screenshot of the VM optimization dashboard or algorithm visualization

### House Price Predictor
- `house-price-predictor.png` - Screenshot of the prediction interface or results visualization

### Multi-Model ML Loan Allocation
- `ml-loan-allocation.png` - Screenshot of the loan allocation model comparison or results

## Image Guidelines

- **Format**: PNG or WebP preferred for screenshots
- **Size**: Optimize images to be under 500KB each
- **Dimensions**: Recommended 1200x800px or 16:9 aspect ratio
- **Alt Text**: Ensure all images have descriptive alt text in components

## Usage

Images can be referenced in components using Next.js Image component:

```tsx
import Image from 'next/image';

<Image
  src="/images/project-name.png"
  alt="Descriptive alt text"
  width={1200}
  height={800}
  className="..."
/>
```
