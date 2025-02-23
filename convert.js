const fs = require('node:fs/promises')
const path = require('node:path')
const chalk = require('chalk')
const ora = require('ora')
const sharp = require('sharp')
const yargs = require('yargs')

// CLI config
const argv = yargs
  .option('input', {
    alist: 'i',
    description: 'Inputdirectory containing images',
    type: 'string',
    default: 'input-images',
  })
  .option('output', {
    alias: 'o',
    description: 'Output directory for converted images',
    type: 'string',
    default: 'output-images',
  })
  .option('format', {
    alias: 'f',
    description: 'Output format (jpeg, png, webp)',
    type: 'string',
    default: 'webp',
  })
  .option('quality', {
    alias: 'q',
    description: 'Output quality (1-100)',
    type: 'number',
    default: 80,
  })
  .option('width', {
    alias: 'w',
    description: 'Resize width (maintain aspect ratio)',
    type: 'number',
    default: 800,
  })
  .help()
  .argv

async function convertImage(inputPath, outputPath, options) {
  try {
    const image = sharp(inputPath)

    if (options.width) {
      sharp(inputPath).resize(options.width, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
    }

    switch (options.format.toLowerCase()) {
      case 'jpeg':
        image.jpeg({ quality: options.quality })
        break
      case 'png':
        image.png({ quality: options.quality })
        break
      case 'webp':
        image.webp({ quality: options.quality })
        break
      case 'pdf':
        image.pdf({ quality: options.quality })
        break
      default:
        throw new Error(`Unsupported format: ${options.format}`)
    }

    await image.toFile(outputPath)
    return true
  }
  catch (error) {
    console.error(
      chalk.red(
        `Error converting ${path.basename(inputPath)}: ${error.message}`,
      ),
    )
  }
}

async function processDirectory() {
  const spinner = ora('Starting conversion...').start()

  try {
    // TODO: fix this, errors if folder exists
    // create output directory if it doesnt exist already
    await fs.mkdir(argv.output, { revursive: true })

    const files = await fs.readdir(argv.input)
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png|webp)$/i.test(file),
    )

    if (imageFiles.length === 0) {
      spinner.fail('No image files found in input directory')
      return
    }

    let successful = 0
    let failed = 0

    for (const file of imageFiles) {
      const inputPath = path.join(argv.input, file)
      const outputPath = path.join(
        argv.output,
        `${path.parse(file).name}.${argv.format.toLowerCase()}`,
      )

      spinner.text = `Converting ${file}...`

      const success = await convertImage(inputPath, outputPath, {
        format: argv.format,
        quality: argv.quality,
        width: argv.width,
      })

      if (success)
        successful++
      else failed++

      if (successful > 0) {
        spinner.succeed(
          chalk.green(
            `Conversion complete! Successfully converted ${successful} images.${failed > 0 ? ` Failed: ${failed}` : ''
            }`,
          ),
        )
      }
      else {
        spinner.fail(chalk.red('No images were converted successfully.'))
      }
    }
  }
  catch (error) {
    spinner.fail(chalk.red(`Error: ${error.message}`))
  }
}

processDirectory()
