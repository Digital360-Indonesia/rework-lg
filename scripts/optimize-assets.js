#!/usr/bin/env node

/**
 * Asset Optimization Script for Level Garment Astro Migration
 * CLI 6 - Media & Asset Optimizer
 *
 * This script:
 * 1. Copies images from WordPress clone to Astro public/assets
 * 2. Optimizes images using Sharp
 * 3. Creates WebP versions
 * 4. Generates responsive variants
 * 5. Creates asset manifest
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  sourceDir: path.resolve(__dirname, '../../levelgarment-clone'),
  targetDir: path.resolve(__dirname, '../public/assets'),
  imageSizes: [320, 480, 640, 768, 1024, 1280, 1920],
  webpQuality: 82,
  jpgQuality: 88,
  pngCompression: 9,
};

// Asset manifest to track all optimizations
const assetManifest = {
  version: '1.0.0',
  generatedAt: new Date().toISOString(),
  summary: {
    totalImages: 0,
    totalVideos: 0,
    totalOriginalSize: 0,
    totalOptimizedSize: 0,
    compressionRatio: 0,
  },
  categories: {
    logo: [],
    products: { tshirt: [], jersey: [], workshirt: [], jacket: [] },
    blog: [],
    ui: [],
    portfolio: [],
    videos: [],
  },
};

/**
 * Ensure directory exists
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Get file size in bytes
 */
function getFileSize(filePath) {
  try {
    return fs.statSync(filePath).size;
  } catch {
    return 0;
  }
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Optimize a single image and create variants
 */
async function optimizeImage(sourcePath, targetPath, options = {}) {
  const {
    sizes = CONFIG.imageSizes,
    createWebP = true,
    createJpg = false,
    keepOriginal = false,
    category = 'ui',
    subcategory = null,
  } = options;

  const results = [];
  const originalSize = getFileSize(sourcePath);

  try {
    const image = sharp(sourcePath);
    const metadata = await image.metadata();

    // Get base filename without extension
    const basename = path.basename(targetPath, path.extname(targetPath));
    const dir = path.dirname(targetPath);

    // Process each size
    for (const size of sizes) {
      // Skip if size is larger than original
      if (metadata.width && size > metadata.width) continue;

      const sizePath = path.join(dir, `${basename}-w${size}.webp`);

      await image
        .clone()
        .resize(size, null, {
          withoutEnlargement: true,
          fit: 'inside',
        })
        .webp({ quality: CONFIG.webpQuality })
        .toFile(sizePath);

      const optimizedSize = getFileSize(sizePath);
      results.push({
        size: size,
        path: sizePath.replace(CONFIG.targetDir, ''),
        originalSize: originalSize,
        optimizedSize: optimizedSize,
        format: 'webp',
      });
    }

    // Create full-size WebP version
    const fullPath = path.join(dir, `${basename}.webp`);
    await image
      .clone()
      .webp({ quality: CONFIG.webpQuality })
      .toFile(fullPath);

    const fullSize = getFileSize(fullPath);
    results.push({
      size: metadata.width || 'original',
      path: fullPath.replace(CONFIG.targetDir, ''),
      originalSize: originalSize,
      optimizedSize: fullSize,
      format: 'webp',
    });

    // Keep original PNG/JPG as fallback
    if (keepOriginal) {
      const originalTarget = path.join(dir, `${basename}${path.extname(sourcePath)}`);

      // Optimize original format
      if (path.extname(sourcePath).toLowerCase() === '.png') {
        await image
          .clone()
          .png({ compressionLevel: CONFIG.pngCompression })
          .toFile(originalTarget);
      } else if (path.extname(sourcePath).toLowerCase() === '.jpg' || path.extname(sourcePath).toLowerCase() === '.jpeg') {
        await image
          .clone()
          .jpeg({ quality: CONFIG.jpgQuality })
          .toFile(originalTarget);
      } else {
        fs.copyFileSync(sourcePath, originalTarget);
      }

      const fallbackSize = getFileSize(originalTarget);
      results.push({
        size: metadata.width || 'original',
        path: originalTarget.replace(CONFIG.targetDir, ''),
        originalSize: originalSize,
        optimizedSize: fallbackSize,
        format: path.extname(sourcePath).toLowerCase().slice(1),
      });
    }

    return results;
  } catch (error) {
    console.error(`Error optimizing ${sourcePath}:`, error.message);
    return [];
  }
}

/**
 * Process logo files
 */
async function processLogos() {
  console.log('🎨 Processing logos...');

  const logoFiles = [
    {
      source: path.join(CONFIG.sourceDir, 'levelgarment.com/wp-content/uploads/2024/06/07062024-lg-logo.png'),
      target: path.join(CONFIG.targetDir, 'images/logo/logo-colored.png'),
      name: 'logo-colored',
    },
    {
      source: path.join(CONFIG.sourceDir, 'levelgarment.com/wp-content/uploads/2022/03/07062024-lg-logo-white.png'),
      target: path.join(CONFIG.targetDir, 'images/logo/logo-white.png'),
      name: 'logo-white',
    },
    {
      source: path.join(CONFIG.sourceDir, 'levelgarment.com/wp-content/uploads/2024/06/07062024-lg-favicon.png'),
      target: path.join(CONFIG.targetDir, 'images/logo/favicon.png'),
      name: 'favicon',
    },
  ];

  const logoSizes = [32, 64, 128, 256, 512];

  for (const logo of logoFiles) {
    if (!fs.existsSync(logo.source)) {
      console.warn(`  ⚠️  Not found: ${logo.source}`);
      continue;
    }

    console.log(`  Processing ${logo.name}...`);
    ensureDir(path.dirname(logo.target));

    const results = await optimizeImage(logo.source, logo.target, {
      sizes: logoSizes,
      createWebP: true,
      keepOriginal: true,
      category: 'logo',
    });

    assetManifest.categories.logo.push({
      name: logo.name,
      source: logo.source.replace(CONFIG.sourceDir, ''),
      variants: results,
    });

    assetManifest.summary.totalImages += results.length;
    assetManifest.summary.totalOriginalSize += getFileSize(logo.source);
    assetManifest.summary.totalOptimizedSize += results.reduce((sum, r) => sum + r.optimizedSize, 0);
  }
}

/**
 * Process product images by category
 */
async function processProducts() {
  console.log('👕 Processing product images...');

  const products = {
    tshirt: [
      '20250523-T-Shirt_Basic_1.webp',
      '20250523-T-Shirt_Basic_2.webp',
      '20250523-Lineup-T-Shirt.webp',
    ],
    jersey: [
      '20250526-Jersey_1.webp',
      '20250526-Jersey_2.webp',
      '20250526-Jersey_3.webp',
      '20250523-Lineup-Jersey-.png',
    ],
    workshirt: [
      '20250523-Workshirt_Basic_1.webp',
      '20250523-Workshirt_Basic_2.webp',
      '20250523-Workshit_PDH_1.webp',
      '20250523-Workshit_PDH_2.webp',
      '20250523-Lineup-Workshirt.webp',
    ],
    jacket: [
      '20250523-Jacket_Bomber_1.webp',
      '20250523-Jacket_Coach_1.webp',
      '20250523-Jacket_Parka_1.webp',
      '20250523-Jacket_Trucker_1.webp',
      '20250523-Jacket_Varsity_1.webp',
      '20250523-Jacket_Varsity_2.webp',
      '20250523-Jacket_Varsity_3.webp',
      '20250523-Lineup-Jacket.webp',
    ],
  };

  const productsDir = path.join(CONFIG.sourceDir, 'levelgarment.com/wp-content/uploads/2025/05');

  for (const [category, files] of Object.entries(products)) {
    console.log(`  Processing ${category}...`);

    for (const file of files) {
      const sourcePath = path.join(productsDir, file);
      if (!fs.existsSync(sourcePath)) {
        console.warn(`    ⚠️  Not found: ${file}`);
        continue;
      }

      const basename = path.basename(file, path.extname(file));
      const targetPath = path.join(CONFIG.targetDir, `images/products/${category}/${basename}.webp`);
      ensureDir(path.dirname(targetPath));

      const results = await optimizeImage(sourcePath, targetPath, {
        sizes: [320, 480, 640, 768, 1024],
        createWebP: true,
        keepOriginal: path.extname(file) === '.png', // Keep PNG if original is PNG
        category: 'products',
        subcategory: category,
      });

      assetManifest.categories.products[category].push({
        name: basename,
        source: file,
        variants: results,
      });

      assetManifest.summary.totalImages += results.length;
      assetManifest.summary.totalOriginalSize += getFileSize(sourcePath);
      assetManifest.summary.totalOptimizedSize += results.reduce((sum, r) => sum + r.optimizedSize, 0);
    }
  }
}

/**
 * Process blog thumbnails
 */
async function processBlogImages() {
  console.log('📝 Processing blog images...');

  const blogDirs = [
    path.join(CONFIG.sourceDir, 'levelgarment.com/wp-content/uploads/2024/01'),
    path.join(CONFIG.sourceDir, 'levelgarment.com/wp-content/uploads/2024/06'),
    path.join(CONFIG.sourceDir, 'levelgarment.com/wp-content/uploads/2025/07'),
  ];

  for (const dir of blogDirs) {
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter(f =>
      /\.(jpg|jpeg|png|webp)$/i.test(f) && f.includes('650x387')
    );

    for (const file of files) {
      const sourcePath = path.join(dir, file);
      const basename = path.basename(file, path.extname(file));
      const targetPath = path.join(CONFIG.targetDir, `images/blog/${basename}.webp`);
      ensureDir(path.dirname(targetPath));

      const results = await optimizeImage(sourcePath, targetPath, {
        sizes: [320, 480, 640, 768],
        createWebP: true,
        keepOriginal: true,
        category: 'blog',
      });

      assetManifest.categories.blog.push({
        name: basename,
        source: file,
        variants: results,
      });

      assetManifest.summary.totalImages += results.length;
      assetManifest.summary.totalOriginalSize += getFileSize(sourcePath);
      assetManifest.summary.totalOptimizedSize += results.reduce((sum, r) => sum + r.optimizedSize, 0);
    }
  }
}

/**
 * Process portfolio images
 */
async function processPortfolioImages() {
  console.log('🖼️  Processing portfolio images...');

  const portfolioDir = path.join(CONFIG.sourceDir, 'portfolio.levelgarment.com/wp-content/uploads/2025/08');

  if (!fs.existsSync(portfolioDir)) {
    console.warn('  ⚠️  Portfolio directory not found');
    return;
  }

  const files = fs.readdirSync(portfolioDir).filter(f =>
    /\\.(jpg|jpeg|png|webp)$/i.test(f)
  );

  // Limit to first 50 images for demo
  const limitedFiles = files.slice(0, 50);

  for (const file of limitedFiles) {
    const sourcePath = path.join(portfolioDir, file);
    const basename = path.basename(file, path.extname(file));
    const targetPath = path.join(CONFIG.targetDir, `images/portfolio/${basename}.webp`);
    ensureDir(path.dirname(targetPath));

    const results = await optimizeImage(sourcePath, targetPath, {
      sizes: [320, 480, 640, 768, 1024],
      createWebP: true,
      keepOriginal: true,
      category: 'portfolio',
    });

    assetManifest.categories.portfolio.push({
      name: basename,
      source: file,
      variants: results,
    });

    assetManifest.summary.totalImages += results.length;
    assetManifest.summary.totalOriginalSize += getFileSize(sourcePath);
    assetManifest.summary.totalOptimizedSize += results.reduce((sum, r) => sum + r.optimizedSize, 0);
  }
}

/**
 * Copy and catalog videos
 */
async function processVideos() {
  console.log('🎬 Processing videos...');

  const videoDir = path.join(CONFIG.sourceDir, 'levelgarment.com/wp-content/uploads/2025/04');
  const targetDir = path.join(CONFIG.targetDir, 'videos/homepage');

  ensureDir(targetDir);

  const videoFiles = ['video_1.mp4', 'video_2.mp4', 'video_3.mp4', 'video_4.mp4'];

  for (const video of videoFiles) {
    const sourcePath = path.join(videoDir, video);
    if (!fs.existsSync(sourcePath)) {
      console.warn(`  ⚠️  Not found: ${video}`);
      continue;
    }

    const targetPath = path.join(targetDir, video);
    fs.copyFileSync(sourcePath, targetPath);

    const size = getFileSize(sourcePath);

    assetManifest.categories.videos.push({
      name: video.replace('.mp4', ''),
      source: video,
      path: targetPath.replace(CONFIG.targetDir, ''),
      size: size,
      formattedSize: formatBytes(size),
      note: 'Videos need FFmpeg for compression - currently copied as-is',
    });

    assetManifest.summary.totalVideos++;
    assetManifest.summary.totalOriginalSize += size;
    assetManifest.summary.totalOptimizedSize += size;
  }
}

/**
 * Write asset manifest
 */
function writeManifest() {
  // Calculate compression ratio
  if (assetManifest.summary.totalOriginalSize > 0) {
    assetManifest.summary.compressionRatio =
      ((1 - assetManifest.summary.totalOptimizedSize / assetManifest.summary.totalOriginalSize) * 100).toFixed(2);
  }

  assetManifest.summary.totalOriginalFormatted = formatBytes(assetManifest.summary.totalOriginalSize);
  assetManifest.summary.totalOptimizedFormatted = formatBytes(assetManifest.summary.totalOptimizedSize);

  const manifestPath = path.join(CONFIG.targetDir, 'asset-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(assetManifest, null, 2));
  console.log(`\n📋 Asset manifest written to: ${manifestPath}`);
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting asset optimization...\n');

  // Process all asset categories
  await processLogos();
  await processProducts();
  await processBlogImages();
  await processPortfolioImages();
  await processVideos();

  // Write manifest
  writeManifest();

  // Print summary
  console.log('\n📊 Optimization Summary:');
  console.log(`  Total images processed: ${assetManifest.summary.totalImages}`);
  console.log(`  Total videos processed: ${assetManifest.summary.totalVideos}`);
  console.log(`  Original size: ${assetManifest.summary.totalOriginalFormatted}`);
  console.log(`  Optimized size: ${assetManifest.summary.totalOptimizedFormatted}`);
  console.log(`  Compression: ${assetManifest.summary.compressionRatio}%`);
  console.log('\n✨ Asset optimization complete!');
}

// Run the script
main().catch(console.error);
