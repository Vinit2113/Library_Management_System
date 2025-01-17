// // Update status and calculate overdue days (if needed)
// let overdueDays = 0;
// if (rental.returnDate < today) {
//   rental.status = 3; // Update status to overdue (assuming 3 represents overdue)
//   overdueDays = Math.ceil(
//     (today.getTime() - rental.returnDate.getTime()) / (1000 * 60 * 60 * 24),
//   );
// } else {
//   rental.status = 2; // Update status to returned (assuming 2 represents returned)
// }
