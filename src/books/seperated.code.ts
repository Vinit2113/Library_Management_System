// async readUploadedFile(filename: string): Promise<string> {
//   const filePath = join(process.cwd(), 'src/documents/upload', filename);

//   try {
//     const data = await fs.promises.readFile(filePath, 'utf-8');
//     return data;
//   } catch (error) {
//     if (error.code === 'ENOENT') {
//       console.log('File not found:', filePath);
//     } else {
//       console.error('Error reading file:', error);
//     }
//     throw error;
//   }
// }

// async getBookFile(token: string, bId: number, page?: number): Promise<string | undefined> {
//   const book = await this.getBook(token, bId);

//   if (!book || !book.title) {
//     throw new NotFoundException('Book not found');
//   }

//   const filename = book.title;

//   if (!filename) {
//     throw new NotFoundException('No book found');
//   }

//   const fileData = await this.readUploadedFile(filename);

//   if (page && page > 0) {
//     // Assuming each page is separated by a newline character
//     const lines = fileData.split('\n');
//     const pageSize = 20; // Number of lines per page
//     const start = (page - 1) * pageSize;
//     const end = start + pageSize;
//     return lines.slice(start, end).join('\n');
//   }

//   return fileData;
// }

// @Get('list/:bId')
// async specificBook(
//   @Headers('authorization') token: string,
//   @Res({ passthrough: true }) res: Response,
//   @Param('bId') bId: number,
//   @Query('page') page?: number,
// ): Promise<StreamableFile> {
//   const fileread = await this.booksService.getBookFile(token, bId, page);

//   if (!fileread) {
//     throw new NotFoundException('Book not found');
//   }

//   const filePath = join(process.cwd(), 'src/documents/upload', fileread);
//   const file = createReadStream(filePath);

//   res.set({
//     'Content-Type': 'application/pdf',
//     'Content-Disposition': `inline; filename=${fileread}`,
//   });

//   return new StreamableFile(file);
// }
