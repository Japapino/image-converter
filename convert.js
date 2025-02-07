
async function convertImage(inputPath, outputPath, options) {
  try {
    let pipeline = sharp(inputPath);

    if (options.width) {
      pipeline = pipeline.resize(options.width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }

    switch (options.format. toLowerCase()) {
      case 'jpeg':
        pipline = pipeline.jpeg({ quality: options.quality });
    }

  } catch (e) {
    console.error(chalk.red(`Error converting ${path.basename(inputPath)}: ${error.message}`));
  }
}