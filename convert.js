
async function convertImage(inputPath, outputPath, optinos) {
  try {
    let pip = sharp(inputPath);


  } catch (e) {
    console.error(chalk.red(`Error converting ${path.basename(inputPath)}: ${error.message}`));
  }
}