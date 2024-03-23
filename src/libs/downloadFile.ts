export const downloadFile = async (dataBlob: any, typeFile: string) => {
  // Membuat Blob dari data
  const blob = new Blob([dataBlob], { type: `application/${typeFile}` });
  // Membuat URL objek dari blob
  const url: any = window.URL.createObjectURL(blob);
  // Membuat elemen <a> secara dinamis

  const link: any = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `contacts.${typeFile}`);
  document.body.appendChild(link);
  // Memicu unduhan

  link.click();
  // Menghapus URL objek setelah unduhan selesai

  window.URL.revokeObjectURL(url);
};
