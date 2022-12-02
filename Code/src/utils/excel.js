// npm install file-saver
// npm install xlsx@0.16.0 --save
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
    getExcel(dom, title='默认标题',){
        var excelTitle = title;
        var wb = XLSX.utils.table_to_book(document.querySelector(dom));
        /* 获取二进制字符串作为输出 */
        var wbout = XLSX.write(wb, {bookType: "xlsx",bookSST: true,type: "array"});
        try {
            FileSaver.saveAs(
                new Blob([wbout], { type: "application/octet-stream" }),
                excelTitle + ".xlsx"
            );
        } catch (e) {
            if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
    }
};


