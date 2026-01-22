#!/usr/bin/env node

/**
 * Video Optimization Script for Level Garment Astro Migration
 * CLI 6 - Media & Asset Optimizer
 *
 * This script:
 * 1. Compresses videos using FFmpeg
 * 2. Creates WebM versions
 * 3. Generates poster images from first frame
 */

import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const execAsync = promisify(exec);

const CONFIG = {
  sourceDir: path.resolve(__dirname, '../../levelgarment-clone/levelgarment.com/wp-content/uploads/2025/04'),
  targetDir: path.resolve(__dirname, '../public/assets/videos/homepage'),
  posterDir: path.resolve(__dirname, '../public/assets/videos/posters'),
  videoBitrate: '800k', // Target bitrate for compression
  videoCodec: 'libx264',
  webmCodec: 'libvpx-vp9',
  crf: 28, // Quality factor (lower = better quality, higher = more compression)
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
 * Execute FFmpeg command
 */
async function execFFmpeg(command) {
  try {
    const { stdout, stderr } = await execAsync(command);
    return { success: true };
  } catch (error) {
    console.error(`FFmpeg error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Generate poster image from video (PNG first, then convert to WebP using Sharp)
 */
async function generatePoster(videoPath, posterPath, sharp) {
  console.log(`    Generating poster: ${path.basename(posterPath)}`);

  // First generate PNG from video
  const pngPath = posterPath.replace('.webp', '.png');
  const command = `ffmpeg -i "${videoPath}" -ss 00:00:00.5 -vframes 1 -vf scale=1280:-1 "${pngPath}" -y 2>/dev/null`;

  const result = await execFFmpeg(command);

  // Then convert to WebP using Sharp
  if (result.success && fs.existsSync(pngPath)) {
    try {
      await sharp(pngPath)
        .webp({ quality: 85 })
        .toFile(posterPath);

      // Clean up PNG
      fs.unlinkSync(pngPath);
      result.success = true;
    } catch (error) {
      console.error(`      Error converting to WebP: ${error.message}`);
      // Keep PNG as fallback
      result.success = true;
    }
  }

  return result;
}

/**
 * Compress MP4 video
 */
async function compressMP4(sourcePath, targetPath) {
  console.log(`    Compressing MP4: ${path.basename(targetPath)}`);

  const command = `ffmpeg -i "${sourcePath}" -c:v ${CONFIG.videoCodec} -b:v ${CONFIG.videoBitrate} -crf ${CONFIG.crf} -c:a aac -b:a 128k -movflags +faststart "${targetPath}" -y 2>/dev/null`;

  return execFFmpeg(command);
}

/**
 * Create WebM version
 */
async function createWebM(sourcePath, targetPath) {
  console.log(`    Creating WebM: ${path.basename(targetPath)}`);

  const command = `ffmpeg -i "${sourcePath}" -c:v ${CONFIG.webmCodec} -b:v ${CONFIG.videoBitrate} -crf ${CONFIG.crf} -c:a libopus -b:a 128k "${targetPath}" -y 2>/dev/null`;

  return execFFmpeg(command);
}

/**
 * Get video duration
 */
async function getVideoDuration(videoPath) {
  try {
    const command = `ffprobe -i "${videoPath}" -show_entries format=duration -v quiet -of csv="p=0"`;
    const { stdout } = await execAsync(command);
    return parseFloat(stdout.trim());
  } catch {
    return 0;
  }
}

/**
 * Process a single video
 */
async function processVideo(filename) {
  const sourcePath = path.join(CONFIG.sourceDir, filename);
  const basename = path.basename(filename, path.extname(filename));

  if (!fs.existsSync(sourcePath)) {
    console.warn(`  ⚠️  Not found: ${filename}`);
    return null;
  }

  const originalSize = getFileSize(sourcePath);
  const duration = await getVideoDuration(sourcePath);

  console.log(`  Processing ${basename} (${formatBytes(originalSize)}, ${duration.toFixed(1)}s)...`);

  const results = {
    name: basename,
    original: {
      path: filename,
      size: originalSize,
      formattedSize: formatBytes(originalSize),
      duration: duration,
    },
    variants: [],
  };

  // Compress MP4
  const mp4Path = path.join(CONFIG.targetDir, `${basename}.mp4`);
  const mp4Result = await compressMP4(sourcePath, mp4Path);
  if (mp4Result.success) {
    const mp4Size = getFileSize(mp4Path);
    const mp4Savings = ((originalSize - mp4Size) / originalSize * 100).toFixed(1);

    results.variants.push({
      format: 'mp4',
      path: mp4Path.replace(path.resolve(__dirname, '../public'), ''),
      size: mp4Size,
      formattedSize: formatBytes(mp4Size),
      compression: mp4Savings + '%',
    });

    console.log(`      MP4: ${formatBytes(mp4Size)} (${mp4Savings}% reduction)`);
  }

  // Create WebM
  const webmPath = path.join(CONFIG.targetDir, `${basename}.webm`);
  const webmResult = await createWebM(sourcePath, webmPath);
  if (webmResult.success) {
    const webmSize = getFileSize(webmPath);
    const webmSavings = ((originalSize - webmSize) / originalSize * 100).toFixed(1);

    results.variants.push({
      format: 'webm',
      path: webmPath.replace(path.resolve(__dirname, '../public'), ''),
      size: webmSize,
      formattedSize: formatBytes(webmSize),
      compression: webmSavings + '%',
    });

    console.log(`      WebM: ${formatBytes(webmSize)} (${webmSavings}% reduction)`);
  }

  // Generate poster
  ensureDir(CONFIG.posterDir);
  const posterPath = path.join(CONFIG.posterDir, `${basename}.webp`);
  const posterResult = await generatePoster(sourcePath, posterPath, sharp);
  if (posterResult.success) {
    const posterSize = getFileSize(posterPath);

    results.poster = {
      path: posterPath.replace(path.resolve(__dirname, '../public'), ''),
      size: posterSize,
      formattedSize: formatBytes(posterSize),
    };

    console.log(`      Poster: ${formatBytes(posterSize)}`);
  }

  return results;
}

/**
 * Main execution
 */
async function main() {
  console.log('🎬 Starting video optimization...\n');

  ensureDir(CONFIG.targetDir);
  ensureDir(CONFIG.posterDir);

  const videoFiles = ['video_1.mp4', 'video_2.mp4', 'video_3.mp4', 'video_4.mp4'];

  const results = [];
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const video of videoFiles) {
    const result = await processVideo(video);
    if (result) {
      results.push(result);
      totalOriginalSize += result.original.size;

      // Use the smallest variant size for optimization stats
      if (result.variants.length > 0) {
        const smallestVariant = result.variants.reduce((min, v) =>
          v.size < min.size ? v : min
        );
        totalOptimizedSize += smallestVariant.size;
      } else {
        totalOptimizedSize += result.original.size;
      }
    }
    console.log('');
  }

  // Calculate savings
  const totalSavings = totalOriginalSize - totalOptimizedSize;
  const savingsPercent = ((totalSavings / totalOriginalSize) * 100).toFixed(1);

  // Write results to JSON
  const reportPath = path.join(CONFIG.targetDir, '../video-optimization-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    generatedAt: new Date().toISOString(),
    summary: {
      totalVideos: results.length,
      totalOriginalSize: totalOriginalSize,
      totalOriginalFormatted: formatBytes(totalOriginalSize),
      totalOptimizedSize: totalOptimizedSize,
      totalOptimizedFormatted: formatBytes(totalOptimizedSize),
      totalSavings: totalSavings,
      totalSavingsFormatted: formatBytes(totalSavings),
      savingsPercent: savingsPercent + '%',
    },
    videos: results,
  }, null, 2));

  // Print summary
  console.log('📊 Video Optimization Summary:');
  console.log(`  Total videos processed: ${results.length}`);
  console.log(`  Original size: ${formatBytes(totalOriginalSize)}`);
  console.log(`  Optimized size: ${formatBytes(totalOptimizedSize)}`);
  console.log(`  Space saved: ${formatBytes(totalSavings)} (${savingsPercent}%)`);
  console.log(`\n📋 Report written to: ${reportPath}`);
  console.log('\n✨ Video optimization complete!');
}

// Run the script
main().catch(console.error);
