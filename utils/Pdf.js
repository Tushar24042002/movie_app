import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import PDFDocument from "pdf-lib";
import { rgb } from "pdf-lib";
export const Pdf = {
  async convertHtmlToPdf(htmlContent, outputPdfPath) {
    const browser = await puppeteer.launch({
      headless: true, // Run in headless mode
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Additional arguments
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000); // 60 seconds

    // Set the HTML content
    await page.setContent(htmlContent, { waitUntil: "load" });

    try {
      const pdfBuffer = await page.pdf({
        format: "A4",
        displayHeaderFooter: true,
        footerTemplate: `
            <div style="font-size: 10px; width: 100%; text-align: center; margin: 0 auto;">
              <span class="pageNumber"></span> / <span class="totalPages"></span>
            </div>
          `,
        headerTemplate: "<div></div>",
        margin: {
          top: "60px",
          bottom: "60px",
          right: "20px",
          left: "20px",
        },
      });

      await browser.close();

      // Save the PDF to a file
      fs.writeFileSync(outputPdfPath, pdfBuffer);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      await browser.close();
    }
  },

  htmlToPdf: async (htmlPath, outputFileName = "output") => {
    const htmlFilePath = path.resolve(htmlPath);
    const htmlContent = fs.readFileSync(htmlFilePath, "utf8");
    console.log(htmlContent);
    const outputPdfPath = `${new Date().getTime()}_${outputFileName}.pdf`;
    await Pdf.convertHtmlToPdf(htmlContent, outputPdfPath);
    console.log("PDF generated successfully!");
  },

  addSignatureOrWatermarkToPdf: async (
    inputPdfPath,
    outputPdfPath,
    signaturePath,
    x,
    y,
    width,
    height
  ) => {
    // Load the existing PDF
    const existingPdfBytes = fs.readFileSync(inputPdfPath);

    // Load the PDF into pdf-lib
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Embed the signature or watermark image
    const signatureBase64 = fs.readFileSync(signaturePath, "base64");
    const signatureImage = await pdfDoc.embedPng(
      Buffer.from(signatureBase64, "base64")
    );

    // Get all pages of the document
    const pages = pdfDoc.getPages();

    // Draw the signature or watermark image on each page
    for (const page of pages) {
      page.drawImage(signatureImage, {
        x,
        y,
        width,
        height,
        opacity: 0.5, // Adjust opacity for watermark effect
      });
    }

    // Serialize the PDF document to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Write the signed PDF to a new file
    fs.writeFileSync(outputPdfPath, pdfBytes);
  },

  addSignature: async (inputPath, outputPath) => {
    const inputPdfPath = inputPath;
    const outputPdfPath = outputPath;
    const signaturePath = path.resolve(__dirname, "signature.png");

    const x = 100; // X-coordinate of the signature
    const y = 100; // Y-coordinate of the signature
    const width = 200; // Width of the signature
    const height = 100; // Height of the signature

    await addSignatureOrWatermarkToPdf(
      inputPdfPath,
      outputPdfPath,
      signaturePath,
      x,
      y,
      width,
      height
    );
    console.log("Signature or watermark added successfully!");
  },
};

export default Pdf;
