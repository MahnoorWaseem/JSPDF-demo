import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // For table generation
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';

// Sample data
const data = [
  { userId: 1, name: 'Mahnoor', role: 'Developer', university: 'NED University' },
  { userId: 2, name: 'Ali', role: 'Designer', university: 'IBA Karachi' },
  { userId: 3, name: 'Ayesha', role: 'Engineer', university: 'FAST NUCES' },
  { userId: 4, name: 'Mahnoor', role: 'Developer', university: 'NED University' },
  { userId: 5, name: 'Ali', role: 'Designer', university: 'IBA Karachi' },
  { userId: 6, name: 'Ayesha', role: 'Engineer', university: 'FAST NUCES' },
];

const ReportGenerator = () => {
  const generatePDF = () => {
    const doc = new jsPDF();
    const dateTime = new Date().toLocaleString();
    const image = new Image();
    image.src = './greenew.png';

    const footerImage = new Image();
    footerImage.src = './footer.png'

    // Function to add header starting from the second page
    const addHeader = (doc) => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('Eaxeee Testing Report', 155, 10); // for header at top-left , add 10
      doc.setLineWidth(0.05);
      doc.setDrawColor(128, 128, 128); //grey color
      doc.line(9, 12, 200, 12); // x1 y1 x2 y2
    };

    // Function to add footer starting from the second page
    const addFooter = (doc, pageNumber, totalPages) => {
      console.log("doc",doc)
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const footerText = `Page ${pageNumber-1} of ${totalPages-1}`;
      doc.text(footerText, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center'}); // Center-aligned footer
      doc.text(dateTime, 13, doc.internal.pageSize.height - 10); 
      doc.addImage(footerImage, 'png', doc.internal.pageSize.width - 35, doc.internal.pageSize.height - 18, 25, 10); //doc.internal.pageSize.width - 25 evaluates to 210 - 25 = 185 --- For standard A4 pages in portrait orientation, this is typically 210 points
    };

    // ** First Page **
    doc.setLineWidth(0.5);
    doc.line(9, 100, 200, 100); // Top Line
    doc.setFontSize(40);
    doc.setFont('helvetica', 'bold');
    doc.text('Eaxeee Testing Report', 10, 120); // Centered Heading
    doc.setFontSize(16);
    doc.text('Prepared by Mahnoor', 10, 140);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated on: ${dateTime}`, 10, 150); // Bottom-left corner
    doc.addImage(image, 'png', 150, 115, 60, 60); // Image
    doc.line(9, 170, 200, 170); // Bottom Line

    // ** Second Page and Content **
    doc.addPage();

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('List of Users', 10, 25); // Heading
    doc.autoTable({
      startY: 35,
      head: [['User ID', 'Name']],
      body: data.map((row) => [row.userId, row.name]),
      theme: 'striped',
      styles: { halign: 'center' },
      headStyles: { fillColor: [100, 150, 255] }, // Light blue header
    });

    // Universities Section
    let finalY = doc.lastAutoTable.finalY + 20;
    //the lastAutoTable property contains details about the table that was just rendered -- finalY tells you the vertical position at which the last table ends on the page.
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Universities', 10, finalY); // x and y
    doc.line(10, finalY + 2, 46, finalY + 2); // Black underline
    doc.autoTable({
      startY: finalY + 10,
      head: [['Name', 'University']],
      body: data.map((row) => [row.name, row.university]),
      theme: 'striped',
      styles: { halign: 'center' },
      headStyles: { fillColor: [100, 150, 255] }, // Light blue header
    });

    // Allocated Roles Section
    finalY = doc.lastAutoTable.finalY + 20;
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Allocated Roles', 10, finalY);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    doc.text('This is table 3 with grid themed table', 10, finalY + 10); // Text below the line
    doc.autoTable({
      startY: finalY + 15,
      head: [['Name', 'Role']],
      body: data.map((row) => [row.name, row.role]),
      theme: 'grid', // Grid theme for both header and body
      styles: { halign: 'center' },
      headStyles: {
        fillColor: [255, 182, 193], // Light pink header color
        fontStyle: 'bold',
      },
    });

    // Add Headers and Footers to All Pages (Starting from Page 2)
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 2; i <= totalPages; i++) {
      doc.setPage(i);
      addHeader(doc);
      addFooter(doc, i, totalPages);
    }

    // Save the PDF
    doc.save('easy_testing_report.pdf');
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: '20px' }}
        onClick={generatePDF}
      >
        Generate PDF
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="h6">User ID</Typography></TableCell>
              <TableCell><Typography variant="h6">Name</Typography></TableCell>
              <TableCell><Typography variant="h6">Role</Typography></TableCell>
              <TableCell><Typography variant="h6">University</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.userId}>
                <TableCell>{row.userId}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.university}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ReportGenerator;

