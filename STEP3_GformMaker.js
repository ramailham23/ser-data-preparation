function buatFormOtomatis() {
  // ================= PENGATURAN USER =================
  var JUDUL_FORM_USER = 'Pengujian Label Dataset FILM : Sewu Dino (SWDN) ID 701-793'; 
  var FOLDER_ID = '1LBUzvUsxJGubkP8Zm8Sid_vQeUI-i1Qh';
  var NOMOR_AWAL = 701; // Ubah ke 101, 201, dst untuk batch berikutnya
  // ===================================================

  var folder = DriveApp.getFolderById(FOLDER_ID);
  var filesIterator = folder.getFiles();
  var fileList = [];

  while (filesIterator.hasNext()) {
    fileList.push(filesIterator.next());
  }

  // Urutkan file agar penomoran tidak acak
  fileList.sort(function(a, b) {
    return a.getName().localeCompare(b.getName(), undefined, {numeric: true, sensitivity: 'base'});
  });

  var form = FormApp.create(JUDUL_FORM_USER);
  var pilihan = ["Marah", "Sedih", "Netral", "Bahagia", "Jijik", "Takut", "Tidak Jelas"];

  for (var i = 0; i < fileList.length; i++) {
    var file = fileList[i];
    var nomorSekarang = NOMOR_AWAL + i;
    
    // Format: [nomor] nama_file : (enter) link
    var judulPertanyaan = "[" + nomorSekarang + "] " + file.getName() + " :\n" + file.getUrl();

    form.addMultipleChoiceItem()
        .setTitle(judulPertanyaan)
        .setChoiceValues(pilihan)
        .setRequired(true);
  }

  Logger.log("Selesai. Link Edit Form: " + form.getEditUrl());
}