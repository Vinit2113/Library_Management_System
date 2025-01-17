// const { PDFDocument, PageRange } = require('pdf-lib');

// async specificBook(
//   @Headers('authorization') token: string,
//   @Res({ passthrough: true }) res: Response,
//   @Param('bId') bId: number,
//   @Query('pages') pages?: string // Optional query parameter for page range
// ): Promise<void> {
//   const fileread = await this.booksService.getBookFile(token, bId);
//   if (!fileread) {
//     throw new NotFoundException('Book not found');
//   }

//   const prefix = '/src/documents/upload/';
//   const filePath = join(process.cwd(), prefix, fileread);

//   try {
//     const existingPdf = await PDFDocument.load(filePath);

//     // Handle optional page range (default to full book if not provided)
//     const pageRange = pages
//       ? new PageRange(...pages.split('-').map(Number)) // Parse page range from query string
//       : new PageRange(1, existingPdf.getPageCount()); // Full book range if no query parameter

//     const extractedPages = await existingPdf.copyPages(pageRange);
//     const newPdf = await PDFDocument.create();

//     newPdf.addPages(extractedPages);

//     const buffer = await newPdf.save();

//     res.set({
//       'Content-Type': 'application/pdf',
//       'Content-Disposition': `attachment; filename=preview-${fileread}`, // Suggest using 'attachment' for download
//     });

//     res.send(buffer);
//   } catch (error) {
//     console.error('Error extracting pages:', error);
//     res.status(500).send('An error occurred while processing the PDF');
//   }
// }
