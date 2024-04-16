package com.locdevz.nhamaynuoc.backend.helper;

import com.locdevz.nhamaynuoc.backend.models.KhoCOTY;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ExcelHelper {
    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static String[] HEADERs = {"STT", "TNCC", "THDH", "CDDL", "DK", "So seria", "So thung", "Trang thai", "Kho nhap"};
    static String SHEET = "Tutorials";

    public static boolean hasExcelFormat(MultipartFile file) {
        if (!TYPE.equals(file.getContentType())) {
            return false;
        }
        return true;
    }

    public static List<KhoCOTY> excelToTutorials(InputStream is) {
        try {
            Workbook workbook = new XSSFWorkbook(is);

            Sheet sheet = workbook.getSheet(SHEET);
            Iterator<Row> rows = sheet.iterator();

            List<KhoCOTY> khoCOTIES = new ArrayList<KhoCOTY>();

            int rowNumber = 0;
            while (rows.hasNext()) {
                Row currentRow = rows.next();
                // skip header
                if (rowNumber == 0) {
                    rowNumber++;
                    continue;
                }
                Iterator<Cell> cellsInRow = currentRow.iterator();
                KhoCOTY khoCOTY = new KhoCOTY();

                int cellIdx = 0;
                while (cellsInRow.hasNext()) {
                    Cell currentCell = cellsInRow.next();
                    switch (cellIdx) {
                        case 0:
//                            tutorial.setId((long) currentCell.getNumericCellValue());
                            System.out.println((long) currentCell.getNumericCellValue());
                            break;
                        case 1:
//                            tutorial.setTitle(currentCell.getStringCellValue());
                            System.out.println(currentCell.getStringCellValue());
                            break;

                        case 2:
//                            tutorial.setDescription(currentCell.getStringCellValue());
                            System.out.println(currentCell.getStringCellValue());
                            break;

                        case 3:
//                            tutorial.setPublished(currentCell.getBooleanCellValue());
                            System.out.println(currentCell.getStringCellValue());
                            break;
                        case 4, 5, 6, 7, 8:
                            System.out.println(String.valueOf(currentCell.getNumericCellValue()));
                            break;
                        default:
                            break;
                    }

                    cellIdx++;
                }

                khoCOTIES.add(khoCOTY);
            }

            workbook.close();

            return khoCOTIES;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse Excel file: " + e.getMessage());
        }
    }
}

