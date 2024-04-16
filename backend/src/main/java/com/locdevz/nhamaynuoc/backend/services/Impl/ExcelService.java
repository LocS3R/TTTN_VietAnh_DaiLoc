package com.locdevz.nhamaynuoc.backend.services.Impl;

import com.locdevz.nhamaynuoc.backend.models.KhoCOTY;
import com.locdevz.nhamaynuoc.backend.repository.KhoCOTYRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

@Service
public class ExcelService {
    @Autowired
    private KhoCOTYRepository khoCOTYRepository;

    @Autowired
    private KhoCOTYServiceImpl khoCOTYService;

    public void processExcelFile(MultipartFile file) throws IOException {
        String[] headers = {"STT", "Tên Nhà cung cấp", "Tên hiệu đồng hồ", "Cấp đo lường", "Đường kính", "Số serial", "Số thùng đóng gói", "Trạng thái ĐH", "Kho nhập"};
        Set<String> existsWTId = getAllWTId();
        Set<String> newWTId = new HashSet<>();

        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);

            for (Row currentRow : sheet) {
                Iterator<Cell> cellIterator = currentRow.iterator();
                String test = "";
                KhoCOTY khoCOTY = new KhoCOTY(); // Assuming User is your entity class representing the database table
                String currentBrand = "";
                String currentLevel = "";
                String currentDK = "";
                String currentSerial = "";
                String currentWTId = "";
                String currentStatus = "";
                String currentK = "";
                String currentKId = "";
                while (cellIterator.hasNext()) {
                    Cell currentCell = cellIterator.next();
                    int columnIndex = currentCell.getColumnIndex();
                    switch (columnIndex) {
                        case 0: // ID column
                            break;
                        case 1: // NCC column
                            break;
                        case 2: // Brand column
                            if (!currentCell.getStringCellValue().trim().isEmpty() && !currentCell.getStringCellValue().trim().substring(0, 3).equalsIgnoreCase(headers[2].substring(0, 3))) {
                                currentBrand = currentCell.getStringCellValue().substring(0, 3).toUpperCase();
                                System.out.println("currentBrand: " + currentBrand);
                            }
                            break;
                        case 3: // level column
                            if (!currentCell.getStringCellValue().trim().isEmpty() && !currentCell.getStringCellValue().trim().equals(headers[3])) {
                                currentLevel = currentCell.getStringCellValue();
                                System.out.println("currentLevel: " + currentLevel);
                            }
                            break;
                        case 4: // DK column
                            CellType cellType = currentCell.getCellType();
                            switch (cellType) {
                                case STRING:
                                    break;
                                case NUMERIC:
                                    if (!String.valueOf(currentCell.getNumericCellValue()).isEmpty() && !String.valueOf(currentCell.getNumericCellValue()).trim().equals(headers[4])) {
                                        currentDK = String.valueOf((long) currentCell.getNumericCellValue());
                                        System.out.println("currentDK: " + currentDK);
                                    }
                                    break;
                            }
                            break;
                        case 5: // Serial column
                            CellType serialCellType = currentCell.getCellType();
                            switch (serialCellType) {
                                case STRING:
                                    break;
                                case NUMERIC:
                                    if (!String.valueOf(currentCell.getNumericCellValue()).isEmpty() && !String.valueOf(currentCell.getNumericCellValue()).trim().equals(headers[5])) {
                                        currentSerial = String.valueOf((long) currentCell.getNumericCellValue());
                                        System.out.println("current serial: " + currentSerial);
                                    }
                                    break;
                            }
                            break;
                        case 6: // Number of Box column
                            if (!currentCell.getStringCellValue().trim().isEmpty() && !currentCell.getStringCellValue().trim().equals(headers[6])) {
                                System.out.println("current Box: " + currentCell.getStringCellValue());
                                khoCOTY.setNumberBox(currentCell.getStringCellValue());
                            }
                            break;
                        case 7: // status column
                            if (!currentCell.getStringCellValue().trim().isEmpty() && !currentCell.getStringCellValue().trim().equals(headers[7])) {
                                System.out.println("current Status: " + currentCell.getStringCellValue());
                                currentStatus = currentCell.getStringCellValue();
                                khoCOTY.setStatus(currentStatus);
                            }
                            break;
                        case 8: // warehouse inout column
                            if (!currentCell.getStringCellValue().trim().isEmpty() && !currentCell.getStringCellValue().trim().equals(headers[8])) {
                                System.out.println("current warehouse: " + currentCell.getStringCellValue());
                                currentK = currentCell.getStringCellValue();
                                khoCOTY.setKId(currentK);
                            }
                            break;
                        default:
                            if (!currentBrand.trim().isBlank() && !currentDK.trim().isBlank() && !currentLevel.trim().isBlank() && !currentSerial.trim().isBlank()) {
//                                System.out.println("In default: " + currentBrand + "_" + currentDK + currentLevel + "_" + currentSerial);
                                currentWTId = currentBrand + "_" + currentDK + currentLevel + "_" + currentSerial;
                                khoCOTY.setWTId(currentWTId);
                            }
                            if (!currentK.trim().isBlank() && !currentStatus.trim().isBlank()) {
                                currentKId = currentK + "_" + currentStatus;
                                khoCOTY.setNameK(currentKId);
                            }
                            break;
                    }
//                    if (!currentBrand.trim().isEmpty() && !currentDK.trim().isEmpty() && !currentLevel.trim().isEmpty() && !currentSerial.trim().isEmpty()) {
////                        System.out.println(currentBrand + "_" + currentDK + currentLevel + "_" + currentSerial);
//                        currentWTId = currentBrand + "_" + currentDK + currentLevel + "_" + currentSerial;
//                    }
                }
                if (!currentWTId.trim().isEmpty()) {
                    System.out.println("current wtid: " + currentWTId);
                }
                if (!currentKId.trim().isEmpty()) {
                    System.out.println("current nameK: " + currentKId);
                }
                if (khoCOTY.getWTId() != null) {
                    String finalCurrentWTId = currentWTId;
                    if (existsWTId.stream().noneMatch(str -> str != null && str.equals(finalCurrentWTId))) {
                        khoCOTYRepository.save(khoCOTY);
                    } else {
                        KhoCOTY updatedKho = khoCOTYService.updateKhoCOTY(currentWTId, khoCOTY);
                        System.out.println(updatedKho);
                    }
                }

            }
        }
    }

    private Set<String> getAllWTId() {
        Set<String> existingWTId = new HashSet<>();
        Iterable<KhoCOTY> khoCOTIES = khoCOTYRepository.findAll();
        for (KhoCOTY khoCOTY : khoCOTIES) {
            existingWTId.add(khoCOTY.getWTId());
        }
        return existingWTId;
    }
}
