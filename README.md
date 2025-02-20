# CLI Image Converter

A command-line tool for bulk image conversion and resizing, built with Node.js and Sharp.

## Features

- Convert between multiple image formats (JPEG, PNG, WebP)
- Batch process entire directories of images
- Resize images while maintaining aspect ratio
- Adjustable quality settings
- Progress indicator with detailed success/failure reporting
- Preserve original filenames with new extensions
- PDF conversion (Coming Soon)

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm (Node Package Manager)

## Installation

1. Clone this repository or create a new directory:

```bash
git clone https://github.com/Japapino/image-converter.git
# or
mkdir image-converter
cd image-converter
```

2. Initialize a new Node.js project:

```bash
npm init -y
```

3. Install the required dependencies:

```bash
npm install sharp yargs chalk ora
```

4. Make the script executable:

```bash
chmod +x convert.js
```

    or run with default values using node:

```bash
npm run convert
```

## Usage

### Basic Command Structure

```bash
node convert.js --input <input-directory> --output <output-directory> [options]
```

### Command Options

| Option    | Alias | Description                           | Default       | Required |
| --------- | ----- | ------------------------------------- | ------------- | -------- |
| --input   | -i    | Input directory containing images     | input-images  | No       |
| --output  | -o    | Output directory for converted images | output-images | No       |
| --format  | -f    | Output format (jpeg, png, webp)       | webp          | No       |
| --quality | -q    | Output quality (1-100)                | 80            | No       |
| --width   | -w    | Resize width (maintains aspect ratio) | 800           | No       |
| --help    | -     | Show help                             | -             | No       |

### Examples

Convert all images in a directory to WebP:

```bash
node convert.js --input ./photos --output ./converted --format webp
```

Convert and resize images to JPEG with custom quality:

```bash
node convert.js -i ./photos -o ./converted -f jpeg -q 90 -w 1200
```

## Supported Formats

### Input Formats

- JPEG/JPG
- PNG
- WebP

### Output Formats

- JPEG
- PNG
- WebP

## Error Handling

- The tool will create the output directory
- Failed conversions are reported but don't stop the batch process
- Detailed error messages for debugging
- Final summary shows successful and failed conversions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Sharp](https://sharp.pixelplumbing.com/) - High-performance Node.js image processing
- [yargs](https://yargs.js.org/) - Command-line argument parsing
- [chalk](https://github.com/chalk/chalk) - Terminal string styling
- [ora](https://github.com/sindresorhus/ora) - Terminal spinner

## Author

Stefan Murakami

## Version

1.0.0
