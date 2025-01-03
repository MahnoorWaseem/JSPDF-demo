import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // For table generation
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "age", headerName: "Age", width: 100 },
  { field: "address", headerName: "University", width: 200 },
  { field: "phone", headerName: "Phone", width: 150 },
];

const data = [
  {
    id: 1,
    name: "Alice",
    email:'jujjf' ,
    age: 25,
    address: 'fnjdnfj',
    phone: "123-456-7890",
  },
  {
    id: 2,
    name: "Bob",
    email: 'kmfkm',
    age: 30,
    address: 'mkrfekm',
    phone: "234-567-8901",
  },
  {
    id: 3,
    name: "Charlie",
    email: "charlie@example.com",
    age: 35,
    address: "789 Pine St",
    phone: "345-678-9012",
  },
  {
    id: 4,
    name: "David",
    email: "david@example.com",
    age: 40,
    address: "101 Maple St",
    phone: "456-789-0123",
  },
  {
    id: 5,
    name: "Alice",
    email: "alice@example.com",
    age: 25,
    address: "123 Main St",
    phone: "123-456-7890",
  },
  {
    id: 6,
    name: "Bob",
    email: "bob@example.com",
    age: 30,
    address: "456 Oak St",
    phone: "234-567-8901",
  },
  {
    id: 7,
    name: "Charlie",
    email: "charlie@example.com",
    age: 35,
    address: "789 Pine St",
    phone: "345-678-9012",
  },
  {
    id: 8,
    name: "David",
    email: "david@example.com",
    age: 40,
    address: "101 Maple St",
    phone: "456-789-0123",
  },
  {
    id: 9,
    name: "Alice",
    email: "alice@example.com",
    age: 25,
    address: "123 Main St",
    phone: "123-456-7890",
  },
  {
    id: 10,
    name: "Bob",
    email: "bob@example.com",
    age: 30,
    address: "456 Oak St",
    phone: "234-567-8901",
  },
  {
    id: 11,
    name: "Charlie",
    email: "charlie@example.com",
    age: 35,
    address: "789 Pine St",
    phone: "345-678-9012",
  },
  {
    id: 12,
    name: "David",
    email: "david@example.com",
    age: 40,
    address: "101 Maple St",
    phone: "456-789-0123",
  },
  // { id: 13, name: "David", email: "david@example.com", age: 40, address: "101 Maple St", phone: "456-789-0123" },
  // { id: 14, name: "David", email: "david@example.com", age: 40, address: "101 Maple St", phone: "456-789-0123" },
];

function SimpleDataGrid2() {
  const [selectedRows, setSelectedRows] = useState(null);

  const generatePDF = () => {
    const doc = new jsPDF({ compress: true });
    const dateTime = new Date().toLocaleString();
    const image = new Image();
    image.src = "./greenew.png";

    const footerImage = new Image();
    footerImage.src = "./footer.png";

    let cleanedHeaders, cleanedData;

    // Function to add header starting from the second page
    const addHeader = (doc) => {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("Eaxeee Testing Report", 155, 10); // for header at top-left , add 10
      doc.setLineWidth(0.05);
      doc.setDrawColor(128, 128, 128); //grey color
      doc.line(9, 12, 200, 12); // x1 y1 x2 y2
    };

    // Function to add footer starting from the second page
    const addFooter = (doc, pageNumber, totalPages) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const footerText = `Page ${pageNumber - 1} of ${totalPages - 1}`;
      doc.text(
        footerText,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: "center" }
      ); // Center-aligned footer
      doc.text(dateTime, 13, doc.internal.pageSize.height - 10);
      doc.addImage(
        footerImage,
        "png",
        doc.internal.pageSize.width - 35,
        doc.internal.pageSize.height - 18,
        25,
        10
      ); //doc.internal.pageSize.width - 25 evaluates to 210 - 25 = 185 --- For standard A4 pages in portrait orientation, this is typically 210 points
    };

    function addTableWithCheck(
      doc,
      tableHeader,
      tableData,
      title,
      rowHeight = 8,
      footerHeight = 10
    ) {
      // Calculate space remaining on the page
      const usedSpace =  doc.lastAutoTable.finalY ; // Start from finalY if provided
      
      const spaceRemaining =
        doc.internal.pageSize.height - usedSpace - footerHeight; // Remaining space minus footer height

        console.log('table data',tableData)

      // Calculate total table height
      const tableDataLength = tableData.length;
      const tableHeight = (tableDataLength + 1) * rowHeight; // +1 for header row
      const totalTableHeight = 15 + 10 + tableHeight; // Title space + footer + table

      // console.log("Space Remaining:", spaceRemaining);
      // console.log("Total Table Height:", totalTableHeight);

      if (spaceRemaining > totalTableHeight) {
        // console.log("Table can be printed on this page");
        const startY = usedSpace + 15; // Position below the last table
        addTableToPDF(doc, tableHeader, tableData, title, startY);
      } else {
        // console.log("Use next page");
        doc.addPage();
        const startY = 25; // Start from the top on a new page
        addTableToPDF(doc, tableHeader, tableData, title, startY);
      }
    }

    function addTableToPDF(doc, tableHeader, tableData, title, startY) {
      // Add the title
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text(title, 10, startY);

      console.log('data of table in add table func;', tableData)

      // Render the table
      doc.autoTable({
        startY: startY + 10,
        head: [tableHeader],
        body: tableData,
        theme: "striped",
        styles: { halign: "center" },
        headStyles: { fillColor: [100, 150, 255] },
      });
    }


    // Function to clean table data and headers
    function cleanTableData(headers, data) {
      const columnCount = headers.length;
    
      // Find columns that are not entirely null
      const validColumns = Array.from({ length: columnCount }, (_, colIndex) => {
        // Check if any value in the column is not null or undefined
        return data.some(
          (row) => row[colIndex] !== null && row[colIndex] !== undefined
        );
      });
    
      // Filter headers and rows to only include valid columns
      const cleanedHeaders = headers.filter((_, index) => validColumns[index]);
      const cleanedDataArray = data.map((row) =>
        row.filter((_, index) => validColumns[index])
      );
    
      // Convert rows into an array of objects using the cleaned headers
      const cleanedData = cleanedDataArray.map((row) =>
        row.reduce((acc, value, index) => {
          acc[cleanedHeaders[index]] = value; // Map headers to row values
          return acc;
        }, {})
      ); 
    
      console.log("Cleaned Headers:", cleanedHeaders);
      console.log("Cleaned Data:", cleanedData);    //giving values
    
      return { cleanedHeaders, cleanedData };       //returning undefined
    }
    

    // ** First Page **
    doc.setLineWidth(0.5);
    doc.line(9, 100, 200, 100); // Top Line
    doc.setFontSize(40);
    doc.setFont("helvetica", "bold");
    doc.text("Eaxeee Testing Report", 10, 120); // Centered Heading
    doc.setFontSize(16);
    doc.text("Prepared by Mahnoor", 10, 140);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${dateTime}`, 10, 150); // Bottom-left corner
    doc.addImage(image, "png", 150, 115, 60, 60); // Image
    doc.line(9, 170, 200, 170); // Bottom Line

    // ** Second Page and Content **
    doc.addPage();

    //table 1 -- Personal Info
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Personal Info", 10, 25); // Heading
    doc.autoTable({
      startY: 35,
      head: [["ID", "Name", "Age"]],
      body:
        selectedRows != null
          ? selectedRows.map((row) => [row.id, row.name, row.age])
          : data.map((row) => [row.id, row.name, row.age]),
      theme: "striped",
      styles: { halign: "center" },
      headStyles: { fillColor: [100, 150, 255] }, // Light blue header
    });

    // Table 2
    let table2Header = ["ID", "Email", "Phone"];
    let table2Data =
      selectedRows != null
        ? selectedRows.map((row) => [row.id, row.email, row.phone])
        : data.map((row) => [row.id, row.email, row.phone]);

    // Clean the data and headers
    ({ cleanedHeaders, cleanedData } = cleanTableData(table2Header, table2Data));
// let result = cleanTableData(table2Header, table2Data)
// console.log('res',result)

console.log("Cleaned Headers 2:", cleanedHeaders); //printing undefined
      console.log("Cleaned Data 2:", cleanedData); 
    
  // const finalCleanedData1 = cleanedData.map((row) => [row.id, row.email, row.phone]);

// Pass the cleaned data and headers to the table function
addTableWithCheck(doc, cleanedHeaders, cleanedData, "Contact");

    // Table 3
    const table3Header = ["ID", "University"];
    const table3Data =
      selectedRows != null
        ? selectedRows.map((row) => [row.id, row.address])
        : data.map((row) => [row.id, row.address]);

      // Clean the data and headers
 ({ cleanedHeaders, cleanedData } = cleanTableData(table3Header, table3Data));
// Pass the cleaned data and headers to the table function
addTableWithCheck(doc, cleanedHeaders, cleanedData, "Education");

    // Add Headers and Footers to All Pages (Starting from Page 2)
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 2; i <= totalPages; i++) {
      doc.setPage(i);
      addHeader(doc);
      addFooter(doc, i, totalPages);
    }

    // Save PDF
    doc.save("tables.pdf");
  };

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => data.find((row) => row.id === id));
    setSelectedRows(selectedRowsData);
    // console.log(selectedRows);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "20px" }}
        onClick={generatePDF}
      >
        Generate PDF
      </Button>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)} //[2,4]
          sx={{
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },

            "& .MuiDataGrid-cell": {
              fontSize: "14px",
              fontWeight: 400,
              color: "white",
            },
            "& .MuiDataGrid-columnHeaders": {
              fontSize: "16px",
              fontWeight: "bold",
              color: "black",
              backgroundColor: "#000000",
            },
          }}
        />
      </div>
    </>
  );
}

export default SimpleDataGrid2;
