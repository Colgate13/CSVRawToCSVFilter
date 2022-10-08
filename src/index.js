import { createReadStream } from "fs";
import CsvReadableStream from "csv-reader";
import { createObjectCsvWriter } from "csv-writer";

const inputStream = createReadStream("dados.csv", "utf8");

let index = 0;
let headers = [];
let headersCSV = [];
let data = [];
let dataCSV = [];

const substring = "UTI adulto";

const keys = {
  Codigo: 41,
  UTI: 16,
};

const Codigos = [
  "A00",
  "A01",
  "A02",
  "A03",
  "A04",
  "A05",
  "A06",
  "A07",
  "A08",
  "A09",
  "A10",
  "A11",
  "A12",
  "A13",
  "A14",
  "A15",
  "A16",
  "A17",
  "A18",
  "A19",
  "A20",
  "A21",
  "A22",
  "A23",
  "A24",
  "A25",
  "A26",
  "A27",
  "A28",
  "A29",
  "A30",
  "A31",
  "A32",
  "A33",
  "A34",
  "A35",
  "A36",
  "A37",
  "A38",
  "A39",
  "A40",
  "A41",
  "A42",
  "A43",
  "A44",
  "A45",
  "A46",
  "A47",
  "A48",
  "A49",
  "A50",
  "A51",
  "A52",
  "A53",
  "A54",
  "A55",
  "A56",
  "A57",
  "A58",
  "A59",
  "A60",
  "A61",
  "A62",
  "A63",
  "A64",
  "A65",
  "A66",
  "A67",
  "A68",
  "A69",
  "A70",
  "A71",
  "A72",
  "A73",
  "A74",
  "A75",
  "A76",
  "A77",
  "A78",
  "A79",
  "A80",
  "A81",
  "A82",
  "A83",
  "A84",
  "A85",
  "A86",
  "A87",
  "A88",
  "A89",
  "A90",
  "A91",
  "A92",
  "A93",
  "A94",
  "A95",
  "A96",
  "A97",
  "A98",
  "A99",
  "B00",
  "B01",
  "B02",
  "B03",
  "B04",
  "B05",
  "B06",
  "B07",
  "B08",
  "B09",
  "B10",
  "B11",
  "B12",
  "B13",
  "B14",
  "B15",
  "B16",
  "B17",
  "B18",
  "B19",
  "B20",
  "B21",
  "B22",
  "B23",
  "B24",
  "B25",
  "B26",
  "B27",
  "B28",
  "B29",
  "B30",
  "B31",
  "B32",
  "B33",
  "B34",
  "B35",
  "B36",
  "B37",
  "B38",
  "B39",
  "B40",
  "B41",
  "B42",
  "B43",
  "B44",
  "B45",
  "B46",
  "B47",
  "B48",
  "B49",
  "B50",
  "B51",
  "B52",
  "B53",
  "B54",
  "B55",
  "B56",
  "B57",
  "B58",
  "B59",
  "B60",
  "B61",
  "B62",
  "B63",
  "B64",
  "B65",
  "B66",
  "B67",
  "B68",
  "B69",
  "B70",
  "B71",
  "B72",
  "B73",
  "B74",
  "B75",
  "B76",
  "B77",
  "B78",
  "B79",
  "B80",
  "B81",
  "B82",
  "B83",
  "B84",
  "B85",
  "B86",
  "B87",
  "B88",
  "B89",
  "B90",
  "B91",
  "B92",
  "B93",
  "B94",
  "B95",
  "B96",
  "B97",
  "B98",
  "B99",
];

inputStream
  .pipe(
    new CsvReadableStream({
      parseNumbers: true,
      parseBooleans: true,
      trim: true,
    })
  )
  .on("data", function (row) {
    if (index == 0) {
      headers = Array(row);
    } else {
      if (row[keys.UTI].toString().includes(substring)) {
        Codigos.filter((Codigo) => {
          if (row[keys.Codigo].toString().includes(Codigo)) {
            data.push(row);
          }
        });
      }
    }

    index++;
  })
  .on("end", function () {
    console.log("Todas as linhas foram Mapeadas");

    headersCSV = headers[0].map((header) => {
      return { id: header, title: header };
    });

    dataCSV = data.map((row) => {
      return row.reduce((obj, item, index) => {
        obj[headers[0][index]] = item;
        return obj;
      }, {});
    });

    const csvWriter = createObjectCsvWriter({
      path: "out.csv",
      header: headersCSV,
    });

    console.log(dataCSV);
    console.log(dataCSV.length);

    csvWriter
      .writeRecords(dataCSV)
      .then(() => console.log("The CSV file was written successfully"));
  });
