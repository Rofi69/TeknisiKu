// 1. Interface untuk mendefinisikan struktur objek
interface Mahasiswa {
    nama: string;
    umur: number;
    isLulus?: boolean; // Properti opsional (?)
}

// 2. Array of Objects yang menerapkan Interface
const daftarMahasiswa: Mahasiswa[] = [
    { nama: "Andi", umur: 20, isLulus: true },
    { nama: "Budi", umur: 22, isLulus: false },
    { nama: "Citra", umur: 21 } // isLulus tidak diisi karena opsional
];

// 3. Union Types (variabel bisa bernilai string atau null)
let kodeKelas: string | null = "TI-2A";

// 4. Arrow Function dengan parameter bertipe khusus
const cekStatusLulus = (mhs: Mahasiswa) => {
    // 5. Ternary Operator dan Template Literals
    const status = mhs.isLulus ? "Lulus" : "Belum Lulus";
    
    // Penanganan nilai undefined untuk properti opsional
    const statusFinal = mhs.isLulus === undefined ? "Menunggu Ujian" : status;
    
    console.log(`- Nama: ${mhs.nama}, Umur: ${mhs.umur}, Status: ${statusFinal}`);
};

// Eksekusi kode utama
console.log(`=== Data Mahasiswa Kelas ${kodeKelas ?? "Tidak Diketahui"} ===`);
// 6. Primitive Loop (for) 
for (let i = 0; i < daftarMahasiswa.length; i++) {
    cekStatusLulus(daftarMahasiswa[i]);
}