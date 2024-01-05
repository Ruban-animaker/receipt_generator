const PDFDocument = require("pdfkit");
const blobStream = require("blob-stream");

window.addEventListener("DOMContentLoaded", (event) => {
  const button = document.getElementById("generate");
  if (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      var invoiceNumber = document.getElementById("invoice_number").value;
      var issueDate =
        document.getElementById("date").value +
        " " +
        document.getElementById("month").value +
        " " +
        document.getElementById("year").value;
      var name = document.getElementById("name").value;
      var email = document.getElementById("email").value;
      var addinfo = document.getElementById("addinfo").value;
      var plan = document.getElementById("plan").value;
      var quantity = document.getElementById("quantity").value;
      var price = "$" + " " + document.getElementById("price").value;

      console.log(
        invoiceNumber,
        issueDate,
        name,
        email,
        addinfo,
        plan,
        quantity,
        price
      );

      receiptgenerator(
        invoiceNumber,
        issueDate,
        name,
        email,
        addinfo,
        plan,
        quantity,
        price
      );
    });
  }
});

function receiptgenerator(
  invoiceNumber,
  issueDate,
  name,
  email,
  addinfo,
  plan,
  quantity,
  price
) {
  const doc = new PDFDocument();

  doc.registerFont("Heading Font", "Helvetica-Bold");
  doc.registerFont("Body", "Helvetica");

  doc
    .font("Heading Font")
    .fontSize(15)
    .fillOpacity(0.7)
    .text("Invoice", {
      align: "left",
    })
    .moveUp(1);

  //doc.image("logo.png", 0, 15, { width: 300 });

  doc
    .font("Body")
    .fontSize(12)
    .fillOpacity(0.7)
    .text("Animaker Inc", {
      align: "right",
      lineBreak: true,
    })
    .moveDown(0.1);

  doc
    .font("Body")
    .fontSize(12)
    .fillOpacity(0.7)
    .text("3260 Hillview Avenue, Palo Alto,", {
      align: "right",
      lineBreak: true,
    })
    .moveDown(0.1);

  doc
    .font("Body")
    .fontSize(12)
    .fillOpacity(0.7)
    .text("CA 94304, USA", {
      align: "right",
      lineBreak: true,
    })
    .moveUp(1);

  doc.font("Body").fontSize(12).fillOpacity(0.5).text("Invoice Number");

  doc
    .font("Heading Font")
    .fontSize(12)
    .fillOpacity(0.7)
    .text(invoiceNumber, {
      align: "left",
    })
    .moveDown(0.5);

  doc.font("Body").fontSize(12).fillOpacity(0.5).text("Issued Date");

  doc
    .font("Heading Font")
    .fontSize(12)
    .fillOpacity(0.7)
    .text(issueDate, {
      align: "left",
    })
    .moveDown(0.5);

  doc.moveTo(70, 180).lineTo(550, 180).strokeOpacity(0.1).stroke();

  doc.moveDown(2);

  doc.font("Body").fontSize(12).fillOpacity(0.5).text("Account");

  doc.font("Heading Font").fontSize(12).fillOpacity(0.7).text(name, {
    align: "left",
  });

  doc.font("Body").fontSize(12).fillOpacity(0.5).text(email).moveUp(3);

  doc
    .font("Body")
    .fontSize(12)
    .fillOpacity(0.5)
    .text("Amount Paid", {
      align: "right",
      lineBreak: true,
    })
    .moveDown(0.2);

  doc
    .font("Heading Font")
    .fontSize(25)
    .fillOpacity(0.7)
    .text(price, {
      align: "right",
    })
    .moveDown(0.2);

  doc.font("Body").fontSize(12).fillOpacity(0.7).moveDown(1.2);

  doc.roundedRect(75, 350, 475, 25, 3).fillOpacity(0.5).fill("#d3d3d3");

  doc.moveDown(6.3);

  doc.fillColor("black");

  doc.font("Heading Font").fillOpacity(0.5).text("Billed For", {
    indent: 20,
  });

  doc.moveUp(1);

  doc.font("Heading Font").fillOpacity(0.5).text("Quantity", {
    indent: 250,
  });

  doc.moveUp(1);

  doc.font("Heading Font").fillOpacity(0.5).text("Billed Price", {
    indent: 400,
  });

  doc.moveDown(1);

  doc.font("Body").fontSize(12).fillOpacity(0.7).text(plan, {
    indent: 20,
  });

  doc.font("Body").fontSize(12).fillOpacity(0.5).text(issueDate, {
    indent: 20,
  });

  doc.moveUp(1.5);

  doc.font("Body").fontSize(12).fillOpacity(0.7).text(quantity, {
    indent: 265,
  });

  doc.moveUp(1);

  doc.font("Body").fontSize(12).fillOpacity(0.7).text(price, {
    indent: 410,
  });

  doc.roundedRect(75, 425, 475, 25, 3).fillOpacity(0.5).fill("#d3d3d3");

  doc.moveDown(1.8);

  doc
    .fillColor("black")
    .font("Heading Font")
    .fontSize(12)
    .fillOpacity(0.7)
    .text("Total Cost", {
      indent: 250,
    });

  doc.moveUp(1);

  doc
    .fillColor("black")
    .font("Heading Font")
    .fontSize(12)
    .fillOpacity(0.7)
    .text(price, {
      indent: 410,
    });

  doc.roundedRect(75, 695, 475, 25, 3).fillOpacity(0.5).fill("#d3d3d3");

  doc.moveDown(18);
  doc.fillColor("black");
  doc.text("Copyright © 2023 Animaker Inc. All rights reserved.", {
    align: "center",
  });

  doc.moveTo(75, 350).lineTo(75, 450).strokeOpacity(0.1).stroke();
  doc.moveTo(300, 350).lineTo(300, 450).strokeOpacity(0.1).stroke();
  doc.moveTo(400, 350).lineTo(400, 450).strokeOpacity(0.1).stroke();
  doc.moveTo(550, 350).lineTo(550, 450).strokeOpacity(0.1).stroke();

  const stream = doc.pipe(blobStream());

  doc.end();

  stream.on("finish", function () {
    const url = stream.toBlobURL("application/pdf");
    window.open(url, "_blank").focus();
  });
}
