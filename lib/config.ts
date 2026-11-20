export const STORE_NAME = "TAMA STORE";
export const WHATSAPP_NUMBER = "62895391845923";
export const WHATSAPP_DISPLAY = "0895-3918-45923";
export const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "";

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const services = [
  { id: "recovery", title: "Pemulihan Akun Roblox", price: 40000, desc: "Pendampingan pemulihan akun milik sendiri melalui jalur resmi Roblox." },
  { id: "voice", title: "Bantuan Voice Chat / On Mic", price: 30000, desc: "Panduan mengaktifkan fitur suara sesuai persyaratan resmi Roblox." },
  { id: "region", title: "Bantuan Pengaturan Region", price: 40000, desc: "Pendampingan pengaturan negara/wilayah melalui opsi resmi yang tersedia." },
  { id: "age", title: "Bantuan Pengaturan Umur / Age", price: 40000, desc: "Panduan koreksi tanggal lahir melalui prosedur resmi Roblox. Tidak melewati verifikasi usia." },
  { id: "app", title: "Paket Aplikasi", price: 100000, desc: "Paket aplikasi digital. Detail dan kompatibilitas dikonfirmasi admin sebelum pembayaran." },
  { id: "takeover", title: "Bantuan Pemulihan Akun (Pemilik)", price: 50000, desc: "Konsultasi pemulihan hanya untuk pemilik akun yang sah. Tidak menerima jasa mengambil akun orang lain." },
  { id: "verified", title: "Konsultasi Verifikasi / Badge", price: 100000, desc: "Informasi dan pendampingan persiapan jalur resmi. Badge tidak dijamin dan hanya diterbitkan Roblox." }
];

export const robuxPacks = [
  { id: "r80", label: "80 Robux", price: 18000 },
  { id: "r Robux", label: "400 Robux", price: 85000 },
  { id: "r800", label: "800 Robux", price: 165000 },
  { id: "r1700", label: "1.700 Robux", price: 330000 },
  { id: "r4500", label: "4.500 Robux", price: 825000 }
];
