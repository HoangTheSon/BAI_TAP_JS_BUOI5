function tinhTongDiem(diemMon1, diemMon2, diemMon3, khuVuc, doiTuong) {

    let diemKhuVuc = 0;
    let diemDoiTuong = 0;

    // --- TÍNH KHU VỰC ---
    if (khuVuc === "A") {
        diemKhuVuc = 2;
    } else if (khuVuc === "B") {
        diemKhuVuc = 1;
    } else if (khuVuc === "C") {
        diemKhuVuc = 0.5;
    } else {
        diemKhuVuc = 0;
    }

    // --- TÍNH ĐỐI TƯỢNG ---
    if (doiTuong === "1") {
        diemDoiTuong = 2.5;
    } else if (doiTuong === "2") {
        diemDoiTuong = 1.5;
    } else if (doiTuong === "3") {
        diemDoiTuong = 1;
    } else {
        diemDoiTuong = 0;
    }

    let diemUuTien = diemKhuVuc + diemDoiTuong;

    let tongDiem = diemMon1 + diemMon2 + diemMon3 + diemUuTien;

    return tongDiem;
}

function xepLoai(tongDiem, diemChuan) {
    return (tongDiem >= diemChuan) ? "Đỗ" : "Trượt (Học không phải con đường duy nhất dẫn đến thành công =)))";
}

document.querySelector('#btnTinh').onclick = function () {

    let diem1 = +document.querySelector('#mon1').value;
    let diem2 = +document.querySelector('#mon2').value;
    let diem3 = +document.querySelector('#mon3').value;
    let diemChuan = +document.querySelector('#diemChuan').value;
    let diemKhuVuc = document.querySelector('#khuVuc').value;
    let diemDoiTuong = document.querySelector('#doiTuong').value;

    let diemTong = tinhTongDiem(diem1, diem2, diem3, diemKhuVuc, diemDoiTuong);
    let ketQua = xepLoai(diemTong, diemChuan);

    document.querySelector('#ketQua').innerHTML = `
        Tổng điểm: <b>${diemTong}</b><br>
        Kết quả: <b>${ketQua}</b>
    `;
};


//Bai 2

// HÀM TÍNH TIỀN ĐIỆN
function tinhTienDien(kw) {

    let tongTien = 0;
    let conLai = kw;

    // 50 kWh đầu
    let mucSuDung1 = 50;
    while (conLai > 0 && mucSuDung1 > 0) {
        tongTien += 500;
        conLai--;
        mucSuDung1--;
    }

    // 50 kWh kế
    let mucSuDung2 = 50;
    while (conLai > 0 && mucSuDung2 > 0) {
        tongTien += 650;
        conLai--;
        mucSuDung2--;
    }

    // 100 kWh kế
    let mucSuDung3 = 100;
    while (conLai > 0 && mucSuDung3 > 0) {
        tongTien += 850;
        conLai--;
        mucSuDung3--;
    }

    // 150 kWh kế
    let mucSuDung4 = 150;
    while (conLai > 0 && mucSuDung4 > 0) {
        tongTien += 1100;
        conLai--;
        mucSuDung4--;
    }

    // còn lại
    while (conLai > 0) {
        tongTien += 1300;
        conLai--;
    }

    return tongTien;
}

// XỬ LÝ NÚT BẤM
document.querySelector("#tinhTien").onclick = function () {

    let ten = document.querySelector("#name").value;
    let kw = +document.querySelector("#kw").value;

    if (ten === "" || kw < 0) {
        document.querySelector('#hienThi').innerHTML = "Nhập chuẩn thông tin đi khách yêu!";
        return;
    }

    let tongTien = tinhTienDien(kw);

    document.querySelector('#hienThi').innerHTML =
        ` Họ tên: <b>${ten}</b> <br> Tiền điện: <b>${tongTien}đ</b>`
};


//Bài 3

document.querySelector('#tinhTienThue').onclick = function () {
    console.log("CLICK OK");
    let ten = document.querySelector('#ten').value;
    let phuThuoc = +document.querySelector('#phuThuoc').value;
    let thuNhap = +document.querySelector('#thuNhap').value;

    let thue = 0;

    if (ten === "" || thuNhap < 0) {
        document.querySelector('#ketQua-b3').innerHTML =
            "❌ Nhập đầy đủ thông tin!";
        return;
    }

    let chiuThue = thuNhap - 4e6 - phuThuoc * 1600000;

    if (chiuThue <= 0) {
        document.querySelector('#ketQua-b3').innerHTML =
            "👉 Không phải đóng thuế";
        return;
    }

    let thueSuat = 0;

    if (chiuThue <= 60e6) thueSuat = 0.05;
    else if (chiuThue <= 120e6) thueSuat = 0.1;
    else if (chiuThue <= 210e6) thueSuat = 0.15;
    else if (chiuThue <= 384e6) thueSuat = 0.2;
    else if (chiuThue <= 624e6) thueSuat = 0.25;
    else if (chiuThue <= 960e6) thueSuat = 0.3;
    else thueSuat = 0.35;

    thue = chiuThue * thueSuat;


    document.querySelector('#ketQua-b3').innerHTML =
        `${ten}<br>
         Mức thuế: ${thueSuat * 100}%<br>
         Thuế phải đóng: <b>${thue} đ</b>`;
};


//Bài 4

//Nhà Dân
function phanLoaiNhaDan(soKenh) {
    let tongTien = 0;

    // phí cố định
    tongTien += 4.5;
    tongTien += 20.5;

    // tính tiền kênh cao cấp (dùng vòng lặp)
    let i = 1;
    while (i <= soKenh) {
        tongTien += 7.5;
        i++;
    }

    return tongTien;
}

//Doanh Nghiệp 
function phanLoaiDoanhNghiep(soKenh, soKetNoi) {
    let tongTien = 0;

    // phí cố định
    tongTien += 15; // phí xử lý
    tongTien += 75; // phí cơ bản (10 kết nối đầu)

    // nếu quá 10 kết nối thì tính thêm
    if (soKetNoi > 10) {
        tongTien += (soKetNoi - 10) * 5;
    }

    // tiền kênh cao cấp
    tongTien += soKenh * 50;

    return tongTien;
}

//xử lý

document.querySelector('#phanLoai').onchange = function () {
    let loai = document.querySelector('#phanLoai').value;
    let box = document.querySelector('#ketNoiBox');

    if (loai === "Doanh Nghiệp") {
        box.classList.remove('d-none');
    } else {
        box.classList.add('d-none');
        document.querySelector('#soKetNoi').value = "";
    }
};

document.querySelector('#btnTinhTien').onclick = function () {
    let loai = document.querySelector('#phanLoai').value;
    let maKH = document.querySelector('#maKhachHang').value;
    let soKenh = +document.querySelector('#soKenh').value;
    let soKetNoi = +document.querySelector('#soKetNoi').value;

    let tongTien = 0;

    if (loai === "Nhà Dân") {
        tongTien = phanLoaiNhaDan(soKenh);
    }
    else if (loai === "Doanh Nghiệp") {
        if (soKetNoi <= 0) {
            alert("Vui lòng nhập số kết nối");
            return;
        }
        tongTien = phanLoaiDoanhNghiep(soKenh, soKetNoi);
    }

    document.querySelector('#ketQua-b4').innerHTML =
        `Mã Khách Hàng: <b>${maKH}</b><br>
         Tổng tiền cáp: <b>${tongTien}$</b>`;
};

